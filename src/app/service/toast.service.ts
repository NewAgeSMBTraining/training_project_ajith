import { Injectable } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrConfig, NbToastRef, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  config = new NbToastrConfig({
    position: NbGlobalPhysicalPosition.TOP_RIGHT,
    duration: 2000,
    destroyByClick: false,
    hasIcon: true,
    preventDuplicates: true
  })
  constructor(private toastrService: NbToastrService) { }
  show(message: string, options?: NbToastrConfig): NbToastRef {
    return this.toastrService.show(message, 'Message!', { ...this.config, ...options })
  }

  default(message: string, options?: NbToastrConfig): NbToastRef {
    return this.toastrService.default(message, 'Default!', { ...this.config, ...options })
  }

  primary(message: string, options?: NbToastrConfig): NbToastRef {
    return this.toastrService.primary(message, 'Message!', { ...this.config, ...options })
  }

  success(message: string, options?: NbToastrConfig): NbToastRef {
    return this.toastrService.success(message, 'Success!', { ...this.config, ...options })
  }

  error(message: string, options?: NbToastrConfig): NbToastRef {
    return this.toastrService.danger(message, 'Error!', { ...this.config, ...options })
  }

  warning(message: string, options?: NbToastrConfig): NbToastRef {
    return this.toastrService.warning(message, 'Warning!', { ...this.config, ...options })
  }

  info(message: string, options?: NbToastrConfig): NbToastRef {
    return this.toastrService.info(message, 'Info!', { ...this.config, ...options })
  }
}


