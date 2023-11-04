import { Users } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Addresses {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: String,
        nullable: false,
    })
    province: string;

    @Column({
        type: String,
        nullable: false,
    })
    district: string;

    @Column({
        type: String,
        nullable: false,
    })
    ward: string;

    @Column({
        type: String,
    })
    specifically: string;

    @Column({
        type: String,
    })
    lat: string;


    @Column({
        type: String,
    })
    long: string;

    @Column({
        type: String
    })
    userId: string;

    @ManyToOne((type) => Users, users => users.address)
    @JoinColumn({
        name: 'userId'
    })
    users: Users
}