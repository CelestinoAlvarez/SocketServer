import { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import Server from "../classes/server";

export const router = Router();


router.get('/mensajes',(req:Request,res:Response)=>{
    res.json({
        ok:true,
        msg:"Todo OK"
    })
})

router.post('/mensajes',(req:Request,res:Response)=>{
    const {cuerpo,de}=req.body;
    console.log(cuerpo,de);

    const server=Server.instance;

    server.io.emit('mensaje-nuevo',{de,cuerpo});
    
    res.json({
        ok:true,
        msg:"POST OK"
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