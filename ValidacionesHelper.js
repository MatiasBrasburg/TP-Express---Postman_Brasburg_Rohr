class ValidacionesHelper {

    getIntegerOrDefault = (value, defaultValue) => {
        let numeroConvertido = parseInt(value);
        if (isNaN(numeroConvertido)) {
            return defaultValue;
        } else {
            return numeroConvertido;
        }
    };

    getStringOrDefault = (value, defaultValue) => {
        if (value === undefined || value === null) {
            return defaultValue;
        } else {
            return String(value);
        }
    };

    getDateOrDefault = (value, defaultValue) => {
        const fecha = new Date(value);
        if (fecha instanceof Date && !isNaN(fecha.getTime())) {
            return fecha;
        }
        return defaultValue;
    };

    getBooleanOrDefault = (value, defaultValue) => {
        if (typeof value === 'boolean') return value;
        if (typeof value === 'string') {
            const texto = value.toLowerCase();
            if (texto === "true") return true;
            if (texto === "false") return false;
        }
        return defaultValue;
    };

    isEmail = (value) => {
        if (typeof value !== 'string') {
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

}

export default new ValidacionesHelper();