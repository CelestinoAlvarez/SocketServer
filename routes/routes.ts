import { Router, Request, Response } from "express";
import bodyParser from "body-parser";

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
    
    res.json({
        ok:true,
        msg:"POST OK"
    })
})

router.post('/mensajes/:id',(req:Request,res:Response)=>{
    const {cuerpo}=req.body;
    const {id}=req.params;

    console.log(cuerpo, id);
    
    
    res.json({
        ok:true,
        msg:"POST OK",
        cuerpo,
        id
    })
})