import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as s3 from 'aws-sdk/clients/s3'
import { ToastService } from './toast.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
data :any = [];
  
  constructor(private toast:ToastService, private http:HttpClient) { }

  async uploadFile(file:any){
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
    // bucket.upload(params, (err:any,data:any) =>{
    //   if(err){
    //     this.toast.error("Error in uploading file:"+ JSON.stringify(err.message) )
    //     console.log("Error in uploading file", err);
    //     return false;
    //   }
    //   this.toast.primary('Successfully uploaded to'+ JSON.stringify (data.Location))
      
    //  console.log('Successfully uploaded file', data);
      
    //   return true;
    // })
 
  // var upload = bucket.upload(params).promise();
  // upload.then((res) =>{
  //   this.data = res
  //   console.log(this.data);
    
  //   console.log('Success',res);
  //   return res
  
  
   
    
    
  // }).catch(function(err){
  //   console.log(err);
    
  // })


  
   
    
    
  try {
    const res = await bucket.upload(params).promise()
    this.toast.primary("Successfully uploaded to:"+ res.Location)
    console.log(res);

    this.data = res
  

  } catch (err) {
    this.toast.error(JSON.stringify("error"+err))
    console.log(err)
  }
}

    
  }

