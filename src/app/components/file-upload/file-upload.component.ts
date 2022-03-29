import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  uploadForm!:FormGroup
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      name:[''],
      profile:['']
    })
  }
onSelectedFile(event: any){
  console.log(event.target.files);
  
}

// onSubmit(){
//   const formData = new FormData;
// }
}
