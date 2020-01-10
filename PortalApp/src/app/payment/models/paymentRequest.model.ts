export interface PaymentCCRequest {
    value: number;
    cardNumber?: any;
    expirationDate: string;
    ccv: number;
    name?: any;
    address?: any;
    postalCode?: any;
    city?: any;
    state?: any;
    phoneNumber?: any;
    idContract?: any;
    document?: any;
    samePaymentGuarantee?: boolean;
    dueDay?: number;
}