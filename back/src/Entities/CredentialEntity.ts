import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./UserEntity.js";

@Entity()
export class Credential {

@PrimaryGeneratedColumn()
  id: number;

@Column({type: "varchar", length: 15, nullable: false, unique: true})
username: string;

@Column({type: "varchar", length: 100, nullable: true})
password: string;

 @OneToOne("User", "credential", { lazy: true })
@JoinColumn()
user!: Promise<any>;

@CreateDateColumn()
creatAt: Date

@UpdateDateColumn()
upDate: Date
}
