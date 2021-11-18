import { usuariosConectados } from "../sockets/sockets";
import { Usuario } from "./usuario";

export class UsuariosLista{
    private lista:Usuario[]=[];

    constructor(){

    }

    //Agregar un usuario
    public agregarUsuario(usuario:Usuario){
        this.lista.push(usuario);
        console.log('Añadido: ',usuario.id);
        console.log(this.getLista());
        
    }

    public actualizarNombre(id:string, nombre:string){
        for (let usuario of this.lista) {
             if (usuario.id===id){
                 usuario.nombre=nombre;
                 break;
             }       
        }
        console.log(this.lista);
        
    }

    public getLista(){
        return this.lista;
    }

    public getUsuario(id:string){
        return this.lista.find(usuario=>usuario.id=id);
    }

    public obtenerUsuariosSala(sala:string){
        // let listaUsuarios:Usuario[]=[];
        // for (const usuario of this.lista) {
        //     if (usuario.sala===sala){
        //         listaUsuarios.push(usuario);
        //     }
        // }

        return this.lista.filter(usuario=>usuario.sala===sala);         
    }
    
    //Borrar usuario
    public borrarUsuario(id:string){
    
        this.lista=this.lista.filter(usuario=>usuario.id!==id);
        console.log('Borrado: ',id,);
        console.log(this.lista);
            
    }
    

}