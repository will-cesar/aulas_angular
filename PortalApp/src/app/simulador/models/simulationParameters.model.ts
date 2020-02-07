export interface Time {
    id: number;
    name: string;
    description: string;
    timeDeadline: number;
}

export interface KilometerLimit {
    id: number;
    name: string;
    limit: number;
}

export interface SimulationParameters {
    times: Time[];
    kilometerLimits: KilometerLimit[];
    minKm: number;
    maxKm: number;
}
