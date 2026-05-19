import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { email, password, nombre } = req.body;

  if (!email || !password || !nombre) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  try {
    const existe = await sql`
      SELECT id FROM usuarios WHERE email = ${email}
    `;

    if (existe.rows.length > 0) {
      return res.status(409).json({ error: "Este correo ya está registrado" });
    }

    const hash = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO usuarios (email, password, nombre)
      VALUES (${email}, ${hash}, ${nombre})
    `;

    return res.status(201).json({ ok: true });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}