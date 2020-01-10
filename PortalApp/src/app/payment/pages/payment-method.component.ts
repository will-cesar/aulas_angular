import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { AppService } from '../../app.service';
import { RegisterService } from 'src/app/services/register.service';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ContractService } from 'src/app/checkout/services/contract.service';
import { ContractResponse } from 'src/app/checkout/models/contractResponse.model';
import { PaymentService } from '../services/payment.service';
import { PaymentCCRequest } from '../models/paymentRequest.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { cmsService } from 'src/app/services/cms.service';
import { CmsPage } from 'src/app/shared/models/cmsPage.model';



@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss', '../payment.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class PaymentMethodComponent extends BaseFormComponent implements OnInit {

  innerWidth: number;
  cardBrand: string;
  paymentSelection: boolean = true;
  guaranteeDeposit: boolean = false;

  guaranteeDepositDone: boolean = false;

  monthlyPaymentDone: boolean = false;

  showPaymentStatus: boolean = false;
  paymentApproved: boolean = false;
  guaranteeDepositApproved: boolean = true;

  monthlyPayment: boolean = false;
  isCreditCard: boolean = true;
  isCreditCardMonthly: boolean = true;
  infoOpen: boolean = false;
  samePaymentMethod: boolean = false;
  paymentMethodForm: FormGroup;
  formAnotherPaymentMethod: FormGroup;
  boletoForm: FormGroup;
  labelCardDescription: string;
  samePaymentForm: FormGroup;

  paymentDates: any = [
    { key: "5", value: "5" },
    { key: "10", value: "10" },
    { key: "15", value: "15" },
    { key: "20", value: "20" },
    { key: "25", value: "25" }
  ];
  contract: ContractResponse;

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private contractService: ContractService, private dataService: PaymentService,
    private ngxService: NgxUiLoaderService, private cmsService: cmsService) {
    super();
  }

  ngOnInit() {
    this.showPaymentStatus = false;

    this.controlScreen();
    this.form = this.fb.group({
      creditCardNumber: [null, [Validators.required, Validators.maxLength(200)]],
      creditCardName: [null, [Validators.required, Validators.maxLength(200)]],
      creditCardDate: [null, [Validators.required, Validators.maxLength(4)]],
      creditCardCCV: [null, [Validators.required, Validators.maxLength(4)]],
    });

    this.paymentMethodForm = this.fb.group({
      samePayment: [false]
    });

    this.boletoForm = this.fb.group({
      paymentDate: [null, [Validators.required]],
    });

    this.samePaymentForm = this.fb.group({
      paymentDate: [null, [Validators.required]],
    });

    this.formAnotherPaymentMethod = this.fb.group({
      creditCardNumber: [null, [Validators.required, Validators.maxLength(200)]],
      creditCardName: [null, [Validators.required, Validators.maxLength(200)]],
      creditCardDate: [null, [Validators.required, Validators.maxLength(4)]],
      creditCardCCV: [null, [Validators.required, Validators.maxLength(4)]],
      paymentDate: [null, [Validators.required]],
    });

    this.cmsService.getPageById(798).subscribe((result: CmsPage) => this.loadPage(result), error => this.errorPage(error));

    if (this.route.snapshot.params && this.route.snapshot.params['idContract']) {
      this.ngxService.start();
      return this.contractService.getContractById(this.route.snapshot.params['idContract']).subscribe(result => this.loadContract(result)).add(() => this.ngxService.stop());
    }


  }

  loadPage(result: CmsPage): void {
    this.labelCardDescription = result.text;
  }

  errorPage(error: any): void {
  }

  loadContract(result) {
    this.contract = result;

    if (this.contract && this.contract.contract && this.contract.contract.contractPayments[0] && this.contract.contract.contractPayments[0].done) {
      this.guaranteeDepositDone = true;

    }
    // this.contract = result;
    // if (this.contract.annataStatus == "Approved") {

    // }
    // else {
    //   this.router.navigate(['/checkout/status', this.contract.contract.idContract]);
    // }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.controlScreen();
  }

  controlScreen() {
    this.innerWidth = window.innerWidth;
    AppService.changeLinkLoginVisibility.emit(false)
    if (this.innerWidth < 768) {
      AppService.changeFooterVisibility.emit(false)
    }
    else {
      AppService.changeFooterVisibility.emit(true)
    }
  }

  submitBillet() {

    if (!this.isCreditCard) {
      this.ngxService.start();
      var objBillet = {

        idContract: this.contract.contract.idContract

      }

      this.dataService.postGuaranteeDepositPaymentBillet(objBillet).subscribe(result => this.guaranteeDepositResult(result), error => this.paymentError(error)).add(() => this.ngxService.stop());
    }
    else {
      this.ngxService.start();
      var obj: PaymentCCRequest = {
        cardNumber: this.form.value.creditCardNumber,
        name: this.form.value.creditCardName,
        expirationDate: this.form.value.creditCardDate,
        ccv: this.form.value.creditCardCCV,
        value: this.contract.contract.guaranteeDeposit,
        idContract: this.contract.contract.idContract

      }

      this.dataService.postGuaranteeDepositPayment(obj).subscribe(result => this.guaranteeDepositResult(result), error => this.paymentError(error)).add(() => this.ngxService.stop());
    }
  }

  submit() {
    if (!this.isCreditCard) {
      this.ngxService.start();
      var objBillet = {

        idContract: this.contract.contract.idContract

      }

      this.dataService.postGuaranteeDepositPaymentBillet(obj).subscribe(result => this.guaranteeDepositResult(result), error => this.paymentError(error)).add(() => this.ngxService.stop());
    }
    else {
      this.ngxService.start();
      var obj: PaymentCCRequest = {
        cardNumber: this.form.value.creditCardNumber,
        name: this.form.value.creditCardName,
        expirationDate: this.form.value.creditCardDate,
        ccv: this.form.value.creditCardCCV,
        value: this.contract.contract.guaranteeDeposit,
        idContract: this.contract.contract.idContract

      }

      this.dataService.postGuaranteeDepositPayment(obj).subscribe(result => this.guaranteeDepositResult(result), error => this.paymentError(error)).add(() => this.ngxService.stop());
    }
  }


  guaranteeDepositResult(result) {

    this.guaranteeDepositDone = true;

    this.showPaymentStatus = true;
    this.paymentApproved = true;

    this.paymentSelection = true;
    this.guaranteeDeposit = false;


  }

  paymentError(response) {

    this.paymentApproved = false;
    this.showPaymentStatus = true;
  }

  defaultError(response) {
    var errorMessage = 'Houve um erro com a operação. Favor entrar em contato com o Suporte';

    if (response.error) {
      if (response.error.errors) {
        errorMessage = '';
        response.error.errors.forEach(element => {
          errorMessage += '<br /> - ' + element.value;
        });
      }
    }


    Swal.fire({
      title: 'Problema no pagamento',
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

  submitMonthlyPaymentCC() {

    this.ngxService.start();
    if (this.samePaymentMethod) {

      if (!this.samePaymentForm.value.paymentDate) {

        this.ngxService.stop();
        Swal.fire({
          title: 'Selecione a data de vencimento',
          //html: errorMessage,
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
        return;
      }

      var objSame = {
        name: this.form.value.creditCardName,
        idContract: this.contract.contract.idContract,
        samePaymentGuarantee: this.samePaymentMethod,
        dueDay: this.samePaymentForm.value.paymentDate
      }
      this.dataService.samePayment(objSame).subscribe(result => this.monthlyPaymentCCSuccess(result), error => this.paymentError(error)).add(() => this.ngxService.stop());
    }
    else {
      var obj: PaymentCCRequest = {
        cardNumber: this.formAnotherPaymentMethod.value.creditCardNumber,
        name: this.formAnotherPaymentMethod.value.creditCardName,
        expirationDate: this.formAnotherPaymentMethod.value.creditCardDate,
        ccv: this.formAnotherPaymentMethod.value.creditCardCCV,
        value: this.contract.contract.installmentAmount,
        idContract: this.contract.contract.idContract,
        samePaymentGuarantee: this.samePaymentMethod,
        dueDay: this.formAnotherPaymentMethod.value.paymentDate
      }
      this.dataService.postInstallmentPayment(obj).subscribe(result => this.monthlyPaymentCCSuccess(result), error => this.paymentError(error)).add(() => this.ngxService.stop());;
    }
  }

  submitMonthlyPaymentBillet() {

    var obj = {
      value: this.contract.contract.installmentAmount,
      idContract: this.contract.contract.idContract,
      samePaymentGuarantee: this.samePaymentMethod,
      dueDay: this.boletoForm.value.paymentDate
    }

    this.dataService.postInstallmentPaymentBillet(obj).subscribe(result => this.monthlyPaymentCCSuccess(result), error => this.paymentError(error)).add(() => this.ngxService.stop());

  }

  submitPayments() {

    this.router.navigate(['/pagamento/conclusao', this.contract.contract.idContract]);
  }

  monthlyPaymentCCSuccess(result) {

    this.paymentSelection = true;
    this.guaranteeDeposit = false;
    this.monthlyPayment = false;

    this.showPaymentStatus = true;
    this.paymentApproved = true;

    this.monthlyPaymentDone = true;

    // this.router.navigate(['/pagamento/conclusao', this.contract.contract.idContract]);


  }

  changePaymentMethod() {
    if (this.paymentMethodForm.value.samePayment == 'true') {
      this.samePaymentMethod = true;
    }
    else {
      this.samePaymentMethod = false;
    }
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


  openProposal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-full-contract', windowClass: "contractModal" });
  }

  payGuaranteeDeposit() {
    if (!this.guaranteeDepositDone) {
      this.paymentSelection = false;
      this.guaranteeDeposit = true;
    }
  }

  payPlots() {
    this.paymentSelection = false;
    this.guaranteeDeposit = false;
    this.monthlyPayment = true;
  }

  backPaymentSelection() {
    this.paymentSelection = true;
    this.guaranteeDeposit = false;
    this.samePaymentMethod = false;
    this.monthlyPayment = false;
  }

  paymentMethodChange() {
    this.isCreditCard = !this.isCreditCard;
  }

  paymentMethodChangeMonthly() {
    this.isCreditCardMonthly = !this.isCreditCardMonthly;
  }

}
