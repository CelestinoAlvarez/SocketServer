import { Socket } from "socket.io";
import socketIO from "socket.io";

export const desconectar=(cliente:Socket)=>{
    cliente.on('disconnect',()=>{
        console.log('Cliente desconectado');
    })
}

export const escucharMensaje=(cliente:Socket, io:socketIO.Server)=>{
    cliente.on('mensaje',(payload)=>{
        console.log('Mensaje recibido');
        console.log(payload.de, payload.cuerpo);

        io.emit('mensaje-nuevo',payload)
        
    })
}



