import { Test, TestingModule } from '@nestjs/testing';
import { LogsAccesoController } from './logs-acceso.controller';

describe('LogsAccesoController', () => {
  let controller: LogsAccesoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogsAccesoController],
    }).compile();

    controller = module.get<LogsAccesoController>(LogsAccesoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
