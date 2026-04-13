/* Este es el módulo "matematicas" */
const PI = 3.14;
function sumar(x, y) {
    let n1 = parseInt(x)
        let n2 = parseInt(y)
return n1+n2;
}
function restar(x, y) {
     let n1 = parseInt(x)
        let n2 = parseInt(y)
return n1 - n2;
}
const multiplicar = (a, b) => {
     let n1 = parseInt(a)
        let n2 = parseInt(b)
return n1 * n2;
};
const dividir = (a, b) => {
     let n1 = parseInt(a)
        let n2 = parseInt(b)
return n1 / n2;
};
// Exporto todo lo que yo quiero exponer del módulo hacia el exterior.
export {PI, sumar, restar, multiplicar, dividir};
