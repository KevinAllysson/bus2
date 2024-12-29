import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('viagens')
export class Viagem {
  @PrimaryColumn()
  id: number;

  @Column()
  linha_id: number;

  @Column({ length: 255 })
  nome: string;

  @Column('text') 
  caminho: string;
}