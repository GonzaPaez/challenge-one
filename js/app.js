
// Tomo los valores del textarea y los almaceno en una nueva variable
function obtenerTexto() {
    let newText = document.getElementById("original-text").value;
    return newText;
}


function split(string) {
    let arrayString = []
    for (let i = 0; i < string.length; i++) {
        arrayString.push(string[i]);
    }
    console.log(arrayString);
    return arrayString;
}


function encryptText() {
    let letras = split(obtenerTexto());
    for (let i = 0; i < letras.length; i++) {
        if (letras[i] == 'a') {
            letras[i] = 'ai';
        } else if (letras[i] == 'e') {
            letras[i] = 'enter';
        } else if (letras[i] == 'i') {
            letras[i] = 'imes';
        } else if (letras[i] == 'o') {
            letras[i] = 'ober';
        } else if (letras [i] == 'u') {
            letras[i] = 'ufat';
        }
    }
    let textEncrypted = '';
    for (let i = 0; i < letras.length; i++) {
        textEncrypted += letras[i];
    }
    return textEncrypted;
}

function showEncryptedMessage(){
    obtenerTexto();
    let response = document.getElementById('proccessed-text');
    response.textContent = encryptText();
    console.log(encryptText());
}