import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Linha } from '../linhas/linhas.entity';
import { Parada } from '../paradas/paradas.entity';

@Entity('viagens')
export class Viagem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  linha_id: number;

  @Column()
  nome: string;

  @Column('text')
  caminho: string;

  @ManyToOne(() => Linha, (linha) => linha.viagens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'linha_id' })
  linha: Linha;

  // Relacionamento com Paradas
  @OneToMany(() => Parada, (parada) => parada.viagem, { cascade: true })
  paradas: Parada[];
}
