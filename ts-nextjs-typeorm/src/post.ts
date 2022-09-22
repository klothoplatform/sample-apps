import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @Column()
  author: string
}
