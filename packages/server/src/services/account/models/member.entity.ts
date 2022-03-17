import { Field, ID, ObjectType } from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay';
import sha1 = require('sha1');
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { Node } from '../../../api/nodes';

@Index('username', ['username'], { unique: true })
@Index('email', ['email'], { unique: true })
@Index('phoneNumber', ['phoneNumber'], { unique: true })
@Index('province_id_idx', ['provinceId'], {})
@Entity('vt_member', { schema: 'imuzikp3' })
@ObjectType({ implements: Node })
export class Member {
  static TYPE = 'USER';
  @Field(() => ID, { name: 'id' })
  get relayId() {
    return toGlobalId(Member.TYPE, this.id);
  }

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', {
    name: 'username',
    nullable: true,
    unique: true,
    length: 255,
  })
  @Field(() => String, { nullable: true })
  username: string | null;

  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @Column('varchar', { name: 'fullname', nullable: true, length: 255 })
  @Field(() => String, { nullable: true })
  fullName: string | null;

  @Column('varchar', {
    name: 'email',
    nullable: true,
    unique: true,
    length: 255,
  })
  email: string | null;

  @Column('varchar', {
    name: 'phonenumber',
    nullable: true,
    unique: true,
    length: 20,
  })
  phoneNumber: string | null;

  @Column('date', { name: 'birthday', nullable: true })
  @Field(() => Date, { nullable: true })
  birthday: Date | null;

  @Column('tinyint', { name: 'sex', nullable: true, default: () => "'0'" })
  sex: number | null;

  @Column('tinyint', { name: 'actived', default: () => "'0'" })
  actived: number;

  @Column('tinyint', { name: 'locked', width: 1, default: () => "'0'" })
  locked: boolean;

  @Column('bigint', { name: 'province_id', nullable: true })
  provinceId: string | null;

  @Column('bigint', { name: 'credit', default: () => "'1'" })
  credit: string;

  @Column('varchar', { name: 'image_path', nullable: true, length: 255 })
  imagePath: string | null;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('int', { name: 'is_first_login', default: () => "'1'" })
  isFirstLogin: number;

  @Column('varchar', { name: 'avatar_image', nullable: true, length: 255 })
  avatarImage: string | null;

  @Column('varchar', { name: 'address', nullable: true, length: 255 })
  @Field(() => String, { nullable: true })
  address: string | null;

  @Field(() => String, { nullable: true })
  get displayMsisdn() {
    return (
      '0' +
      this.username?.substr(0, this.username.length - 7) +
      'xxxxxx' +
      this.username?.[this.username.length - 1]
    );
  }

  validatePassword(givenPassword: string) {
    return Member.generatePasswordHash(this.username+givenPassword) === this.password;
  }

  static generatePasswordHash(givenPassword: string) {
    return sha1(givenPassword);
  }
}
