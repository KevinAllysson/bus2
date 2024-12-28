import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Viagem } from '../viagens/viagens.entity';

@Entity('paradas')
export class Parada {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  viagem_id: number;

  @Column()
  sequencia: number;

  @Column()
  parada_id: number;

  @Column('decimal', { precision: 9, scale: 6 })
  latitude: number;

  @Column('decimal', { precision: 9, scale: 6 })
  longitude: number;

  @Column()
  nome_parada: string;

  @ManyToOne(() => Viagem, (viagem) => viagem.paradas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'viagem_id' })
  viagem: Viagem;
}