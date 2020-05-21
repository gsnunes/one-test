import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './user.entity';

@ObjectType()
@Entity({ name: 'initiatives' })
export default class Initiative {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column('text')
  description: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field()
  @Column({ name: 'user_id' })
  userId: number;

  @Field(() => User)
  user: User;

  // Associations
  @ManyToOne(() => User, (user) => user.initiativeConnection, { primary: true })
  @JoinColumn({ name: 'user_id' })
  userConnection: Promise<User>;
}
