export class User{
    userId: string;
    userPassword: string;
    role: Role;
}


export enum Role {
    admin ='admin',
    doctor = 'doctor',
    patient = 'patient'
}


