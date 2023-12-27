import Layout from "../components/Layouts/Layout";
import React, {useState} from "react";
import Router from "next/router";
import { Formulario, Campo,InputSubmit,Error } from "../components/User-Interface/Formulario";
import { css } from "@emotion/react";
import useValidacion from "../hooks/useValidacion";
import validarIniciarSesion from "../validacion/validarIIniciarSesion";
import firebase from "../firebase";

const STADE_INICIAL = {
    email:"",
    password:""
}


export default function crearCuenta() {
  const {valores, error, submitForm, handleSubmit, handleChange,handleBlur } = useValidacion(STADE_INICIAL,validarIniciarSesion,iniciarSesion)
  const {email, password} = valores

  const [errorFormulario, setErrorFormulario] = useState("")

  async function iniciarSesion (){
    try {
      const usuario = await firebase.login(email,password)
      Router.push("/")
      console.log( usuario);
    } catch (error) {
      console.log("Hubo un error al autenticar el usuario ",error.message);
      setErrorFormulario(error.message)
    }
  }
return (
  <div>
    <Layout>
    <>
    <h1 css={css`
      text-align: center;
      margin-top: 5rem;
      letter-spacing: 2px;
    `}>Iniciar Sesion</h1>
      <Formulario noValidate onSubmit={handleSubmit}>
          <Campo>
              <label htmlFor="email">Email</label>
              <input value={email} onChange={handleChange} onBlur={handleBlur} type="email" id="email" placeholder="Tu Email" name="email" />
          </Campo>
          {error.email && <Error>{error.email}</Error>}

          <Campo>
              <label htmlFor="password">Contraseña</label>
              <input value={password} onChange={handleChange} onBlur={handleBlur} type="password" id="password" placeholder="Tu Contraseña" name="password" />
          </Campo>
          {error.password && <Error>{error.password}</Error>}
          {errorFormulario && <Error>{errorFormulario}</Error>}

          <InputSubmit type="submit" value="Iniciar Sesion" />
      </Formulario>
    </>
    </Layout>
  </div>
)
}
