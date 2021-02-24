import { CreateDateColumn, Entity } from 'typeorm';
import { Column } from 'typeorm';
import { PrimaryColumn } from 'typeorm';
import {v4 as uuid} from 'uuid'

@Entity("surveys")
class Survey {
    @PrimaryColumn()
    readonly id: String
 
    @Column()
    title: String
    
    @Column()
    description: String
    
    @CreateDateColumn()
    created_at: Date

    constructor(){
        if(!this.id) this.id = uuid()
    }
}

export { Survey}