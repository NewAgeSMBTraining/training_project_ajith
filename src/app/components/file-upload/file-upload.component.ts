import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UploadService } from 'src/app/service/upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
//   uploadForm!:FormGroup
//   constructor(private fb:FormBuilder, private api:ApiService) { }

//   ngOnInit(): void {
//     this.uploadForm = this.fb.group({
//       name:[''],
//       file:['']
//     })
//     // this.getfile()
//   }
// SelectedFile(event: any){
//   console.log(event.target.files);
//   if(event.target.files.length>0){
//     const file = event.target.files[0];
//     this.uploadForm.controls['file'].setValue(file)
//   }
  
// }

// onSubmit(){
//   const formData = new FormData();
//   formData.append('name',this.uploadForm.controls['name'].value)
//   formData.append('file',this.uploadForm.controls['file'].value)
//   this.api.uploadFile(formData).subscribe((res)=>{
//     console.log(res);
    
//   })
// }
// getfile(){
//   this.api.file().subscribe((res)=>{
//     console.log(res);
    
//   })
// }
selectedFiles!: any;
message:any;
imagePath:any;
location:any

constructor(private uploadService:UploadService){}

ngOnInit(): void {


}
upload(){
  const file = this.selectedFiles.item(0);
  this.uploadService.uploadFile(file)

 
}
selectFile(event:any){
  this.selectedFiles = event.target.files
  if(this.selectedFiles===0)
  return
  const mimeType = this.selectedFiles[0].type;
  if(mimeType.match(/image\/*/)==null){
    alert("only images are supported");
    return
  }
  const reader = new FileReader()
  this.imagePath = this.selectedFiles;
  reader.readAsDataURL(this.selectedFiles[0])
  reader.onload=(_event)=>{
    this.location = reader.result;
  }
  
}


}
