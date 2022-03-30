import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as s3 from 'aws-sdk/clients/s3'
import { ToastService } from './toast.service';


@Injectable({
  providedIn: 'root'
})
export class UploadService {


  constructor(private toast:ToastService) { }

  uploadFile(file:any){
    const contentType = file.type;
    const bucket = new s3(
      {
        accessKeyId: 'AKIAY44UW65BJRG7ZIV6', //provided access key
        secretAccessKey:'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', //provided secret access key
        region:'us-east-1' //provided region
      }
    );
    const params = {
      Bucket : 'fundyapp', //provided bucket name
      Key: file.name,
      Body:file,
      ACL: 'public-read',
      ContentType: contentType
      
    };
    bucket.upload(params, (err:any,data:any) =>{
      if(err){
        this.toast.error("Error in uploading file:"+ JSON.stringify(err.message) )
        console.log("Error in uploading file", err);
        return false;
      }
      this.toast.primary('Successfully uploaded to'+ JSON.stringify (data.Location))
      
     console.log('Successfully uploaded file', data);
      return true;
    })
 
    
  

  
    
  }
}
