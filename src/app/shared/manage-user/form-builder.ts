import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { dayMonthCheck } from 'app/shared/manage-user/day-month-check.directives';


const formContent = [
    'role',
    'firstName',
    'lastName',
    'login',
    'password',
    'gender',
    'phone',
    'email',
    'PESEL',
    'specializations'
];

export function formBuilder(fb: FormBuilder) {
    return fb.group({
            role: 'doctor',
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            login: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            gender: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            street: [],
            postcode: [],
            city: [],
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            PESEL: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
            specializations: fb.array( [buildSpecialization(fb)]),
            workingHours: fb.group({
                monday: fb.group({
                    start: [''],
                    end: ['']
                }),
                tuesday: fb.group({
                    start: [''],
                    end: ['']
                }),
                wednesday: fb.group({
                    start: [''],
                    end: ['']
                }),
                thursday: fb.group({
                    start: [''],
                    end: ['']
                }),
                friday: fb.group({
                    start: [''],
                    end: ['']
                }),
            })
        });
}

export function setContent(userForm: FormGroup, user) {
    formContent.forEach(element => {
        if (typeof(element) !== 'object'){
            userForm.get(element).valueChanges.subscribe(value => user[element] = userForm.get(element).value);
        } else {
            const groupName = Object.keys(element)[0]
            element[groupName].forEach(elementNested => userForm.get(groupName + '.' + elementNested).valueChanges.subscribe(value => user[groupName][elementNested] = userForm.get(groupName + '.' + elementNested).value));
        }
    })
         userForm.get('street').valueChanges.subscribe(value => user.address.street = userForm.get('street').value);
         userForm.get('postcode').valueChanges.subscribe(value => user.address.postcode = userForm.get('postcode').value);
         userForm.get('city').valueChanges.subscribe(value => user.address.city = userForm.get('city').value);
         userForm.get('workingHours.monday.start').valueChanges.subscribe(value => user.workingHours.monday.start = userForm.get('workingHours.monday.start').value);
         userForm.get('workingHours.monday.end').valueChanges.subscribe(value => user.workingHours.monday.end = userForm.get('workingHours.monday.end').value);
         userForm.get('workingHours.tuesday.start').valueChanges.subscribe(value => user.workingHours.tuesday.start = userForm.get('workingHours.tuesday.start').value);
         userForm.get('workingHours.tuesday.end').valueChanges.subscribe(value => user.workingHours.tuesday.end = userForm.get('workingHours.tuesday.end').value);
         userForm.get('workingHours.wednesday.start').valueChanges.subscribe(value => user.workingHours.wednesday.start = userForm.get('workingHours.wednesday.start').value);
         userForm.get('workingHours.wednesday.end').valueChanges.subscribe(value => user.workingHours.wednesday.end = userForm.get('workingHours.wednesday.end').value);
         userForm.get('workingHours.thursday.start').valueChanges.subscribe(value => user.workingHours.thursday.start = userForm.get('workingHours.thursday.start').value);
         userForm.get('workingHours.thursday.end').valueChanges.subscribe(value => user.workingHours.thursday.end = userForm.get('workingHours.thursday.end').value);
         userForm.get('workingHours.friday.start').valueChanges.subscribe(value => user.workingHours.friday.start = userForm.get('workingHours.friday.start').value);
         userForm.get('workingHours.friday.end').valueChanges.subscribe(value => user.workingHours.friday.end = userForm.get('workingHours.friday.end').value);  
}


 export function buildSpecialization(fb: FormBuilder): FormGroup {
        return fb.group({
            specialization: '',
        });
    }




