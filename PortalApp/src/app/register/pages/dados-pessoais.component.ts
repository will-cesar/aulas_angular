import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from '../../app.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { FormValidations } from 'src/app/shared/form-validations';
import swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RegisterService } from 'src/app/services/register.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router'; import { TemplateRef, ViewChild } from '@angular/core';
import { SimulationService } from 'src/app/simulador/services/simulation.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss', '../register.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class DadosPessoaisComponent extends BaseFormComponent implements OnInit {
  innerWidth: number;
  closeResult: string;
  sessionUser: User;
  errorContent: any;
  showBreadcrumbMobile: boolean = true;
  mediaRepository: any = environment.mediasUrl;
  termsUrl:string;

  constructor(private fb: FormBuilder, private dataService: RegisterService, private modalService: NgbModal, private simulationService: SimulationService,
    private ngxService: NgxUiLoaderService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.controlScreen();

    var socialUsers = JSON.parse(sessionStorage.getItem('socialusers'));

    this.sessionUser = this.dataService.getUserSession();

    if (this.sessionUser) {
      if (socialUsers) {
        this.sessionUser.name = socialUsers.facebook.name;
        this.sessionUser.email = socialUsers.facebook.email;
      }
      this.form = this.fb.group({
        name: [this.sessionUser.name, [Validators.required, Validators.maxLength(200)]],
        document: [this.sessionUser.document, [Validators.required, FormValidations.isValidCpf()]],
        email: [this.sessionUser.email, [Validators.required, Validators.email, Validators.maxLength(200)]],
        tel: [this.sessionUser.tel, [Validators.required, Validators.pattern('^[1-9]{2}(?:9[1-9])[0-9]{3}[0-9]{4}$')]],
        termsAndConditions: [this.sessionUser.termsAndConditions, [Validators.required, FormValidations.isCheckboxChecked()]],
        //termsShareData: [this.sessionUser.termsShareData, [Validators.required, FormValidations.isCheckboxChecked()]],
        birthDate: [this.sessionUser.birthDate],
        nationality: [this.sessionUser.nationality],
        rne: [this.sessionUser.rne],
      });
    }
    else {
      var name = '';
      var email = '';

      if (socialUsers) {
        if (socialUsers.provider == "FACEBOOK") {
          name = socialUsers.facebook.name;
          email = socialUsers.facebook.email;
        }
        else {
          if (socialUsers.provider == "GOOGLE") {
            name = socialUsers.name;
            email = socialUsers.email;
          }
        }
      }
      this.form = this.fb.group({
        name: [name, [Validators.required, Validators.maxLength(200)]],
        document: [null, [Validators.required, FormValidations.isValidCpf()]],
        email: [email, [Validators.required, Validators.maxLength(200)]],
        tel: [null, [Validators.required, Validators.pattern('^[1-9]{2}(?:9[1-9])[0-9]{3}[0-9]{4}$')]],
        termsAndConditions: [true, [Validators.required, FormValidations.isCheckboxChecked()]],
        //termsShareData: [true, [Validators.required, FormValidations.isCheckboxChecked()]],
      });
    }
  }

  ngAfterContentInit() {
    this.termsUrl = sessionStorage.getItem('termsUrl');
  }



  submit() {

    this.ngxService.start();

    var simulationSession = this.simulationService.getSimulationSession();
    var priceSession = JSON.parse(sessionStorage.getItem(environment.simulationPriceSession));
    var collaborator = JSON.parse(localStorage.getItem('loggedColaborador'));

    if (simulationSession) {
      this.form.value.simulationData = {
        brandId: simulationSession.selectedClass.brandId,
        classId: simulationSession.selectedClass.classId,
        modelId: simulationSession.selectedClass.modelId,
        timeDeadline: simulationSession.dealdlineTime,
        kmLimit: simulationSession.kmLimit,
        colorType: simulationSession.selectedColor.fabricColor,
        installmentAmount: priceSession.installmentAmount,
        totalValue: priceSession.totalValue,
        numberOfInstallments: priceSession.numberOfInstallments,
        guaranteeDeposit: priceSession.guaranteeDeposit,
      }

      this.form.value.dealershipId = simulationSession.dealershipId;
    }
    if (collaborator) {

      this.form.value.collaboratorDocument = collaborator.document;
    }
    this.dataService.postStepOne(this.form.value).subscribe(result => this.success(result), error => this.defaultError(error)).add(() => this.ngxService.stop());

  }

  onFocus() {
    if (this.innerWidth < 768) {
      this.showBreadcrumbMobile = false;
    }
  }
  onBlur() {
    if (this.innerWidth < 768) {
      this.showBreadcrumbMobile = true;
    }
  }

  success(result) {
    this.form.value.idLeadUserSimulation = result.idLeadUserSimulation;
    this.dataService.postUserSession(this.form.value);

    this.router.navigate(['/cadastro/nacionalidade']);
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

    this.errorContent = errorMessage;

    Swal.fire({
      title: 'Problemas na validação dos dados',
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


  openCompromisso(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-termos-compromisso' });
  }

  openDados(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-termos-dados' });
  }


  controlScreen() {
    this.innerWidth = window.innerWidth;
    // AppService.changeLinkLoginVisibility.emit(false)
    if (this.innerWidth < 768) {
      AppService.changeFooterVisibility.emit(false)
    }
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


}
