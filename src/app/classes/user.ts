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
    login: string;
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

    constructor(login,password,name,gender,age,phone,email,street,postcode,city,specialization) {
        this.login = login;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.phone = phone;
        this.email = email;
        this.street = street;
        this.postcode = postcode;
        this.specialization =specialization;
    }


}