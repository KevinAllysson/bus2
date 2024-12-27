import {
    Controller, Get, Post, Body, Param, Delete, Put, Query, NotFoundException, BadRequestException
} from '@nestjs/common';
import { LinhasService } from './linhas.service';
import { ViagemService } from '../viagens/viagem.service';
import { CreateLinhaDto } from './dto/create-linha.dto';
import { UpdateLinhaDto } from './dto/update-linha.dto';
import { CreateViagemDto } from './dto/create-viagem.dto';
import { Linha } from './linhas.entity';
import { ApiTags, ApiOperation, ApiQuery, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Linhas')
@Controller('linhas')
export class LinhasController {
    constructor(
        private readonly linhasService: LinhasService,
        private readonly viagemService: ViagemService, // Injeção de dependência do serviço de viagens
    ) { }

    // Criar uma nova linha
    @Post()
    async create(@Body() createLinhaDto: CreateLinhaDto): Promise<Linha> {
        return this.linhasService.create(createLinhaDto);
    }

    // Atualizar uma linha existente
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateLinhaDto: UpdateLinhaDto) {
        return this.linhasService.update(id, updateLinhaDto);
    }

    // Remover uma linha existente
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.linhasService.remove(id);
    }

    // Listar todas as linhas
    @ApiOperation({ summary: 'Lista todas as linhas' })
    @ApiOkResponse({ description: 'Lista de linhas retornada com sucesso' })
    @Get()
    async findAll(): Promise<Linha[]> {
        return this.linhasService.findAll();
    }

    // Obter detalhes de uma linha pelo ID
    @Get(':id')
    @ApiOperation({ summary: 'Busca uma linha pelo ID' })
    async findOne(@Param('id') id: number): Promise<Linha> {
        const linha = await this.linhasService.findOne(id);
        if (!linha) {
            throw new NotFoundException('Linha não encontrada');
        }
        return linha;
    }

    // Buscar viagens relacionadas a uma linha
    @ApiOperation({ summary: 'Busca viagens relacionadas a uma linha ou todas as viagens' })
    @ApiQuery({ name: 'linhaId', required: false, description: 'ID da linha para filtrar as viagens' })
    @Get('/viagens')
    async findViagens(@Query('linhaId') linhaId: number) {
        if (linhaId) {
            if (isNaN(linhaId)) {
                throw new BadRequestException('O parâmetro linhaId deve ser um número');
            }
            return this.viagemService.findByLinhaId(linhaId);
        }
        return this.viagemService.findAll();
    }

    // Criar uma viagem associada a uma linha
    @Post(':id/viagens')
    async createViagemForLinha(
        @Param('id') id: number,
        @Body() createViagemDto: CreateViagemDto,
    ) {
        createViagemDto.linha_id = id; // Associa o ID da linha ao DTO
        return this.linhasService.createViagem(createViagemDto);
    }

    // Buscar viagens por ponto de parada
    @Get('/paradas/viagens')
    @ApiOperation({ summary: 'Busca viagens que passam por um ponto de parada' })
    async findViagensByParada(
        @Query('lat') lat: number,
        @Query('lng') lng: number,
    ) {
        if (isNaN(lat) || isNaN(lng)) {
            throw new BadRequestException('Os parâmetros lat e lng devem ser números');
        }
        return this.viagemService.findByParada(lat, lng);
    }

    // Obter todas as paradas e o caminho de uma viagem
    @Get(':id/viagens/paradas')
    @ApiOperation({ summary: 'Obtém todas as paradas e o caminho de uma viagem' })
    async getParadasAndCaminho(@Param('id') id: number) {
        const viagem = await this.viagemService.findOne(id);
        if (!viagem) {
            throw new NotFoundException('Viagem não encontrada');
        }

        return {
            caminho: viagem.caminho,
            paradas: viagem.paradas,
        };
    }

    // Obter detalhes de uma linha com viagens
    @Get(':id/detalhes')
    @ApiOperation({ summary: 'Busca detalhes de uma linha e suas viagens' })
    async findLinhaWithViagens(@Param('id') id: number): Promise<any> {
        return this.linhasService.findLinhaWithViagens(id); // Delegação ao serviço
    }
}
