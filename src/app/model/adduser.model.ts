export class AddUser {
    id: number = 0;
    role_id!: number;
    first_name!: string;
    last_name!: string;
    email!: string;
    phone_code!: string;
    phone!: string;
    password!: string;
}

export class LogUser{
    id: number = 0;
    role_id!: number;
    first_name!:string;
    last_name!:string;
    email!:string;
    phone_code!:string;
    phone!:string;
  image!: any;
    
}

export class ChangePassword{
    password!:string;
    confirm_password!:string;
    old_password!:string;
}


