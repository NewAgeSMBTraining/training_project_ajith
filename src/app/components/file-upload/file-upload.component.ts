import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UploadService } from 'src/app/service/upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
UploadForm!:FormGroup
imageChangedEvent: any = '';
croppedImage: any = '';
Key:any

constructor(private uploadService:UploadService, private fb:FormBuilder){}

ngOnInit(): void {
  this.UploadForm = this.fb.group({
    file:[''],
    
  })
  
}
upload(){
  const file = this.base64ToFile(this.croppedImage,this.Key);
  this.uploadService.uploadFile(file)

 
}
// selectFile(event:any){
//   this.selectedFiles = event.target.files
//   if(this.selectedFiles===0)
//   return
//   const mimeType = this.selectedFiles[0].type;
//   if(mimeType.match(/image\/*/)==null){
//     alert("only images are supported");
//     return
//   }
//   const reader = new FileReader()
//   this.imagePath = this.selectedFiles;
//   reader.readAsDataURL(this.selectedFiles[0])
//   reader.onload=(_event)=>{
//     this.location = reader.result;
//   }
  
  
// }

async fileChangeEvent(event: any) {
  this.imageChangedEvent = event;
  this.croppedImage = await this.getBase64(event.target.files[0])
 this.Key = event.target.files[0].name

 
  
}
imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = event.base64;

  

}
base64ToFile(data: any, filename: any) {
  const arr = data.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
  
}
getBase64(File: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(File);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
 
  });
}

refresh(): void {

    window.location.reload();

}

imageLoaded() {
  /* show cropper */
}
cropperReady() {
  /* cropper ready */
}
loadImageFailed() {
  /* show message */
}

}


