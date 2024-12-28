import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLinhaDto {
  @ApiProperty({ description: 'ID da linha', example: 261 })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'Código da linha', example: '10' })
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ description: 'Nome da linha', example: 'Troncal - Via Rua São Paulo' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Cor representativa da linha', example: '#dfb500' })
  @IsNotEmpty()
  @IsString()
  cor: string;
}
