import { check } from "express-validator"

export const user_validator = ()=>{

    return [ check("name").exists().withMessage('El nombre es requerido')
        .isLength({min:5,max:40}).withMessage('El nombre debe contener de 5 a 40 caracteres'),
        check("email").exists().withMessage('El email es requerido').isEmail().withMessage('No es un email vàlido')
    ]
   }