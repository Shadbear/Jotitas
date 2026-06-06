import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jeampierocm@gmail.com",
    pass: "hquj rila cpwp grse",
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  const { tipo, pedido } = req.body;

  try {
    if (tipo === "nuevo_pedido") {
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
            <p><strong>Productos:</strong></p>
            <ul>
              ${(Array.isArray(pedido.productos) ? pedido.productos : JSON.parse(pedido.productos || "[]"))
                .map(p => `<li>${p.nombre} x${p.cantidad} — S/ ${p.precio}</li>`)
                .join("")}
            </ul>
            <p>Ingresa al panel admin para aprobar o rechazar.</p>
          </div>
        `,
      });
    }

    if (tipo === "aprobado") {
      await transporter.sendMail({
        from: '"Jotitas 🛍️" <jeampierocm@gmail.com>',
        to: pedido.usuario_email,
        subject: "✅ Tu pedido fue aprobado — Jotitas",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #16a34a;">¡Tu pedido fue aprobado!</h2>
            <p>Hola <strong>${pedido.nombre}</strong>,</p>
            <p>Tu pago de <strong>S/ ${pedido.total}</strong> fue verificado con éxito.</p>
            <p>Pronto nos comunicaremos contigo para coordinar la entrega.</p>
            <p style="color: #7c3aed;">— Equipo Jotitas 🤙</p>
          </div>
        `,
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