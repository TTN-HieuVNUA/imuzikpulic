import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const BANNER_PACKAGE_ACTIVE = 1;

@Entity('vt_banner_package', { schema: 'imuzikp3' })
@ObjectType()
export class BannerPackage {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @Field(() => ID)
  id: number;

  @Column('int', { name: 'package_id', nullable: true })
  @Field(() => Number, { nullable: true })
  packageId: number | null;

  @Column('varchar', { name: 'name', comment: 'Tên banner', length: 255 })
  @Field(() => String)
  name: string;

  @Column('int', { name: 'brand_id', nullable: true })
  @Field(() => String, { nullable: true })
  brandId: number | null;

  @Column('tinyint', { name: 'is_active', nullable: true, width: 1 })
  isActive: number | null;

  @Column('varchar', { name: 'price', nullable: true, length: 25 })
  @Field(() => String, { nullable: true })
  price: string | null;

  @Column('varchar', { name: 'period', nullable: true, length: 25 })
  @Field(() => String, { nullable: true })
  period: string | null;

  @Column('varchar', { name: 'note', nullable: true, length: 255 })
  @Field(() => String, { nullable: true })
  note: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  @Field(() => Date, { nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  @Field(() => Date, { nullable: true })
  updatedAt: Date | null;
}
