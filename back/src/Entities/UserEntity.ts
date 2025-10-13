import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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
credential!: Promise<any>;

 @OneToMany("Appointment", "user")
appointments: any[];

  @CreateDateColumn()
  creatAt: Date;

  @UpdateDateColumn()
  upDate: Date;
}
