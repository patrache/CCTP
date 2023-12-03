export class TotalStatusModel {
  constructor(
    public machines: number,
    public owner: number,
    public claimed: number,
    public unclaimed: number,
    public matched: number,
    public preempting: number,
    public drain: number
  ) {}
}
