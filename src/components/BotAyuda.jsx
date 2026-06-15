import { useState } from "react";

const RESPUESTAS = {
  envio: {
    palabras: ["envío", "envio", "entrega", "delivery", "llega", "demora", "tiempo", "días", "dias"],
    respuesta: "📦 Realizamos envíos a todo el Perú. El tiempo de entrega es de 3 a 5 días hábiles para Lima y de 5 a 10 días para provincias. Nos comunicamos contigo por WhatsApp para coordinar la entrega.",
  },
  pago: {
    palabras: ["pago", "pagar", "yape", "precio", "costo", "transferencia", "efectivo"],
    respuesta: "💜 Aceptamos pagos por Yape al número 921 629 315. Debes ingresar el número de operación en el formulario de pago para confirmar tu pedido.",
  },
  tallas: {
    palabras: ["talla", "tallas", "medida", "medidas", "tamaño", "s", "m", "l", "xl", "xxl", "talle"],
    respuesta: "📏 Manejamos tallas S, M, L, XL y XXL. Si tienes dudas sobre tu talla, escríbenos por WhatsApp y te ayudamos a elegir la correcta.",
  },
  pedido: {
    palabras: ["pedido", "orden", "compra", "estado", "aprobado", "rechazado", "verificar", "confirmar"],
        respuesta: "🛍️ Una vez realizado tu pedido, lo revisamos y te enviamos un email confirmando si fue aprobado o rechazado. Este proceso toma entre 1 y 24 horas hábiles.",
  },
  devolucion: {
    palabras: ["devolución", "devolucion", "cambio", "cambiar", "devolver", "garantía", "garantia"],
    respuesta: "🔄 Aceptamos cambios dentro de los 7 días de recibido el producto, siempre que esté en perfecto estado y con etiquetas. Contáctanos por WhatsApp para coordinar.",
  },
  contacto: {
    palabras: ["contacto", "contactar", "whatsapp", "teléfono", "telefono", "llamar", "escribir", "comunicar"],
    respuesta: "📱 Puedes contactarnos por WhatsApp al 921 629 315. Estamos disponibles de lunes a sábado de 9am a 8pm.",
  },
  productos: {
    palabras: ["producto", "productos", "ropa", "polo", "polera", "casaca", "pantalón", "pantalon", "zapatilla", "accesorio"],
    respuesta: "👕 Tenemos polos, poleras, pantalones, casacas, zapatillas y accesorios. Puedes filtrar por categoría en la tienda para encontrar lo que buscas.",
  },
  saludo: {
    palabras: ["hola", "buenas", "buenos", "hi", "hello", "saludos", "hey", "buen día", "buen dia"],
    respuesta: "👋 ¡Hola! Soy el asistente de Jotitas. Puedo ayudarte con información sobre envíos, tallas, pagos, pedidos y más. ¿En qué te puedo ayudar?",
  },
  gracias: {
    palabras: ["gracias", "thanks", "perfecto", "genial", "ok", "okey", "listo", "entendido"],
    respuesta: "😊 ¡Con gusto! Si tienes más preguntas, aquí estoy. También puedes escribirnos por WhatsApp al 921 629 315.",
  },
};

const buscarRespuesta = (mensaje) => {
  const texto = mensaje.toLowerCase().trim();
  for (const categoria of Object.values(RESPUESTAS)) {
    if (categoria.palabras.some((palabra) => texto.includes(palabra))) {
      return categoria.respuesta;
    }
  }
  return "🤔 No entendí bien tu pregunta. Puedo ayudarte con:\n• Envíos y entregas\n• Tallas y medidas\n• Métodos de pago\n• Estado de pedidos\n• Devoluciones y cambios\n• Contacto\n\n¿Sobre cuál de estos temas tienes dudas?";
};

function BotAyuda() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([
    {
      tipo: "bot",
      texto: "👋 ¡Hola! Soy el asistente de Jotitas. ¿En qué te puedo ayudar?",
    },
  ]);
  const [input, setInput] = useState("");

  const enviarMensaje = () => {
    if (!input.trim()) return;

    const nuevoMensaje = { tipo: "usuario", texto: input };
    const respuesta = { tipo: "bot", texto: buscarRespuesta(input) };

    setMensajes((prev) => [...prev, nuevoMensaje, respuesta]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") enviarMensaje();
  };

  return (
    <>
      {/* Botón flotante del bot */}
      <button
        onClick={() => setAbierto(!abierto)}
        className="fixed bottom-24 right-6 z-50 bg-purple-600 hover:bg-purple-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all hover:scale-110"
        aria-label="Abrir chat de ayuda"
      >
        {abierto ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        )}
      </button>

      {/* Ventana del chat */}
      {abierto && (
        <div className="fixed bottom-44 right-6 z-50 w-80 bg-zinc-900 border border-purple-500/30 rounded-3xl shadow-[0_0_30px_rgba(168,85,247,0.2)] overflow-hidden">

          {/* Header */}
          <div className="bg-purple-600 px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">
              🤖
            </div>
            <div>
              <p className="text-white font-black text-sm">Asistente Jotitas</p>
              <p className="text-purple-200 text-xs">Siempre disponible</p>
            </div>
          </div>

          {/* Mensajes */}
          <div className="h-72 overflow-y-auto p-4 space-y-3 flex flex-col">
            {mensajes.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.tipo === "usuario" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm whitespace-pre-line ${
                    msg.tipo === "usuario"
                      ? "bg-purple-600 text-white rounded-br-sm"
                      : "bg-zinc-800 text-zinc-200 rounded-bl-sm"
                  }`}
                >
                  {msg.texto}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu pregunta..."
              className="flex-1 bg-zinc-800 text-white text-sm px-4 py-2 rounded-xl outline-none border border-zinc-700 focus:border-purple-500 transition-all placeholder-zinc-500"
            />
            <button
              onClick={enviarMensaje}
              className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-xl transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </div>

        </div>
      )}
    </>
  );
}

export default BotAyuda;