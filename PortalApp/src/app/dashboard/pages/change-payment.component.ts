import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
import { debug } from 'util';
import { PaymentService } from 'src/app/payment/services/payment.service';


@Component({
  selector: 'app-change-payment-method',
  templateUrl: './change-payment.component.html',
  styleUrls: ['./change-payment.component.scss', '../dashboard.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class ChangePaymentMethodComponent extends BaseFormComponent implements OnInit {

  innerWidth: number;
  cardBrand: string;
  infoOpen: boolean = false;
  creditCard: boolean = true;
  formAnotherPaymentMethod: FormGroup;
  boletoForm: FormGroup;
  successChange: boolean = false;
  guaranteeDeposit: boolean = false;
  contract: any;

  paymentDates: any = [
    { key: "5", value: "5" },
    { key: "10", value: "10" },
    { key: "15", value: "15" },
    { key: "20", value: "20" },
    { key: "25", value: "25" }
  ];

  constructor(private modalService: NgbModal, private route: ActivatedRoute,
    private dataService: PaymentService, private fb: FormBuilder, private contractService: ContractService, private ngxService: NgxUiLoaderService) {
    super();
  }

  ngOnInit() {
    this.screenControl();

    if (this.route.toString().indexOf('efetuar') > -1) {
      this.guaranteeDeposit = true;
    }
    else {
      this.guaranteeDeposit = false;
    }

    this.boletoForm = this.fb.group({
      paymentDate: [null, [Validators.required]],
    });

    this.formAnotherPaymentMethod = this.fb.group({
      creditCardNumber: [null, [Validators.required, Validators.maxLength(200)]],
      creditCardName: [null, [Validators.required, Validators.maxLength(200)]],
      creditCardDate: [null, [Validators.required, Validators.maxLength(4)]],
      creditCardCCV: [null, [Validators.required, Validators.maxLength(4)]],
      paymentDate: [null, [Validators.required, Validators.maxLength(4)]],
    });

    if (this.route.snapshot.params && this.route.snapshot.params['idContract']) {
      this.ngxService.start();
      return this.contractService.getContractById(this.route.snapshot.params['idContract']).subscribe(result => this.loadContract(result)).add(() => this.ngxService.stop());
    }

  }

  loadContract(result) {
    this.contract = result.contract;
  }

  submit() {
    throw new Error("Method not implemented.");
  }

  changePaymentsList() {
    this.creditCard = !this.creditCard;
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
      AppService.changeFooterVisibility.emit(true)
    }
    else {
      AppService.changeHeaderVisibility.emit(false)
      AppService.changeFooterVisibility.emit(false)
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenControl();
  }

  getCardBrand(event) {
    if (event.currentTarget.value.length > 5) {
      let number = this.form.value.creditCardNumber;
      var re = new RegExp("^4");
      if (number.match(re) != null)
        this.cardBrand = "Visa";
      if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
        this.cardBrand = "Mastercard";
      re = new RegExp("^3[47]");
      if (number.match(re) != null)
        this.cardBrand = "AMEX";
      re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
      if (number.match(re) != null)
        this.cardBrand = "Discover";
      re = new RegExp("^36");
      if (number.match(re) != null)
        this.cardBrand = "Diners";
      re = new RegExp("^30[0-5]");
      if (number.match(re) != null)
        this.cardBrand = "Diners - Carte Blanche";
      re = new RegExp("^35(2[89]|[3-8][0-9])");
      if (number.match(re) != null)
        this.cardBrand = "JCB";
      re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
      if (number.match(re) != null)
        this.cardBrand = "Visa Electron";
    }
    else {
      this.cardBrand = '';
    }
  }

  toggleHelper() {
    if (this.innerWidth < 768) {
      this.infoOpen = !this.infoOpen;
    }
  }

  submitCC() {

    if (!this.guaranteeDeposit) {

      this.ngxService.start();
      var obj = {
        cardNumber: this.formAnotherPaymentMethod.value.creditCardNumber,
        name: this.formAnotherPaymentMethod.value.creditCardName,
        expirationDate: this.formAnotherPaymentMethod.value.creditCardDate,
        ccv: this.formAnotherPaymentMethod.value.creditCardCCV,
        value: this.contract.installmentAmount,
        idContract: this.contract.idContract,
        dueDay: this.formAnotherPaymentMethod.value.paymentDate
      }
      this.dataService.changeInstallmentPayment(obj).subscribe(result => this.successCCChange(result), error => this.paymentError(error)).add(() => this.ngxService.stop());;

    }
    else {
      this.ngxService.start();
      var obj = {
        cardNumber: this.formAnotherPaymentMethod.value.creditCardNumber,
        name: this.formAnotherPaymentMethod.value.creditCardName,
        expirationDate: this.formAnotherPaymentMethod.value.creditCardDate,
        ccv: this.formAnotherPaymentMethod.value.creditCardCCV,
        value: this.contract.installmentAmount,
        idContract: this.contract.idContract,
        dueDay: this.formAnotherPaymentMethod.value.paymentDate
      }
      this.dataService.postGuaranteeDepositPayment(obj).subscribe(result => this.successCCChange(result), error => this.paymentError(error)).add(() => this.ngxService.stop());;

    }
  }

  submitBillet() {
    this.ngxService.start();
    if (!this.guaranteeDeposit) {
      var obj = {

        idContract: this.contract.idContract,
        dueDay: this.boletoForm.value.paymentDate
      }
      this.dataService.changeInstallmentPaymentBillet(obj).subscribe(result => this.successCCChange(result), error => this.paymentError(error)).add(() => this.ngxService.stop());
    }
    else {
      var objBillet = {

        idContract: this.contract.idContract,

      }
      this.dataService.postGuaranteeDepositPaymentBillet(objBillet).subscribe(result => this.successCCChange(result), error => this.paymentError(error)).add(() => this.ngxService.stop());

    }


  }

  successCCChange(result) {
    this.successChange = true;
  }

  paymentError(response) {
    var errorMessage = 'Houve um erro com a operação. Favor entrar em contato com o Suporte';

    if (response.error) {
      if (response.error.errors) {
        errorMessage = '';
        response.error.errors.forEach(element => {
          errorMessage += '<br />' + element.value;
        });
      }
    }
    Swal.fire({
      title: 'Ops! Não foi possível atualizar sua forma de pagamento',
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

}
