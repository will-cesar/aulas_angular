import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { StepIndicatorComponent  } from "./components/step-indicator/step-indicator.component";
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { PhotoUploadComponent } from './components/photo-upload/photo-upload.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VehicleService } from "../api/vehicle.service";
import { PhotosCheckoutComponent } from './components/photos-checkout/photos-checkout.component';
import { VehiclePhotoService } from '../api/vehicle-photo.service';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule,
    BrMaskerModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, StepIndicatorComponent, VehicleFormComponent, PhotoUploadComponent, PhotosCheckoutComponent],
  providers: [VehicleService, VehiclePhotoService]
})
export class HomePageModule {}
