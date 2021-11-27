
export class graficaBarras{

    valores:number[]=[65, 59, 80, 81, 56, 55, 40];

    constructor(){

    }

    actualizarPosicion(posicion:number,valor:number){
        this.valores[posicion]=valor;
        return this.valores;
    }
}