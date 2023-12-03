import { Injectable } from "@nestjs/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: Date, default: new Date()})
    createdAt: Date;

    @Column({type: Date, default: new Date()})
    updatedAt: Date;

    @Column({type: String, nullable: false})
    createdBy: string;

    @Column({type: String, nullable: false})
    updatedBy: string;
}