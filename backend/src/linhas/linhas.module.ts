import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Linha } from './linhas.entity';
import { LinhasService } from './linhas.service';
import { LinhasController } from './linhas.controller';
import { ViagemModule } from '../viagens/viagem.module'; 

@Module({
  imports: [TypeOrmModule.forFeature([Linha]), ViagemModule], 
  providers: [LinhasService],
  controllers: [LinhasController],
})
export class LinhasModule {}
