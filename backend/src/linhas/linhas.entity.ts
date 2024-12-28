import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Viagem } from '../viagens/viagens.entity';

@Entity('linhas')
export class Linha {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @Column()
  nome: string;

  @Column()
  cor: string;

  // Relacionamento com Viagens
  @OneToMany(() => Viagem, (viagem) => viagem.linha, { cascade: true })
  viagens: Viagem[];
}
