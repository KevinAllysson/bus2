import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Viagem } from './viagens.entity';
import { ViagemService } from './viagem.service';
import { ViagemController } from './viagens.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Viagem])],
  providers: [ViagemService],
  controllers: [ViagemController],
  exports: [ViagemService, TypeOrmModule], 
})
export class ViagemModule {}
