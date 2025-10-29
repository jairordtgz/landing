import { fetchProducts, fetchCategories } from "./functions.js";
"use strict"; 

/**
 * Muestra un toast (notificación) en pantalla si el elemento correspondiente existe en el DOM.
 *
 * @function showToast
 * @returns {void}
 */

const showToast = () => {
    const toast = document.getElementById("toast-interactive");
    if (toast) {
        toast.classList.add("md:block");
    }
};

/**
 * Asocia un evento de clic al elemento con id "demo" para abrir un video de YouTube.
 *
 * @function showVideo
 * @returns {void}
 */

const showVideo = () => {
    const demo = document.getElementById("demo");
    if (demo) {
        demo.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        });
    }
};

/**
 * Obtiene los productos desde una API y los renderiza en el contenedor con id "products-container".
 *
 * @async
 * @function renderProducts
 * @returns {Promise<void>}
 */

let renderProducts = () =>{
    fetchProducts('https://data-dawm.github.io/datum/reseller/products.json').then(result => {
        if (result.success){
            let container = document.getElementById("products-container")
            container.innerHTML = ""; 

            let products = result.body.slice(0,6); 

            products.forEach(product => { //para recorrer objetos

                let productHTML = `
                <div class="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
                    <img
                        class="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg object-cover transition-transform duration-300 hover:scale-[1.03]"
                        src="[PRODUCT.IMGURL]" alt="[PRODUCT.TITLE]">
                    <h3
                        class="h-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:text-black-600 dark:hover:text-white-400">
                        $[PRODUCT.PRICE]
                    </h3>

                    <div class="h-5 rounded w-full">[PRODUCT.TITLE]</div>
                        <div class="space-y-2">
                            <a href="[PRODUCT.PRODUCTURL]" target="_blank" rel="noopener noreferrer"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full inline-block">
                                Ver en Amazon
                            </a>
                            <div class="hidden"><span class="1">[PRODUCT.CATEGORY_ID]</span></div>
                        </div>
                    </div>
                </div>`;

                productHTML = productHTML.replaceAll("[PRODUCT.TITLE]",product.title.length > 20? product.title.substring(0,20) + "..." : product.title);
                productHTML = productHTML.replaceAll("[PRODUCT.PRICE]",product.price); 
                productHTML = productHTML.replaceAll("[PRODUCT.IMGURL]",product.imgUrl); 
                productHTML = productHTML.replaceAll("[PRODUCT.CATEGORY_ID]",product.category_id); 

                container.innerHTML += productHTML; 
                
            });

        }
    })

}

/**
 * Obtiene la lista de categorías desde un archivo XML y las renderiza en un elemento <select> con id "categories".
 *
 * @async
 * @function renderCategories
 * @returns {Promise<void>}
 */

let renderCategories = async () => {

    try {

        const result = await fetchCategories('https://data-dawm.github.io/datum/reseller/categories.xml'); 

        if (result.success){
            let container = document.getElementById("categories"); 
            container.innerHTML = `<option selected disabled>Seleccione una categoría</option>`;
            let categoriesXML = result.body; 
            let categories = categoriesXML.getElementsByTagName("category"); 

            for(let category of categories){
                let categoryHTML = `<option value="[ID]">[NAME]</option>`;
                let id = category.getElementsByTagName("id")[0].textContent; 
                let name = category.getElementsByTagName("name")[0].textContent;

                categoryHTML = categoryHTML.replace("[ID]",id);
                categoryHTML = categoryHTML.replace("[NAME]",name); 

                container.innerHTML += categoryHTML; 

            }
        }
        
    } catch(error){
        alert(`No se pudo cargar las categorias ${error.message}`); 

    }
}

(() => {
    showToast();
    showVideo(); 
    renderProducts(); 
    renderCategories();
})();