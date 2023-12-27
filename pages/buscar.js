import Layout from "../components/Layouts/Layout";
import styled from "@emotion/styled"
import { useRouter } from "next/router";
import useProductos from "../hooks/useProductos";
import { useEffect, useState } from "react";
import React from 'react'
import DetallesProducto from "../components/Layouts/DetallesProducto";

const Heading = styled.h1`
  color: blue;
`;

export default function buscar() {
  const {query:{q}} = useRouter()
  const [resultado, setResultado] = useState([])
  const {productos} = useProductos("creado")

  useEffect(()=>{
    const busqueda = q?.toLowerCase()
    const filtro = productos.filter(e=>{
      return ( e.nombre?.toLowerCase().includes(busqueda) || e.descripcion.toLowerCase().includes(busqueda) ) 
    })
    setResultado(filtro);
  },[q,productos])

  return (
    <>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <div className="bg-white">
              {resultado?.map(e=>(
                <DetallesProducto e={e} key={e.id}/>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
