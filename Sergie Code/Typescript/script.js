//####################  TIPOS DE DATOS  ####################
// STRINGS
// Comillas dobles:
var str1 = "Hola, soy una cadena con comillas dobles.";
// Comillas simples:
var str2 = 'Hola, soy una cadena con comillas simples.';
// Strings con inserción de valores:
var nombre = 'Juan';
var edad = 30;
var str3 = "Hola, mi nombre es ".concat(nombre, " y tengo ").concat(edad, " a\u00F1os.");
// NUMEROS
// Números enteros:
var num1 = 10;
// Números decimales:
var num2 = 2.2;
// Notación exponencial:
var num3 = 2.5e3; // 2.5 * 10^3 = 2500
// Notación exponencial negativa:
var num4 = 1.5e-2; // 1.5 * 10^-2 = 0.015
// Hexadecimales (base 16) utilizando el prefijo "0x":
var num5 = 0xA; // Valor decimal: 10
// Octales (base 8) utilizando el prefijo "0o":
var num6 = 10; // Valor decimal: 10
// Binarios (base 2) utilizando el prefijo "0b"
var num7 = 10; // Valor decimal: 10
// BOOLEANS
// Valor booleano true:
var bool1 = true;
// Valor booleano false:
var bool2 = false;
// UNDEFINED
var variableUndefined = undefined;
// NULL
// Declaracion de una variable con valor null
var variablenull = null;
// OBJETO
var programador = {
    nombre: "Sergie Code",
    casado: false,
    cursosEnYoutube: 4,
    cursos: ['HTML', 'CSS', 'JAVASCRIPT', 'REACT'],
    viajeAEuropa: undefined,
    viajeAEstadosUnidos: null
};
// ARREGLOS
// Arreglo de números:
var numeros = [1, 2, 3, 4, 5];
// Arreglo de cadenas de texto:
var nombres = ["Juan", "María", "Pedro"];
// Arreglo de booleanos:
var valoresBool = [true, false, true];
//etc
// ENUM
// Definición de un enum para días de la semana +
var DiasSemana;
(function (DiasSemana) {
    DiasSemana[DiasSemana["Lunes"] = 0] = "Lunes";
    DiasSemana[DiasSemana["Martes"] = 1] = "Martes";
    DiasSemana[DiasSemana["Mi\u00E9rcoles"] = 2] = "Mi\u00E9rcoles";
    DiasSemana[DiasSemana["Jueves"] = 3] = "Jueves";
    DiasSemana[DiasSemana["Viernes"] = 4] = "Viernes";
    DiasSemana[DiasSemana["S\u00E1bado"] = 5] = "S\u00E1bado";
    DiasSemana[DiasSemana["Domingo"] = 6] = "Domingo";
})(DiasSemana || (DiasSemana = {}));
// Enum con valores de cadena (String Enums):
var Colores;
(function (Colores) {
    Colores["Rojo"] = "rojo";
    Colores["Verde"] = "verde";
    Colores["Azul"] = "azul";
})(Colores || (Colores = {}));
// FUNCIONES
// Declaración de función:
function sumar1(a, b) {
    return a + b;
}
//ó
function sumar2(a, b) {
    return a + b;
}
// Funciones flecha:
var dividir1 = function (a, b) { return a / b; };
//ó
var dividir2 = function (a, b) { return a / b; };
// Funciones con parámetros opcionales:
function saludar(nombre, edad) {
    if (edad !== undefined) {
        return "Hola, mi nombre es ".concat(nombre, " y tengo ").concat(edad, " a\u00F1os.");
    }
    else {
        return "Hola, mi nombre es ".concat(nombre, ".");
    }
}
// Funciones con parámetros por defecto:
function saludar2(nombre, edad) {
    if (edad === void 0) { edad = 30; }
    return "Hola, mi nombre es ".concat(nombre, " y tengo ").concat(edad, " a\u00F1os.");
}
// CLASES
var Persona = /** @class */ (function () {
    function Persona(nombre) {
        this.nombre = nombre;
    }
    Persona.prototype.saludar = function () {
        console.log("Hola, mi nombre es ".concat(this.nombre, "."));
    };
    return Persona;
}());
//####################  EJEMPLOS  ####################
//1: Condicional simple
var estudiasteJavascript = false;
if (estudiasteJavascript) {
    console.log('Puedes seguir viendo este curso de Typescript');
}
else {
    console.log('Primero tenés que ver el curso de Javascript');
}
//2: Datos primitivos
var interMiami_ = 11;
var fcDallas_ = 11;
var messi_ = 1;
var juegaMessi_ = true;
var palabras_ = 'Me emocioné al verlo a Messi';
function jugar(equipo1, equipo2, juegaMessi, messi) {
    var motivo = '';
    if (juegaMessi) {
        equipo1 += messi;
        motivo = 'por que juega Messi';
    }
    if (equipo1 > equipo2)
        console.log("Gana Inter Miami ".concat(motivo));
    if (equipo1 == equipo2)
        console.log('Empatan');
    if (equipo1 < equipo2)
        console.log('Gana FC Dallas');
}
jugar(interMiami_, fcDallas_, juegaMessi_, messi_);
//3: Any (Cualquier dato)
var disney;
disney = 'Star Wars y Marvel';
console.log(disney);
disney = 15000000000;
console.log(disney);
disney = true;
console.log(disney);
//4: Arreglos
var arregloNumeros_withoutany = [1, 2, 3, 4, 5, 6];
var arregloNumeros_any = [1, "Ricardo", 3, 4, 5, 6];
var arregloTexto = ['HTML', 'CSS', 'Js'];
arregloTexto[0].indexOf('HTML');
//5: Ejemplo de objeto simple con Javascript
var programador_simple = {
    nombre: 'Sergie Code',
    tecnologias: ['React', 'Angular', 'Svelte'],
    tomaMate: true
};
programador_simple = {
    nombre: 'Ricardo Buenardo',
    tecnologias: ['C#'],
    tomaMate: false
};
console.log(programador_simple);
var programador_type_1 = {
    nombre: 'Sergie Code',
    tecnologias: ['React', 'Angular', 'Svelte'],
    tomarMate: true
};
var programador_type_2 = {
    nombre: 'Federico',
    tecnologias: ['HTML', 'Cobol'],
};
var programador_interface_1 = {
    nombre: 'Sergie Code',
    tecnologias: ['React', 'Angular', 'Svelte'],
    tomarMate: true
};
var programador_interface_2 = {
    nombre: 'Federico',
    tecnologias: ['HTML', 'Cobol'],
    tomarMate: null,
};
function enviarCurriculum(programador) {
    console.log("Este Curriculum es de ".concat(programador.nombre));
}
enviarCurriculum(programador_interface_1);
//8: Clases
var Pelicula = /** @class */ (function () {
    function Pelicula(nombre, protagonistas, actores) {
        this.nombre = nombre,
            this.protagonistas = protagonistas,
            this.actores = actores;
    }
    Pelicula.prototype.proyectarEnCine = function () {
        console.log("La pelicula ".concat(this.nombre, " est\u00E1 siendo producida"));
    };
    return Pelicula;
}());
var pelicula1 = new Pelicula('Pelicula1', ['Personaje1', 'Personaje2'], ['Actor1', 'Actor2']);
var pelicula2 = new Pelicula('Pelicula2', ['Personaje1', 'Personaje2'], ['Actor1', 'Actor2']);
pelicula1.proyectarEnCine();
console.log(pelicula2);
//9: Encapsulamiento
var Sorteo = /** @class */ (function () {
    function Sorteo(nombre) {
        this.nombre = nombre;
    }
    Sorteo.prototype.setTicket = function (ticket) {
        this.ticket = ticket;
    };
    Sorteo.prototype.getTicket = function () {
        return this.ticket;
    };
    Sorteo.prototype.sortear = function () {
        return "Para ".concat(this.nombre, " el ticket es ").concat(this.ticket);
    };
    return Sorteo;
}());
var sorteo = new Sorteo('Sergie Code');
sorteo.setTicket(7);
console.log(sorteo.sortear());
