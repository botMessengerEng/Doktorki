export class DataArrays {
    yearsArray = new Array(107);
    nowAndFutureYearsArray = new Array(10);
    daysArray = new Array(31);
    hoursArray = new Array(64);
    monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December']
    date = new Date;

    yearsGenerator() {
        for (let i = 0; i <= 107; i++) {
            this.yearsArray[i] = 1910 + i;
        }
    }

    yearsFutureGenerator() {
        for (let i = 0; i <= 10; i++) {
            this.nowAndFutureYearsArray[i] = this.date.getFullYear() + i;
        }
    }

    daysGenerator() {
        for (let i = 1; i <= 31; i++) {
            this.daysArray[i - 1] = i;
        }
    }

    hoursGenerator() {
        for (let i = 6, j = 6; j <= 21; i += 4, j++) {
            if (j < 10) {
                this.hoursArray[i - 6] = "0" + j + ":00";
                this.hoursArray[i - 5] = "0" + j + ":15";
                this.hoursArray[i - 4] = "0" + j + ":30";
                this.hoursArray[i - 3] = "0" + j + ":45";
            }
            else {
                this.hoursArray[i - 6] = j + ":00";
                this.hoursArray[i - 5] = j + ":15";
                this.hoursArray[i - 4] = j + ":30";
                this.hoursArray[i - 3] = j + ":45";
            }
        }
    }
}
