import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Linha } from './linhas.entity';
import { Viagem } from '../viagens/viagens.entity';
import { CreateLinhaDto } from './dto/create-linha.dto';
import { CreateViagemDto } from './dto/create-viagem.dto';
import * as polyline from '@mapbox/polyline';

@Injectable()
export class LinhasService {
    constructor(
        @InjectRepository(Linha)
        private readonly linhasRepository: Repository<Linha>,
        @InjectRepository(Viagem)
        private readonly viagensRepository: Repository<Viagem>,
    ) { }

    // Retorna todas as linhas com coordenadas formatadas
    async findAllWithDecodedCoordinates(): Promise<any[]> {
        const linhas = await this.linhasRepository.find(); // Busca todas as linhas

        const linhasComViagens = await Promise.all(
            linhas.map(async (linha) => {
                // Busca todas as viagens associadas à linha
                const viagens = await this.viagensRepository.find({
                    where: { linha_id: linha.id },
                });

                // Decodifica os caminhos das viagens em coordenadas
                const viagensComCoordenadas = viagens.map((viagem) => ({
                    id: viagem.id,
                    caminho: this.decodePolyline(viagem.caminho),
                }));

                return {
                    id: linha.id,
                    nome: linha.nome,
                    viagens: viagensComCoordenadas,
                };
            }),
        );

        return linhasComViagens;
    }
    async createViagem(createViagemDto: CreateViagemDto): Promise<any> {
        const { linha_id, caminho } = createViagemDto;
        const linha = await this.linhasRepository.findOneBy({ id: linha_id });
        if (!linha) {
            throw new Error('Linha não encontrada');
        }
        const encodedPath = polyline.encode(caminho.map(coord => [coord.lat, coord.lng]));

        const novaViagem = this.viagensRepository.create({
            linha_id,
            caminho: encodedPath,
        });

        return this.viagensRepository.save(novaViagem);
    }

    // Método para decodificar Polyline para { lat, lng }
    private decodePolyline(encoded: string): { lat: number; lng: number }[] {
        if (!encoded) return [];
        const coordinates = polyline.decode(encoded); // Decodifica Polyline em [latitude, longitude]
        return coordinates.map(([lat, lng]) => ({ lat, lng }));
    }

    // Métodos existentes (findAll, findOne, create, remove)

    findAll(): Promise<Linha[]> {
        return this.linhasRepository.find();
    }

    findOne(id: number): Promise<Linha> {
        return this.linhasRepository.findOneBy({ id });
    }

    create(createLinhaDto: CreateLinhaDto): Promise<Linha> {
        const novaLinha = this.linhasRepository.create(createLinhaDto);
        return this.linhasRepository.save(novaLinha);
    }

    async remove(id: number): Promise<void> {
        await this.linhasRepository.delete(id);
    }
}
