import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parada } from './paradas.entity';

@Injectable()
export class ParadasService {
  constructor(
    @InjectRepository(Parada)
    private readonly paradaRepository: Repository<Parada>,
  ) {}

  // Criar uma nova parada
  async create(paradaData: Partial<Parada>): Promise<Parada> {
    const parada = this.paradaRepository.create(paradaData);
    return this.paradaRepository.save(parada);
  }

  // Obter todas as paradas
  async findAll(): Promise<Parada[]> {
    return this.paradaRepository.find();
  }

  // Obter uma parada específica
  async findOne(viagem_id: number, sequencia: number): Promise<Parada> {
    return this.paradaRepository.findOne({
      where: { viagem_id, sequencia },
    });
  }

  // Atualizar uma parada
  async update(
    viagem_id: number,
    sequencia: number,
    updateData: Partial<Parada>,
  ): Promise<Parada> {
    await this.paradaRepository.update({ viagem_id, sequencia }, updateData);
    return this.findOne(viagem_id, sequencia);
  }

  // Remover uma parada
  async remove(viagem_id: number, sequencia: number): Promise<void> {
    await this.paradaRepository.delete({ viagem_id, sequencia });
  }

  async findByViagemId(viagemId: number): Promise<Parada[]> {
    return this.paradaRepository.find({
      where: { viagem_id: viagemId },
    });
  }
}
