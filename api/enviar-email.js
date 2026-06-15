import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jeampierocm@gmail.com",
    pass: "hquj rila cpwp grse",
  },
});

// Genera el PDF como Buffer
const generarPDF = (pedido) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const productos = Array.isArray(pedido.productos)
      ? pedido.productos
      : JSON.parse(pedido.productos || "[]");

    // Encabezado
    doc
      .fontSize(24)
      .fillColor("#7c3aed")
      .text("JOTITAS", { align: "center" })
      .moveDown(0.5);

    doc
      .fontSize(14)
      .fillColor("#333")
      .text("Comprobante de Pedido", { align: "center" })
      .moveDown(1);

    // Línea separadora
    doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor("#7c3aed").stroke().moveDown(1);

    // Datos del cliente
    doc.fontSize(12).fillColor("#333");
    doc.text(`Cliente: ${pedido.nombre}`);
    doc.text(`Email: ${pedido.usuario_email}`);
    doc.text(`Teléfono: ${pedido.telefono || "—"}`);
    doc.text(`Dirección: ${pedido.direccion || "—"}`);
    doc.text(`Nro Operación Yape: ${pedido.comprobante}`);
    doc.text(`Estado: ${pedido.estado || "pendiente"}`);
    doc.moveDown(1);

    // Línea separadora
    doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor("#ccc").stroke().moveDown(1);

    // Productos
    doc.fontSize(13).fillColor("#7c3aed").text("Productos:", { underline: true }).moveDown(0.5);

    doc.fontSize(12).fillColor("#333");
    let subtotal = 0;
    productos.forEach((p) => {
      const linea = parseFloat(p.precio) * (p.cantidad || 1);
      subtotal += linea;
      doc.text(`• ${p.nombre}  x${p.cantidad || 1}  —  S/ ${parseFloat(p.precio).toFixed(2)}  =  S/ ${linea.toFixed(2)}`);
    });

    doc.moveDown(1);

    // Línea separadora
    doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor("#ccc").stroke().moveDown(1);

    // Total
    doc
      .fontSize(16)
      .fillColor("#7c3aed")
      .text(`TOTAL: S/ ${parseFloat(pedido.total).toFixed(2)}`, { align: "right" });

    doc.moveDown(2);

    // Pie de página
    doc
      .fontSize(10)
      .fillColor("#999")
      .text("Gracias por tu compra en Jotitas 🤙", { align: "center" });

    doc.end();
  });
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  const { tipo, pedido } = req.body;

  try {
    if (tipo === "nuevo_pedido") {
      const pdfBuffer = await generarPDF(pedido);

      await transporter.sendMail({
        from: '"Jotitas 🛍️" <jeampierocm@gmail.com>',
        to: "jeampierocm@gmail.com",
        subject: `🛍️ Nuevo pedido de ${pedido.nombre}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7c3aed;">Nuevo pedido recibido</h2>
            <p><strong>Cliente:</strong> ${pedido.nombre}</p>
            <p><strong>Email:</strong> ${pedido.usuario_email}</p>
            <p><strong>Total:</strong> S/ ${pedido.total}</p>
            <p><strong>Nro Operación Yape:</strong> ${pedido.comprobante}</p>
            <p>Se adjunta el comprobante en PDF.</p>
          </div>
        `,
        attachments: [
          {
            filename: `pedido-${pedido.nombre}-${Date.now()}.pdf`,
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ],
      });
    }

    if (tipo === "aprobado") {
      const pdfBuffer = await generarPDF({ ...pedido, estado: "APROBADO" });

      await transporter.sendMail({
        from: '"Jotitas 🛍️" <jeampierocm@gmail.com>',
        to: pedido.usuario_email,
        subject: "✅ Tu pedido fue aprobado — Jotitas",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #16a34a;">¡Tu pedido fue aprobado!</h2>
            <p>Hola <strong>${pedido.nombre}</strong>,</p>
            <p>Tu pago de <strong>S/ ${pedido.total}</strong> fue verificado con éxito.</p>
            <p>Adjuntamos tu comprobante de compra en PDF.</p>
            <p>Pronto nos comunicaremos contigo para coordinar la entrega.</p>
            <p style="color: #7c3aed;">— Equipo Jotitas 🤙</p>
          </div>
        `,
        attachments: [
          {
            filename: `comprobante-jotitas-${Date.now()}.pdf`,
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ],
      });
    }

    if (tipo === "rechazado") {
      await transporter.sendMail({
        from: '"Jotitas 🛍️" <jeampierocm@gmail.com>',
        to: pedido.usuario_email,
        subject: "❌ Tu pedido fue rechazado — Jotitas",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626;">Tu pedido fue rechazado</h2>
            <p>Hola <strong>${pedido.nombre}</strong>,</p>
            <p>No pudimos verificar tu pago de <strong>S/ ${pedido.total}</strong>.</p>
            <p>Si crees que es un error, contáctanos respondiendo este correo.</p>
            <p style="color: #7c3aed;">— Equipo Jotitas 🤙</p>
          </div>
        `,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}