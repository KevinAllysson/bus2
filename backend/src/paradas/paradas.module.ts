import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParadasController } from './paradas.controller';
import { ParadasService } from './paradas.service';
import { Parada } from './paradas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parada])],
  controllers: [ParadasController],
  providers: [ParadasService],
  exports: [ParadasService],
})
export class ParadasModule {}
