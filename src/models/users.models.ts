import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import bcrypt from 'bcrypt';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    name!: string;

    @Column()
    age!: number;

    @Column()
    country!: string;

    @Column({ type: 'varchar', length: 30, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 100 })
    password!: string;

    // @Column({ type: 'varchar', length: 100 })
    // encripted_password!: string;

    @Column({ type: 'varchar', length: 50 })
    job_occupation!: string;

    // hashPassword () {
    //     const salt = bcrypt.genSaltSync(10)
    //     this.password = bcrypt.hashSync(this.password, salt)
    // }

    // checkIfPasswordMatch(unencryptedPassword: string) {
    //     return bcrypt.compareSync(unencryptedPassword, this.password);
    // }
}