import express from "express"; 
import cors from "cors";    
import { sumar, restar, dividir, multiplicar } from "./src/modules/matematica.js";
import { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID } from "./omdb-wrapped.js";
import Alumno from "./alumno.js";
import ValidacionesHelper from "./ValidacionesHelper.js"; // Asumo que lo guardaste en la misma carpeta base

const app = express();
const port = 3000;            

app.use(cors());          
app.use(express.json()); 

app.get('/', (req, res) => {                
    res.status(200).send('Ya estoy respondiendo!');
});

app.get('/saludar/:nombre', (req, res) => {                
    // 🛡️ HELPER: Si no pasan un nombre válido, saludará a 'Anónimo'
    const nombre = ValidacionesHelper.getStringOrDefault(req.params.nombre, 'Anónimo');
    res.status(200).send(`Hola ${nombre}`);
});

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {                
    // 🛡️ HELPER: Convertimos cada parte a número. Si mandan basura, será 0.
    const ano = ValidacionesHelper.getIntegerOrDefault(req.params.ano, 0);
    const mes = ValidacionesHelper.getIntegerOrDefault(req.params.mes, 0);
    const dia = ValidacionesHelper.getIntegerOrDefault(req.params.dia, 0);
    
    // Si alguno quedó en 0, rechazamos la petición directamente
    if (ano === 0 || mes === 0 || dia === 0) {
        return res.status(400).send("Parámetros de fecha inválidos (Deben ser números)");
    }

    const fecha = Date.parse(`${ano}-${mes}-${dia}`);              
    
    if (isNaN(fecha)) {
        res.status(400).send();
    } else {
        res.status(200).send();
    }
});

//b1
app.get('/matematica/sumar', async (req, res) => {                
    // 🛡️ HELPER: Obligamos a que sean números. Default = null
    const n1 = ValidacionesHelper.getIntegerOrDefault(req.query.n1, null);
    const n2 = ValidacionesHelper.getIntegerOrDefault(req.query.n2, null);

    if (n1 === null || n2 === null) return res.status(400).send('n1 y n2 deben ser números enteros');

    let resultado = await sumar(n1, n2);
    res.status(200).send(`el resultado de la operacion es: ${resultado}`);
}); 

//b2
app.get('/matematica/restar', async (req, res) => {                
    const n1 = ValidacionesHelper.getIntegerOrDefault(req.query.n1, null);
    const n2 = ValidacionesHelper.getIntegerOrDefault(req.query.n2, null);

    if (n1 === null || n2 === null) return res.status(400).send('n1 y n2 deben ser números enteros');

    let resultado = await restar(n1, n2);
    res.status(200).send(`el resultado de la operacion es: ${resultado}`);
});

//b3
app.get('/matematica/multiplicar', async (req, res) => {                
    const n1 = ValidacionesHelper.getIntegerOrDefault(req.query.n1, null);
    const n2 = ValidacionesHelper.getIntegerOrDefault(req.query.n2, null);

    if (n1 === null || n2 === null) return res.status(400).send('n1 y n2 deben ser números enteros');

    let resultado = await multiplicar(n1, n2);
    res.status(200).send(`el resultado de la operacion es: ${resultado}`);
});

//b4
app.get('/matematica/dividir', async (req, res) => {                
    const n1 = ValidacionesHelper.getIntegerOrDefault(req.query.n1, null);
    const n2 = ValidacionesHelper.getIntegerOrDefault(req.query.n2, null);

    if (n1 === null || n2 === null) return res.status(400).send('n1 y n2 deben ser números enteros');
    
    if (n2 === 0) {
        return res.status(400).send(`el divisor no puede ser 0`);
    } 

    let resultado = await dividir(n1, n2);
    res.status(200).send(`el resultado de la operacion es: ${resultado}`);
});

//c1
app.get('/omdb/searchbypage', async (req, res) => {                
    // 🛡️ HELPER: Limpiamos la búsqueda y la página
    const search = ValidacionesHelper.getStringOrDefault(req.query.search, '');
    const p = ValidacionesHelper.getIntegerOrDefault(req.query.p, 1);

    if (search === '') return res.status(400).send('El parámetro search es obligatorio');

    let resultado = await OMDBSearchByPage(search, p);     
    res.status(200).json(resultado);
});

//c2
app.get('/omdb/searchcomplete', async (req, res) => {                
    const search = ValidacionesHelper.getStringOrDefault(req.query.search, '');
    if (search === '') return res.status(400).send('El parámetro search es obligatorio');

    let resultado = await OMDBSearchComplete(search); 
    res.status(200).json(resultado);
});

//c3
app.get('/omdb/getbyomdbid', async (req, res) => {
    const id = ValidacionesHelper.getStringOrDefault(req.query.imdbID, '');
    if (id === '') return res.status(400).send('El parámetro imdbID es obligatorio');

    const pelicula = await OMDBGetByImdbID(id);  
    return res.status(200).json(pelicula);
});


const alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido", "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao", "32623391", 18));

//D1
app.get('/alumnos', (req, res) => {
    return res.status(200).json(alumnosArray);  
});

//D2
app.get('/alumnos/:dni', (req, res) => {
    // 🛡️ HELPER: Limpiamos el DNI
    const dniBuscado = ValidacionesHelper.getStringOrDefault(req.params.dni, '');
    const alumnoEncontrado = alumnosArray.find(a => a.dni === dniBuscado); 

    if (alumnoEncontrado) {
        return res.status(200).json(alumnoEncontrado);
    } else {
        return res.status(404).send("Alumno no encontrado");
    }
});

// D3
app.post('/alumnos', (req, res) => {
    // 🛡️ HELPER: Validamos el Body del POST
    const nombre = ValidacionesHelper.getStringOrDefault(req.body.nombre, '');
    const dni = ValidacionesHelper.getStringOrDefault(req.body.dni, '');
    const edad = ValidacionesHelper.getIntegerOrDefault(req.body.edad, 0);

    if (nombre === '' || dni === '' || edad <= 0) {
        return res.status(400).send('nombre, dni y edad son obligatorios y deben ser válidos');
    }

    const nuevoAlumno = new Alumno(nombre, dni, edad);
    alumnosArray.push(nuevoAlumno);
    return res.status(201).send("Alumno agregado correctamente");   
});

//D4
app.delete('/alumnos', (req, res) => {
    // 🛡️ HELPER: Validamos el Body del DELETE
    const dni = ValidacionesHelper.getStringOrDefault(req.body.dni, '');
    if (dni === '') return res.status(400).send("Debe enviar un DNI válido");

    const index = alumnosArray.findIndex(a => a.dni === dni);

    if (index !== -1) {
        alumnosArray.splice(index, 1); 
        return res.status(200).send("Alumno eliminado");
    } else {
        return res.status(404).send("No se encontró el alumno para eliminar");
    }
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
});