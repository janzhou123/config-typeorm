import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: '咖啡名称',
  })
  @Column()
  coffeeName: string;
}
