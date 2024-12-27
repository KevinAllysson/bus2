import { Test, TestingModule } from '@nestjs/testing';
import { ViagemService } from './viagem.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Viagem } from './viagens.entity';

describe('ViagemService', () => {
  let service: ViagemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ViagemService,
        {
          provide: getRepositoryToken(Viagem),
          useValue: {
            find: jest.fn().mockResolvedValue([{ id: 1, caminho: 'path' }]),
            findOne: jest.fn().mockResolvedValue({ id: 1, caminho: 'path' }),
          },
        },
      ],
    }).compile();

    service = module.get<ViagemService>(ViagemService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar todas as viagens', async () => {
      const result = await service.findAll();
      expect(result).toEqual([{ id: 1, caminho: 'path' }]);
    });
  });

  describe('findOne', () => {
    it('deve retornar uma viagem pelo ID', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual({ id: 1, caminho: 'path' });
    });
  });
});