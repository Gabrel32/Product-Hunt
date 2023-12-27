import Layout from "../components/Layouts/Layout";
import React from "react";
import DetallesProducto from "../components/Layouts/DetallesProducto";
import useProductos from "../hooks/useProductos";

export default function Populares() {

  const {productos} = useProductos("votos")

  return (
    <>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <div className="bg-white">
              {productos.map(e=>(
                <DetallesProducto e={e} key={e.id}/>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
