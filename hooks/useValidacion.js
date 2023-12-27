import React, { useEffect } from 'react'
import { useState } from 'react'

function useValidacion(inicialStade,validar,funcionSubmit) {

    const [valores,setValores] = useState(inicialStade)
    const [error,setError] = useState({})
    const [submitForm, setSubmitForm] = useState(false)


    useEffect(()=>{
        if (submitForm) {
            const noErrores = Object.keys(error).length === 0;

            if (noErrores) {
                funcionSubmit() // funcionSubmit = funcion que se pasa como prop para ejecutar 
            }
            setSubmitForm(false)     
        }
    },[error])


    // Funcion que se ejecuta conforme el usuario escribe algo
    const handleChange = e =>{
        setValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    }

    // Funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e =>{
        e.preventDefault()
        const errorValidacion = validar(valores)
        setError(errorValidacion)
        setSubmitForm(true)
    }

    // cuendo se realiza el evento de blur

    const handleBlur = () =>{
        const errorValidacion = validar(valores)
        setError(errorValidacion)
    }
  return {
    valores,
    error,
    submitForm,
    handleSubmit,
    handleChange,
    handleBlur
  }
}

export default useValidacion