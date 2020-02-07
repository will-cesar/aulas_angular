import { VehicleClass, VehicleModel, VehicleColor } from './vehiclesClass.model';

export interface SimulationSession {
    actualStep: number;
    dealdlineTime?: number;
    kmLimit?: number;
    guaranteeDeposit?: number;
    totalValue?: number;
    numberOfInstallments?: number;
    installmentAmount?: number;
    selectedClass: VehicleModel;
    colorType: string;
    selectedColor: VehicleColor;
    region: string;
    dealershipId: string;
    dealserhip: string;
}
