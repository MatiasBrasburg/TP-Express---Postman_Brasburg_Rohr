import express from "express"; 
import cors from "cors";    
import { sumar, restar, dividir, multiplicar } from "./src/modules/matematica.js";
import { OMDBSearchByPage, searchcomplete, getbyomdbid } from "./omdb-wrapped.js";

const app = express();
const port = 3000;            

app.use(cors());          
app.use(express.json()); 

app.get('/', (req, res) => {                
    res.status(200).send('Ya estoy respondiendo!');
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
    let resultado = await OMDBSearchByPage[req.query.search, req.query.p];
    res.status(200).send(`el resultado de la operacion es: ${resultado}`);
});
//c2
app.get('/omdb/searchcomplete', async (req, res) => {                
    let resultado = await searchcomplete[req.query.search];
    res.status(200).send(`el resultado de la operacion es: ${resultado}`);
});



//c3

app.get('/matematica/dividir?n1={numero}&n2={numero}', (req, res) => {                

let resultado = dividir(n1, n2)
    res.status(200).send(`el resultado de la operacion es: ${resultado}`);
})












app.get('/saludar', (req, res) => {             

    res.send('Hello World!');

})


app.listen(port, () => {

    console.log(`Listening on http://localhost:${port}`)

})

