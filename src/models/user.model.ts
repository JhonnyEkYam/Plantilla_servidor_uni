import { Model, DataTypes } from 'sequelize'
import { database } from '../config/database'

export class UserModel extends Model {
    /** Declaramos cada uno de los atributos del modelo */
    public user_id!: number;
    public user!: string;
    public password!: string;
    public email!: string;
}

/** Inicializamos el modelo a utilizar, debemos establecer cada una de las 
 * propiedades que creamos en la sección anterior.
 */
UserModel.init({
    // Example:
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    user:{
        type:DataTypes.STRING,
    },
    password:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING,
    },
}, {
    /** Aquí podemos agregar opciones adicionales. Por default. La librería 
     *  interpreta que todas las tablas de la base de datos contienen las columnas:
     *  createdAt y updatedAt. 
     *  En dado caso de que no se cuente con ellas, debemos agregar el siguiente 
     *  regla en este especio: timestamps: false
     */
    timestamps:false,
    sequelize: database,
    tableName: 'user'
})