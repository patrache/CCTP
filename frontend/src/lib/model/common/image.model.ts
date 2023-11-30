export class ImageModel {
  constructor(
    public id: string,
    public name: string,
    public architecture: string,
    public hypervisor: string,
    public virtualizationType: string
  ) {}
}
