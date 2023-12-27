import Layout from "../components/Layouts/Layout";
import React, {useContext, useState} from "react";
import { Formulario, Campo,InputSubmit,Error } from "../components/User-Interface/Formulario";
import { css } from "@emotion/react";
import useValidacion from "../hooks/useValidacion";
import validarCrearProducto from "../validacion/validarCrearProducto";
import { FirebaseContext } from "../firebase";
import { useRouter } from "next/navigation";
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import Error404 from "../components/Layouts/404";



const STADE_INICIAL = {
    nombre:"",
    empresa:"",
    imagen:"",
    descripcion:"",
    url:""
}
export default function NuevoProducto(){
  const router = useRouter()
  const {valores, error, submitForm, handleSubmit, handleChange,handleBlur } = useValidacion(STADE_INICIAL,validarCrearProducto,crearProducto)
  const {nombre, empresa, imagen, descripcion, url} = valores

  const [errorFormulario, setErrorFormulario] = useState("")

  const {usuario, firebase} = useContext(FirebaseContext)

  // stade para subir las imagenes

  const [uploading, setUploading] = useState(false);
  const [URLImage, setURLImage] = useState('');

  const handleImagenUpload = e =>{
    // se obtiene la referencia de donde se obtinen la imagen

    const file = e.target.files[0]
    const imagenRef = ref(firebase.storage, "productos/" +file.name);

    // se inicia la subida 
    setUploading(true)
    const uploadTask = uploadBytesResumable(imagenRef, file);

    // registar los eventos para cuenado se detecte un cambio en el estado de la subida

    uploadTask.on("stage_cambio",
    // Muestra procreso de la subida
    snapshot =>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(` Subiendo Imagen: ${progress}% terminado`);
    },
    // en caso de error

    error=>{
      setUploading(false);
      console.log(error);
    },
  
    // subida finalizada correctamente
    ()=>{
      setUploading(false);
      getDownloadURL(uploadTask.snapshot.ref).then(url=>{
        console.log("Imagen Disponible en", url);
        setURLImage(url)
      });
    }
  )
}

  async function crearProducto (){
    if (!usuario) {
      return router.push("/login")
  
    }
    const producto = {
      nombre,
      empresa,
      url,
      URLImage,
      descripcion,
      votos:0,
      comentarios: [],
      creado: Date.now(),
      creador:{
        id:usuario.uid,
        nombre:usuario.displayName
      },
      haVotado:[]
    }

    // insertando en la base de datos
    
    try {
      await firebase.db.collection("Productos").add(producto)
      console.log("se agrego correctamente el productos");
      router.push("/")
    } catch (error) {
      setErrorFormulario(error.message)
      console.log(error);
    }

    
  }
  
  if (!usuario) {
    return (
      <Layout>
        <Error404>pagina no existe</Error404>
      </Layout>
    )
  } 
  

  
return (
  <div>
    <Layout>
    <>
    <h1 css={css`
      text-align: center;
      margin-top: 5rem;
      letter-spacing: 2px;
    `}>Crear Nuevo Producto</h1>
      <Formulario noValidate onSubmit={handleSubmit}>
        <fieldset>
          <legend>Descripcion General</legend>
              <Campo>
                  <label htmlFor="nombre">Nombre</label>
                  <input value={nombre} onChange={handleChange} onBlur={handleBlur} type="text" id="nombre" placeholder="Nombre del Productos" name="nombre" />
              </Campo>
              {error.nombre && <Error>{error.nombre}</Error>}
              <Campo>
                  <label htmlFor="empresa">Empresa</label>
                  <input value={empresa} onChange={handleChange} onBlur={handleBlur} type="text" id="empresa" placeholder="Empresa o Compañia del Producto" name="empresa" />
              </Campo>
              {error.empresa && <Error>{error.empresa}</Error>}
              <Campo>
                  <label htmlFor="imagen">Imagen</label>
                  <input onChange={handleImagenUpload} onBlur={handleBlur} type="file" id="imagen"  name='imagen' accept="image/*" />
              </Campo>
              {error.imagen && <Error>{error.imagen}</Error>}
              <Campo>
                  <label htmlFor="url">Url</label>
                  <input value={url} onChange={handleChange} onBlur={handleBlur} type="url" id="url" placeholder="Url de tu producto" name="url" />
              </Campo>
              {error.url && <Error>{error.url}</Error>}
        </fieldset>
        <fieldset>
          <legend>Sobre tu Producto</legend>
          <Campo>
              <label htmlFor="descripcion">Descripcion</label>
              <textarea value={descripcion} onChange={handleChange} onBlur={handleBlur} id="descripcion" placeholder="descripcion del Producto" name="descripcion" />
          </Campo>
          {error.descripcion && <Error>{error.descripcion}</Error>}

          {errorFormulario && <Error>{errorFormulario}</Error>}

        </fieldset>

          <InputSubmit type="submit" value="crear Producto" />
      </Formulario>
    </>
    </Layout>
  </div>
)
}
