import { Component, OnInit, ElementRef } from '@angular/core';
import { LoginService } from '../api/login.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { UserService } from '../api/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  loading: any;
  ripples: any[] = [];
  forgetPassword: boolean = false;
  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private elRef: ElementRef,
    private alertCtrl: AlertController,
    public loadingController: LoadingController
  ) {
    let user = JSON.parse(localStorage.getItem(environment.user));
    if (user) {
      //this.router.navigate(['/home'])      
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async submit() {
    if (this.form.valid) {
      await this.presentLoading();
      this.loginService.post(this.form.value).pipe(finalize(() => this.dismissLoading())).subscribe(
        result => this.successSubmit(result),
        error => this.defaultError(error)
      );
    }
    else {
      this.verifyFormValidations(this.form);
    }
  }

  verifyFormValidations(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const controle = formGroup.get(field);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verifyFormValidations(controle);
      }
    });
  }

  successSubmit(result) {
    if (!result.authenticated) {
      this.showAlert('Não foi possível efetuar o login', result.authenticationMessage, null);
    }
    else {
      this.loginService.isLoggedIn = true;
      localStorage.setItem(environment.token, result.token);
      localStorage.setItem(environment.user, JSON.stringify(result));
      this.router.navigate(['/home'])
    }
  }


  defaultError(error) {
    console.log(error)
    if (error["message"]) {
      this.showAlert('Ops', error["message"], null);
    } else if (typeof (error) == "string") {
      this.showAlert('Ops', error, null);
    }
    else {
      this.showAlert('Ops', "Erro ao enviar requisição, contate o suporte!", null);
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Aguarde'
    });
    this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss();
  }

  async showAlert(title, message, func) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: [{
        text: 'Ok',
        handler: (blah) => func
      }]
    });

    await alert.present();
  }

  forgetPasswordFormat() {
    this.forgetPassword = true;
  }
  loginFormat() {
    this.forgetPassword = false;
  }

  sendEmail() {
    this.form.get('password').setValue("asdjfhalsdk");
    if (this.form.valid) {
      this.form.get('password').setValue("");
      this.presentLoading();
      this.userService.forgetPassword(this.form.value.email).pipe(finalize(() => this.dismissLoading())).subscribe(
        result => this.successSubmitEmail(result),
        error => this.defaultError("Erro ao enviar email, verifique email cadastrado ou contate o suporte!")
      );
    }
  }

  async successSubmitEmail(result) {
    const alert = await this.alertCtrl.create({
      header: "Email enviado",
      message: "Verifique o email cadastrado para dar continuidade ao processo de recuperação",
      buttons: [{
        text: 'Ok',
        handler: (blah) => {
          this.loginFormat();
        }
      }]
    });

    await alert.present();
  }
}
