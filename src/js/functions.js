'use strict';

/**
 * Realiza una solicitud HTTP para obtener una lista de productos desde una URL dada.
 * Devuelve un objeto que indica si la solicitud fue exitosa y los datos obtenidos o el mensaje de error.
 *
 * @async
 * @function fetchProducts
 * @param {string} url - La URL del recurso JSON que contiene los productos.
 * @returns {Promise<{success: boolean, body: Object[] | string}>} 
 * Un objeto con las propiedades:
 * - `success`: indica si la solicitud fue exitosa.
 * - `body`: contiene los datos de los productos o el mensaje de error.
 */

let fetchProducts =  (url) => {

    return fetch(url)
        .then(response => {

            // Verificar si la respuesta no es exitosa
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            return response.json();

        })
        .then(data => {

            // Respuesta exitosa
            return {
                success: true,
                body: data
            };

        })
        .catch(error => {

            // Error en la solicitud
            return {
                success: false,
                body: error.message
            };

        });
}


/**
 * Realiza una solicitud HTTP para obtener un documento XML con las categorías.
 * Convierte la respuesta en un objeto XML DOM y lo devuelve en un formato uniforme.
 *
 * @async
 * @function fetchCategories
 * @param {string} url - La URL del recurso XML que contiene las categorías.
 * @returns {Promise<{success: boolean, body: Document | string}>} 
 * Un objeto con las propiedades:
 * - `success`: indica si la solicitud fue exitosa.
 * - `body`: contiene el documento XML o el mensaje de error.
 */

let fetchCategories = async (url) => {

    try{
        const response = await fetch(url); 

        if (!response.ok){
            throw new Error (`ERROR HTTP: ${response.status}`); 
        }

        let text = await response.text(); 
        const parser = new DOMParser(); 
        const data = parser.parseFromString(text,"application/xml");
        
        return {
            success: true,
            body: data
        }
    } catch(error){

        return{
            success: false,
            body: error.message
        }

    }

}

export { fetchCategories, fetchProducts }