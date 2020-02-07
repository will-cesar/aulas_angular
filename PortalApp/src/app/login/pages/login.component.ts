import { FacebookLoginProvider, AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from '../models/socialuser.model';
import { Router, NavigationStart } from '@angular/router';
import { OnInit, Component, Input, HostListener, ElementRef } from '@angular/core';
import swal from 'sweetalert2';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AppService } from '../../app.service';
import { UserService } from '../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from '../../register/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormValidations } from '../../shared/form-validations';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../components/blocos/formulario/formulario.component.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit {

  sentMail: any;
  loggedUser: boolean;
  @Input() isPage: boolean;
  response;
  socialusers = new SocialUser();
  formCode: FormGroup;
  formEmailPass: FormGroup;
  verifyCode: boolean;
  innerWidth: number;
  userInfos: User;
  resetPassContent: boolean = false;
  successResetContent: boolean = false;
  dealershipLogin: boolean = true;

  constructor(
    public OAuth: AuthService,
    private dataService: LoginService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private eleRef: ElementRef,
    private ngxService: NgxUiLoaderService,
  ) {
    super();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.resetPassContent = false;
        this.successResetContent = false;
      }
    });
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 768) {
      AppService.changeFooterVisibility.emit(false)
    }
    this.verifyCode = false;
    this.form = this.fb.group({
      email: [null,],
      password: [null,],
    });

    this.formEmailPass = this.fb.group({
      email: [null, Validators.required]
    });

    this.formCode = this.fb.group({
      code: [null]
    });
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

  toggleReset() {
    this.resetPassContent = !this.resetPassContent;
  }


  public socialSignIn(socialProvider: string) {
    let socialPlatformProvider;
    if (socialProvider === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
      console.log(socialProvider, socialusers);
      console.log(socialusers);
      this.loginWithFacebook(socialusers);
    });
  }

  loginWithFacebook(socialusers) {
    sessionStorage.setItem('socialusers', JSON.stringify(socialusers));

    this.ngxService.start();
    if (socialusers.provider == "FACEBOOK")
      this.dataService.postWithFacebook(socialusers).subscribe(result => this.success(result));
    else {
      this.dataService.postWithGoogle(socialusers).subscribe(result => this.success(result));
    }
  }

  success(res) {
    if (this.dealershipLogin) {
      localStorage.setItem('dealershipLogin', 'true');
    }


    this.ngxService.stop();
    if (!res.authenticated && res.userIsNotRegistred) {
      this.router.navigate(['/cadastro']);
    }
    else if (!res.authenticated) {
      swal.fire({
        title: 'Problema ao logar',
        text: 'Verifique seus dados de login',
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
      })

      //swal.fire("Ops!", "Verifique seus dados de login", 'error');
    }
    else {
      localStorage.setItem(environment.token, res.token);
      localStorage.setItem(environment.tokenExpires, res.expiration);

      this.dataService.postLoggedUserSession(res.user);
      AppService.getUserInfos.emit(res.user);
      AppService.changeLoggedNav.emit(true);
      if (this.innerWidth < 767) {
        this.router.navigate(['/home']);
      }
      //this.router.navigate(['/home']);
    }
  }

  submit() {
    this.ngxService.start();

    if (this.dealershipLogin) {
      this.dataService.postDealership(this.form.value).subscribe(result => this.success(result));
    }
    else {
      this.dataService.post(this.form.value).subscribe(result => this.success(result));
    }
  }

  submitEmailPass() {
    this.ngxService.start();
    this.userService.resetPassword(this.formEmailPass.value).subscribe(result => this.successReset(result), error => this.resetError(error));
  }

  successReset(result) {
    this.ngxService.stop();
    this.resetPassContent = false;
    this.successResetContent = true;
    this.sentMail = this.formEmailPass.value.email;
  }

  resetError(error) {
    this.ngxService.stop();
    var errorMessage = 'Houve um erro com a operação. Favor entrar em contato com o Suporte';

    if (error.error) {
      if (error.error.errors) {
        errorMessage = '';
        error.error.errors.forEach(element => {
          errorMessage += '<br />' + element.value;
        });
      }
    }
    swal.fire({
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

  submitCode() {
    var obj = {
      password: this.form.value.password,
      email: this.form.value.email,
      code: this.formCode.value.code
    }
    this.dataService.postWithCode(obj).subscribe(result => this.success(result));

  }
}
