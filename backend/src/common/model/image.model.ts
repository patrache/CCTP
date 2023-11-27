import { IsString } from 'class-validator';

export class ImageModel {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  architecture: string;

  @IsString()
  hypervisor: string;

  @IsString()
  virtualizationType: string;

  constructor(id, name, architecture, hypervisor, virtualizationType) {
    this.id = id;
    this.name = name;
    this.architecture = architecture;
    this.hypervisor = hypervisor;
    this.virtualizationType = virtualizationType;
  }
}
