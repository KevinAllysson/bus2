import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLinhaDto {
    @ApiProperty({ description: 'Nome da linha', example: 'Linha Azul' })
    @IsNotEmpty()
    @IsString()
    nome: string;

    @ApiProperty({ description: 'Descrição da linha', example: 'Linha que conecta o centro à zona sul', required: false })
    @IsOptional()
    @IsString()
    descricao?: string;

    @ApiProperty({ description: 'Tarifa da linha', example: 3.5 })
    @IsNotEmpty()
    @IsNumber()
    tarifa: number;

    @ApiProperty({ description: 'Número de pontos de parada', example: 16, required: false })
    @IsOptional()
    @IsNumber()
    nro_pontos?: number;

    @ApiProperty({ description: 'Extensão da linha em quilômetros', example: 20.0 })
    @IsNotEmpty()
    @IsNumber()
    km: number;
}
