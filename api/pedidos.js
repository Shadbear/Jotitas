import { sql } from "@vercel/postgres";

export default async function handler(req, res) {

  // GET - Obtener todos los pedidos
  if (req.method === "GET") {
    try {
      const resultado = await sql`
        SELECT * FROM pedidos ORDER BY created_at DESC
      `;
      return res.status(200).json(resultado.rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // POST - Crear nuevo pedido
  if (req.method === "POST") {
    const { usuario_email, nombre, telefono, direccion, productos, total, comprobante } = req.body;

    if (!nombre || !telefono || !direccion || !productos || !total) {
      return res.status(400).json({ error: "Faltan campos" });
    }

    try {
      await sql`
        INSERT INTO pedidos (usuario_email, nombre, telefono, direccion, productos, total, comprobante)
        VALUES (${usuario_email}, ${nombre}, ${telefono}, ${direccion}, ${JSON.stringify(productos)}, ${total}, ${comprobante})
      `;

      // Email al admin avisando nuevo pedido
      await fetch("https://jotitas-qlhv.vercel.app/api/enviar-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "nuevo_pedido",
          pedido: { usuario_email, nombre, telefono, direccion, productos, total, comprobante },
        }),
      });

      return res.status(201).json({ ok: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // PATCH - Aprobar o rechazar pedido
  if (req.method === "PATCH") {
    const { id, accion } = req.body;
    try {
      const estado = accion === "aprobar" ? "pagado" : "rechazado";

      const resultado = await sql`
        UPDATE pedidos SET estado = ${estado} WHERE id = ${id}
        RETURNING *
      `;

      const pedido = resultado.rows[0];

      // Email al usuario
      await fetch("https://jotitas-qlhv.vercel.app/api/enviar-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: accion === "aprobar" ? "aprobado" : "rechazado",
          pedido,
        }),
      });

      return res.status(200).json({ ok: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: "Método no permitido" });
}