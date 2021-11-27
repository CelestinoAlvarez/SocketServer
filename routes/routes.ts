import { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import Server from "../classes/server";
import { mapa, usuariosConectados } from "../sockets/sockets";
import { graficaData } from "../classes/grafica";
import { graficaBarras } from "../classes/barras";
import { Mapa } from "../classes/mapa";

export const router = Router();

const grafica = new graficaData;
const gBarras=new graficaBarras;


router.get('/grafica',(req:Request,res:Response)=>{
    res.json(grafica.getDataGrafica());
})

router.post('/grafica',(req:Request,res:Response)=>{
    const {mes,valor}=req.body;
    console.log(mes,valor);

    //grafica.modificarValor(mes,valor);

    const server=Server.instance;

    server.io.emit('mensaje-nuevo', grafica.modificarValor(mes,valor));
    
    res.json({
        ok:true,
        msg:"POST OK"
    })
})

router.post('/barras',(req:Request,res:Response)=>{
    const {posicion,valor}=req.body;
    console.log(posicion,valor);

    //grafica.modificarValor(mes,valor);

    const server=Server.instance;

    server.io.emit('actualizar-barras', gBarras.actualizarPosicion(posicion,valor));
    
    res.json({
        ok:true,
        msg:"POST OK barras"
    })
})

router.post('/mensajes/:id',(req:Request,res:Response)=>{
    const {cuerpo}=req.body;
    const {id}=req.params;

    const payload = {
        de:id,
        cuerpo
    }

    const server=Server.instance;

    server.io.in(id).emit('mensaje-privado',payload)
    
    
    res.json({
        ok:true,
        msg:"POST OK",
        cuerpo,
        id
    })
})

//Servicio para obtener todos los id de los usuarios
    router.get('/usuarios',(req:Request,res:Response)=>
    {
        const server=Server.instance;
    
        server.io.allSockets().then((clientes)=>{
            res.json({
                clientes:Array.from(clientes)
            })
        })
    });

//Obtener usuarios y sus ids

router.get('/usuarios/detalle',(req:Request,res:Response)=>
    {
    
        const server=Server.instance;
    
        server.io.allSockets().then((clientes)=>{
            res.json({
                clientes:usuariosConectados.getLista()
            })
        })
    });


    //Mapas

  

    //Mapa

    router.get('/mapa',(req:Request,res:Response)=>{
        res.json(mapa.getMarcadores());
    })
    
    router.post('/mapa',(req:Request,res:Response)=>{
        //const {mes,valor}=req.body;
        console.log(req.body);
    
        //grafica.modificarValor(mes,valor);
    
        const server=Server.instance;
    
        //server.io.emit('mensaje-nuevo', grafica.modificarValor(mes,valor));
        
        res.json({
            ok:true,
            msg:"nuevo marcador"
        })
    })