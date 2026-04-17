class ValidacionesHelper {

    getIntegerOrDefault = (value, defaultValue) => {
        let numeroConvertido = parseInt(value);

        // 2. Evaluamos si el resultado NO es un número (NaN)
        if (isNaN(numeroConvertido)) {
            // Falló: devolvemos el Plan B
            return defaultValue;
        } else {
            // Tuvo éxito: devolvemos el número entero
            return numeroConvertido;
        }


    };



    getStringOrDefault = (value, defaultValue) => {
        if (value === "estoEsUnString") {
            return value
        }
        else {
            return defaultValue
        }
    };


    getDateOrDefault = (value, defaultValue) => {
        let nuevoValue = new date(value)
        if (isNaN(nuevoValue.getTime())) {
            return defaultValue
        }
        else {
            return value
        }

    };


    getBooleanOrDefault = (value, defaultValue) => {
        if (typeof value === 'string') {

            let textoMinuscula = value.toLowerCase();
            if (value === "true") {
                return true
            }
            else if (value === "false") {
                return false
            }
            else { return defaultValue }

        }

    };
    isEmail = (value) => {

        if (typeof value !== 'string') {
            return false;
        }


        const moldeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        // Esto automáticamente devolverá true o false.
        return moldeEmail.test(value);
    };

}


export default new ValidacionesHelper();