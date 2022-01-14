import { get, post } from "./WebRequest.js";

class Payment {

    static async createNewPayment(bill_id, pay_day, pay_month, pay_year, pay_amt) {
        const endpoint = './server/db/payment/newPayment.php';

        const params = JSON.stringify({
                                        bill_id: bill_id, 
                                        pay_day: pay_day, 
                                        pay_month: pay_month,
                                        pay_year: pay_year,
                                        pay_amt: pay_amt
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


    static async getPayment(pay_id) {
        const endpoint = './server/db/payment/getPayment.php';
        const params = JSON.stringify({pay_id: pay_id});

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


    static async getAllPayments() {
        const endpoint = './server/db/payment/getAllPayments.php';
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



    static async getPayments(limit, offset) {
        const endpoint = './server/db/payment/getPayments.php';
        const params = JSON.stringify({limit: limit, offset: offset, user_id: JSON.parse(sessionStorage.getItem('token')).user_id});

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

    static async getMonthCategoryTotals() {
        const date = new Date();
        const endpoint = './server/db/payment/getMonthCatTotals.php';
        const params = JSON.stringify({pay_month: date.getMonth()+1, pay_year: date.getFullYear(), user_id: JSON.parse(sessionStorage.getItem('token')).user_id});

        const result = await get(endpoint, params);

        try {
            const data = JSON.parse(result);

            const catTotals = {};

            for (let cat of data) {
                catTotals[cat.bill_type] = cat.total;
            }

            return catTotals;
        }
        catch (err) {
            console.log(err);
            console.log(result);
            return result;
        }
    }


    static async editPayment(pay_id, pay_day, pay_month, pay_year, pay_amt) {
        const endpoint = './server/db/payment/editPayment.php';

        const params = JSON.stringify({
            pay_id: pay_id, 
            pay_day: pay_day, 
            pay_month: pay_month,
            pay_year: pay_year,
            pay_amt: pay_amt
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



    static async archivePayment(pay_id, archived) {
        const endpoint = './server/db/payment/archivePayment.php';

        const params = JSON.stringify({
            pay_id: pay_id, 
            archived: archived
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


    

}

export {Payment}