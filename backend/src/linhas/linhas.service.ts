import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Linha } from './linhas.entity';

@Injectable()
export class LinhasService {
  constructor(
    @InjectRepository(Linha)
    private readonly linhaRepository: Repository<Linha>,
  ) {}

  // Criar uma nova linha
  async create(linhaData: Partial<Linha>): Promise<Linha> {
    const linha = this.linhaRepository.create(linhaData);
    return this.linhaRepository.save(linha);
  }

  // Obter todas as linhas
  async findAll(): Promise<Linha[]> {
    return this.linhaRepository.find();
  }

  // Obter uma linha por ID
  async findOne(id: number): Promise<Linha> {
    return this.linhaRepository.findOne({ where: { id } });
  }

  // Atualizar uma linha
  async update(id: number, updateData: Partial<Linha>): Promise<Linha> {
    await this.linhaRepository.update(id, updateData);
    return this.findOne(id);
  }

  // Remover uma linha
  async remove(id: number): Promise<void> {
    await this.linhaRepository.delete(id);
  }
}
