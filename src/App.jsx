import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import PaymentMethod from "./components/PaymentMethod";

function App() {

const [productos,setProductos]=useState([]);
const [carrito,setCarrito]=useState([]);
const [loading,setLoading]=useState(true);
const [error,setError]=useState("");

const [categoriaSeleccionada,
setCategoriaSeleccionada]=useState("Todos");

const [busqueda,setBusqueda]=useState("");



/* CARGAR PRODUCTOS */

useEffect(()=>{

const cargarProductos=async()=>{

try{

setLoading(true);

const res=await fetch(
"/api/productos.php?i=1"
);

console.log(
"STATUS:",
res.status
);

if(!res.ok){

throw new Error(
"No se pudo conectar"
);

}

const texto=
await res.text();

console.log(
"RESPUESTA:"
);

console.log(
texto
);


if(
texto.includes("<html")
||
texto.includes("<body")
){

throw new Error(
"InfinityFree devolvió HTML"
);

}


const data=
JSON.parse(texto);


console.log(
"PRODUCTOS:",
data
);


if(
!Array.isArray(data)
){

throw new Error(
"No llegó un array"
);

}



const productosLimpios=

data.map(
(producto)=>({

id:
producto.id,

nombre:
producto.nombre
||
"Sin nombre",

precio:
parseFloat(
producto.precio
)||0,

categoria:
producto.categoria
||
"Otros",

imagen:
producto.imagen
||
""

})
);


setProductos(
productosLimpios
);

}

catch(error){

console.log(
"ERROR:",
error
);

setError(
"No se pudieron cargar productos"
);

}

finally{

setLoading(false);

}

};

cargarProductos();

},[]);



/* CARGAR CARRITO */

useEffect(()=>{

const guardado=
localStorage.getItem(
"carrito"
);

if(guardado){

setCarrito(
JSON.parse(
guardado
)
);

}

},[]);



/* GUARDAR CARRITO */

useEffect(()=>{

localStorage.setItem(
"carrito",
JSON.stringify(carrito)
);

},[carrito]);



/* AGREGAR */

const agregarAlCarrito=
(producto)=>{

const existe=

carrito.find(
(item)=>
item.id===
producto.id
);


if(existe){

const actualizado=

carrito.map(
(item)=>{

if(
item.id===
producto.id
){

return{

...item,

cantidad:
(item.cantidad||1)+1

};

}

return item;

});

setCarrito(
actualizado
);

return;

}



setCarrito([

...carrito,

{

...producto,

cantidad:1

}

]);

};



/* ELIMINAR */

const eliminarDelCarrito=
(id)=>{

setCarrito(

carrito.filter(
(item)=>
item.id!==id
)

);

};



const vaciarCarrito=()=>{

setCarrito([]);

};



/* FILTRAR */

const productosFiltrados=

productos.filter(
(producto)=>{

const categoria=

categoriaSeleccionada==="Todos"

?true

:

producto.categoria===
categoriaSeleccionada;


const nombre=

producto.nombre
.toLowerCase()

.includes(
busqueda.toLowerCase()
);


return categoria&&nombre;

});



return(

<div className="
bg-black
text-white
min-h-screen
overflow-x-hidden
">

<Navbar carrito={carrito}/>


<section
id="inicio"
className="
text-center
py-28
px-6
bg-gradient-to-b
from-black
to-zinc-900
"
>

<h1 className="
text-6xl
md:text-8xl
font-black
mb-6
">

JOTITAS

</h1>

<p className="
text-gray-400
text-xl
max-w-xl
mx-auto
">

Ropa con estilo para cualquier ocasión.

</p>

<a
href="#tienda"
className="
inline-block
mt-10
bg-pink-500
px-10
py-4
rounded-2xl
font-bold
hover:bg-pink-600
">

Ver ropa

</a>

</section>



<section
className="
px-6
md:px-10
pt-10
">

<input
type="text"
placeholder="Buscar ropa..."
value={busqueda}
onChange={(e)=>
setBusqueda(
e.target.value
)
}
className="
w-full
bg-zinc-900
border
border-zinc-800
rounded-2xl
p-5
outline-none
focus:border-pink-500
"
/>

</section>



{loading&&(

<div className="
text-center
text-pink-400
text-2xl
py-20
">

Cargando productos...

</div>

)}



{error&&(

<div className="
text-center
text-red-500
text-2xl
py-20
">

{error}

</div>

)}



{productos.length>0&&(

<div className="
text-green-400
px-10
pb-5
">

Productos cargados:
{productos.length}

</div>

)}



<section
id="tienda"
className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-8
px-6
md:px-10
pb-20
">

{

productosFiltrados.map(
(producto)=>(

<ProductCard
key={producto.id}
producto={producto}
agregarAlCarrito={
agregarAlCarrito
}
/>

))

}

</section>



<section
className="
grid
xl:grid-cols-2
gap-10
px-6
md:px-10
pb-20
">

<Cart
carrito={carrito}
eliminarDelCarrito={
eliminarDelCarrito
}
vaciarCarrito={
vaciarCarrito
}
/>

<PaymentMethod
carrito={carrito}
/>

</section>

</div>

);

}

export default App;