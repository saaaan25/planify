const busquedaBinaria = ({arreglo, palabra}) => {
    let izquierda = 0;
    let derecha = arreglo.length - 1;

    while (izquierda <= derecha) {
        const medio = Math.floor((izquierda + derecha) / 2);
        const comparacion = arreglo[medio].localeCompare(palabra);

        if (comparacion === 0) {
            return arreglo[medio].id; 
        } else if (comparacion < 0) {
            izquierda = medio + 1; 
        } else {
            derecha = medio - 1; 
        }
    }

    return null; 
}

export default busquedaBinaria;