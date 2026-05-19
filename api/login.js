import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  try {
    const resultado = await sql`
      SELECT * FROM usuarios WHERE email = ${email}
    `;

    if (resultado.rows.length === 0) {
      return res.status(401).json({ error: "Correo o contraseña incorrectos" });
    }

    const usuario = resultado.rows[0];
    const passwordCorrecta = await bcrypt.compare(password, usuario.password);

    if (!passwordCorrecta) {
      return res.status(401).json({ error: "Correo o contraseña incorrectos" });
    }

    return res.status(200).json({
      ok: true,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
      },
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}