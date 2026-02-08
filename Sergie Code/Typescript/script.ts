//####################  TIPOS DE DATOS  ####################

// STRINGS
// Comillas dobles:
const str1: string = "Hola, soy una cadena con comillas dobles.";
// Comillas simples:
const str2: string = 'Hola, soy una cadena con comillas simples.';
// Strings con inserción de valores:
const nombre: string = 'Juan';
const edad: number = 30;
const str3: string = `Hola, mi nombre es ${nombre} y tengo ${edad} años.` ;


// NUMEROS
// Números enteros:
const num1: number = 10;
// Números decimales:
const num2: number = 2.2;
// Notación exponencial:
const num3: number = 2.5e3; // 2.5 * 10^3 = 2500
// Notación exponencial negativa:
const num4: number = 1.5e-2; // 1.5 * 10^-2 = 0.015
// Hexadecimales (base 16) utilizando el prefijo "0x":
const num5: number = 0xA; // Valor decimal: 10
// Octales (base 8) utilizando el prefijo "0o":
const num6: number = 0o12; // Valor decimal: 10
// Binarios (base 2) utilizando el prefijo "0b"
const num7: number = 0b1010; // Valor decimal: 10

// BOOLEANS
// Valor booleano true:
const bool1: boolean = true;
// Valor booleano false:
const bool2: boolean = false;

// UNDEFINED
let variableUndefined: undefined = undefined;

// NULL
// Declaracion de una variable con valor null
let variablenull: null = null;

// OBJETO
const programador = {
    nombre: "Sergie Code",
    casado: false,
    cursosEnYoutube: 4,
    cursos: ['HTML', 'CSS', 'JAVASCRIPT', 'REACT'],
    viajeAEuropa: undefined,
    viajeAEstadosUnidos: null
};

// ARREGLOS
// Arreglo de números:
const numeros: number[] = [1, 2, 3, 4, 5];
// Arreglo de cadenas de texto:
const nombres: string[] = ["Juan", "María", "Pedro"];
// Arreglo de booleanos:
const valoresBool: boolean[] = [true, false, true];
//etc

// ENUM
// Definición de un enum para días de la semana +
enum DiasSemana {
    Lunes,
    Martes,
    Miércoles,
    Jueves,
    Viernes,
    Sábado,
    Domingo
}
// Enum con valores de cadena (String Enums):
enum Colores {
    Rojo = "rojo",
    Verde = "verde",
    Azul = "azul",
}

// FUNCIONES
// Declaración de función:
function sumar1(a: number, b: number): number {
    return a + b;
}
//ó
function sumar2(a: number, b: number) {
    return a + b;
}
// Funciones flecha:
const dividir1 = (a: number, b: number) => a / b;
//ó
const dividir2 = (a: number, b: number): number => a / b;
// Funciones con parámetros opcionales:
function saludar(nombre: string, edad?: number): string {       
    if (edad !== undefined) {
        return `Hola, mi nombre es ${nombre} y tengo ${edad} años.`;
    } else {
        return `Hola, mi nombre es ${nombre}.`;
    }
}
// Funciones con parámetros por defecto:
function saludar2(nombre: string, edad: number = 30): string {
    return `Hola, mi nombre es ${nombre} y tengo ${edad} años.`;
}

// CLASES
class Persona {
    nombre: string;
    constructor(nombre: string) {
        this.nombre = nombre;
    }
    saludar() {
        console.log(`Hola, mi nombre es ${this.nombre}.`);
    }
}

// INTERFACES
// Interface basica:
interface Persona {
    nombre: string;
    edad: number;
}
// Interface con propiedades opcionales:
interface Producto {
    nombre: string;
    precio: number;
    descripcion?: string;
}
// Interface para funciones:
interface Comparador {
    (a: number, b: number): boolean;
}
// Interface para clases (class interfaces):
interface Persona {
    nombre: string;
    edad: number;
    saludar(): void;
    saludar2(a: number, b: number): string;
}

// TYPES
// Type básico:
type Numero = number;
// Type básico Objeto Literal:
type Personal = {
    nombre: string;
    edad: number;
}
// Type con union types:
type Nombre = string | null;
// Type con propiedades opcionales:
type Producto1 = {
    nombre: string;
    precio: number;
    descripcion?: string;
}
// Type para funciones:
type Comparador1 = {
    (a: number, b: number): boolean;
}
// Type para clases (class Types):
type Persona2 = {
    nombre: string; 
    edad: number; 
    saludar(): void;
} 

