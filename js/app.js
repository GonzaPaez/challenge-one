
/**
 * Obtiene el texto del elemento textarea de la interfaz de usuario.
 * 
 * Esta función busca el elemento por su ID y retorna su valor.
 * @returns {string} - El texto obtenido del elemento de entrada.
 */ 
function obtenerTexto() {
    const newText = document.getElementById("original-text").value;
    return newText;
}

/**
 * Encripta el texto recibido como parámetro según un patrón predefinido.
 * 
 * Esta función toma un texto como entrada y reemplaza solo las vocales que esten en minúsculas según el siguiente parámetro.
 * - 'a' se reemplaza por 'ai'
 * - 'e' se reemplaza por 'enter'
 * - 'i' se reemplaza por 'imes'
 * - 'o' se reemplaza por 'ober'
 * - 'u' se reemplaza por 'ufat'
 * 
 * Los caracteres consonantes permanecen sin cambios.
 * 
 * 
 * @param {string} text - El texto que se va a encriptar. 
 * @returns {string} El texto encriptado.
 */
function encryptText(text) {
    // Inicializa una cadena vacía para almacenar el texto encriptado.
    let textEncrypted = '';

    // Itera sobre cada carácter del texto de entrada.
    for (let i = 0; i < text.length; i++) {
        // Reemplaza ciertas vocales según el patrón.
        if (text[i] == 'a') {
            textEncrypted += 'ai';
        } else if (text[i] == 'e') {
            textEncrypted += 'enter';
        } else if (text[i] == 'i') {
            textEncrypted += 'imes';
        } else if (text[i] == 'o') {
            textEncrypted += 'ober';
        } else if (text[i] == 'u') {
            textEncrypted += 'ufat';
        } else {
            // Agrega caracteres sin cambios a la cadena.
            textEncrypted += text[i]
        }
    }
    // Retorna el texto encriptado.
    return textEncrypted;
}

/**
 * Descifra un texto reemplazando ciertos patrones.
 * 
 * @param {string} text - El texto que se va a descifrar.
 * @returns {string} -Retorna el texto descifrado con las sustituciones realizadas.
 */
function decryptText(text) {
    // Realiza reemplazos específicos para descifrar el texto
    let textDecrypted = text
    .replace(/ai/g, "a")
    .replace(/ufat/g, "u")
    .replace(/enter/g, "e")
    .replace(/imes/g, "i")
    .replace(/ober/g, "o");

    // Retorna el texto descifrado
    return textDecrypted;
}

/**
 * Limpia y restablece propiedades de un contenedor de respuesta en la interfaz de usuario.
 * 
 * La función realiza las siguientes acciones:
 * - Oculta una imagen dentro del contenedor.
 * - Oculta un texto provisional.
 * - Muetra un botón oculto.
 * - Restablece propiedades de altura, justificación y alineación del contenedor.
 * 
 * @returns {void} - No retorna ningún valor.
 */
function cleanResponseConteiner() {
    // Oculta la imagen dentro del contenedor.
    const image = document.querySelectorAll(".limit-text-conteiner img")[0];
    image.style.display = "none";

    //Oculta el texto provisional.
    const textOcult = document.getElementsByClassName("provisional-text")[0];
    textOcult.style.display = "none";

    // Muestra un botón oculto.
    const hiddenButton = document.getElementsByClassName("copy-button")[0];
    hiddenButton.style.display= "block";

    // Restablece propiedades de altura, justificación y alineación del contenedor.
    const newBoxProperties = document.getElementsByClassName("limit-text-conteiner")[0];
    newBoxProperties.style.height= "80%";
    newBoxProperties.style.justifyContent= "normal";
    newBoxProperties.style.alignItems= "normal";

    // Obtiene el elemento donde se mostrará el texto cifrado.
    let encryptedParagraph = document.getElementsByClassName('processed-text')[0];

    // Restablece las propiedades de peso de la fuente0 y la alineación del texto. 
    encryptedParagraph.style.fontWeight= "normal";
    encryptedParagraph.style.textAlign= "initial";
}

