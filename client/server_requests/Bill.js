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
        const params = JSON.stringify({bill_id: bill_id});

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


    static async getActiveBills() {
        const endpoint = './server/db/bill/getActiveBills.php';
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
        const params = JSON.stringify({bill_id: bill_id, archived: archived});

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
        const params = JSON.stringify({bill_id: bill_id});

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


    // adjusts the bills due date to the next date according to frequency
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

            if ((dCount[prevBill.bill_month_due-1] - prevBill.bill_day_due) < 7) {
                newMonthDue = (prevBill.bill_month_due + 1 > 12) ? 1 : prevBill.bill_month_due + 1;
            }

            newDayDue = (prevBill.bill_day_due + 7) % dCount[prevBill.bill_month_due-1];

            if (!newDayDue) {
                newDayDue = dCount[prevBill.bill_month_due-1];
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


}

export {Bill}