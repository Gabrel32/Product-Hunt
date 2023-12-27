export default function validarCrearProducto(valores){
    let errores = {}

    if (!valores.nombre) {
        errores.nombre = "El nombre es obligatorio"
    }
    if (!valores.empresa) {
        errores.empresa = "Nombre de Empresa es Obligatoria"
    }
    if (!valores.url) {
        errores.url = "La Url del Producto es Obligatoria"
    }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = "Url mal formateada o no valida"
    }
    if (!valores.descripcion) {
        errores.descripcion = "La Descripcion es Obligatoria"
    }

    return errores

}