import { AbstractControl } from "@angular/forms";
import { DataArrays } from '../classes/data-arrays';

export function dayMonthCheck(c: AbstractControl): { [key: string]: boolean } | null {

    const month = c.get('month');
    const day = c.get('day');
    const year = c.get('year');
    const dataArrays= new DataArrays();
    if (month.value === 'February' && (day.value < 29 || (day.value == 29 && ((year.value % 100 === 0) ? (year.value % 400 === 0) : (year.value % 4 === 0))))) {
        return null;
    } else if (day.value < 31 && (month.value === dataArrays.monthsArray[3] ||
        month.value === dataArrays.monthsArray[5] ||
        month.value === dataArrays.monthsArray[8] ||
        month.value === dataArrays.monthsArray[10])) {
        return null;

    } else if (day.value <= 31 && (month.value === dataArrays.monthsArray[0] ||
        month.value === dataArrays.monthsArray[2] ||
        month.value === dataArrays.monthsArray[4] ||
        month.value === dataArrays.monthsArray[6] ||
        month.value === dataArrays.monthsArray[7] ||
        month.value === dataArrays.monthsArray[9] ||
        month.value === dataArrays.monthsArray[11])) {
        return null;
    } else {
        return { 'error': true };
    }
}
