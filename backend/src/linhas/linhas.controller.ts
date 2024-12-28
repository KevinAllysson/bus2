import {
    Controller, Get, Post, Body, Param, Delete, Put, Query, NotFoundException, BadRequestException
} from '@nestjs/common';
import { LinhasService } from './linhas.service';
import { ViagemService } from '../viagens/viagem.service';
import { CreateLinhaDto } from './dto/create-linha.dto';
import { UpdateLinhaDto } from './dto/update-linha.dto';
import { Linha } from './linhas.entity';
import { ApiTags, ApiOperation, ApiQuery, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Linhas')
@Controller('linhas')
export class LinhasController {
    constructor(
        private readonly linhasService: LinhasService,
        private readonly viagemService: ViagemService, // Injeção de dependência do serviço de viagens
    ) { }

    @ApiOperation({ summary: 'Cria uma nova linha' })
    @Post()
    @ApiOperation({ summary: 'Substitui todas as linhas existentes e adiciona novas linhas' })
    async replaceAll(@Body() createLinhaDtos: CreateLinhaDto[]): Promise<Linha[]> {
      return this.linhasService.create(createLinhaDtos);
    }

    @ApiOperation({ summary: 'Atualiza uma linha existente' })
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateLinhaDto: UpdateLinhaDto): Promise<Linha> {
        return this.linhasService.update(id, updateLinhaDto);
    }

    @ApiOperation({ summary: 'Lista todas as linhas' })
    @ApiOkResponse({ description: 'Lista de linhas retornada com sucesso' })
    @Get(':id/viagens')
    async findViagensByLinha(@Param('id') linhaId: number) {
      return this.viagemService.findByLinhaId(linhaId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove uma linha existente' })
    async remove(@Param('id') id: number): Promise<void> {
        const linha = await this.linhasService.findOne(id);
        if (!linha) {
            throw new NotFoundException('Linha não encontrada');
        }
        await this.linhasService.remove(id);
    }
}
