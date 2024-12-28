import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateViagemDto {
  @ApiProperty({ description: 'ID da linha associada', example: 317 })
  @IsNotEmpty()
  @IsNumber()
  linha_id: number;

  @ApiProperty({ description: 'Nome da viagem', example: 'Terminal Aterro/ 2 de Setembro/ R. das Missões/ Terminal Fonte' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Caminho em formato Polyline', example: 'nd_cDz~sjHFiCr@GL...' })
  @IsNotEmpty()
  @IsString()
  caminho: string;
}
