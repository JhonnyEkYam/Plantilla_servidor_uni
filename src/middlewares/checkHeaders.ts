/** Importamos librerías a utilizar */
import fs from 'fs'
import jwt from 'jsonwebtoken'
import { Response, Request, NextFunction } from 'express'

export class CheckHeaders {
    /** Este middleware valida que la cabecera de autenticación sea correcta */
    static validateJWT(req: Request, res: Response, next: NextFunction) {
        /* Obtenemos la cabecera de autenticación */
        let token = req.get('Authorization')
        try {
            /* Primero verificamos que el token proporcionado sea valido */
            let decoded: any = jwt.verify(token, process.env.ENCRYPT_KEY)
            if (!decoded.data.user) {
                return res.status(403).json({
                    ok: false,
                    errors: [{ message: 'You do not have the required authentication' }]
                })
            }

            /*Desencriptamos información deseada del usuario*/
            let user_id ='';
            let role = '';
            let room = '';
            /*Retornamos el id del usuario decodificado junto con el token */
            req.body.user_id = +user_id
            req.body.role = +role
            req.body.room = +room
        } catch (e) {
            /*Cachamos los errores posibles*/
            return res.status(403).json({
                ok: false,
                errors: [{ message: 'Existe el siguiente problema con la cabecera: ' + e }]
            })
        }
        /** Si se cumple las validaciones correctas, pasamos a la función requerida */
        next()
    }

    static test(req: Request, res: Response, next: NextFunction) {
        /* Obtenemos la cabecera de autenticación */
        let token = req.get('Authorization')

        if (token == null) {
            return res.status(403).json({
                ok: false,
                errors: [{ message: 'La cabecera de autenticación no puede ser nula' }]
            })
        }

        if (token != 'TEST123') {
            return res.status(403).json({
                ok: false,
                errors: [{ message: 'La cabecera de autenticación no es valida' }]
            })
        }
        /** Si se cumple las validaciones correctas, pasamos a la función requerida */
        next()
    }
}
