import { Test, TestingModule } from '@nestjs/testing';
import { ServiciosExtraController } from './servicios-extra.controller';

describe('ServiciosExtraController', () => {
  let controller: ServiciosExtraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiciosExtraController],
    }).compile();

    controller = module.get<ServiciosExtraController>(ServiciosExtraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
