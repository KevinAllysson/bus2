import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parada } from './paradas.entity';
import { Viagem } from '../viagens/viagens.entity';
import { ParadasService } from './paradas.service';
import { ParadasController } from './paradas.controller';
import { ViagemModule } from '../viagens/viagem.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parada]), 
    ViagemModule, // Certifique-se de importar o módulo de Viagens
  ],
  providers: [ParadasService],
  controllers: [ParadasController],
})
export class ParadasModule {}
