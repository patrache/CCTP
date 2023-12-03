export class NodeStatusModel {
  constructor(
    public name: string,
    public operatingSystem: string,
    public architecture: string,
    public state: string,
    public activity: string,
    public loadAverage: string,
    public memory: string,
    public activityTime: string
  ) {}
}
