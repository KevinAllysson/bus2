import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Linha } from './linhas.entity';
import { Viagem } from '../viagens/viagens.entity';
import { CreateLinhaDto } from './dto/create-linha.dto';
import { CreateViagemDto } from './dto/create-viagem.dto';
import { UpdateLinhaDto } from './dto/update-linha.dto';
import * as polyline from '@mapbox/polyline';

@Injectable()
export class LinhasService {
    constructor(
        @InjectRepository(Linha)
        private readonly linhasRepository: Repository<Linha>,
        @InjectRepository(Viagem)
        private readonly viagensRepository: Repository<Viagem>,
    ) { }

    // Retorna todas as linhas com coordenadas decodificadas
    async findAllWithDecodedCoordinates(): Promise<any[]> {
        const linhas = await this.linhasRepository.find(); // Busca todas as linhas

        const linhasComViagens = await Promise.all(
            linhas.map(async (linha) => {
                const viagens = await this.viagensRepository.find({
                    where: { linhaId: linha.id }, // Use linhaId no código
                });

                // Decodifica os caminhos das viagens
                const viagensComCoordenadas = viagens.map((viagem) => ({
                    id: viagem.id,
                    caminho: this.decodePolyline(viagem.caminho),
                }));

                return {
                    id: linha.id,
                    nome: linha.nome,
                    tarifa: linha.tarifa,
                    nro_pontos: linha.nro_pontos,
                    km: linha.km,
                    viagens: viagensComCoordenadas,
                };
            }),
        );

        return linhasComViagens;
    }

    // Atualiza uma linha existente
    async update(id: number, updateLinhaDto: UpdateLinhaDto): Promise<Linha> {
        const linha = await this.linhasRepository.findOneBy({ id });
        if (!linha) {
            throw new Error('Linha não encontrada');
        }

        Object.assign(linha, updateLinhaDto); // Atualiza apenas os campos fornecidos
        return this.linhasRepository.save(linha);
    }

    async createViagem(createViagemDto: CreateViagemDto): Promise<any> {
        try {
            const { linha_id, caminho } = createViagemDto;
            const linha = await this.linhasRepository.findOneBy({ id: linha_id });
            if (!linha) {
                throw new NotFoundException('Linha não encontrada');
            }
    
            const encodedPath = polyline.encode(caminho.map((coord) => [coord.lat, coord.lng]));
            const novaViagem = this.viagensRepository.create({
                linhaId: linha_id,
                caminho: encodedPath,
                descricao: `Viagem para linha ${linha_id}`,
                paradas: caminho.map((coord, index) => ({
                    lat: coord.lat,
                    lng: coord.lng,
                    nome: `Parada ${index + 1}`,
                })),
            });
    
            return await this.viagensRepository.save(novaViagem);
        } catch (error) {
            console.error('Erro ao criar viagem:', error);
            throw new InternalServerErrorException('Erro ao criar viagem');
        }
    }
    

    // Método para criar uma nova linha
    async create(createLinhaDto: CreateLinhaDto): Promise<Linha> {
        const novaLinha = this.linhasRepository.create(createLinhaDto);
        return this.linhasRepository.save(novaLinha);
    }

    // Método para decodificar Polyline para { lat, lng }
    private decodePolyline(encoded: string): { lat: number; lng: number }[] {
        if (!encoded) return [];
        const coordinates = polyline.decode(encoded); // Decodifica Polyline em [latitude, longitude]
        return coordinates.map(([lat, lng]) => ({ lat, lng }));
    }

    // Retorna todas as linhas
    findAll(): Promise<Linha[]> {
        return this.linhasRepository.find();
    }

    // Retorna uma linha pelo ID
    async findOne(id: number): Promise<Linha> {
        const linha = await this.linhasRepository.findOneBy({ id });
        if (!linha) {
            throw new NotFoundException('Linha não encontrada');
        }
        return linha;
    }
    
    // Remove uma linha pelo ID
    async remove(id: number): Promise<void> {
        await this.linhasRepository.delete(id);
    }

    async findLinhaWithViagens(id: number): Promise<any> {
        try {
            const linha = await this.linhasRepository.findOneBy({ id });
            if (!linha) {
                throw new Error('Linha não encontrada');
            }
            const viagens = await this.viagensRepository.find({ where: { linhaId: id } });
            const viagensComDetalhes = viagens.map((viagem) => ({
                id: viagem.id,
                caminho: this.decodePolyline(viagem.caminho),
                descricao: viagem.descricao,
                paradas: viagem.paradas,
            }));
    
            return {
                linha: {
                    id: linha.id,
                    nome: linha.nome,
                    tarifa: linha.tarifa,
                    nro_pontos: linha.nro_pontos,
                    km: linha.km,
                },
                viagens: viagensComDetalhes,
            };
        } catch (error) {
            console.error('Erro ao buscar linha com viagens:', error);
            throw error;
        }
    }
}
