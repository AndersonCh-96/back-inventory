import { Request,Response } from "express";
import jwt from "jsonwebtoken"



const authMiddleware = (req:Request, res:Response, next:any) => {
    const token = req.header("Authorization")?.split(" ")[1];
  
    if (!token) return res.status(401).json({ message: "Acceso denegado" });

    try {
    //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const decoded = jwt.verify(token, "Hola");
      
       //req.user = decoded; // Agregar usuario al request
       next();
    } catch (error) {
       res.status(401).json({ message: "Token inválido o expirado" });
    }
  };
  
export default authMiddleware