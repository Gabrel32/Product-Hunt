import React from 'react'
import Header from './Header'
import { Global, css } from '@emotion/react'
import Head from 'next/head'
import normalize from "normalize.css"



function Layout(props) {
  return (
    <>
    <Head>
        <title>Product Hunt Firebase y Next.js</title>
        <link rel="stylesheet" href={normalize} />
        <link href="https://fonts.googleapis.com/css2?family=Dosis&family=Lato:wght@400;700;900&family=PT+Sans&family=Roboto:ital,wght@1,900&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Dosis&family=Lato:wght@400;700;900&family=PT+Sans&family=Roboto+Slab:wght@100;400;700&family=Roboto:ital,wght@1,900&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="/static/styles/app.css" />
        
      </Head>
    <Global
      styles={css`
        :root{
          --gris: #3d3d3d;
          --gris2: #6f6f6f;
          --gris3: #e1e1e1;
          --naranja: #DA552f
        }
        html{
          font-size: 62.5%;
          box-sizing: border-box;
          
        }
        *, *:before,*:after{
          box-sizing: inherit;
        }
        body{
          font-size: 1.6rem;
          line-height: 1.5;
          font-family:PT Sans,sans-serif ;
        }
        h1,h2,h3{
          margin: 0 0 2rem 0;
          line-height: 1.5;
        }
        h1,h2{
          font-family: Roboto Slab, serif;
          font-weight: 700;
        }
        h3{
          font-family:PT Sans,sans-serif ;
        }
        ul{
          list-style: none;
          margin: 0;
          padding: 0;
        }
        a{
          text-decoration: none;
        }
        img{
          max-width: 100%;
        }
      `}
    />
    <Header/>
    <main>
        {props.children}
    </main>
    
    </>
  )
}

export default Layout