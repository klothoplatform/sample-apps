import "reflect-metadata"
import { DataSource } from "typeorm";
import { Post } from "./post";

/**
 * @klotho::persist {
 *   id = "PostsDB"
 * }
 */
export const datasource = new DataSource({
  type: "sqlite",
  database: "posts.sqlite",
  synchronize: true,
  logging: true,
  entities: [Post],
  subscribers: [],
  migrations: [],
})

export const isInitialized = datasource.initialize().then(ds => ds.isInitialized);
