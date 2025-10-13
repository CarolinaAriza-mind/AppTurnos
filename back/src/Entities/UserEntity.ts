import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Credential } from "./CredentialEntity.js";
import { Appointment } from "./AppointmentEntitiy.js";

@Entity("users")
export class User {

@PrimaryGeneratedColumn() 
id: number

@Column({type: "varchar", length: 25, nullable: false})
name: string

@Column({type: "varchar", length: 50, nullable: false, unique:true})
email: string

@Column({type: "date", nullable: false})
birthdate: Date

@Column({type: "int", nullable: false, unique:true})
nDni: number

@OneToOne(() => Credential, { cascade: true})
@JoinColumn()
credentials: Credential

@OneToMany(() => Appointment, appointments => appointments.user)
appointment: Appointment[]

@CreateDateColumn()
creatAt: Date

@UpdateDateColumn()
upDate: Date
}
