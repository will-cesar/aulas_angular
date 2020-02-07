import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { AppService } from '../../app.service';
import { RegisterService } from 'src/app/services/register.service';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ContractService } from '../../checkout/services/contract.service';
import { ContractResponse } from '../../checkout/models/contractResponse.model';
import { environment } from '../../../environments/environment';
import { cmsService } from '../../services/cms.service';


@Component({
  selector: 'app-payment-contract-infos',
  templateUrl: './contract-infos.component.html',
  styleUrls: ['./contract-infos.component.scss', '../payment.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class PaymentContractInfosComponent extends BaseFormComponent implements OnInit {


  contractContent: string;
  innerWidth: number;
  contract: ContractResponse;
  hasContract: boolean = false;
  mediaRepository: any = environment.mediasUrl;
  constructor(private cmsService: cmsService, private modalService: NgbModal, private contractService: ContractService, private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.getPageContent();
    this.controlScreen();
    if (this.route.snapshot.params && this.route.snapshot.params['idContract']) {
      return this.contractService.getContractById(this.route.snapshot.params['idContract']).subscribe(result => this.loadContract(result));
    }
  }

  getPageContent() {
    this.cmsService.getPageById(847).subscribe(result => this.successLoadPageContent(result), error => this.defaultError());
  }

  successLoadPageContent(result) {
    this.contractContent = this.mediaRepository + result.conteudo[0].documento;
  }

  defaultError(){

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

  submit() {
    throw new Error("Method not implemented.");
  }

  openProposal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-full-contract', windowClass: "contractModal" });
  }

}
