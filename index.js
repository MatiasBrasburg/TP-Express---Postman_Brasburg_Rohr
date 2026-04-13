import express from "express"; 
import cors from "cors";    
import { sumar, restar, dividir, multiplicar } from "./src/modules/matematica.js";
import { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID } from "./omdb-wrapped.js";
import Alumno from "./alumno.js";

const app = express();
const port = 3000;            

app.use(cors());          
app.use(express.json()); 

app.get('/', (req, res) => {                
    res.status(200).send('Ya estoy respondiendo!');      //✅
});



app.get('/saludar/:nombre', (req, res) => {                
    res.status(200).send(`Hola ${req.params.nombre}`);
});

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {                
    const { ano, mes, dia } = req.params;
    const fecha = Date.parse(`${ano}-${mes}-${dia}`);
    
    if (isNaN(fecha)) {
        res.status(400).send();
    } else {
        res.status(200).send();
    }
});




//b1
app.get('/matematica/sumar', async (req, res) => {                
    let resultado = await sumar(req.query.n1, req.query.n2);
    res.status(200).send(`el resultado de la operacion es: ${resultado}`);
});


//b2
app.get('/matematica/restar', async (req, res) => {                
    let resultado = await restar(req.query.n1, req.query.n2);
    res.status(200).send(`el resultado de la operacion es: ${resultado}`);
});

//b3
app.get('/matematica/multiplicar', async (req, res) => {                
    let resultado = await multiplicar(req.query.n1, req.query.n2);
    res.status(200).send(`el resultado de la operacion es: ${resultado}`);
});


//b4
app.get('/matematica/dividir', async (req, res) => {                
    if (req.query.n2 == 0) {
        res.status(400).send(`el divisor no puede ser 0`);
    } else {
        let resultado = await dividir(req.query.n1, req.query.n2);
        res.status(200).send(`el resultado de la operacion es: ${resultado}`);
    }
});




//c1
app.get('/omdb/searchbypage', async (req, res) => {                
    let resultado = await OMDBSearchByPage(req.query.search, req.query.p);
    res.status(200).json(resultado);
});
//c2
app.get('/omdb/searchcomplete', async (req, res) => {                
    let resultado = await OMDBSearchComplete(req.query.search);
    res.status(200).json(resultado);
});



//c3
app.get('/omdb/getbyomdbid', async (req, res) => {
    const id = req.query.imdbID;
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
    const alumnoEncontrado = alumnosArray.find(a => a.dni === req.params.dni);
    if (alumnoEncontrado) {
        return res.status(200).json(alumnoEncontrado);
    } else {
        return res.status(404).send("Alumno no encontrado");
    }
});

// D3
app.post('/alumnos', (req, res) => {
    const { username, dni, edad } = req.body;
    const nuevoAlumno = new Alumno(username, dni, edad);
    alumnosArray.push(nuevoAlumno);
    return res.status(201).send("Alumno agregado correctamente");
});

//D4
app.delete('/alumnos', (req, res) => {
    const { dni } = req.body;
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

})

