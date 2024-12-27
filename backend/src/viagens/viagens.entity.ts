import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Linha } from '../linhas/linhas.entity';

@Entity('viagens')
export class Viagem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text') // Certifique-se de que 'caminho' é armazenado como TEXT
  caminho: string;

  @Column({ name: 'linha_id' }) // Mapeia a coluna linha_id no banco
  linhaId: number;

  @ManyToOne(() => Linha, (linha) => linha.viagens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'linha_id' }) // Define a coluna de junção explicitamente
  linha: Linha;

  @Column({ nullable: true })
  descricao: string; // Coluna opcional para descrever a viagem (se necessário).

  @Column('simple-json', { nullable: true }) // Coluna para armazenar as paradas em formato JSON
  paradas: { lat: number; lng: number; nome: string }[];
}
