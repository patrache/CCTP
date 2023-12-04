import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class QueueModel {
  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsString()
  @IsNotEmpty()
  batchName: string;

  @IsString()
  @IsNotEmpty()
  submitted: string;

  @IsNumber()
  done: number;

  @IsNumber()
  run: number;

  @IsNumber()
  idle: number;

  @IsNumber()
  total: number;

  @IsString()
  @IsNotEmpty()
  jobIds: string;

  constructor(owner, batchName, submitted, done, run, idle, total, jobIds) {
    this.owner = owner;
    this.batchName = batchName;
    this.submitted = submitted;
    this.done = done === '_' ? 0 : parseInt(done);
    this.run = run === '_' ? 0 : parseInt(run);
    this.idle = idle === '_' ? 0 : parseInt(idle);
    this.total = total === '_' ? 0 : parseInt(total);
    this.jobIds = jobIds;
  }
}
