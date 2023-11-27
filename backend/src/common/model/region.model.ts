import { IsString } from 'class-validator';

const awsRegionToLocation = {
  'ap-south-1': '뭄바이',
  'eu-north-1': '스톡홀름',
  'eu-west-3': '파리',
  'eu-west-2': '런던',
  'eu-west-1': '아일랜드',
  'ap-northeast-3': '오사카',
  'ap-northeast-2': '서울',
  'ap-northeast-1': '도쿄',
  'ca-central-1': '캐나다 중부',
  'sa-east-1': '상파울루',
  'ap-southeast-1': '싱가포르',
  'ap-southeast-2': '시드니',
  'eu-central-1': '프랑크푸르트',
  'us-east-1': '버지니아 북부',
  'us-east-2': '오하이오',
  'us-west-1': '캘리포니아 북부',
  'us-west-2': '오레곤',
};

export class RegionModel {
  @IsString()
  regionCode: string;

  @IsString()
  regionName: string;

  constructor(regionCode: string) {
    this.regionCode = regionCode;
    this.regionName = awsRegionToLocation[regionCode];
  }
}
