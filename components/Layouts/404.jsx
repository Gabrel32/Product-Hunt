import React from 'react'
import { css } from '@emotion/react'

function Error404({children}) {
  return (
    <h1
        css={css`
        margin-top: 5rem;
        text-align: center;
        `}
    >{children}</h1>
  )
}

export default Error404