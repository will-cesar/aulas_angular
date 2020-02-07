import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { AppService } from '../../app.service';
import { RegisterService } from 'src/app/services/register.service';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ContractService } from 'src/app/checkout/services/contract.service';
import { ContractResponse } from 'src/app/checkout/models/contractResponse.model';


@Component({
  selector: 'app-concluded-payment',
  templateUrl: './concluded-payment.component.html',
  styleUrls: ['./concluded-payment.component.scss', '../payment.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class ConcludedPaymentComponent extends BaseFormComponent implements OnInit {

  innerWidth: number;
  isWaitingPayment: boolean = false;
  conclusionStatus: string = 'Contratação finalizada com sucesso ;)';
  contract: ContractResponse;
  dueDay: number;
  paymentMethod: string;

  constructor(private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private ngxService: NgxUiLoaderService, private contractService: ContractService) {
    super();
  }

  ngOnInit() {
    this.controlScreen();

    if (this.route.snapshot.params && this.route.snapshot.params['idContract']) {
      this.ngxService.start();
      return this.contractService.getContractById(this.route.snapshot.params['idContract']).subscribe(result => this.loadContract(result)).add(() => this.ngxService.stop());
    }




  }

  loadContract(result) {
    this.contract = result;
    this.contract = result;
    if (this.contract.annataStatus == "Approved") {

    }


    this.dueDay = this.contract.contract.contractPayments[3].dueDay;

    var method = this.contract.contract.contractPayments[3].method;
    this.paymentMethod = "Cartão de Crédito";

    if (method == 0) {
      this.isWaitingPayment = false;
      this.paymentMethod = "Cartão de Crédito";
    }
    else {
      this.isWaitingPayment = true;
      this.paymentMethod = "Boleto";
    }

    if (this.isWaitingPayment) {
      this.conclusionStatus = 'Aguardando pagamento!';
    }


  }

  controlScreen() {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.controlScreen();
  }

  submit() {
    throw new Error("Method not implemented.");
  }

  onSubmit() {

  }

}
