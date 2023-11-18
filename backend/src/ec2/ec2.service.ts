import {
  EC2Client,
  DescribeRegionsCommand,
  DescribeAvailabilityZonesCommand,
  DescribeImagesCommand,
} from '@aws-sdk/client-ec2';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';
import { ZoneModel } from './model/zone.model';
import { RegionModel } from './model/region.model';
import { ImageModel } from './model/image.model';

@Injectable()
export class Ec2Service {
  private ec2Client: EC2Client = this.awsService.getEC2Client();

  constructor(private awsService: AwsService) {}

  async getAvailableRegion() {
    try {
      const command = new DescribeRegionsCommand({});
      const response = await this.ec2Client.send(command);
      return response.Regions.map(
        (region) => new RegionModel(region.RegionName),
      );
    } catch (error) {
      console.error('Error fetching AWS regions:', error);
      throw new InternalServerErrorException('Unable to fetch AWS regions');
    }
  }

  async getAvailableZone() {
    try {
      const command = new DescribeAvailabilityZonesCommand({});
      const response = await this.ec2Client.send(command);
      return response.AvailabilityZones.map(
        (zone) => new ZoneModel(zone.RegionName, zone.ZoneName),
      );
    } catch (error) {
      console.error('Error fetching AWS zones:', error);
      throw new InternalServerErrorException('Unable to fetch AWS zones');
    }
  }

  async getImageList() {
    try {
      const command = new DescribeImagesCommand({
        Owners: ['self'],
      });
      const response = await this.ec2Client.send(command);
      return response.Images.map(
        (image) => new ImageModel(image.ImageId, image.Name),
      );
    } catch (error) {
      console.error('Error fetching AWS Ec2 AMI', error);
      throw new InternalServerErrorException('Unable to fetch AWS AMI Images');
    }
  }
}
