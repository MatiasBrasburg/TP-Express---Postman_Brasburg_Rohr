/* Módulo OMDBWrapper*/
import axios from "axios";
const APIKEY = "4ca2c568"; // Poné tu APIKEY, esta no funciona.
const OMDBSearchByPage = async (searchText, page = 1) => {
let returnObject = {
respuesta : false,
cantidadTotal : 0,
datos : []
};

let url  = 'http://www.omdbapi.com/?' + 'apikey=' + APIKEY + '&' + 'page=1'  + '&' + 's=back+to+the+future'

let response = await axios.get(url)

if(response.data.Response === "True"){
    returnObject.respuesta = true;
    returnObject.cantidadTotal = response.data.totalResults;
    returnObject.datos = response.data.Search;
}

// No seas vago, acá hay que hacer el cuerpo de la función!!!
return returnObject;
};
const OMDBSearchComplete = async (searchText) => {
let returnObject = {
respuesta : false,
cantidadTotal : 0,
datos : []
};
let pagina= 1
for (let i = 0; i <= 8; i++)
{
let url  = 'http://www.omdbapi.com/?' + 'apikey=' + APIKEY + '&s=' + searchText  + '&page=' + pagina
let response = await axios.get(url)

if(response.data.Response === "True"){
    returnObject.respuesta = true;
    returnObject.cantidadTotal = response.data.totalResults;
 returnObject.datos = returnObject.datos.concat(response.data.Search);
}


pagina++
}


return returnObject;

};






const OMDBGetByImdbID = async (imdbID) => {
let returnObject = {
respuesta : false,
cantidadTotal : 0,
datos : {}
};

let url  = 'http://www.omdbapi.com/?' + 'apikey=' + APIKEY + '&' + 'page=1'  + '&' + 'i=' + imdbID

let response = await axios.get(url)

if(response.data.Response === "True"){
    returnObject.respuesta = true;
    returnObject.datos = response.data;
}


return returnObject;
};



// Exporto todo lo que yo quiero exponer del módulo:
export {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID};
