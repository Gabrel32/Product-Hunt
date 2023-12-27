import React, { useState } from 'react' 
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useRouter } from 'next/router';

const InputText = styled.input`
  border: 1px solid var(--gris3);
  padding: 1rem;
  min-width: 300px;
  overflow: hidden;
`;

const InputSubmit = styled.input`
  height: 4rem;
  width: 4rem;
  display: block;
  background-size: 40px;
  background-image: url("/static/img/buscar.png");
  background-repeat: no-repeat;
  position: absolute;
  right: 1rem;
  top: 0px;
  background-color: transparent;
  border: none;
  text-indent: -9999px;

  &:hover{
    cursor: pointer;
  }
`

function Buscar() {
  const router = useRouter()
  const [busqueda , setBusqueda] = useState("")

  async function handleBuscar(e){
    e.preventDefault()

    if (busqueda.trim() === "") {
      return
    }

    // redireccionar la busqueda

    router.push({
      pathname:"/buscar",
      query:{q:busqueda}
    })
  }

  return (
    <form
      onSubmit={handleBuscar}
     css={css`
      position: relative;
     `}
    >
        <InputText onChange={e=>setBusqueda(e.target.value)} value={busqueda} type="text" placeholder='Buscar Productos' />
        <InputSubmit type='submit' />
    </form>
  )
}

export default Buscar