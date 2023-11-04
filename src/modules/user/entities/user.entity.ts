import { userSigninTypeEnum } from "src/Common/user-type.enum";
import { Addresses } from "src/modules/address/entities/address.entity";
import { Categories } from "src/modules/category/entities/category.entity";
import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany((type) => Addresses, (address) => address.users)
    @JoinColumn({
        name: 'id'
    })
    addresses: Addresses[]
}