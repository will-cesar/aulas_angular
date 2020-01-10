import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../../app.service';
import { CepService } from 'src/app/services/cep.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { User } from '../models/user.model';
import { FormValidations } from 'src/app/shared/form-validations';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss', '../register.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})
export class EnderecoComponent extends BaseFormComponent implements OnInit {

  @ViewChild('addressNumber', { static: true }) addressNumberEl: ElementRef;

  showBreadcrumbMobile: boolean = true;
  hasAddress: boolean;
  innerWidth: number;
  form: FormGroup;
  sessionUser: User;
  constructor(private fb: FormBuilder, private dataService: RegisterService, private modalService: NgbModal,
    private ngxService: NgxUiLoaderService, private cepService: CepService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.controlScreen();


    this.sessionUser = this.dataService.getUserSession();

    if (this.sessionUser) {

      this.form = this.fb.group({
        name: [this.sessionUser.name, [Validators.required, Validators.maxLength(200)]],
        document: [this.sessionUser.document, [Validators.required, FormValidations.isValidCpf()]],
        email: [this.sessionUser.email, [Validators.required, Validators.maxLength(200)]],
        tel: [this.sessionUser.tel, [Validators.required, Validators.maxLength(15)]],
        termsAndConditions: [this.sessionUser.termsAndConditions, [Validators.required, FormValidations.isCheckboxChecked()]],
        //termsShareData: [this.sessionUser.termsShareData, [Validators.required, FormValidations.isCheckboxChecked()]],
        birthDate: [this.sessionUser.birthDate, [Validators.required]],
        nationality: [this.sessionUser.nationality, [Validators.required]],
        rne: [this.sessionUser.rne],

        addressCEP: [this.sessionUser.addressCEP, [Validators.required]],
        address: [this.sessionUser.address, [Validators.required]],
        addressNumber: [this.sessionUser.addressNumber],
        addressComplement: [this.sessionUser.addressComplement, null],
        addressNeighborhood: [this.sessionUser.addressNeighborhood, [Validators.required]],
        addressCity: this.sessionUser.addressCity,
        addressState: this.sessionUser.addressState,
        idLeadUserSimulation: [this.sessionUser.idLeadUserSimulation],
        password: [this.sessionUser.password],
        confirmPassword: [this.sessionUser.confirmPassword],
      });

    }
    else {
      this.form = this.fb.group({
        addressCEP: [this.sessionUser.addressCEP, [Validators.required]],
        address: [this.sessionUser.address, [Validators.required]],
        addressNumber: [this.sessionUser.addressNumber, [Validators.required]],
        addressComplement: [this.sessionUser.addressComplement, null],
        addressNeighborhood: [this.sessionUser.addressNeighborhood, [Validators.required]],
        addressCity: this.sessionUser.addressCity,
        addressState: this.sessionUser.addressState,
      });
      this.router.navigate(['/cadastro']);
    }



  }

  controlScreen() {
    this.innerWidth = window.innerWidth;

    AppService.changeLinkLoginVisibility.emit(false)
    AppService.checkBackNav.emit(true)
    if (this.innerWidth < 768) {
      AppService.changeFooterVisibility.emit(false)
      AppService.checkBackNav.emit(true)
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 767) {
      AppService.changeFooterVisibility.emit(true)
      AppService.checkBackNav.emit(false)
    }
    else {
      AppService.changeFooterVisibility.emit(false)
      AppService.checkBackNav.emit(true)
    }
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

  submit() {

    this.ngxService.start();
    this.dataService.postStepThree(this.form.getRawValue()).subscribe(result => this.success(result), error => this.defaultError(error)).add(() => this.ngxService.stop());

  }

  success(result) {
    this.dataService.postUserSession(this.form.value);



    this.router.navigate(['/cadastro/documentos']);
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

  searchAddress(event: any) {
    const cep = event.target.value.replace(/\D+/g, '');
    if (cep.length >= 8) {
      this.ngxService.start();
      this.hasAddress = true;
      this.cepService.get(event.target.value).subscribe(result => {
        if (!result.erro) {
          this.form.controls['addressCity'].patchValue(result.localidade);
          this.form.controls['addressState'].patchValue(result.uf);
          this.form.controls['address'].patchValue(result.logradouro);
          this.form.controls['addressNeighborhood'].patchValue(result.bairro);
          //this.form.markAllAsTouched();
          this.form.controls['addressCity'].markAsTouched();

          this.form.get('addressCity').setErrors(null)

          this.form.controls['addressState'].markAsTouched();

          this.form.get('addressState').setErrors(null)
        }
        else {
          this.form.reset();
          Swal.fire({
            title: 'CEP não localizado.',
            html: 'Favor entrar em contato com a central de atendimento.',
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

      }).add(() => {
        this.ngxService.stop();
        this.addressNumberEl.nativeElement.focus();
      });
    }
    else {
      this.hasAddress = false;
    }
  }

}
