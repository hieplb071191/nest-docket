import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: String, nullable: false, length: 25})
    username: string;

    @Column({type: String, nullable: false, length: 25})
    email: string;

    @Column({type: String, nullable: true})
    password: string;

    @Column({ type: String, nullable: true})
    address: string;

    @Column({ type: Date, nullable: true})
    dob: Date;

    @Column({ type: Boolean, default: false })
    isTwoFA: boolean
}