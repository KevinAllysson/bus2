import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parada } from './paradas.entity';
import { Viagem } from '../viagens/viagens.entity';
import { CreateParadaDto } from './dto/create-parada.dto';

@Injectable()
export class ParadasService {
  constructor(
    @InjectRepository(Parada)
    private readonly paradasRepository: Repository<Parada>,
    @InjectRepository(Viagem) // Injete o repositório de Viagem
    private readonly viagemRepository: Repository<Viagem>,
  ) {}

  async findByViagem(viagem_id: number): Promise<Parada[]> {
    return this.paradasRepository.find({
      where: { viagem_id },
    });
  }

  async createParada(createParadaDto: CreateParadaDto): Promise<Parada> {
    const viagem = await this.viagemRepository.findOneBy({ id: createParadaDto.viagem_id });
  
    if (!viagem) {
      throw new NotFoundException('Viagem não encontrada');
    }
  
    const novaParada = this.paradasRepository.create(createParadaDto);
    return this.paradasRepository.save(novaParada);
  }
}
