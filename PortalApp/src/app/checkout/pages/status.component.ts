import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { AppService } from '../../app.service';
import { RegisterService } from 'src/app/services/register.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ContractService } from '../services/contract.service';
import { ContractResponse } from '../models/contractResponse.model';
import { environment } from '../../../environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-checkout-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss', '../checkout.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class CheckoutStatusComponent extends BaseFormComponent implements OnInit {

  innerWidth: number;
  isApproved: boolean = false;
  needDocuments: boolean = false;
  inAnalysis: boolean = true;
  docReceived: boolean = false;
  fullDocumentation: boolean = false;
  contract: ContractResponse = null;
  mediaRepository: any = environment.mediasUrl;
  loadingStatus: boolean;

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private dataService: ContractService, private ngxService: NgxUiLoaderService) {
    super();
  }

  ngOnInit() {
    this.screenControl();

    if (this.route.snapshot.params && this.route.snapshot.params['idContract']) {
      //this.ngxService.start();
      this.loadingStatus = true;
      this.dataService.getContractById(this.route.snapshot.params['idContract']).subscribe(result => this.loadContract(result), error => this.defaultError(error)).add(() => this.ngxService.stop());
    }
  }

  loadContract(result) {
    this.contract = result;
    this.loadingStatus = false;

    if (this.contract.annataStatus == "Reproved" || this.contract.annataStatus == "Repproved") {
      this.isApproved = false;
      this.needDocuments = false;
      this.inAnalysis = false;
      this.fullDocumentation = false;
    }
    else if (this.contract.annataStatus == "Approved") {
      this.isApproved = true;
      this.needDocuments = false;
      this.inAnalysis = false;
      this.fullDocumentation = false;
    }
    else {
      this.isApproved = false;
      this.needDocuments = false;
      this.inAnalysis = true;
      this.fullDocumentation = false;
    }

  }

  defaultError(response) {
    if (response.status == 401) {
      AppService.showLoginDiv.emit(true);
    }
    else {
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
        title: 'Ops! Problema ao carregar dados do seu pedido!',
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

  submit() {
    throw new Error("Method not implemented.");
  }

  openProposal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-full-proposal', windowClass: "proposalModal" });
  }

  screenControl() {
    this.innerWidth = window.innerWidth;
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
