import { IsString, Length } from 'class-validator';

export class CreateLinhaDto {
  @IsString()
  @Length(1, 10)
  codigo: string;

  @IsString()
  @Length(1, 255)
  nome: string;

  @IsString()
  @Length(7, 7)
  cor: string;
}