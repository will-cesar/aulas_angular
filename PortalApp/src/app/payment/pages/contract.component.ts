import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { AppService } from '../../app.service';
import { RegisterService } from 'src/app/services/register.service';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { ContractService } from 'src/app/checkout/services/contract.service';
import Swal from 'sweetalert2';
import { ContractResponse } from '../../checkout/models/contractResponse.model';
import { environment } from '../../../environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-payment-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss', '../payment.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class PaymentContractComponent extends BaseFormComponent implements OnInit {


  innerWidth: number;
  contract: ContractResponse;
  hasContract: boolean = false;
  mediaRepository: any = environment.mediasUrl;
  constructor(private modalService: NgbModal, private contractService: ContractService, private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.controlScreen();
    if (this.route.snapshot.params && this.route.snapshot.params['idContract']) {
      return this.contractService.getContractById(this.route.snapshot.params['idContract']).subscribe(result => this.loadContract(result));
    }
  }

  loadContract(result) {

    this.contract = result;

    this.contract = result;
    if (this.contract.annataStatus == "Approved") {

    }
    // else {
    //   this.router.navigate(['/checkout/status', this.contract.contract.idContract]);
    // }

    this.hasContract = true;
  }

  submit() {
    throw new Error("Method not implemented.");
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.controlScreen();
  }
  goToSign() {
    this.router.navigate(['/pagamento/seus-dados', this.contract.contract.idContract]);

  }

  openProposal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-full-proposal', windowClass: "proposalModal" });
  }

}
