import { Test, TestingModule } from '@nestjs/testing';
import { Ec2Controller } from './ec2.controller';

describe('Ec2Controller', () => {
  let controller: Ec2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Ec2Controller],
    }).compile();

    controller = module.get<Ec2Controller>(Ec2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
