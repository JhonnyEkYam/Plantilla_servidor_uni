import { UserModel } from '../models/user.model';

class userQueries {
    public async getUsers(data) {
        try {
            const query = await UserModel.findAll();
            return { ok: true, data: query }
        } catch (e) {
            console.log(e);
            return { ok: false, data: null };
        }
    }

    public async getUser(user){
        const {Op} = require("sequelize");
        try {
            const query = await UserModel.findOne({
                where: {[Op.and]: [{user: user.user}, {password: user.password}]}
            });
            if(query){
                return {ok: true, data: query};
            }else {
                return {ok: false, data: null};
            }
        } catch (e) {
            console.log(e);
            return {ok: false, data: null};
        }
    }
}

export const UserQueries = new userQueries();