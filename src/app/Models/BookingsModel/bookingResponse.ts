export class BookingResponse{
            packageId! : string;
            id! : string;
            paymentMethod! : number;
            currency! : string;
            totalAmount! : number;
            amountPaid! : number;
            appPaymentStatus! : number;
            bookingStatus! : number;
            rpOrderId! : string;
            orderId! : string;
            transactionId! : string;
            createdOn! : Date
}
