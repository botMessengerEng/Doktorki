export class User{
    userId: string;
    userPassword: string;
    role: Role;
}


export enum Role {
    admin,
    doctor, 
    patient 
}

export class Doctor {
    login: string
    password: string;
    role = 'doctor';
    name: string;
    gender: string;
    age: number;
    phone: string;
    email: string;
    street: string;
    postcode: string;
    city: string;
    specialization: string;
}