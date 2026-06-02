import { sql } from "@vercel/postgres";

export default async function handler(req, res) {

  // GET - Obtener todos los productos
  if (req.method === "GET") {
    try {
      const resultado = await sql`
        SELECT * FROM productos ORDER BY id ASC
      `;
      return res.status(200).json(resultado.rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // PUT - Actualizar producto
  if (req.method === "PUT") {
    const { id, nombre, precio, stock } = req.body;

    if (!id || !nombre || !precio) {
      return res.status(400).json({ error: "Faltan campos" });
    }

    try {
      await sql`
        UPDATE productos 
        SET nombre = ${nombre}, precio = ${precio}, stock = ${stock}
        WHERE id = ${id}
      `;
      return res.status(200).json({ ok: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: "Método no permitido" });
}