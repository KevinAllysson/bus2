import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Viagem } from './viagens.entity';

@Injectable()
export class ViagemService {
    constructor(
        @InjectRepository(Viagem)
        private readonly viagemRepository: Repository<Viagem>,
    ) { }

    // Busca todas as viagens
    findAll(): Promise<Viagem[]> {
        return this.viagemRepository.find();
    }

    // Busca viagens por linha
    findByLinhaId(linhaId: number): Promise<Viagem[]> {
        return this.viagemRepository.find({
            where: { linhaId },
        });
    }

    // Busca viagens por ponto de parada (lat, lng)
    async findByParada(lat: number, lng: number): Promise<Viagem[]> {
        return this.viagemRepository
            .createQueryBuilder('viagem')
            .where(`JSON_CONTAINS(viagem.paradas, JSON_OBJECT('lat', :lat, 'lng', :lng))`, {
                lat,
                lng,
            })
            .getMany();
    }

    // Busca uma viagem por ID
    async findOne(id: number): Promise<Viagem> {
        const viagem = await this.viagemRepository.findOne({ where: { id } });
        if (!viagem) {
            throw new NotFoundException('Viagem não encontrada');
        }
        return viagem;
    }
}
