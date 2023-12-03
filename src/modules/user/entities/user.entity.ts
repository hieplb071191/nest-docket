import { userSigninTypeEnum } from "../../../Common/user-type.enum";
import { Addresses } from "../../../modules/address/entities/address.entity";
import { Categories } from "../../../modules/category/entities/category.entity";
import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn, VirtualColumn } from "typeorm";

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

    @Column({ type: String, default: userSigninTypeEnum.SYSTEM})
    loginSystem: string;

    @Column({ type: Boolean, default: false})
    isConfirm: boolean

    @OneToMany((type) => Categories, (category) => category.users)
    @JoinColumn({
        name: 'id'
    })
    categories: Categories[]


    @VirtualColumn({
        query: (alias) => null,
        type: 'float'
    })
    distance: string

    @OneToOne((type) => Addresses)
    @JoinColumn({
        name: 'userId',
    })
    addresses: Addresses
}