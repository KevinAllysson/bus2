import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ViagensService } from './viagem.service';
import { Viagem } from './viagens.entity';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Viagens')
@Controller('viagens')
export class ViagensController {
  constructor(private readonly viagensService: ViagensService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova viagem', description: 'Adiciona uma nova viagem ao sistema.' })
  async create(@Body() viagemData: Partial<Viagem>): Promise<Viagem> {
    return this.viagensService.create(viagemData);
  }

  @Get()
  @ApiOperation({ summary: 'Obtém todas as viagens', description: 'Retorna uma lista de todas as viagens disponíveis no sistema.' })
  async findAll(): Promise<Viagem[]> {
    try {
      return await this.viagensService.findAll();
    } catch (error) {
      console.error('Erro no controlador de viagens:', error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtém uma viagem por ID',
    description: 'Retorna os detalhes de uma viagem específica com base no ID fornecido.',
  })
  @ApiParam({ name: 'id', description: 'ID da viagem a ser buscada', type: Number })
  async findOne(@Param('id') id: number): Promise<Viagem> {
    return this.viagensService.findOne(id);
  }

  @Get('linha/:linhaId') 
  @ApiOperation({
    summary: 'Obter viagens por linha',
    description: 'Retorna uma lista de viagens relacionadas ao ID da linha fornecida.',
  })
  @ApiParam({
    name: 'linhaId',
    description: 'ID da linha para buscar as viagens associadas',
    required: true,
    schema: { type: 'integer' },
  })
  async findByLinhaId(@Param('linhaId') linhaId: number): Promise<Viagem[]> {
    return this.viagensService.findByLinhaId(linhaId); 
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualiza uma viagem por ID',
    description: 'Atualiza as informações de uma viagem existente com base no ID fornecido.',
  })
  @ApiParam({ name: 'id', description: 'ID da viagem a ser atualizada', type: Number })
  async update(@Param('id') id: number, @Body() updateData: Partial<Viagem>): Promise<Viagem> {
    return this.viagensService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove uma viagem por ID',
    description: 'Remove uma viagem específica do sistema com base no ID fornecido.',
  })
  @ApiParam({ name: 'id', description: 'ID da viagem a ser removida', type: Number })
  async remove(@Param('id') id: number): Promise<void> {
    return this.viagensService.remove(id);
  }
}