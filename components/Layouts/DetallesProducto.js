import styled from '@emotion/styled'
import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import es from 'date-fns/locale/es'
import Link from 'next/link'

const Producto = styled.li`
    padding: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
`

const DescripcionProductos = styled.div`
    flex: 0 1 600px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
`
const Titulo = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    text-transform: uppercase;

    :hover{
        cursor: pointer;
    }
`

const TextoDescripcion = styled.p`
    font-size: 1.6rem;
    margin: 0;
    color: #666;
`

const Comentarios = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;
    div{
        display: flex;
        align-items: center;
        border: 1px solid #e1e1e1;
        padding: .3rem 1rem;
        margin-right: 2rem;
    }
    img{
        width: 2rem;
        margin-right: 2rem;

    }
    p{
        font-size: 1.6rem;
        margin-right: 2rem;
        font-weight: 700;
        &:last-of-type{
            margin: 0;
        }
    }
` 
const Votos = styled.div`
    flex: 0 0 auto;
    text-align: center;
    border: 1px solid #e1e1e1;
    padding: .5rem 2rem;

    div{
        font-size: 2rem;
    }
    p{
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
    }
`


const Imagen = styled.img`
    width: 200px;
`

function DetallesProducto({e}) {
  return (
    <Producto>
        <DescripcionProductos>
            <div>
                <Imagen src={e.URLImage} alt={`imagen del producto ${e.nombre}`} />
            </div>
            <div>
                <Link href={"/productos/[id]"} as={`/productos/${e.id}`}>
                    <Titulo>{e.nombre}</Titulo>
                </Link>
                <TextoDescripcion>{e.descripcion}</TextoDescripcion>
                <Comentarios>
                    <div>
                        <img src="/static/img/comentario.png" alt="comentario icono" />
                        <p>{e.comentarios.length } Comentarios</p>
                    </div>
                </Comentarios>
                <p>Publicado hace: {formatDistanceToNow(e.creado,{locale:es})}</p>
            </div>
        </DescripcionProductos>
        <Votos>
            <div>&#9650;</div>
            <p>{e.votos}</p>
        </Votos>
    </Producto>
  )
}

export default DetallesProducto