//####################  EJEMPLOS  ####################

//1: Condicional simple
let estudiasteJavascript: boolean = false;
if (estudiasteJavascript) {
    console.log('Puedes seguir viendo este curso de Typescript')
}else{
    console.log('Primero tenés que ver el curso de Javascript')
}

//2: Datos primitivos
let interMiami_: number | null | undefined = 11;
let fcDallas_: number = 11
let messi_: number = 1
let juegaMessi_: boolean = true
let palabras_: string = 'Me emocioné al verlo a Messi'
function jugar(equipo1: number, equipo2: number, juegaMessi: boolean, messi: number){
    let motivo:string = ''
    if(juegaMessi) {
        equipo1 += messi
        motivo = 'por que juega Messi'
    }
    if(equipo1 > equipo2) console.log (`Gana Inter Miami ${motivo}`)
    if(equipo1 == equipo2) console.log ('Empatan')
    if(equipo1 < equipo2) console.log ('Gana FC Dallas')
    }
jugar(interMiami_, fcDallas_, juegaMessi_, messi_)

//3: Any (Cualquier dato)
let disney: any;
disney = 'Star Wars y Marvel'
console. log(disney)
disney = 15000000000
console.log(disney)
disney = true
console.log(disney)

//4: Arreglos
let arregloNumeros_withoutany: number[] = [1, 2, 3, 4, 5, 6]
let arregloNumeros_any: any[] = [1, "Ricardo", 3, 4, 5, 6]
let arregloTexto: string[] = ['HTML', 'CSS', 'Js']
arregloTexto[0].indexOf('HTML')

//5: Ejemplo de objeto simple con Javascript
let programador_simple = {
    nombre: 'Sergie Code',
    tecnologias: ['React', 'Angular', 'Svelte'],
    tomaMate: true
}
programador_simple = {
    nombre: 'Ricardo Buenardo',
    tecnologias: ['C#'],
    tomaMate: false
}
console.log(programador_simple)

//6: Ejemplo de objeto con Type personalizado
type Programador_type = {
    nombre: string,
    tecnologias: string[],
    tomarMate?: boolean
}
let programador_type_1: Programador_type = {
    nombre: 'Sergie Code',
    tecnologias: ['React', 'Angular', 'Svelte'],
    tomarMate: true
}
let programador_type_2: Programador_type = {
    nombre: 'Federico',
    tecnologias: ['HTML', 'Cobol'],
}

//7: Interfaces
interface Programador_interface{
    nombre:string,
    tecnologias: string[],
    tomarMate?: boolean | null
}
let programador_interface_1: Programador_interface = {
    nombre: 'Sergie Code',
    tecnologias: ['React', 'Angular', 'Svelte'],
    tomarMate: true
}
let programador_interface_2: Programador_interface = {
    nombre: 'Federico',
    tecnologias: ['HTML', 'Cobol'],
    tomarMate: null,
}
function enviarCurriculum(programador: Programador_interface){
    console.log(`Este Curriculum es de ${programador.nombre}`)
}
enviarCurriculum(programador_interface_1)

//8: Clases
class Pelicula {
    nombre?: string;
    protagonistas?: string[];
    actores?: string[];
    proyectarEnCine() {
        console.log(`La pelicula ${this.nombre} está siendo producida`)
    }
    constructor(nombre: string, protagonistas: string[], actores: string[]){
        this.nombre = nombre,
        this.protagonistas = protagonistas,
        this.actores = actores
    }
}
const pelicula1 = new Pelicula('Pelicula1', ['Personaje1', 'Personaje2'], ['Actor1','Actor2'])
const pelicula2 = new Pelicula('Pelicula2', ['Personaje1', 'Personaje2'], ['Actor1','Actor2'])
pelicula1.proyectarEnCine()
console.log(pelicula2)

//9: Encapsulamiento
class Sorteo<T>{
    private ticket?: T;
    constructor(
        private nombre: string
    ){}
    setTicket(ticket: T) {
        this.ticket = ticket
    }
    getTicket() {
        return this.ticket
    }
    public sortear(): string {
        return `Para ${this.nombre} el ticket es ${this.ticket}`
    }
}
let sorteo = new Sorteo<number>('Sergie Code')
sorteo.setTicket(7)
console.log(sorteo.sortear())
