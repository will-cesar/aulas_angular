import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { AppService } from '../../app.service';
import { RegisterService } from 'src/app/services/register.service';
import { ContractService } from 'src/app/checkout/services/contract.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ContractResponse } from '../../checkout/models/contractResponse.model';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss', '../dashboard.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class OrdersComponent extends BaseFormComponent implements OnInit {

  innerWidth: number;
  hasNewOrders: boolean = false;
  ordersList: ContractResponse;
  loadingStatus: boolean = true;
  firstClass: string;
  secondClass: string;
  thirdClass: string;
  fourClass: string;
  showPendingDocuments: boolean = false;

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private contractService: ContractService, private ngxService: NgxUiLoaderService, private userService: RegisterService) {
    super();
  }

  ngOnInit() {
    this.ngxService.start();
    this.screenControl();
    this.userService.getLoggedUser().subscribe(result => this.successGetLoggedUser(result), error => this.defaultError(error)).add(() => this.ngxService.stop());
  }

  successGetLoggedUser(result) {
    this.contractService.getContracts(result.idUser).subscribe(result => this.successGetLoggedUserContracts(result), error => this.defaultError(error));
  }

  successGetLoggedUserContracts(result) {
    this.ordersList = result;
    console.log(this.ordersList);
    result.forEach(element => {
      if (element.annataStatus == "PendingDocuments")
        this.showPendingDocuments = true;
    });

    this.loadingStatus = false;
    // this.ngxService.stop();
    if (result.length > 0) {
      this.hasNewOrders = true;
    }
    this.ngxService.stop();
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

  statusOrder(status) {

    if (status.annataStatus == "Approved") {
      this.firstClass = "past-status";
      this.secondClass = "current-status";
      this.thirdClass = "future-status";
      this.fourClass = "future-status";

      return "Aprovado";
    }
    else if (status.annataStatus == "Reproved") {
      this.firstClass = "future-status";
      this.secondClass = "future-status";
      this.thirdClass = "future-status";
      this.fourClass = "future-status";
      return "Reprovado";
    }
    else if (status.annataStatus == "PendingDocuments") {
      this.firstClass = "current-status";
      this.secondClass = "future-status";
      this.thirdClass = "future-status";
      this.fourClass = "future-status";
      return "Pendente documentação";
    }
    else
      return "Em Análise";
  }


}
