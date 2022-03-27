import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import * as AWS from 'aws-sdk';
import { env } from "process";

const BUCKET_NAME = "kimchinubereats0511"




@Controller("uploads")
export class UploadsController {
    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file) {
    AWS.config.update({
        credentials: {
            accessKeyId: process.env.AWS_ACCESSKEYID,
            secretAccessKey: process.env.AWS_SECRETACCESSKEY,
        }
    });
    try {
        const objectName = `${Date.now() + file.originalname}`;
        await new AWS.S3()
        .putObject({
            Body: file.buffer,
            Bucket: BUCKET_NAME,
            Key: objectName,
            ACL: 'public-read',
        })
        .promise();
        const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
        return {url};
        
    } catch(e) {
        console.log(e);
        return null;
    }    
    }
}