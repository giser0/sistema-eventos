import { Test, TestingModule } from '@nestjs/testing';
import { ServiciosExtraService } from './servicios-extra.service';

describe('ServiciosExtraService', () => {
  let service: ServiciosExtraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiciosExtraService],
    }).compile();

    service = module.get<ServiciosExtraService>(ServiciosExtraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
