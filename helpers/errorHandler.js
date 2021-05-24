"use strict";

/**
 * Get nique error field name
*/

const uniqueMessage = error => {
    let output;
    try {
        let fieldName = error.message.substring(
            error.message.lastIndexOf(".$") + 2,
            error.message.lastIndexOf("_1")
        );
        output =
            `El campo ${fieldName.split(" ").pop()} ya existe`;
    } catch (error) {
        output = "Campo único ya existe";
    }
    return output;
}

/**
 * Get the error message from error object
*/
 
exports.errorHandler = (error, customMsg = false) => {
    console.log(error)
    if(error == null){
        return "Error no identificado";
    }
    let message = "";
    if(error.code){
        switch(error.code) {
            case 11000:
            case 11001:
                message = customMsg ? customMsg : uniqueMessage(error);
                break;
            default:
                message = "No se pudo procesar la respuesta";
        }
        return message;
    }
    else {
        console.log(error);
        return Object.values(error.errors)[0].properties.message
    }
}