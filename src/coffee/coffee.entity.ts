import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @ApiProperty({
    type: String,
    description: '咖啡名称',
  })
  @Column()
  @IsNotEmpty()
  coffeeName: string;
}
