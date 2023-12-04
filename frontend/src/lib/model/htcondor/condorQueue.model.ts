export class CondorQueueModel {
  constructor(
    public owner: string,
    public batchName: string,
    public submitted: string,
    public done: number,
    public run: number,
    public idle: number,
    public total: number,
    public jobIds: string
  ) {}
}
