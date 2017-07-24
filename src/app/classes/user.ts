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


