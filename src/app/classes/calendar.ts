const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'Novermber', 'December'];
const daysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export class Calendar {
    private monthView = new Array<number>(35);
    private monthsDaysQuantity = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    constructor() {
        this.setDays();
    }


    setDays (param = 0) {
        const date = new Date();
        const today = (date.getDay() === 0) ? 6 : (date.getDay() - 1) ;
        const month = date.getMonth() + param;
        const day = date.getDate() % 7;
        if ((date.getFullYear() % 100 === 0) ? date.getFullYear() % 400 === 0 : date.getFullYear() % 400 === 0 ) {
            this.monthsDaysQuantity[1] = 29;
        }
        let firstDay = today - day;


        for (let i = 0, j = 1, k = 1; i < 35; i++, firstDay--) {
            if (firstDay >= 0) {
                this.monthView[i] = this.monthsDaysQuantity[month] - firstDay;
            } else if (firstDay < 0 && j <=this.monthsDaysQuantity[month + 1]) {
                this.monthView[i] = j++;
            } else {
                this.monthView[i] = k++;
            }
        }
    }
    getMonthView() {
        return this.monthView;
    }
}