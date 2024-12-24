import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateLinhaDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsOptional()
    @IsString()
    descricao?: string;
}