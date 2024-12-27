import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinhasModule } from './linhas/linhas.module';
import { Viagem } from './viagens/viagens.entity';
import { Linha } from './linhas/linhas.entity';
import { ParadasModule } from './paradas/paradas.module';

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
      synchronize: true, // Use apenas em desenvolvimento!
    }),
    LinhasModule,
    ParadasModule,
  ],
})
export class AppModule {}
