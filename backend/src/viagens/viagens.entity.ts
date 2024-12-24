import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Linha } from '../linhas/linhas.entity';

@Entity()
export class Viagem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  linha_id: number;

  @Column('text')
  caminho: string;

  // Relacionamento com Linha
  @ManyToOne(() => Linha, (linha) => linha.viagens, { onDelete: 'CASCADE' })
  linha: Linha;
}
