import { get, post } from "./WebRequest.js";

class Bill {

    static async createNewBill(user_id, bill_name, bill_amt, bill_type, bill_day_due, bill_month_due, bill_year_due, bill_freq) {
        const endpoint = './server/db/bill/newBill.php';

        const params = JSON.stringify({
            user_id: user_id,
            bill_name: bill_name,
            bill_amt: bill_amt,
            bill_type: bill_type,
            bill_day_due: bill_day_due,
            bill_month_due: bill_month_due,
            bill_year_due: bill_year_due,
            bill_freq: bill_freq
        });

        const result = await post(endpoint, params);

        try {
            const data = JSON.parse(result);
            return data;
        }
        catch (err) {
            console.log(err);
            console.log(result);
            return result;
        }

    }


    static async getBill(bill_id) {
        const endpoint = './server/db/bill/getBill.php';
        const params = JSON.stringify({ bill_id: bill_id });

        const result = await get(endpoint, params);

        try {
            const data = JSON.parse(result);
            return data;
        }
        catch (err) {
            console.log(err);
            console.log(result);
            return result;
        }
    }


    static async getAllBills() {
        const endpoint = './server/db/bill/getAllBills.php';
        const params = sessionStorage.getItem('token');

        const result = await get(endpoint, params);

        try {
            const data = JSON.parse(result);
            return data;
        }
        catch (err) {
            console.log(err);
            console.log(result);
            return result;
        }
    }


    static async getActiveBills(limit = 10, offset = 0) {
        const endpoint = './server/db/bill/getActiveBills.php';
        const params = JSON.stringify({ limit: limit, offset: offset, user_id: JSON.parse(sessionStorage.getItem('token')).user_id });

        const result = await get(endpoint, params);

        try {
            const data = JSON.parse(result);
            return data;
        }
        catch (err) {
            console.log(err);
            console.log(result);
            return result;
        }
    }




    static async editBill(bill_id, bill_name, bill_amt, bill_type, bill_day_due, bill_month_due, bill_year_due, bill_freq) {
        const endpoint = './server/db/bill/editBill.php';

        const params = JSON.stringify({
            bill_id: bill_id,
            bill_name: bill_name,
            bill_amt: bill_amt,
            bill_type: bill_type,
            bill_day_due: bill_day_due,
            bill_month_due: bill_month_due,
            bill_year_due: bill_year_due,
            bill_freq: bill_freq
        });

        const result = await post(endpoint, params);

        try {
            const data = JSON.parse(result);
            return data;
        }
        catch (err) {
            console.log(err);
            console.log(result);
            return result;
        }

    }


    static async archiveBill(bill_id, archived) {
        const endpoint = './server/db/bill/archiveBill.php';
        const params = JSON.stringify({ bill_id: bill_id, archived: archived });

        const result = await post(endpoint, params);

        try {
            const data = JSON.parse(result);
            return data;
        }
        catch (err) {
            console.log(err);
            console.log(result);
            return result;
        }
    }


    static async deleteBill(bill_id) {
        const endpoint = './server/db/bill/deleteBill.php';
        const params = JSON.stringify({ bill_id: bill_id });

        const result = await post(endpoint, params);

        try {
            const data = JSON.parse(result);
            return data;
        }
        catch (err) {
            console.log(err);
            console.log(result);
            return result;
        }
    }


