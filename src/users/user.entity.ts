import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

const tableName = 'users';
@Entity({
  name: tableName,
})
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: String, format: 'email' })
  @Column({ type: 'varchar', unique: true })
  email: string;

  //Relations
}
