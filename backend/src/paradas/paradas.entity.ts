import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('paradas')
export class Parada {
  @PrimaryColumn()
  viagem_id: number;

  @PrimaryColumn()
  sequencia: number;

  @Column()
  parada_id: number; 

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  longitude: number;

  @Column({ length: 255 })
  nome_parada: string;
}
