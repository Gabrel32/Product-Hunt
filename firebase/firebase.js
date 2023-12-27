import app from 'firebase/compat/app';
import 'firebase/compat/auth'
import firebaseConfig from './config';
import 'firebase/compat/firestore' 
import { getStorage } from '@firebase/storage';


class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth();
        this.db = app.firestore()
        this.storage = getStorage(this.app)
    }
 
    // Registra un usuario
    async registrar(nombre, email, password) {
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);
 
        return await nuevoUsuario.user.updateProfile({
            displayName : nombre
        })
    }
    // inicia sesion del usuario
    async login(email,password){
        return this.auth.signInWithEmailAndPassword(email,password)
    }
    // cierra la sesion del usuario
    async cerrarSesion (){
        return this.auth.signOut()
    }

}
 
const firebase = new Firebase();
export default firebase;
 