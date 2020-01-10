import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { AppService } from '../../app.service';
import { User } from '../models/user.model';
import { RegisterService } from 'src/app/services/register.service';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-cadastro-concluido',
  templateUrl: './cadastro-concluido.component.html',
  styleUrls: ['./cadastro-concluido.component.scss', '../register.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class CadastroConcluidoComponent extends BaseFormComponent implements OnInit {

  innerWidth: number;
  resubmittedMail: boolean;
  resubmitButtonText: string = 'Reenviar e-mail';
  conclusionStatus: string = 'Falta pouco para concluir o seu cadastro ;)';
  modalReference: NgbModalRef;
  user: User;
  simulation: boolean = false;
  objectSessionUser: any;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private dataService: RegisterService, private ngxService: NgxUiLoaderService, private route: ActivatedRoute, private router: Router) {
    super();
  }

  ngOnInit() {
    this.user = null;

    this.getUser();

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(200)]],
      confirmationEmail: ['', [Validators.required, Validators.maxLength(200)]],
    }, { validator: FormValidations.sameMailCheck() });

    this.getSimulation();

    // AppService.showNewPassDiv.emit();

    this.innerWidth = window.innerWidth;

    if (this.innerWidth < 768) {
      AppService.changeFooterVisibility.emit(false)
    }

  }

  openDados(content) {
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-termos-dados', windowClass: "formModal" });
  }

  getUser() {

    if (this.route.snapshot.params && this.route.snapshot.params['id']) {
      return this.dataService.getById(this.route.snapshot.params['id']).subscribe(result => this.user = result);
    }
  }

  resend() {
    this.user.idUser;

    this.objectSessionUser = this.dataService.getUserSession();
    var objResend = {
      idUser: this.user.idUser,
      email: null,
      emailConfirmation: null,
      idLeadUserSimulation: null
    }
    if (this.objectSessionUser) {
      objResend.idLeadUserSimulation = this.objectSessionUser.idLeadUserSimulation
    }
    this.dataService.postResendEmail(objResend).subscribe(result => this.successResend());
  }

  successResend() {
    this.resubmitButtonText = 'E-mail reenviado!';
  }

  submit() {

    this.objectSessionUser = this.dataService.getUserSession();
    this.ngxService.start();
    var objResend = {
      idUser: this.user.idUser,
      email: this.form.value.email,
      confirmationEmail: this.form.value.confirmationEmail,
      idLeadUserSimulation: null
    }

    if (this.objectSessionUser) {
      objResend.idLeadUserSimulation = this.objectSessionUser.idLeadUserSimulation
    }

    this.dataService.postResendEmail(objResend).subscribe(result => this.successEmail(), error => this.defaultError(error)).add(() => this.ngxService.stop());
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
      title: 'Atenção',
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

  successEmail() {

    this.conclusionStatus = 'E-mail atualizado com sucesso ;)'
    this.user.email = this.form.value.email;
    this.modalReference.close();
  }

  resubmitMail(event: any) {
    this.resubmittedMail = !this.resubmittedMail;
    this.resubmitButtonText = this.resubmittedMail ? 'E-mail reenviado!' : 'Reenviar e-mail';
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

  getSimulation() {
    let section = JSON.parse(sessionStorage.getItem('simulation.session'));
    section ? this.simulation = true : this.simulation = false;
  }

  redirectSimulation() {
    this.router.navigate(['/simulador/contrate']);
  }

}
