import { Column, Entity } from 'typeorm';
import { BaseEntity } from '~base/base.entity';

@Entity()
export class Example extends BaseEntity {
  @Column({
    nullable: false
  })
  someField: string;
}
