import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Viagem } from './viagens.entity';

@Injectable()
export class ViagensService {
  constructor(
    @InjectRepository(Viagem)
    private readonly viagemRepository: Repository<Viagem>,
  ) { }

  // Criar uma nova viagem
  async create(viagemData: Partial<Viagem>): Promise<Viagem> {
    const viagem = this.viagemRepository.create(viagemData);
    return this.viagemRepository.save(viagem);
  }

  async findAll(): Promise<Viagem[]> {
    try {
      return await this.viagemRepository.find();
    } catch (error) {
      console.error('Erro ao buscar viagens:', error); 
      throw error; 
    }
  }

  // Obter uma viagem por ID
  async findOne(linha_id: number): Promise<Viagem> {
    return this.viagemRepository.findOne({ where: { linha_id } });
  }

  // Atualizar uma viagem
  async update(id: number, updateData: Partial<Viagem>): Promise<Viagem> {
    await this.viagemRepository.update(id, updateData);
    return this.findOne(id);
  }

  // Remover uma viagem
  async remove(id: number): Promise<void> {
    await this.viagemRepository.delete(id);
  }

  async findByLinhaId(linhaId: number): Promise<Viagem[]> {
    return this.viagemRepository.find({ where: { linha_id: linhaId } });
  }
  
}
