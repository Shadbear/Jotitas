import { sql } from "@vercel/postgres";

export default async function handler(req, res) {

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
      return res.status(201).json({ ok: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PATCH") {
    const { id, estado } = req.body;
    try {
      await sql`
        UPDATE pedidos SET estado = ${estado} WHERE id = ${id}
      `;
      return res.status(200).json({ ok: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: "Método no permitido" });
}