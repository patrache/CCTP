import { Test, TestingModule } from '@nestjs/testing';
import { Ec2Service } from './ec2.service';

describe('Ec2Service', () => {
  let service: Ec2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Ec2Service],
    }).compile();

    service = module.get<Ec2Service>(Ec2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
