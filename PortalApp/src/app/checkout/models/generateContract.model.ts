import { VehicleModel, VehicleColor } from "src/app/simulador/models/vehiclesClass.model";

export interface GenerateContract {
    dealershipId?: string;
    dealership?: string;
    modelId?: string;
    timeDeadline?: number;
    typeOfColor?: string;
    kmLimit?: number;
    selectedModel: VehicleModel,
    selectedColor: VehicleColor,
    collaboratorDocument: string
}