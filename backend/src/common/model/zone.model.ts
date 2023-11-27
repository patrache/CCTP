import { IsString } from 'class-validator';

export class ZoneModel {
  @IsString()
  state: string;

  @IsString()
  zoneName: string;

  constructor(state: string, zoneName: string) {
    this.state = state;
    this.zoneName = zoneName;
  }
}
