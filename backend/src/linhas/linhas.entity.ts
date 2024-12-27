import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Viagem } from '../viagens/viagens.entity';

@Entity('linhas') // Certifique-se de que o nome da tabela corresponde ao nome correto no banco
export class Linha {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('decimal', { precision: 5, scale: 2, default: 0.0 })
  tarifa: number;

  @Column('int', { default: 0 })
  nro_pontos: number;

  @Column('decimal', { precision: 6, scale: 2, default: 0.0 })
  km: number;

  @Column({ nullable: true })
  img: string; // Adicionada a coluna 'img', caso ainda não esteja presente.

  // Relacionamento com Viagem
  @OneToMany(() => Viagem, (viagem) => viagem.linha, { cascade: true })
  viagens: Viagem[];
}
