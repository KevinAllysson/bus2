import { Test, TestingModule } from '@nestjs/testing';
import { LinhasController } from './linhas.controller';
import { LinhasService } from './linhas.service';

describe('LinhasController', () => {
  let controller: LinhasController;
  let service: LinhasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinhasController],
      providers: [
        {
          provide: LinhasService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([{ id: 1, nome: 'Linha Azul' }]),
            findOne: jest.fn().mockResolvedValue({ id: 1, nome: 'Linha Azul' }),
          },
        },
      ],
    }).compile();

    controller = module.get<LinhasController>(LinhasController);
    service = module.get<LinhasService>(LinhasService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar uma lista de linhas', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([{ id: 1, nome: 'Linha Azul' }]);
    });
  });

  describe('findOne', () => {
    it('deve retornar uma linha pelo ID', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual({ id: 1, nome: 'Linha Azul' });
    });
  });
});