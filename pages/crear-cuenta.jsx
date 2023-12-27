import Layout from "../components/Layouts/Layout";
import React, {useState} from "react";
import Router from "next/router";
import { Formulario, Campo,InputSubmit,Error } from "../components/User-Interface/Formulario";
import { css } from "@emotion/react";
import useValidacion from "../hooks/useValidacion";
import validarCrearCuenta from "../validacion/validarCrearCuenta";

import firebase from "../firebase";



const STADE_INICIAL = {
    nombre:"",
    email:"",
    password:""
}
export default function CrearCuenta() {
    const {valores, error, submitForm, handleSubmit, handleChange,handleBlur } = useValidacion(STADE_INICIAL,validarCrearCuenta,crearCuenta)
    const {nombre, email, password} = valores

    const [errorFormulario, setErrorFormulario] = useState("")

    async function crearCuenta (){
      try {
        await firebase.registrar(nombre,email,password)
        Router.push('/')
        } catch (error) {
          console.error("Hubo un Error al Crear el usuario",error.message)
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
      `}>Crear Cuenta</h1>
        <Formulario noValidate onSubmit={handleSubmit}>
            <Campo>
                <label htmlFor="nombre">Nombre</label>
                <input value={nombre} onChange={handleChange} onBlur={handleBlur} type="text" id="nombre" placeholder="Tu Nombre" name="nombre" />
            </Campo>
            {error.nombre && <Error>{error.nombre}</Error>}
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

            <InputSubmit type="submit" value="crear cuenta" />
        </Formulario>
      </>
      </Layout>
    </div>
  )
}
