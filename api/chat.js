import Groq from "groq-sdk";

const groq = new Groq({ apiKey: "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" });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  const { mensaje } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: `Eres el asistente virtual de Jotitas, una tienda de ropa streetwear peruana. 
          Responde siempre en español, de forma amigable y concisa (máximo 3 oraciones).
          Solo responde preguntas relacionadas a la tienda.
          Información de la tienda:
          - Envíos: 3-5 días Lima, 5-10 días provincias
          - Pago: solo Yape al 921 629 315
          - Tallas: S, M, L, XL, XXL
          - Devoluciones: 7 días con etiquetas
          - Contacto WhatsApp: 921 629 315
          - Horario: lunes a sábado 9am-8pm
          - Categorías: Polos, Poleras, Pantalones, Casacas, Zapatillas, Accesorios`
        },
        {
          role: "user",
          content: mensaje
        }
      ],
      max_tokens: 150,
    });

    const respuesta = completion.choices[0].message.content;
    return res.status(200).json({ respuesta });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}