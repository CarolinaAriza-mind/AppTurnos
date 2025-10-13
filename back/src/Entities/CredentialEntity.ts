import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./UserEntity.js";

@Entity()
export class Credential {

@PrimaryGeneratedColumn()
  id: number;

@Column({type: "varchar", length: 15, nullable: false, unique: true})
username: string;

@Column({type: "varchar", length: 100, nullable: false})
password: string;

@OneToOne(() => User)
user: User

@CreateDateColumn()
creatAt: Date

@UpdateDateColumn()
upDate: Date
}
