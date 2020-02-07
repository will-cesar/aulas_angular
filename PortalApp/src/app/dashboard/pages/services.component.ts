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
import { ContractService } from '../../checkout/services/contract.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss', '../dashboard.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class ServicesComponent extends BaseFormComponent implements OnInit {

  innerWidth: number;
  hasOrder: boolean = false;
  loadingStatus: boolean = true;
  constructor(private modalService: NgbModal, private route: ActivatedRoute, private userService: RegisterService, private contractService: ContractService, private ngxService: NgxUiLoaderService) {
    super();
  }

  ngOnInit() {
    this.screenControl();
    this.userService.getLoggedUser().subscribe(result => this.successGetLoggedUser(result), error => this.defaultError(error));
  }

  successGetLoggedUser(result) {
    this.contractService.getContracts(result.idUser).subscribe(result => this.successGetLoggedUserContracts(result), error => this.defaultError(error));
  }

  successGetLoggedUserContracts(result) {
    this.loadingStatus = false;
    if(result.length > 0){
      this.hasOrder = true;
    }
  }

  defaultError(error) {
    this.ngxService.stop();
    var errorMessage = '';

    if (error.error) {
        if (error.error.errors) {
            errorMessage = '';
            error.error.errors.forEach(element => {
                errorMessage += '<br /> - ' + element.value;
            });
        }
    }

    Swal.fire({
        title: 'Ops...',
        html: errorMessage,
        showCloseButton: true,
        confirmButtonText: 'OK',
        customClass: {
            popup: 'error-alert',
            header: 'error-alert-header',
            title: 'title-class',
            content: 'error-alert-content',
            actions: 'alert-action',
            confirmButton: 'button-secundary buttontextpink selectedButton',
        }
    });
  }


  submit() {
    throw new Error("Method not implemented.");
  }

  expandRow(evt: any) {
    if (evt.currentTarget.nextElementSibling.classList.contains('show-detail')) {
      evt.currentTarget.nextElementSibling.classList.remove('show-detail');
      evt.currentTarget.nextElementSibling.classList.add('hidden-teste');
      evt.currentTarget.querySelector('span').classList.remove('opened-item');
    } else {
      evt.currentTarget.nextElementSibling.classList.remove('hidden-teste');
      evt.currentTarget.nextElementSibling.classList.add('show-detail');
      evt.currentTarget.querySelector('span').classList.add('opened-item');
    }
  }


  screenControl() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 991) {
      AppService.changeHeaderVisibility.emit(true)
    }
    else {
      AppService.changeHeaderVisibility.emit(false)
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenControl();
  }


}
