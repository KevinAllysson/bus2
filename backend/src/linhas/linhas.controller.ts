import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LinhasService } from './linhas.service';
import { Linha } from './linhas.entity';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Linhas')
@Controller('linhas')
export class LinhasController {
  constructor(private readonly linhasService: LinhasService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova linha', description: 'Adiciona uma nova linha ao sistema.' })
  async create(@Body() linhaData: Partial<Linha>): Promise<Linha> {
    return this.linhasService.create(linhaData);
  }

  @Get()
  @ApiOperation({ summary: 'Obtém todas as linhas', description: 'Retorna a lista de todas as linhas cadastradas.' })
  async findAll(): Promise<Linha[]> {
    return this.linhasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém uma linha por ID', description: 'Retorna os detalhes de uma linha específica.' })
  @ApiParam({ name: 'id', description: 'ID da linha a ser buscada', type: Number })
  async findOne(@Param('id') id: number): Promise<Linha> {
    return this.linhasService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma linha por ID', description: 'Atualiza os dados de uma linha específica.' })
  @ApiParam({ name: 'id', description: 'ID da linha a ser atualizada', type: Number })
  async update(@Param('id') id: number, @Body() updateData: Partial<Linha>): Promise<Linha> {
    return this.linhasService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma linha por ID', description: 'Remove uma linha específica do sistema.' })
  @ApiParam({ name: 'id', description: 'ID da linha a ser removida', type: Number })
  async remove(@Param('id') id: number): Promise<void> {
    return this.linhasService.remove(id);
  }
}
