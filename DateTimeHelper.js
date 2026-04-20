class DateTimeHelper {

    isDate = (fecha) => {
        let fechaParaComparar = new Date('12/05/2008')
        if (fecha === fechaParaComparar) {
            return true
        }
        else { return false }

    };
    getOnlyDate = (fecha = new Date()) => {

        let ano = fecha.getFullYear()
        let mes = fecha.getMonth()
        let dia = fecha.getDate()
        return new Date(ano, mes, dia)

    };


    getEdadActual = (fechaNacimiento) => {

        let fechaHoy = new Date()
        let edad = fechaHoy.getFullYear() - fechaNacimiento.getFullYear()
        return edad
    };

    getDiasHastaMiCumple = (fechaNacimiento) => {
        let fechaHoy = new Date()
        let miCumple = fechaHoy.getDate() - fechaNacimiento.getDate()
        return miCumple

    };
    getDiaTexto = (fecha, retornarAbreviacion = false) => { 
        
    return fecha.toLocaleDateString('es-ES', retornarAbreviacion)
     };
    getMesTexto = (fecha, retornarAbreviacion = false) => { 
        let mesDeFecha = fecha.getMonth()

        return mesDeFecha.toLocalString()
      
     };

}

export default new DateTimeHelper();