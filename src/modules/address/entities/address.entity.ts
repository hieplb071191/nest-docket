import { Users } from "../../../modules/user/entities/user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, VirtualColumn } from "typeorm";


@Entity()
@Index(['lat', 'long'], {unique: true})
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
        type: "real",
        select: false,
    })
    lat: number;


    @Column({
        type: "real",
        select: false,
    })
    long: number;

    @Column({
        type: String
    })
    userId: string;

    @VirtualColumn({
        query: (alias) => alias
    })
    distance: number

    @OneToOne((type) => Users)
    @JoinColumn({
        name: 'userId',
    })
    users: Users
}