import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../../app.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { environment } from '../../../environments/environment';
import { SimulationService } from '../services/simulation.service';
import { SimulationSession } from '../models/simulationSession.model';
import { LoginService } from 'src/app/login/services/login.service';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/checkout/services/contract.service';
import { debug } from 'util';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GenerateContract } from 'src/app/checkout/models/generateContract.model';

@Component({
  selector: 'app-contrate',
  templateUrl: './contrate.component.html',
  styleUrls: ['./contrate.component.scss', '../../../app/register/register.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})
export class ContrateComponent extends BaseFormComponent implements OnInit {

  @ViewChild('btnCollapse', { static: false }) btnCollapse: ElementRef;

  mediaRepository: any = environment.mediasUrl;
  session: SimulationSession;
  innerWidth: number;
  selectedLocation: string = null;
  showForm: boolean = true;
  local: any = [];
  concessionariaSelected: any = false;
  hiddenPerfectScroll: boolean = true;
  concessionarias: any = [];
  concessionariasFiltered: any = [];
  localidades: any = [
    { key: "Curitiba", value: "Curitiba" },
    // { key: "São Paulo", value: "São Paulo" },
    // { key: "Outras localidades", value: "Outras localidades" },

  ];
  isOutrasLocalidades: boolean;
  successfulEmailing: boolean;
  formEmail: FormGroup;

  constructor(
    private simulationService: SimulationService,
    private loginService: LoginService,
    private router: Router,
    private contractService: ContractService,
    private ngxService: NgxUiLoaderService,
    private fb: FormBuilder,
    private _elementRef: ElementRef
  ) {
    super();
  }

  ngOnInit() {
    this.simulationService.getDealership().subscribe(result => this.successSimulation(result), error => this.errorSimulation(error));
    this.session = this.simulationService.getSimulationSession();
    this.innerWidth = window.innerWidth;
    this.selectedLocation = null;
    if (this.innerWidth < 768) {
      AppService.changeFooterVisibility.emit(false)
    }

    this.form = this.fb.group({
      regiao: ['']
    });

    this.formEmail = this.fb.group({
      email: [null]
    });

    if (!this.session || !this.session.selectedClass) {
      this.router.navigate(['/simulador']);
    }
    else {
      if (this.session.region) {
        this.form.value.regiao = this.session.region;
        this.selectRegiao();
      }
    }

    this.isOutrasLocalidades = false;
    this.successfulEmailing = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 767) {
      AppService.changeFooterVisibility.emit(true)
    }
    else {
      AppService.changeFooterVisibility.emit(false)
    }
  }

  selectLocation(location: any, element: any) {
    this.selectedLocation = location;
    Array.from(document.querySelectorAll('.location')).forEach(element => {
      element.classList.remove('active')
    });
    element.currentTarget.classList.add('active');

    this.session.dealershipId = location.dealershipId;
    this.session.region = this.local;
    this.simulationService.postSimulationSessionObj(this.session);

  }

  hire() {
    var token = localStorage.getItem(environment.token);

    if (!token) {

    }

    Swal.fire({
      title: 'Aguarde!',
      html: 'Estamos analisando a sua proposta',
      showCloseButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: {
        popup: 'loader-alert',
        header: 'loader-alert-header',
        title: 'title-class',
        content: 'loader-alert-content',
        actions: 'alert-action',
        confirmButton: 'button-secundary buttontextpink selectedButton',
      }
    });

    var simulationSession = this.simulationService.getSimulationSession();
    if (simulationSession) {
      this.session.actualStep = 4;
      this.session.dealershipId = this.concessionariaSelected.dealershipId;
      this.session.region = this.local;
      this.simulationService.postSimulationSessionObj(this.session);
    }

    var collaborator = JSON.parse(localStorage.getItem('loggedColaborador'));


    var data: GenerateContract = {
      dealership: this.concessionariaSelected.name,
      dealershipId: this.concessionariaSelected.dealershipId,
      kmLimit: simulationSession.kmLimit,
      timeDeadline: simulationSession.dealdlineTime,
      modelId: simulationSession.selectedClass.modelId,
      selectedModel: simulationSession.selectedClass,
      typeOfColor: simulationSession.colorType,
      selectedColor: simulationSession.selectedColor,
      collaboratorDocument: collaborator.document
    };

    this.contractService.generate(data).subscribe(result => this.successContract(result), error => this.defaultError(error)).add(() => this.ngxService.stop())
  }

  successContract(result) {
    Swal.close();
    this.router.navigate(['/checkout/status', result.idContract]);
  }

  defaultError(response) {
    Swal.close();
    if (response.status == 401) {
      AppService.showLoginDiv.emit(true);
      this.router.navigate(["/cadastro"]);

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
        title: 'Ops! Problema ao gerar contrato!',
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

  selectRegiao() {

    this.local = this.form.value.regiao;

    this.concessionariasFiltered = this.concessionarias.filter(x => x.city == this.form.value.regiao);
    // this.simulationService.getDealership().subscribe(result => this.successSimulation(result), error => this.errorSimulation(error));
    this.showForm = false;
    this.hiddenPerfectScroll = false;

    this.successfulEmailing = false;

    this.formEmail.controls.email.clearValidators();
    if (this.form.value.regiao === 'Outras localidades') {
      this.formEmail.controls.email.setValidators([Validators.required, Validators.email]);
      this.isOutrasLocalidades = true;
    } else {
      this.isOutrasLocalidades = false;
      this.formEmail.controls.email.setValidators(null);
    }
    this.formEmail.controls.email.updateValueAndValidity();
  }

  successSimulation(result) {
    this.ngxService.stop();
    this.concessionarias = result;

    if (this.session && this.session.dealershipId) {
      var location = result.find(x => x.dealershipId == this.session.dealershipId);
      this.selectLocation = location;
      this.concessionariaSelected = location;
      this.hiddenPerfectScroll = true;
    }
  }

  errorSimulation(error) {
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

  alterarRegiao() {
    this.showForm = true;
    this.concessionariaSelected = false;
  }

  collapse(element) {
    const elementsConcessionaria = Array.from(document.querySelectorAll('.concessionaria-content'));

    if (element.target.classList[1] == "arrow-colapse-active") {
      element.target.classList.remove('arrow-colapse-active');
    }
    else {
      element.target.classList.add('arrow-colapse-active');
    }

    elementsConcessionaria.forEach((el) => {
      if (el.getAttribute('id') == element.target.getAttribute('id')) {
        if (el.classList[1] == "concessionaria-content--collapsed") {
          el.classList.remove('concessionaria-content--collapsed');
        }
        else {
          el.classList.add('concessionaria-content--collapsed');
        }
      }
    });
  }

  selectConcessionaria(item) {
    this.hiddenPerfectScroll = true;
    this.concessionariaSelected = item;
  }

  voltarSelecaoConcessionaria() {
    this.concessionariaSelected = false;
    this.hiddenPerfectScroll = false;
  }

  submit() { }

  onSendEmail() {
    if (this.formEmail.invalid) {
      this.formEmail.controls.email.markAsDirty();
      this.formEmail.controls.email.markAsTouched();
      return;
    }

    this.formEmail.reset();
    this.successfulEmailing = true;
    this.isOutrasLocalidades = false;
  }

}
