import { FooterComponent } from './footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cmsService } from '../../../services/cms.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [cmsService],
  exports: [
  ]
})
export class FooterModule { }
