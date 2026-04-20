class DateTimeHelper {

    // 1. Corregido según la consigna: Solo verifica si es una fecha válida.
    isDate = (fecha) => {
        return fecha instanceof Date && !isNaN(fecha.getTime());
    };

    getOnlyDate = (fecha = new Date()) => {
        let ano = fecha.getFullYear();
        let mes = fecha.getMonth();
        let dia = fecha.getDate();
        return new Date(ano, mes, dia);
    };

    getEdadActual = (fechaNacimiento) => {
        // 🛡️ PREVENCIÓN DEL ERROR 500: Verificamos si es una fecha. 
        // Si no lo es (ej: es un string), devolvemos -1 como pide la consigna.
        if (!this.isDate(fechaNacimiento)) {
            return -1;
        }

        let fechaHoy = new Date();
        let edad = fechaHoy.getFullYear() - fechaNacimiento.getFullYear();
        
        let diferenciaMeses = fechaHoy.getMonth() - fechaNacimiento.getMonth();
        if (diferenciaMeses < 0 || (diferenciaMeses === 0 && fechaHoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }
        return edad;
    };

    getDiasHastaMiCumple = (fechaNacimiento) => {
        // 🛡️ PREVENCIÓN: Si nos mandan un string, abortamos para no romper el server
        if (!this.isDate(fechaNacimiento)) return -1; 

        let fechaHoy = new Date();
        fechaHoy.setHours(0, 0, 0, 0); 

        let proximoCumple = new Date(fechaHoy.getFullYear(), fechaNacimiento.getMonth(), fechaNacimiento.getDate());

        if (fechaHoy > proximoCumple) {
            proximoCumple.setFullYear(fechaHoy.getFullYear() + 1);
        }

        let diferenciaMilisegundos = proximoCumple.getTime() - fechaHoy.getTime();
        let diasFaltantes = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
        
        return diasFaltantes;
    };

    getDiaTexto = (fecha, retornarAbreviacion = false) => { 
        if (!this.isDate(fecha)) return "Fecha inválida";
        let opciones = { weekday: retornarAbreviacion ? 'short' : 'long' };
        return fecha.toLocaleDateString('es-ES', opciones);
    };

    getMesTexto = (fecha, retornarAbreviacion = false) => { 
        if (!this.isDate(fecha)) return "Fecha inválida";
        let opciones = { month: retornarAbreviacion ? 'short' : 'long' };
        return fecha.toLocaleDateString('es-ES', opciones);
    };

}

export default new DateTimeHelper();