import { IsString } from 'class-validator';

export class ImageModel {
  @IsString()
  id: string;

  @IsString()
  name: string;

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
