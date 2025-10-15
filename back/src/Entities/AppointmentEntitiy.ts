import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Status } from "../DTO/AppointmentDTO.js";
import { UserDTO } from "../DTO/UserDTO.js";

@Entity("appointment")
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date", nullable: false })
  date: Date;

  @Column({ type: "varchar", length: 5, nullable: false })
  time: string;

  @ManyToOne("User", "appointment", { nullable: true })
  user: UserDTO;

  @Column({
    type: "varchar",
    length: 10,
    nullable: false,
    default: Status.active,
  })
  appointmentStatus: Status;

  @CreateDateColumn()
  creatAt: Date;

  @UpdateDateColumn()
  upDate: Date;
}
