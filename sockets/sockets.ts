import { Socket } from "socket.io";
import socketIO from "socket.io";
import { UsuariosLista } from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";

export const usuariosConectados=new UsuariosLista();

export const conectarCliente=(cliente:Socket)=>{
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregarUsuario(usuario);
    
}

export const desconectar= (cliente:Socket)=>{
    cliente.on('disconnect',async ()=>{
        console.log('Cliente desconectado, id:',cliente.id);
        await usuariosConectados.borrarUsuario(cliente.id);
    })
}

export const escucharMensaje=(cliente:Socket, io:socketIO.Server)=>{
    cliente.on('mensaje',(payload)=>{
        console.log('Mensaje recibido');
        console.log(payload.de, payload.cuerpo);

        io.emit('mensaje-nuevo',payload)
        
    })
}



export const configurarUsuario=(cliente:Socket, io:socketIO.Server)=>{
    
    cliente.on('configurar-usuario',(payload:{nombre:string}, callback:Function)=>{
        usuariosConectados.actualizarNombre(cliente.id,payload.nombre);
        
        console.log('Configurando usuario ',payload.nombre);
        //io.emit('configurar-usuario',payload);

        callback({
            ok:true,
            msg:`Usuario ${payload.nombre} ha sido configurado`
        })
        
    })
}

    


