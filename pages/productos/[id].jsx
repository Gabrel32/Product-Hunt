import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { FirebaseContext } from '../../firebase/context'
import Error404 from '../../components/Layouts/404'
import Layout from '../../components/Layouts/Layout'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import es from 'date-fns/locale/es'
import { Campo, InputSubmit } from '../../components/User-Interface/Formulario'
import Boton from '../../components/User-Interface/Boton'
import Link from 'next/link'
import { tr } from 'date-fns/locale'



const ContenedorProducto = styled.div`
    @media (min-width: 768px){
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 3rem;
        margin: 0 3rem;
    }
`
const CreadorProducto = styled.p`
    padding: 0.5rem 2rem;
    background-color: #da552f;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline;
    text-align: left;
    border-radius: 2rem;
`

function Producto() {
    // extrayendo el id de la ruta
    const {query:{id}} = useRouter()
    const router = useRouter()

    const {firebase, usuario} = useContext(FirebaseContext)

    const [producto, setProducto] = useState({})
    const [error, setError] = useState(false)
    const [comentario, setComentario] = useState({})

    useEffect(()=>{
        if (id) {
            async function obtenerProducto (){
                const productoQuery = await firebase.db.collection("Productos").doc(id);
                const producto = await productoQuery.get()
                if(producto.exists) {
                    setProducto(producto.data());
                }else{
                    setError(true)
                }
            }
            obtenerProducto();
        }
    },[id])

    if (Object.keys(producto).length === 0 && !error) {
        return (
            <Layout>
                <h1 css={css`
                    margin-top: 5rem;
                    text-align: center;
                `}>Cargando</h1>
            </Layout>
        )
    }

    const votarProducto = async ()=>{
        if (producto.haVotado.includes(usuario.uid)) {
            return 
        }
        if (!usuario) {
            return router.push("/login")
        }

        // obtener y sumer nuevo voto

        const nuevoTotal = producto.votos + 1
        // vereficando si el usuario voto
        // guardando el uid de usuario que voto
        const hanVotado = [...producto.haVotado, usuario.uid]

        await firebase.db.collection("Productos").doc(id).update({votos:nuevoTotal, haVotado:hanVotado})

        setProducto({
            ...producto,
            votos:nuevoTotal,
            haVotado:hanVotado
        })
  
    }
    
    const cometarioChange = e =>{
        setComentario({
            ...comentario,
            [e.target.name]:e.target.value
        })

    }
    // identifica si el comentario es del creador del producto

    const esCreador = id =>{
        if (producto.creador.id === id) {
            return true
        }
    }
    
    const agregarComentario = async e =>{
        e.preventDefault()
        
        if (!usuario) {
            return router.push("/login")
        }

        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName

        // Tomar copia de comentarios y agregarlos al arreglo
        const nuevoCometarios = [...producto.comentarios,comentario];

        setProducto({
            ...producto,
            comentarios:nuevoCometarios
        })

        // actualizar BD

        await firebase.db.collection("Productos").doc(id).update({
            comentarios:nuevoCometarios
        })        

    }

    // funcion que revisa que el creador del producto es el mismo que el que esta autenticado

    const puedeBorrar = ()=>{
        if (!usuario) {
            return false
        }
        if (producto.creador?.id === usuario.uid) {
            return true
        }
    }

    // eliminar Producto de la ase de datos

    const eliminarProducto = async () =>{
        if (!usuario) {
            return router.push("/login")
        }

        if (producto.creador.id !== usuario.uid) {
            return router.push("/")
        }
        try {
            await firebase.db.collection("Productos").doc(id).delete();
            router.push("/")
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
        <Layout>
            {error ? <Error404>Producto no Encontrado</Error404> : (
            <div className='contenedor'>
                <h1
                css={css`
                    text-align: center;
                    margin-top: 5rem;

                `}
                >{producto.nombre}</h1>
                <ContenedorProducto>
                    <div>
                    <p >Publicado hace: {formatDistanceToNow(producto.creado,{locale:es})}</p>
                    <img src={producto.URLImage} alt={`imagen del producto ${producto.nombre}`} />
                    <p>{producto.descripcion}</p>

                    {usuario && (
                        <>
                            <h2>Agrega tu comentario</h2>
                            <form onSubmit={agregarComentario} action="">
                                <Campo>
                                    <input onChange={cometarioChange} value={comentario.mensaje} placeholder='Agrega tu comentario' type="text" name="mensaje" id="mensaje" />
                                </Campo>
                                <InputSubmit type='submit' value={`agrega tu comentario`}/>
                            </form>
                        </>
                    )}

                    <h2 css={css`
                        margin: 2rem 0;
                    `}>Comentarios</h2>
                    {producto?.comentarios.length === 0 ? <p css={css`
                    font-style: italic;
                    font-size: 2rem;
                    text-align: center;
                    text-transform: capitalize;

                    `}>no hay comentarios aun</p> :(

                    <ul>
                    {producto?.comentarios.map((e,i)=>(
                        
                        <li css={css`

                        border: 1px solid #e1e1e1;
                        padding: 2rem;

                        `} key={`${e.usuarioId}-${i}`}>

                            <h2 css={css`

                            font-size: 2rem;

                            `}>{e.mensaje}</h2>

                            <p>Escrito por:<span css={css`
                            
                            font-weight: bold;
                            
                            `}> {e.usuarioNombre}</span></p>

                            {esCreador(e.usuarioId) && <CreadorProducto>es creador</CreadorProducto>}
                        </li>

                    ))}
                    </ul>
                    )}
                    </div>
                    <aside css={css`
                        margin-top: 3.3rem;
                    `}>
                        <Boton target="_blank"  href={producto?.url} bgColor={true} >Visitar URl</Boton>    
                        
                        <p>Publicado por {producto?.creador && `: ${producto.creador.nombre}`} Compañia: {producto.empresa}</p>
                        <div css={css`
                            margin-top: 5rem;
                        `}>
                            <p css={css`text-align:center;`}>{producto.votos} Votos</p>
                            
                            { usuario && <Boton onClick={votarProducto}>
                                Votar
                            </Boton>}
                        </div>
                    </aside>
                </ContenedorProducto>
                {puedeBorrar() && (
                    <Boton onClick={eliminarProducto} >eliminar producto</Boton>
                )}
            </div>)}
        </Layout>
    </>
  )
}

export default Producto