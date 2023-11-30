export class SummarizedEc2InstanceModel {
    constructor(
        public instanceName:string,
        public imageName: string,
        public instanceType: string,
        public state: string,
        public publicDNS: string,
        public publicIP: string,
        public zone: string
    ) {}
}