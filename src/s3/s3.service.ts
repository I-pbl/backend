import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3: AWS.S3;
  private readonly bucketName = 'nearnest-images';
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async checkAndCreateUserFolder(folderKey: string): Promise<void> {
    try {
      const params = {
        Bucket: this.bucketName,
        Prefix: folderKey,
        MaxKeys: 1,
      };
      const data = await this.s3.listObjectsV2(params).promise();
      const exists = data.Contents?.length > 0;

      if (!exists) {
        await this.s3
          .putObject({
            Bucket: this.bucketName,
            Key: folderKey,
          })
          .promise();
      }
    } catch (error) {
      console.error(`Error checking or creating user folder: ${error}`);
      throw new Error('Unable to check or create user folder.');
    }
  }

  async uploadFile(
    folderKey: string,
    fileName: string,
    ext: string,
    file: Buffer,
  ): Promise<string> {
    try {
      const params = {
        Bucket: this.bucketName,
        Key: `${folderKey}/${fileName}.${ext}`,
        Body: file,
        ACL: 'public-read',
      };
      const upload = await this.s3.upload(params).promise();
      return upload.Location;
    } catch (error) {
      console.error(`Error uploading file: ${error}`);
      throw new Error('Unable to upload file.');
    }
  }
}
