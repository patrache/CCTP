import { IsNumber, IsString } from 'class-validator';

export class NodeStatus {
  @IsString()
  name: string;

  @IsString()
  operatingSystem: string;

  @IsString()
  architecture: string;

  @IsString()
  state: string;

  @IsString()
  activity: string;

  @IsNumber()
  loadAverage: number;

  @IsNumber()
  memory: number;

  @IsString()
  activityTime: string;

  constructor(name, opsys, arch, state, activity, loadAv, mem, activityTime) {
    this.name = name;
    this.operatingSystem = opsys;
    this.architecture = arch;
    this.state = state;
    this.activity = activity;
    this.loadAverage = parseFloat(loadAv);
    this.memory = parseInt(mem, 10);
    this.activityTime = activityTime;
  }
}
