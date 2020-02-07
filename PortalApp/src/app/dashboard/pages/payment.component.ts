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
import { ContractService } from 'src/app/checkout/services/contract.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ContractResponse } from 'src/app/checkout/models/contractResponse.model';
import * as moment from 'moment';


@Component({
  selector: 'app-payment-method',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss', '../dashboard.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class PaymentMethodComponent extends BaseFormComponent implements OnInit {

  totalValue: number = 0;
  hasSelectedPlots: boolean;
  innerWidth: number;
  pastPayments: boolean = false;
  hasPayments: boolean = true;
  paymentDates: any = [
    { plotId: "1", date: "01/10/2019", price: 1580 },
    { plotId: "2", date: "01/10/2019", price: 1980 },
    { plotId: "3", date: "01/10/2019", price: 2500 },
    { plotId: "4", date: "01/10/2019", price: 3500 },
    { plotId: "5", date: "01/10/2019", price: 6000 }
  ];
  selectedPlots: any = [];
  dataPayments: any = [];
  paymentMethodBoletoData: any = '';
  paymentMethodCardData: any = '';
  guaranteeDepositDone: boolean = false;
  guaranteeDepositMethod: string = "Billet";
  guaranteeDepositCreditCardFinal: string;
  hasOrder: boolean = false;
  installmentsPaymentMethod: string = "Billet";
  installmentsCreditCardFinal: string;
  installmentsPaymentDone: boolean = false;
  today: string = moment().format();
  loadingStatus: boolean = true;
  hasSignedContract: boolean = false;
  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private contractService: ContractService,
    private ngxService: NgxUiLoaderService,
    private userService: RegisterService) {
    super();
  }

  ngOnInit() {
    this.ngxService.start();
    this.screenControl();
    this.userService.getLoggedUser().subscribe(result => this.successGetLoggedUser(result), error => this.defaultError(error));
  }

  successGetLoggedUser(result) {
    this.contractService.getContracts(result.idUser).subscribe(result => this.successGetLoggedUserContracts(result), error => this.defaultError(error));
  }

  successGetLoggedUserContracts(result) {
    this.loadingStatus = false;
    this.dataPayments = result[0];

    

    if (result.length > 0 && result[0].annataStatus == "Approved") {
      this.hasOrder = true;
      this.hasSignedContract = result[0].contract.signedContract;
    }
    if (this.dataPayments && this.dataPayments.contract && this.dataPayments.contract.contractPayments) {
      var depositPayment = this.dataPayments.contract.contractPayments[0];
      console.log(depositPayment);
      if (depositPayment.done) {
        this.guaranteeDepositDone = true;
      }

      if (depositPayment.method == 0) {
        this.guaranteeDepositMethod = "CreditCard";
        this.guaranteeDepositCreditCardFinal = depositPayment.userCard.card.substr(depositPayment.userCard.card.length - 4);
      }



      var installmentsPayment = this.dataPayments.contract.contractPayments[this.dataPayments.contract.contractPayments.length - 1];
      console.log(depositPayment);

      if (installmentsPayment.method == 0) {
        this.installmentsPaymentDone = true;
        this.installmentsPaymentMethod = "CreditCard";
        if (installmentsPayment.userCard)
          this.installmentsCreditCardFinal = installmentsPayment.userCard.card.substr(installmentsPayment.userCard.card.length - 4);
      }
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

  changePaymentsList() {
    this.pastPayments = !this.pastPayments;
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

  selectPlot(plot: any, event: any) {
    if (event.currentTarget.classList.contains('active')) {
      event.currentTarget.classList.remove('active');
      this.selectedPlots.forEach((item, index) => {
        if (item.idContractPayment === plot) this.selectedPlots.splice(index, 1);
      });
    }
    else {
      this.dataPayments.contract.contractPayments.forEach((item, index) => {
        if (item.idContractPayment == plot) {
          this.selectedPlots.push(item);
        }
      });
      event.currentTarget.classList.add('active')
    }
    if (this.selectedPlots.length > 0) {
      this.hasSelectedPlots = true;
    }
    else {
      this.hasSelectedPlots = false;
    }
    this.getTotal();
  }

  getTotal() {
    let total = 0;

    this.selectedPlots.forEach((item) => {
      total += Number(item.value);
    });

    this.totalValue = total;

    return total;
  }
}
