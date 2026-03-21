import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AppointmentDTO } from "../DTO/AppointmentDTO";
import { Credential } from "./CredentialEntity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 25, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: "date", nullable: false })
  birthdate: Date;

  @Column({ type: "int", nullable: false, unique: true })
  nDni: number;

 @OneToOne("Credential", "user", { lazy: true, cascade: true })
credential!: Promise<Credential>;

 @OneToMany("Appointment", "user")
appointments: AppointmentDTO[];

  @CreateDateColumn()
  creatAt: Date;

  @UpdateDateColumn()
  upDate: Date;
}
