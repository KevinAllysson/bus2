import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Viagem } from '../viagens/viagens.entity';

@Entity()
export class Linha {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  descricao: string;

  // Relacionamento com Viagem
  @OneToMany(() => Viagem, (viagem) => viagem.linha)
  viagens: Viagem[];
}
