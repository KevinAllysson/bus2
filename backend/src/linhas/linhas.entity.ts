import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('linhas')
export class Linha {
  @PrimaryColumn()
  id: number; 

  @Column({ length: 10 })
  codigo: string;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 7 })
  cor: string;
}