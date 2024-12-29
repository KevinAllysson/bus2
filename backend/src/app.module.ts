import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinhasModule } from './linhas/linhas.module';
import { ParadasModule } from './paradas/paradas.module';
import { ViagemModule } from './viagens/viagem.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'bus2',
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    LinhasModule,
    ParadasModule,
    ViagemModule,
  ],
})
export class AppModule {}