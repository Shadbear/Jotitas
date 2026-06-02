import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { email, password, nombre } = req.body;

  // 1. Validación estricta
  if (!email || !password || !nombre) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // 2. Validación de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Formato de correo inválido" });
  }

  try {
    // 3. Normalizar email a minúsculas para evitar duplicados accidentales
    const normalizedEmail = email.toLowerCase().trim();

    // 4. Verificación de existencia
    const { rowCount } = await sql`
      SELECT id FROM usuarios WHERE email = ${normalizedEmail}
    `;

    if (rowCount > 0) {
      return res.status(409).json({ error: "Este correo ya está registrado" });
    }

    // 5. Hash con mayor complejidad (salt rounds)
    const hash = await bcrypt.hash(password, 12);

    // 6. Inserción segura
    await sql`
      INSERT INTO usuarios (email, password, nombre)
      VALUES (${normalizedEmail}, ${hash}, ${nombre.trim()})
    `;

    return res.status(201).json({ message: "Usuario registrado con éxito" });

  } catch (error) {
    console.error("Error en registro:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}