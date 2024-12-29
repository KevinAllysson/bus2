import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ParadasService } from './paradas.service';
import { Parada } from './paradas.entity';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Paradas')
@Controller('paradas')
export class ParadasController {
  constructor(private readonly paradasService: ParadasService) { }

  @Post()
  @ApiOperation({ summary: 'Cria uma nova parada', description: 'Adiciona uma nova parada ao sistema.' })
  async create(@Body() paradaData: Partial<Parada>): Promise<Parada> {
    return this.paradasService.create(paradaData);
  }

  @Get()
  @ApiOperation({ summary: 'Obtém todas as paradas', description: 'Retorna a lista de todas as paradas cadastradas.' })
  async findAll(): Promise<Parada[]> {
    return this.paradasService.findAll();
  }

  @Get(':viagem_id/:sequencia')
  @ApiOperation({ summary: 'Obtém uma parada específica', description: 'Retorna os detalhes de uma parada específica.' })
  @ApiParam({ name: 'viagem_id', description: 'ID da viagem associada', type: Number })
  @ApiParam({ name: 'sequencia', description: 'Número da sequência da parada', type: Number })
  async findOne(
    @Param('viagem_id') viagem_id: number,
    @Param('sequencia') sequencia: number,
  ): Promise<Parada> {
    return this.paradasService.findOne(viagem_id, sequencia);
  }

  @Put(':viagem_id/:sequencia')
  @ApiOperation({ summary: 'Atualiza uma parada', description: 'Atualiza os dados de uma parada específica.' })
  @ApiParam({ name: 'viagem_id', description: 'ID da viagem associada', type: Number })
  @ApiParam({ name: 'sequencia', description: 'Número da sequência da parada', type: Number })
  async update(
    @Param('viagem_id') viagem_id: number,
    @Param('sequencia') sequencia: number,
    @Body() updateData: Partial<Parada>,
  ): Promise<Parada> {
    return this.paradasService.update(viagem_id, sequencia, updateData);
  }

  @Delete(':viagem_id/:sequencia')
  @ApiOperation({ summary: 'Remove uma parada', description: 'Remove uma parada específica do sistema.' })
  @ApiParam({ name: 'viagem_id', description: 'ID da viagem associada', type: Number })
  @ApiParam({ name: 'sequencia', description: 'Número da sequência da parada', type: Number })
  async remove(
    @Param('viagem_id') viagem_id: number,
    @Param('sequencia') sequencia: number,
  ): Promise<void> {
    return this.paradasService.remove(viagem_id, sequencia);
  }

  @Get('viagem/:viagemId')
  @ApiOperation({
    summary: 'Obter todas as paradas de uma viagem',
    description: 'Retorna todas as paradas associadas a um viagem_id específico.',
  })
  @ApiParam({ name: 'viagemId', description: 'ID da viagem', required: true })
  async findParadasByViagemId(@Param('viagemId') viagemId: number): Promise<Parada[]> {
    return this.paradasService.findByViagemId(viagemId);
  }
}
