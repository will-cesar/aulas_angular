export interface VehicleColor {
  cmsId: number;
  color: string;
  primaryColor: string;
  secondaryColor: string;
  darkColor: boolean;
  featuredPhoto: string;
  flowPhoto: string;
  fabricPhoto: string;
}

export interface VehicleSerialItem {
  cmsId: number;
  name: string;
}

export interface VehicleModel {
  cmsId: number;
  cmsClassId: number;
  cmsActive: boolean;
  model: string;
  description: string;
  modelId?: any;
  classId: string;
  brandId: string;
  brand: string;
  priceOf?: number;
  priceBy?: number;
  featuredPhoto: string;
  flowPhoto: string;
  featuredCarousel?: boolean;
  importantText: string;
  class: string;
  modelYear: string;
  vehicleColors: VehicleColor[];
  vehicleSerialItems: VehicleSerialItem[];
}

export interface Brand {
  cmsId: number;
  name: string;
  description?: any;
  cmsActive: boolean;
}

export interface VehicleClass {
  cmsId: number;
  cmsBrandId: number;
  cmsActive: boolean;
  class: string;
  classId: string;
  brandId: string;
  vehicleModels: VehicleModel[];
  brand: Brand;
}
