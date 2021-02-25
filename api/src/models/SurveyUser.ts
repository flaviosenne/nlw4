import { CreateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Column } from 'typeorm';
import { PrimaryColumn } from 'typeorm';
import {v4 as uuid} from 'uuid'
import { Survey } from './Surveys';
import { User } from './User';

@Entity("surveys_users")
class SurveyUser {
    @PrimaryColumn()
    readonly id: String
 
    @ManyToOne(() => User)
    @JoinColumn({name: "user_id"})
    user: User

    @Column()
    user_id: String
    
    @ManyToOne(() => Survey)
    @JoinColumn({name: "survey_id"})
    survey: Survey

    
    @Column()
    survey_id: String
    
    @Column()
    value: Number
    
    @CreateDateColumn()
    created_at: Date

    constructor(){
        if(!this.id) this.id = uuid()
    }
}

export { SurveyUser}