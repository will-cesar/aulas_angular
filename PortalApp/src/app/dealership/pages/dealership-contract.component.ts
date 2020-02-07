import { Component, OnInit, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { AppService } from '../../app.service';
import { ActivatedRoute } from '@angular/router';
import { ContractService } from './../services/contract.service';

@Component({
  selector: 'app-dealership-contract',
  templateUrl: './dealership-contract.component.html',
  styleUrls: ['./dealership-contract.component.scss', '../dealership.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})
export class DealershipContractComponent extends BaseFormComponent implements OnInit {

  selectedContract: any;
  innerWidth: number;
  hasNewOrders: boolean = true;
  isVehicleClient: boolean = false;
  loadingStatus: boolean = true;
  firstClass: string;
  secondClass: string;
  thirdClass: string;
  fourClass: string;
  userInfos: any;
  constructor(private modalService: NgbModal, private route: ActivatedRoute, private dataService: ContractService) {
    super();
  }

  ngOnInit() {
    this.userInfos = JSON.parse(localStorage.getItem('logged.user.session'));
    this.screenControl();
    this.getContractsByDealershipId();
  }

  getContractsByDealershipId() {
    this.dataService.getContractsByDealership(this.userInfos.dealershipId).subscribe(result => this.successGetDealershipContracts(result), error => this.defaultError(error));
  }

  successGetDealershipContracts(result) {
    this.loadingStatus = false;
    this.selectedContract = result.filter(x => x.rentId == this.route.snapshot.paramMap.get('id'))[0];
    if (this.selectedContract.annataRental.rentalTableGet.rentFinancialStatus == "Purch") {
      this.firstClass = "past-status";
      this.secondClass = "current-status";
      this.thirdClass = "future-status";
      this.fourClass = "future-status";

    }
    else if (this.selectedContract.annataRental.rentalTableGet.rentFinancialStatus == "Waiting") {
      this.firstClass = "future-status";
      this.secondClass = "future-status";
      this.thirdClass = "future-status";
      this.fourClass = "future-status";

    }
    else if (this.selectedContract.annataRental.rentalTableGet.rentFinancialStatus == "Settled") {
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
  }

  defaultError(error) {

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

  OnFileSelected(event) {
    console.log(event);
  }

  statusOrder(status) {
    if (status.annataRental.rentalTableGet.rcI_RentStatus == "Approved") {
      return "Aprovado";
    }
    else if (status.annataRental.rentalTableGet.rcI_RentStatus == "Reproved") {
      return "Reprovado";
    }
    else if (status.annataRental.rentalTableGet.rcI_RentStatus == "PendingDocuments") {
      return "Pendente documentação";
    }
    else
      return "Em Análise";
  }

}
