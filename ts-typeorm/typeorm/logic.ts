import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./model"


export const initialize = async (): Promise<DataSource> => {

   /** @klotho::persist  {
   *   id = "typeormDB"
   * }
   */ 
    const AppDataSource = new DataSource({
     type: "sqlite",
     database: "user.sqlite",
     entities: [User],
     synchronize: true,
     logging: false,
   })
    
    // to initialize initial connection with the database, register all entities
    // and "synchronize" database schema, call "initialize()" method of a newly created database
    // once in your application bootstrap
    await AppDataSource.initialize()

    return AppDataSource
}

const dataSource: Promise<DataSource> = initialize();


export const write = async (firstName: string, lastName: string) => {
    const user = new User()
    user.firstName = firstName
    user.lastName = lastName
    await dataSource;
    await User.save(user)
}

export const find = async (firstName: string) => {
    await dataSource;
    const response = await User.findOneBy({
        firstName,
    })
    return response
}