/**
 * Muestra un mensaje cifrado en la interfaz de usuario.
 * 
 * Esta función obtiene el texto original, lo cifra y muestra el resultado en la interfaz.
 * Si no hay texto original, no realiza ninguna acción.
 * Limpia cualquier contenido anterior en el contenedor de respuestas.
 * 
 * @returns {void} - No retorna ningún valor.
 */
function showEncryptedMessage(){
    // Obtiene el texto original.
    const originalText = obtenerTexto();

    // Veridica si hay texto original.
    if (originalText != "") {
        // Limpia el contenedor de respuestas.
        cleanResponseConteiner();

        // Obtiene el elemento donde se mostrará el texto cifrado.
        let newCipherText = document.getElementsByClassName('processed-text')[0];

        // Muestra el texto cifrado en la interfaz.
        newCipherText.textContent = encryptText(originalText);
    }
}

function showDecryptedMessage(){
    const encryptText = obtenerTexto();
    if (encryptText != "") {
        cleanResponseConteiner();
        const response = document.getElementsByClassName("processed-text")[0];
        response.textContent = decryptText(encryptText);
    }
}

/**
 * Escribe un texto en el portapapeles del usuario de forma asíncrona.
 * 
 * @param {string} text - El texto que se va a escribir en el portapapeles.
 * @throws {Error} - Se lanza un error en caso de fallo al escribir en el portapapeles.
 */
async function writeClipboardText(text) {
    try {
        // Intenta escribir el texto en el portapapeles de forma asíncrona.
        await navigator.clipboard.writeText(text);
    } catch (error) {
        // Captura y maneja cualquier error que pueda ocurrir durante la escritura.
        console.error(error.message);
        throw error; // Re-lanza el error para su manejo externo si es necesario.
    }
}

/**
 * Copia el texto procesado en el portapapeles.
 * 
 * Esta función obtiene el texto procesado de la interfaz y lo copia en el portapapeles
 * utilizando la función asíncrona `writeClipboardText`.
 * 
 * @returns {void} - No retorna ningún valor.
 */
function copyProcessedText(){
    // Obtiene el texto procesado desde la interfaz.
    const processedText = document.getElementsByClassName("processed-text")[0].textContent;

    // Utiliza la función asíncrona para escribir el texto en el portapapeles.
    writeClipboardText(processedText);
}

/**
 * Copia el texto obtenido desde una fuente (por ejemplo, un campo de entrada) al portapapeles.
 *
 * @returns {void} - No retorna ningún valor.
 */
function copyInputText(){
    const inputText = obtenerTexto();
    writeClipboardText(inputText);
}

/**
 * Limpia el contenido del campo de entrada (input) identificado por su ID.
 *
 * @returns {void} - No retorna ningún valor.
 */
function cleanInput() {
    // Obtiene el elemento de entrada por su ID (en este caso, "original-text")
    const inputText = document.getElementById("original-text");

    // Limpia el contenido del campo de entrada asignándole una cadena vacía.
    inputText.value = "";
}

/**
 * pasteText - Función que pega el contenido actual del portapapeles en un campo de entrada (input) identificado por su ID.
 *
 * Utiliza la API del portapapeles para leer el texto del portapapeles y asignarlo al valor del campo de entrada.
 *
 * @returns {void} - No retorna ningún valor.
 */
function pasteText() {
    // Obtén el elemento de entrada por su ID ("original-text")
    const inputElement = document.getElementById("original-text");

    // Intenta pegar desde el portapapeles.
    navigator.clipboard.readText()
        .then((clipboardText) => {
            // Asigna el contenido del portapapeles al valor del campo de entrada.
            inputElement.value = clipboardText;
        })
        .catch((error) => {
            // Maneja el error en caso de fallo al pegar desde el portapapeles.
            console.error("Errora al pegar desde el portapapeles:", error);
        });
}