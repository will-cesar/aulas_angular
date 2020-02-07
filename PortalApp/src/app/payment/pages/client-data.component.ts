import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { AppService } from '../../app.service';
import { RegisterService } from 'src/app/services/register.service';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PaymentService } from '../services/payment.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ContractService } from 'src/app/checkout/services/contract.service';
import { ContractResponse } from 'src/app/checkout/models/contractResponse.model';


@Component({
  selector: 'app-payment-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.scss', '../payment.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class PaymentClientDataComponent extends BaseFormComponent implements OnInit {


  contract: ContractResponse;
  innerWidth: number;
  constructor(private modalService: NgbModal, private fb: FormBuilder, private router: Router, private dataService: PaymentService, private route: ActivatedRoute, private contractService: ContractService,

    private ngxService: NgxUiLoaderService) {
    super();
  }

  ngOnInit() {
    this.controlScreen()

    if (this.route.snapshot.params && this.route.snapshot.params['idContract']) {
      this.ngxService.start();
      this.contractService.getContractById(this.route.snapshot.params['idContract']).subscribe(result => this.loadContract(result), error => this.defaultError(error)).add(() => this.ngxService.stop());
    }


  }
  loadContract(result) {

    this.contract = result;
    if (this.contract.annataStatus == "Approved") {

    }
    // else {
    //   this.router.navigate(['/checkout/status', this.contract.contract.idContract]);
    // }

    this.contract = result;
    var user = this.contract.contract.user;

    this.form = this.fb.group({
      driverName: [user.name + ' ' + user.secondname + ' ' + user.surname, [Validators.required, Validators.maxLength(200)]],
      document: [user.document, [Validators.required, FormValidations.isValidCpf()]],
      email: [user.email, [Validators.required, Validators.maxLength(200)]],
      tel: [user.tel, [Validators.required, Validators.pattern('^[1-9]{2}(?:9[1-9])[0-9]{3}[0-9]{4}$')]],
    });


    if (this.route.snapshot.queryParams && this.route.snapshot.queryParams['event']) {

      var status = this.route.snapshot.queryParams['event'];

      if (status == "signing_complete") {

        this.contractService.putSigned(this.contract.contract.idContract).subscribe(result => console.log(result));
        Swal.fire({
          title: 'Contrato assinado com sucesso!',
          html: "",
          showCloseButton: true,
          confirmButtonText: 'OK',
          customClass: {
            popup: 'success-alert',
            header: 'success-alert-header',
            title: 'title-class',
            content: 'success-alert-content',
            actions: 'alert-action',
            confirmButton: 'button-secundary buttontextpink selectedButton',
          }
        });
        this.router.navigate(['/pagamento/forma-de-pagamento', this.contract.contract.idContract]);

      }
      else {
        Swal.fire("Atenção", "Não foi possivel verificar a assinatura", "warning");
      }
    }

    console.log(this.contract.contract.guaranteeDeposit)

  }
  submit() {
    var obj = this.form.value;
    obj.idContract = this.contract.contract.idContract;

    this.ngxService.start();
    this.dataService.post(this.form.value).subscribe(result => this.success(result), error => this.defaultError(error))
  }

  success(result) {
    console.log(result);

    window.location.href = result.url;

  }

  controlScreen() {
    this.innerWidth = window.innerWidth;
    AppService.changeLinkLoginVisibility.emit(false)
    AppService.checkBackNav.emit(false)
    if (this.innerWidth < 768) {
      AppService.checkBackNav.emit(true)
      AppService.changeFooterVisibility.emit(false)
    }
    else {
      AppService.checkBackNav.emit(false)
      AppService.changeFooterVisibility.emit(true)
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.controlScreen();
  }


  openProposal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-full-proposal', windowClass: "proposalModal" });
  }

  defaultError(response) {
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
      title: 'Ops! Erro na operação.',
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
