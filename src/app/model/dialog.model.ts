export interface DialogBtn {
    show: boolean;
    text: string;
    disabled?: boolean;
  }
  
  export interface DialogResponse {
    status?: boolean;
    data?: any
  }
  
  export class DialogData {
    title?: string;
    text?: string;
    close_btn?: DialogBtn | any;
    confirm_btn?: DialogBtn | any;
  
    /**
     * Constructor
     *
     * @param option
     */
    constructor(option: { title?: any; text?: any; close_btn?: any; confirm_btn?: any; }) {
      option = option || {};
      this.title = option.title || 'Are you sure?';
      this.text = option.text || '';
      this.close_btn = option.close_btn || {};
      this.close_btn.show = option.close_btn?.show || true;
      this.close_btn.text = option.close_btn?.text || 'No';
      this.close_btn.disabled = option.close_btn?.disabled || false;
      this.confirm_btn = option.confirm_btn || {};
      this.confirm_btn.show = option.confirm_btn?.show || true;
      this.confirm_btn.text = option.confirm_btn?.text || 'Yes';
      this.confirm_btn.disabled = option.confirm_btn?.disabled || false;
    }
  }
  