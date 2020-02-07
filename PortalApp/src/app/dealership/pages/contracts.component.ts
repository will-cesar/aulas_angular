import { ContractService } from './../services/contract.service';
import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { AppService } from '../../app.service';
import { RegisterService } from 'src/app/services/register.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';




@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss', '../dealership.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class ContractsComponent extends BaseFormComponent implements OnInit {

  @ViewChild('inputFilter', { static: false }) inputFilter: ElementRef;

  innerWidth: number;
  hasNewOrders: boolean = true;
  showAllContracts: boolean = true;
  showContract: boolean = false;
  infoOpen: boolean = false;
  infoOpenDesk: boolean = false;
  optionsStatus: any[] = [
    { type: 2, value: 'Ativo' },
    { type: 0, value: 'Disponível' },
    { type: 1, value: 'Encerrado' },
    { type: 'Todos', value: 'Todos' }
  ];
  results: any = false;
  isValueFilter: boolean = false;
  contracts: any[] = [];
  contractsFiltered: any[];
  statusSelected: string = 'Todos';
  inputData: any = '';
  selectedContract: any = null;
  loadingStatus: boolean = true;
  userInfos: any;
  constructor(private modalService: NgbModal, private route: ActivatedRoute, private dataService: ContractService, private ngxService: NgxUiLoaderService) {
    super();
  }

  ngOnInit() {
    this.userInfos = JSON.parse(localStorage.getItem('logged.user.session'));
    this.screenControl();
    this.getContractsByDealershipId();
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

  toggleHelper() {
    if (this.innerWidth < 991) {
      this.infoOpen = !this.infoOpen;
    }

    if (this.innerWidth > 991) {
      this.infoOpenDesk = !this.infoOpenDesk;
    }
  }

  selectStatus(status) {
    this.filterByStatus(status.type);
    this.filterByInput(this.inputData);
    this.statusSelected = status.type;
  }

  searchInputContracts(event) {
    this.filterByStatus(this.statusSelected);
    this.filterByInput(event.target.value);
    this.inputData = event.target.value;
  }

  filterByStatus(status) {
    if (status == 'Todos') {
      this.contractsFiltered = this.contracts;
    }
    else {
      this.contractsFiltered = this.contracts.filter((contract) => {
        return contract.eOrderStatus == status;
      })
    }
    this.results = this.contractsFiltered.length;
  }

  filterByInput(value) {
    if (value.length > 0) {
      this.isValueFilter = true;
      let newArr = [];

      this.contractsFiltered.map((contract) => {
        if (contract.annataRental.rentalTableGet.dirPartyTable_Name.toLowerCase().indexOf(value) > -1) {
          newArr.push(contract);
        }
        else if (contract.rentId.toLowerCase().indexOf(value) > -1) {
          newArr.push(contract);
        }
      })

      this.contractsFiltered = newArr;
      this.results = this.contractsFiltered.length;
    }
    else {
      this.isValueFilter = false;
      this.inputData = '';
    }
  }

  clearInputFilter() {
    this.inputFilter.nativeElement.value = '';
    this.isValueFilter = false;
    this.results = false;
    this.inputData = '';
    this.filterByStatus(this.statusSelected);
  }

  getContractsByDealershipId() {
    this.dataService.getContractsByDealership(this.userInfos.dealershipId).subscribe(result => this.successGetDealershipContracts(result), error => this.defaultError(error));
  }

  successGetDealershipContracts(result) {
    this.loadingStatus = false;
    this.contracts = result;
    this.contractsFiltered = this.contracts;
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

  formatDateToBrLocale(data) {
    var dia = data.substring(8, 10);
    var mes = data.substring(5, 7); //+1 pois no getMonth Janeiro começa com zero.
    var ano = data.substring(0, 4);
    return dia + "/" + mes + "/" + ano;
  }

  selectContract(contract) {
    this.selectedContract = contract;
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
