import {
  EC2Client,
  DescribeRegionsCommand,
  DescribeAvailabilityZonesCommand,
  DescribeImagesCommand,
} from '@aws-sdk/client-ec2';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';
import { ImageModel, RegionModel, ZoneModel } from './model';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CommonService {
  private ec2Client: EC2Client = this.awsService.getEC2Client();

  constructor(
    private awsService: AwsService,
    private cacheService: CacheService,
  ) {
    this.getImageList();
  }

  getCurrentRegion() {
    try {
      const myRegion = this.awsService.getRegion();
      return {
        region: myRegion,
      };
    } catch (error) {
      console.error('Error get my regions:', error);
      throw new InternalServerErrorException('Unable to get my region');
    }
  }

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
        (zone) => new ZoneModel(zone.State, zone.ZoneName),
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
      const awsResponse = await this.ec2Client.send(command);
      const response = awsResponse.Images.map(
        (image) =>
          new ImageModel(
            image.ImageId,
            image.Name,
            image.Architecture,
            image.Hypervisor,
            image.VirtualizationType,
          ),
      );
      this.cacheService.set('imageList', response);
      return response;
    } catch (error) {
      console.error('Error fetching AWS Ec2 AMI', error);
      throw new InternalServerErrorException('Unable to fetch AWS AMI Images');
    }
  }
}
