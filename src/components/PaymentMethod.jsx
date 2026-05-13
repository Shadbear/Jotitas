import { useState } from "react";

function PaymentMethod({ carrito }) {

  const [comprobante, setComprobante] = useState(null);
  const [preview, setPreview] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  // TOTAL
  const total = carrito.reduce(
    (acc, item) => acc + Number(item.precio),
    0
  );

  // SUBIR COMPROBANTE
  const subirComprobante = (e) => {

    const archivo = e.target.files[0];

    if (!archivo) return;

    setComprobante(archivo);

    const imageURL = URL.createObjectURL(archivo);

    setPreview(imageURL);
  };

  // ELIMINAR COMPROBANTE
  const eliminarComprobante = () => {

    setComprobante(null);
    setPreview("");

  };

  // CONFIRMAR PEDIDO
  const confirmarPedido = () => {

    if (carrito.length === 0) {

      alert("Tu carrito está vacío.");

      return;
    }

    if (!comprobante) {

      alert("Debes subir el comprobante.");

      return;
    }

    setEnviando(true);

    setTimeout(() => {

      setEnviando(false);
      setPedidoEnviado(true);

    }, 2000);

  };

  return (

    <div className="
      bg-zinc-900
      p-8
      rounded-3xl
      shadow-2xl
    ">

      {/* HEADER */}
      <div className="
        flex
        items-center
        gap-4
        mb-8
      ">

        <div className="text-6xl">
          💜
        </div>

        <div>

          <h2 className="
            text-4xl
            font-black
          ">
            Pago por Yape
          </h2>

          <p className="
            text-gray-400
            mt-2
            text-lg
          ">
            Escanea el QR y sube tu comprobante.
          </p>

        </div>

      </div>

      {/* TOTAL */}
      <div className="
        bg-pink-500
        rounded-3xl
        p-6
        mb-8
        text-center
      ">

        <p className="
          text-lg
          font-medium
        ">
          Total a pagar
        </p>

        <h2 className="
          text-5xl
          font-black
          mt-2
        ">
          S/ {total.toFixed(2)}
        </h2>

      </div>

      {/* CARRITO VACIO */}
      {carrito.length === 0 && (

        <div className="
          bg-yellow-500/20
          border
          border-yellow-500
          text-yellow-400
          p-5
          rounded-2xl
          mb-8
          text-center
        ">

          Agrega productos al carrito.

        </div>

      )}

      {/* QR */}
      <div className="
        bg-black
        border
        border-gray-800
        rounded-3xl
        p-8
        text-center
      ">

        <h3 className="
          text-2xl
          font-bold
          text-pink-400
          mb-6
        ">
          Escanea el QR
        </h3>

        <img
          src="/yape-qr.png"
          alt="QR Yape"
          className="
            w-72
            mx-auto
            rounded-3xl
            border
            border-gray-700
            shadow-2xl
          "
        />

        <div className="mt-8">

          <p className="
            text-gray-400
            text-lg
          ">
            Número Yape
          </p>

          <h3 className="
            text-4xl
            font-black
            text-pink-400
            mt-2
            tracking-widest
          ">
            921 629 315
          </h3>

        </div>

      </div>

      {/* SUBIR COMPROBANTE */}
      <div className="mt-8">

        <label className="
          block
          text-lg
          font-semibold
          mb-4
        ">
          Subir comprobante
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={subirComprobante}
          className="
            w-full
            bg-black
            border
            border-gray-700
            rounded-2xl
            p-4
            text-gray-300
            file:bg-pink-500
            file:border-0
            file:px-4
            file:py-2
            file:rounded-xl
            file:text-white
            file:font-bold
            file:cursor-pointer
          "
        />

      </div>

      {/* PREVIEW */}
      {preview && (

        <div className="
          mt-8
          bg-black
          border
          border-gray-800
          rounded-3xl
          p-6
        ">

          <div className="
            flex
            items-center
            justify-between
            mb-4
          ">

            <p className="
              text-green-400
              font-semibold
            ">
              Comprobante cargado ✅
            </p>

            <button
              onClick={eliminarComprobante}
              className="
                bg-red-500
                hover:bg-red-600
                px-4
                py-2
                rounded-xl
                text-sm
                font-bold
              "
            >
              Eliminar
            </button>

          </div>

          <img
            src={preview}
            alt="Comprobante"
            className="
              rounded-2xl
              w-full
              max-h-[300px]
              object-contain
              bg-zinc-900
            "
          />

        </div>

      )}

      {/* BOTON */}
      <button
        onClick={confirmarPedido}
        disabled={enviando || pedidoEnviado}
        className={`
          w-full
          mt-8
          py-5
          rounded-2xl
          text-xl
          font-bold
          transition

          ${
            enviando || pedidoEnviado
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-pink-500 hover:bg-pink-600 hover:scale-[1.02]"
          }
        `}
      >

        {
          enviando
            ? "Enviando pedido..."
            : pedidoEnviado
              ? "Pedido enviado ✅"
              : "Enviar pedido"
        }

      </button>

      {/* SUCCESS */}
      {pedidoEnviado && (

        <div className="
          mt-8
          bg-green-500/20
          border
          border-green-500
          text-green-400
          p-6
          rounded-2xl
          text-center
        ">

          <h3 className="
            text-2xl
            font-bold
          ">
            Pedido enviado correctamente ✅
          </h3>

          <p className="
            mt-2
            text-gray-300
          ">
            Revisaremos tu comprobante y te contactaremos pronto.
          </p>

        </div>

      )}

    </div>

  );
}

export default PaymentMethod;