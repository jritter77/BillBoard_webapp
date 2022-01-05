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

    }


}

export {Bill}