import { Response, Request } from "express";

import { UserQueries } from "../queries/user.queries";
import jwt from "jsonwebtoken";

class userController{

    public async getUsers(req:Request, res:Response){

        const request = req.body;
        const user = await UserQueries.getUsers(request);
        if(user.ok){
            return res.json({data:user});

        }else{
            return res.status(400).json({ok:false});

        }

    }

    public async login(req: Request, res: Response){
        const userData = req.body;
        if(userData.user && userData.password){
            const user = await UserQueries.getUser(userData);

            // console.log(user)
            const token = jwt.sign({
                data: {
                    role: "user",
                    user: user,
                }
            }, process.env.ENCRYPT_KEY)
            // userInfo.token = token;
            // this.msg = "ok";
            // this.ok = true;
            

            return res.json({data:user})
        }else{
            return res.status(400).json({ok:false});
        }
    }
}

export const UserController = new userController();