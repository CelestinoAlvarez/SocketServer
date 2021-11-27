import { Socket } from "socket.io";
import socketIO from "socket.io";
import { UsuariosLista } from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";
import { Mapa } from "../classes/mapa";
import { Marcador } from "../classes/marcador";

export const usuariosConectados=new UsuariosLista();
export const mapa=new Mapa();

export const conectarCliente=(cliente:Socket, io:socketIO.Server)=>{
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregarUsuario(usuario);

}

export const desconectar= (cliente:Socket, io:socketIO.Server)=>{
    cliente.on('disconnect',async ()=>{
        console.log('Cliente desconectado, id:',cliente.id);
        await usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos',usuariosConectados.getLista());
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
        io.emit('usuarios-activos',usuariosConectados.getLista()); 
        callback({
            ok:true,
            msg:`Usuario ${payload.nombre} ha sido configurado`
        })
        
    })
}

export const obtenerUsuarios=(cliente:Socket, io:socketIO.Server)=>{
    
    cliente.on('obtener-usuarios',()=>{
        
        console.log('Obteniendo usuarios ');
        //io.emit('configurar-usuario',payload);
        io.to(cliente.id).emit('usuarios-activos',usuariosConectados.getLista()); 

    })
}

//Eventos de mapa
export const mapaSockets=(cliente:Socket, io:socketIO.Server)=>{
    cliente.on('nuevo-marcador',(marcador:Marcador)=>{
        console.log('He recibido un nuevo marcador: ',marcador);
        mapa.agragarMarcador(marcador);
        cliente.broadcast.emit('nuevo-marcador',marcador); //emitimos el sockets a todos memos a mi.   
    });

}

export const borrarMarcador=(cliente:Socket, io:socketIO.Server)=>{
    console.log('Borrar Marker');
    
    cliente.on('borrar-marcador',(id:string)=>{
        
        mapa.borrarMarcador(id);
        cliente.broadcast.emit('borrar-marcador',id); //emitimos el sockets a todos memos a mi.   
    })
}    

export const moverMarcador=(cliente:Socket, io:socketIO.Server)=>{
    console.log('Mover Marker');
    
    cliente.on('mover-marcador',(marcador:any)=>{
        const {lng,lat}=marcador;

        console.log('movido a: ',marcador.lng,'-',marcador.lat);
        
        mapa.moverMarcador(marcador);
        cliente.broadcast.emit('mover-marcador',marcador); //emitimos el sockets a todos memos a mi.   
    })
}    

