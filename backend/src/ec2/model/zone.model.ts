import { IsString } from 'class-validator';

export class ZoneModel {
  @IsString()
  regionName: string;

  @IsString()
  zoneName: string;

  constructor(regionName: string, zoneName: string) {
    this.regionName = regionName;
    this.zoneName = zoneName;
  }
}
