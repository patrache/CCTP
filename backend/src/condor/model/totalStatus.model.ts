import { IsNumber } from 'class-validator';

export class TotalStatus {
  @IsNumber()
  machines: number;

  @IsNumber()
  owner: number;

  @IsNumber()
  claimed: number;

  @IsNumber()
  unclaimed: number;

  @IsNumber()
  matched: number;

  @IsNumber()
  preempting: number;

  @IsNumber()
  drain: number;

  constructor(machines, owner, claimed, unclaimed, matched, preempting, drain) {
    this.machines = parseInt(machines);
    this.owner = parseInt(owner);
    this.claimed = parseInt(claimed);
    this.unclaimed = parseInt(unclaimed);
    this.matched = parseInt(matched);
    this.preempting = parseInt(preempting);
    this.drain = parseInt(drain);
  }
}
