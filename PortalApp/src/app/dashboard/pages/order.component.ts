import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { AppService } from '../../app.service';
import { RegisterService } from 'src/app/services/register.service';
import { ContractService } from '../../checkout/services/contract.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ContractResponse } from '../../checkout/models/contractResponse.model';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss', '../dashboard.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class OrderComponent extends BaseFormComponent implements OnInit {

  innerWidth: number;
  hasNewOrders: boolean = true;
  contract: ContractResponse;
  loadingStatus: boolean = true;
  firstClass: string;
  secondClass: string;
  thirdClass: string;
  fourClass: string;
  dataPrevChegada: any;

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private ngxService: NgxUiLoaderService, private contractService: ContractService) {
    super();
  }

  ngOnInit() {
    this.screenControl();
    if (this.route.snapshot.params && this.route.snapshot.params['idContract']) {
      //this.ngxService.start();
      return this.contractService.getContractById(this.route.snapshot.params['idContract']).subscribe(result => this.loadContract(result));
    }
  }

  loadContract(result) {
    this.contract = result;
    this.loadingStatus = false;

    if (this.contract.annataStatus == "Approved") {
      this.firstClass = "past-status";
      this.secondClass = "current-status";
      this.thirdClass = "future-status";
      this.fourClass = "future-status";

    }
    else if (this.contract.annataStatus == "Reproved") {
      this.firstClass = "future-status";
      this.secondClass = "future-status";
      this.thirdClass = "future-status";
      this.fourClass = "future-status";

    }
    else if (this.contract.annataStatus == "PendingDocuments") {
      this.firstClass = "current-status";
      this.secondClass = "future-status";
      this.thirdClass = "future-status";
      this.fourClass = "future-status";

    }
    else {
      this.firstClass = "current-status";
      this.secondClass = "future-status";
      this.thirdClass = "future-status";
      this.fourClass = "future-status";
    }

    this.prevChegada();
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

  prevChegada() {
    var oldDate = new Date(this.contract.contract.contractDate);
    this.dataPrevChegada = oldDate.setDate(oldDate.getDate() + 45);
    this.dataPrevChegada = new Date(this.dataPrevChegada);
  }
}
