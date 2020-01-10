import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { AppService } from '../../app.service';
import { RegisterService } from 'src/app/services/register.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-dealership',
  templateUrl: './dealership.component.html',
  styleUrls: ['./dealership.component.scss', '../dealership.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class DealershipComponent extends BaseFormComponent implements OnInit {

  innerWidth: number;

  constructor(private modalService: NgbModal, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.screenControl();

  }


  submit() {
    throw new Error("Method not implemented.");
  }


  screenControl() {
    this.innerWidth = window.innerWidth;
    AppService.changeHeaderVisibility.emit(true)
    
    if (this.innerWidth > 767) {
      AppService.changeFooterVisibility.emit(true)
    }
    else {
      AppService.changeFooterVisibility.emit(false)
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenControl();
  }


}
