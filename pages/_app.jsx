import firebase from "../firebase/firebase"
import { FirebaseContext } from "../firebase/context"
import useAutenticacion from "../hooks/useAutenticacion"


function MyApp(props) {
  const usuario = useAutenticacion()
  const {Component, pageProps} = props
  return (
    <FirebaseContext.Provider
      value={({
        firebase,
        usuario
      })}
    >
      <Component {...pageProps}/>
    </FirebaseContext.Provider>
  )
}

export default MyApp
