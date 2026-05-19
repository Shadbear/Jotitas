import { sql } from "@vercel/postgres";

export default async function handler(req,res){

try{

const productos=await sql`
SELECT * FROM productos
`;

return res.status(200).json(
productos.rows
);

}catch(error){

return res.status(500).json({
error:error.message
});

}

}