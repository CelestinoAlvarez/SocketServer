
export class graficaData{
    private meses=['enero','febrero', 'marzo', 'abril'];
    private valores:number[]=[0,5,0,-15];

    constructor(){
    }

    getDataGrafica(){
        return this.valores;
    }

    modificarValor(mes:string,valor:number){
        mes=mes.toLowerCase().trim();

        for (const i in this.meses) {
            if (this.meses[i]===mes){
                this.valores[i]=valor;   
            }
        }
        return this.getDataGrafica();
    }


}