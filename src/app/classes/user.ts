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
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    phone: string;
    email: string;
    address = {
        street: '',
        postcode: '',
        city: ''
    }

    specializations: JSON [];

    constructor(login,password,firstName,lastName,gender,age,phone,email,street,postcode,city,specializations) {
        this.login = login;
        this.password = password;
        this.firstName = name;
        this.lastName = name;
        this.gender = gender;
        this.age = age;
        this.phone = phone;
        this.email = email;
        this.address.street = street;
        this.address.postcode = postcode;
        this.address.city = city;
        this.specializations = specializations;
    }

}


export class Patient {
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    phone: string;
    email: string;
    dateOfBirth = {
        year: null,
        month: null,
        day: null
    }
    PESEL: string;

    constructor(login,password,firstName,lastName,gender,age,phone,email,year,month,day,PESEL) {
        this.login = login;
        this.password = password;
        this.firstName = name;
        this.lastName = name;
        this.gender = gender;
        this.age = age;
        this.phone = phone;
        this.email = email;
        this.dateOfBirth.year = year;
        this.dateOfBirth.month = month;
        this.dateOfBirth.day = day;
        this.PESEL = PESEL;
    }
}




