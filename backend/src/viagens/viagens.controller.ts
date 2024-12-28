import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ViagemService } from './viagem.service';
import { CreateViagemDto } from './dto/create-viagem.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Viagem } from './viagens.entity';

@ApiTags('Viagens') // Esse decorador garante que as APIs de viagens apareçam no Swagger
@Controller('viagens')
export class ViagemController {
  constructor(private readonly viagemService: ViagemService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova viagem' })
  @ApiResponse({ status: 201, description: 'Viagem criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() createViagemDto: CreateViagemDto): Promise<Viagem> {
    return this.viagemService.create(createViagemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as viagens' })
  @ApiResponse({ status: 200, description: 'Lista de viagens retornada com sucesso.' })
  async findAll(): Promise<Viagem[]> {
    return this.viagemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma viagem pelo ID' })
  @ApiResponse({ status: 200, description: 'Detalhes da viagem retornados com sucesso.' })
  @ApiResponse({ status: 404, description: 'Viagem não encontrada.' })
  async findOne(@Param('id') id: number): Promise<Viagem> {
    return this.viagemService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma viagem existente' })
  @ApiResponse({ status: 200, description: 'Viagem atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Viagem não encontrada.' })
  async update(@Param('id') id: number, @Body() updateViagemDto: CreateViagemDto): Promise<Viagem> {
    return this.viagemService.update(id, updateViagemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma viagem' })
  @ApiResponse({ status: 204, description: 'Viagem removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Viagem não encontrada.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.viagemService.remove(id);
  }
}
