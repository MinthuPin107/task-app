import { DataSource } from "typeorm"
import { List } from "../entities/list"
import { Task } from "../entities/task"
import dotenv from "dotenv"

dotenv.config()

export default new DataSource({
  entities: [List, Task],
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
})