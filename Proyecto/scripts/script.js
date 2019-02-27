

/*
*
*BLOQUE PARA VARIABLES Y CONSTANTES
*
*/

//variables sobre las que se dibuja
var papel = document.getElementById("escenario")
var lienzo = papel.getContext('2d')

// x e y visibles del tablero
const xVisible = 1000
const yVisible = 500
const yBase = yVisible - 50
//tamanyo de las casillas
const tamanyoCasilla = 40 //tamaño en pixeles que ocupara cada casilla del tablero
//array de tablero
var tablero = []
var tableroVisible = []
//variable que se usara para saber donde esta nuestro personaje
var casillaPersonaje = 0
var yPersonaje = yBase
//Objeto posicion Tablero
var posTablero = new Object()
posTablero.xInicio = 0
posTablero.xFinal = tamanyoCasilla
posTablero.ocupado = false
//

//Numero de casillas visibles
const casillasPantalla = xVisible /tamanyoCasilla
var casillaInicial = 0
var casillaFinal = casillasPantalla //al principio de pintaran las mismas que son visibles

//Flechas
const FLECHAS = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32
}

/*
*
*BLOQUE PARA FUNCIONES
*
*/

//funcion numero aleatorios
function aleatorio(minimo, maximo) {
    var resultado
    resultado = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo
    return resultado
}

//funcion que nos dibuja lineas
function dibujarLinea(color, posicionIniX, posicionIniY, posicionFinX, posicionFinY, grosor) {
    lienzo.lineWidth = grosor;
    lienzo.beginPath()
    lienzo.strokeStyle = color
    lienzo.moveTo(posicionIniX, posicionIniY)
    lienzo.lineTo(posicionFinX, posicionFinY)
    lienzo.stroke()
    lienzo.closePath()
}


//funcion que nos dibujara el personaje
function personajeDibujar(ini_posX, ini_posY, anchura, altura) {
    //de primeras el personaje sera un cuadrado
    lienzo.fillRect(ini_posX, ini_posY, anchura, altura)    
}

function dibujarTriangulo(inicio, final) {
   // console.log(`xInicio = ${inicio} y xFinal = ${final}`)
    dibujarLinea('red', inicio, yBase, final - (tamanyoCasilla / 2), yBase - (tamanyoCasilla / 2), 2)
    dibujarLinea('red', final - (tamanyoCasilla / 2), yBase - (tamanyoCasilla / 2), final, yBase, 2)
}


//funcion que nos genera el tablero (solo sus caracteristicas)
function generarArrayTablero(numeroCasillas) {
    var xInicio = 0
    var xFinal = tamanyoCasilla
    for (var i = 0; i < numeroCasillas; i++) {
        //generar nueva posicion del tablero e introducir en la array
        tablero[i] = new Object()
        tablero[i].xInicio = xInicio
        tablero[i].xFinal = xFinal
        tablero[i].ocupado = false
        if (i != 0) { //para no empezar con un obstaculo
            if (i % 10 == 0) {
                tablero[i].esSuelo = false
                tablero[i].obstaculo = true
            } else {
                tablero[i].esSuelo = true
                tablero[i].obstaculo = false
            }
        } else {
            tablero[i].esSuelo = true
            tablero[i].obstaculo = false
        }
        xInicio = xFinal
        xFinal += tamanyoCasilla

    }
}

function generarTableroVisible(casillaInicio, casillaFinal){
    for(var i = casillaInicio; i < casillaFinal; i++){
        tableroVisible[i] = tablero[i]
    }
}

function dibujaTablero() {
    for (var i = 0; i<tableroVisible.length; i++) {
        if (tableroVisible[i].esSuelo) {
            dibujarLinea('black', tableroVisible[i].xInicio, yBase, tableroVisible[i].xFinal, yBase, 2)
        } else {
            //dibujarLinea('red', tablero[i].xInicio, 450, tablero[i].xFinal, 450, 2 )
            dibujarTriangulo(tableroVisible[i].xInicio, tableroVisible[i].xFinal)
        }
    }
}

function dibujandoConTeclas(evento) {

    console.log(evento.keyCode)
    //Primero eliminaremos
    lienzo.clearRect(0, 0, xVisible, yVisible)
    //personajeDibujar(tablero[casillaPersonaje].xInicio, yPersonaje, tamanyoCasilla, -tamanyoCasilla) 
    switch (evento.keyCode) {
        case FLECHAS.UP:
            
            break
        case FLECHAS.DOWN:
            
            break
        case FLECHAS.RIGHT:
            //actualizaremos la posicion del cuadrado
            //casillaPersonaje ++
            casillaInicial ++
            casillaFinal ++
            generarTableroVisible(casillaInicial, casillaFinal)
            dibujaTablero()
            personajeDibujar(tablero[casillaPersonaje].xInicio, yPersonaje, tamanyoCasilla, -tamanyoCasilla)
            break
        case FLECHAS.LEFT:
            console.log('estoyIzquierda')
            break
        case FLECHAS.SPACE:

            break    
        default:
        dibujaTablero(casillaInicial, casillaFinal)
        personajeDibujar(tablero[casillaPersonaje].xInicio, yPersonaje, tamanyoCasilla, -tamanyoCasilla)
            break
    }
}

//CODIGO

generarArrayTablero(50)
generarTableroVisible(casillaInicial, casillaFinal)
dibujaTablero()
personajeDibujar(tableroVisible[casillaPersonaje].xInicio, yPersonaje, tamanyoCasilla, -tamanyoCasilla)
document.addEventListener('keyup', dibujandoConTeclas)

















