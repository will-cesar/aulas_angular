import { VehicleModel, VehicleColor, VehicleSerialItem } from "src/app/simulador/models/vehiclesClass.model";
import { Dealership } from 'src/app/simulador/models/dealership.model';

interface Contract {
    idContract: string;
    dealershipId: string;
    dealership: string;
    brandId?: any;
    modelId: string;
    classId?: any;
    colorType: string;
    name?: any;
    timeDeadline: number;
    kmLimit: number;
    guaranteeDeposit: number;
    totalValue: number;
    numberOfInstallments: number;
    installmentAmount: number;
    eGuaranteeDepositPaymentStatus: number;
    eDocumentationStatus: number;
    eOrderStatus: number;
    contractDate: string;
    idUser: number;
    user?: any;
    rentId: string;
    signedContract: boolean;
    contractPayments?: ContractPayment[];
}

export interface ContractPayment {
    idContractPayment: string;
    idContract: string;
    type: number;
    method: null;
    done: boolean;
    dueDay: number;
    installmentNumber: number;
    value: number;
    paymentToken: null;
    idUserCard: string;
    userCard: UserCard;
    previewPaymentDate: Date;
    paymentDate: null;
}

export interface UserCard {
    idUserCard: string;
    card: string;
    holderName: null;
    token: string;
}


export interface ContractResponse {

    contract: Contract;
    model: VehicleModel;
    color: VehicleColor;
    serialItems: VehicleSerialItem;
    dealership: Dealership;
    annataStatus: string;
}