import { Response, Request } from "express";

import { UserQueries } from "../queries/user.queries";
import jwt from "jsonwebtoken";

class userController {

    public async getUsers(req: Request, res: Response) {

        const request = req.body;
        const user = await UserQueries.getUsers(request);
        if (user.ok) {
            return res.json({ data: user });

        } else {
            return res.status(400).json({ ok: false });

        }

    }

    public async login(req: Request, res: Response) {
        const userData = req.body;
        if (userData.user && userData.password) {
            try {
                const user = await UserQueries.getUser(userData);

                const token = jwt.sign({
                    data: {
                        role: "user",
                        user: user.data.user,
                        user_id: user.data.user_id,
                        email: user.data.email
                    }
                }, process.env.ENCRYPT_KEY)
                return res.json({/*data:user, */token: token })
            } catch(e) {
                return res.status(400).json({ ok: false, data: "credenciales invalidas"});
            }
        } else {
            return res.status(400).json({ ok: false });
        }
    }
}

export const UserController = new userController();