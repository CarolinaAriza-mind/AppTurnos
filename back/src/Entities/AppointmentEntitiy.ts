import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Status } from "../DTO/AppointmentDTO.js"

@Entity("appointment")
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "date" , nullable:false})
    date: Date

    @Column({type:"varchar", length: 5, nullable: false })
    time: string

    @ManyToOne("User", "appointments", { nullable: true })
user: any;

    @Column({type: "varchar", length: 10 , nullable:false , default: Status.active})
    appointmentStatus: Status
    
    @CreateDateColumn()
    creatAt: Date
    
    @UpdateDateColumn()
    upDate: Date
}