    // archives old bill and creates a new bill at the nex date
    static async cycleBill(bill_id) {
        const dCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        const user_id = JSON.parse(sessionStorage.getItem('token')).user_id;


        const prevBill = await this.getBill(bill_id);

        if (prevBill.bill_year_due % 4 === 0) {
            dCount[2] += 1;
        }

        const freq = prevBill.bill_freq;

        if (freq === 'one-time') {
            const result = await this.archiveBill(bill_id, true);
            return result;
        }

        else if (freq === 'weekly') {

            let newYearDue = prevBill.bill_year_due;
            let newMonthDue = prevBill.bill_month_due;
            let newDayDue = prevBill.bill_day_due;

            if (prevBill.bill_month_due === 12 && prevBill.bill_day_due > 24) {
                newYearDue = prevBill.bill_year_due + 1;
            }

            if ((dCount[prevBill.bill_month_due - 1] - prevBill.bill_day_due) < 7) {
                newMonthDue = (prevBill.bill_month_due + 1 > 12) ? 1 : prevBill.bill_month_due + 1;
            }

            newDayDue = (prevBill.bill_day_due + 7) % dCount[prevBill.bill_month_due - 1];

            if (!newDayDue) {
                newDayDue = dCount[prevBill.bill_month_due - 1];
            }


            await this.createNewBill(
                user_id,
                prevBill.bill_name,
                prevBill.bill_amt,
                prevBill.bill_type,
                newDayDue,
                newMonthDue,
                newYearDue,
                freq
            );

            await this.archiveBill(bill_id, true);

        }

        else if (freq === 'monthly') {

            let newYearDue;
            let newMonthDue;

            if (prevBill.bill_month_due === 12) {
                newYearDue = prevBill.bill_year_due + 1;
                newMonthDue = 1;
            }
            else {
                newYearDue = prevBill.bill_year_due;
                newMonthDue = prevBill.bill_month_due + 1;
            }

            await this.createNewBill(
                user_id,
                prevBill.bill_name,
                prevBill.bill_amt,
                prevBill.bill_type,
                prevBill.bill_day_due,
                newMonthDue,
                newYearDue,
                freq
            );

            await this.archiveBill(bill_id, true);
        }
    }

    static async getCurrentMonthBills() {
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const endpoint = './server/db/bill/getMonthBills.php';
        const params = JSON.stringify({ month: month, year: year, user_id: JSON.parse(sessionStorage.getItem('token')).user_id });

        const result = await get(endpoint, params);

        try {
            const data = JSON.parse(result);
            return data;
        }
        catch (err) {
            console.log(err);
            console.log(result);
            return result;
        }
    }


    static async projectAllCurrentMonthBills() {
        const date = new Date;
        const dCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const bills = await this.getCurrentMonthBills();
        const days = dCount[date.getMonth()];

        let monthBills = [];
        const billSet = [];
        
        for (let bill of bills) {

            let found = false;

            for (let bs of billSet) {
                if (bill.bill_name === bs.bill_name) {
                    found = true;
                    break;
                }
            }

            if (found) {
                continue;
            }

            const b = {
                bill_name: bill.bill_name,
                bill_amt: bill.bill_amt,
                bill_type: bill.bill_type,
                bill_day_due: bill.bill_day_due,
                bill_month_due: bill.bill_month_due,
                bill_year_due: bill.bill_year_due,
                bill_freq: bill.bill_freq
            }

            billSet.push(b);
        }
            

        monthBills = billSet.map(e => e);
        

        for (let bill of billSet) {

            if (bill.bill_freq === 'monthly' || bill.bill_freq === 'yearly' || bill.bill_freq === 'one-time') {
                continue;
            }


            if (bill.bill_freq === 'weekly') {

                let day = bill.bill_day_due + 7;

                while (day < days) {
                    monthBills.push({
                        bill_name: bill.bill_name,
                        bill_amt: bill.bill_amt,
                        bill_type: bill.bill_type,
                        bill_day_due: day,
                        bill_month_due: bill.bill_month_due,
                        bill_year_due: bill.bill_year_due,
                        bill_freq: bill.bill_freq
                    });

                    day += 7;
                }

            }


            if (bill.bill_freq === 'bi-weekly') {

                let day = bill.bill_day_due + 14;

                console.log(days);

                while (day < days) {
                    monthBills.push({
                        bill_name: bill.bill_name,
                        bill_amt: bill.bill_amt,
                        bill_type: bill.bill_type,
                        bill_day_due: day,
                        bill_month_due: bill.bill_month_due,
                        bill_year_due: bill.bill_year_due,
                        bill_freq: bill.bill_freq
                    });

                    day += 14;
                }

            }
        }

        return monthBills;

    }


    static async getMonthCategoryTotals() {
        const monthBills = await this.projectAllCurrentMonthBills();

        const catTotals = {};

        for (let bill of monthBills) {
            if (catTotals[bill.bill_type]) {
                catTotals[bill.bill_type] += bill.bill_amt;
            }
            else {
                catTotals[bill.bill_type] = bill.bill_amt;
            }
        }

        return catTotals;
    }
}



export { Bill }