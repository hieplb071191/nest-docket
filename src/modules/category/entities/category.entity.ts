import { Users } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Categories {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: String, nullable: false})
    title: string;

    @Column({ type: String})
    slug: string;

    @Column({ type: Date, default: new Date()})
    createdAt: Date;

    @Column({ type: Date, default: new Date()})
    updated: Date;
    
    @Column({ type: String, nullable: false})
    createdBy

    @ManyToOne((type) => Users)
    @JoinColumn({
        name: 'createdBy'
    })
    users: Users
}