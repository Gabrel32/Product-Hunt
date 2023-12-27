import React, { useContext } from 'react'
import Buscar from '../User-Interface/Buscar'
import Navegacion from './Navegacion'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Boton from '../User-Interface/Boton'
import { FirebaseContext } from '../../firebase'
import firebase from '../../firebase'

  const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:786px){
      display: flex;
      justify-content: space-between;
    }
  `
  const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: "Roboto Slab",serif;
    margin-right: 1rem;
  `


function Header() {

  const {usuario} = useContext(FirebaseContext)
  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gris3);
        padding: 1rem 0;

      `}
    >
        <ContenedorHeader>
            <div
              css={css`
                display: flex;
                align-items: center;
              `}
            >
                <Link href={'/'}>
                  <Logo>P</Logo>
                </Link>

                <Buscar/>

                <Navegacion/>

            </div>
            <div
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              {usuario ? (
                <>
                <p
                css={css`
                  margin-right: 2rem;
                `}
              >Hola: {usuario?.displayName}</p>
              <Boton onClick={()=>firebase.cerrarSesion()} bgColor={true} type="submit">Cerrar sesion</Boton>
                </>
              ) :(
                <div css={css`
                  display: flex;
                  gap: 2rem;
                @media (min-width: 768px){
                  justify-content: space-between;
                  align-items: center;
                  }
                `}>        
                  <Boton href={"/crear-cuenta"}>
                    Registrarse
                  </Boton>
                  <Boton href={"/login"} bgColor={true}>
                    Iniciar Sesion
                  </Boton>
                </div>
              )}
            </div>
        </ContenedorHeader>
    </header>
  )
}

export default Header