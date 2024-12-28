import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Viagem } from '../viagens/viagens.entity'; // Relacione com a tabela de viagens

@Entity('paradas')
export class Parada {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column('decimal', { precision: 10, scale: 6 })
    lat: number;

    @Column('decimal', { precision: 10, scale: 6 })
    lng: number;

    @ManyToOne(() => Viagem, (viagem) => viagem.paradas, { nullable: true })
    viagem: Viagem;
    
    @Column({ nullable: true })
    viagemId: number;
}
