import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateLinhaDto } from './create-linha.dto';

export class UpdateLinhaDto extends PartialType(CreateLinhaDto) {
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    nro_pontos?: number;
  }
