
import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  ActivatedRoute, Router, Event, NavigationStart, RoutesRecognized,
  RouteConfigLoadStart, RouteConfigLoadEnd,
  NavigationEnd, NavigationCancel, NavigationError, Params
} from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppService } from '../../../app.service';
import { Location } from '@angular/common';
import { User } from '../../../register/models/user.model';
import { LoginService } from '../../../login/services/login.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { UserService } from 'src/app/login/services/user.service';
import swal from 'sweetalert2';
import { FormValidations } from '../../../shared/form-validations';
import { GenerateContract } from 'src/app/checkout/models/generateContract.model';
import { ContractService } from 'src/app/checkout/services/contract.service';

@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html',
  styleUrls: ['./headbar.component.scss', '../../blocos/formulario/formulario.component.scss'],
  providers: []
})

export class HeadBarComponent extends BaseFormComponent implements OnInit {

  passwordChanged: boolean = false;
  notificationsOpened: boolean;
  @ViewChild('menuLogout', { static: false }) menuLogout: ElementRef;
  @ViewChild('menuLogoutMobile', { static: false }) menuLogoutMobile: ElementRef;
  @ViewChild('menuNotification', { static: false }) menuNotification: ElementRef;
  @ViewChild('itemMenuOptions', { static: false }) itemMenuOptions: ElementRef;

  modalReference: NgbModalRef;
  passObj: { password: any; passwordResetToken: any; idUser: any; oldPassword: string, idLeadUserSimulation?: any };
  mobileMenuStatus: any = 'hidden-mobile';
  mobileMenuIconStatus: any;
  headerBackground: string;
  headerVisibility: boolean;
  linkLoginVisibility: boolean;
  hasBackNav: boolean;
  showLogin: boolean = false;
  loggedNav: boolean;
  userInfos: any;
  innerWidth: number;
  stepEmailSend: boolean = false;
  stepEmailWarning: boolean = false;
  stepNewPass: boolean = false;
  generateContract: boolean = false;
  isDealership: boolean = false;
  form: FormGroup;
  changedPassword: boolean;

  notifications: any[];

  lengthNotifications: number;
  userName: string;

  constructor(
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private renderer: Renderer2,
    private _location: Location,
    private loginService: LoginService,
    private modalService: NgbModal,
    private eleRef: ElementRef,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private contractService: ContractService,

  ) {
    super();
    this.router.events.subscribe(event => {

      this.innerWidth = window.innerWidth;
      if (event instanceof NavigationStart) {
        this.showLogin = false;
        this.mobileMenuStatus = 'hidden-mobile';
        this.mobileMenuIconStatus = '';
        this.renderer.removeClass(document.body, 'modal-open');
        this.ngxService.start();
        AppService.changeLinkLoginVisibility.emit(true)
        AppService.changeFooterVisibility.emit(true)
        AppService.checkBackNav.emit(false)
        AppService.changeHeaderBackground.emit('#fff')
        this.notificationsOpened = false;
        if (this.loggedNav && this.innerWidth > 767) {
          this.menuLogout.nativeElement.classList.remove('active');
          // this.menuNotification.nativeElement.classList.remove('active');
          this.itemMenuOptions.nativeElement.classList.remove('menu-notification-open');
        }
        if (this.innerWidth < 768) {
          this.menuLogoutMobile.nativeElement.classList.remove('opened-logged-menu');
        }
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.ngxService.stop();
      }
    });
  }

  goBack() {

    let divs = document.querySelectorAll('.form-box');
    let currentTab = localStorage.getItem('currentTabDoc');

    if (currentTab == 'cnh-infos') {
      divs[0].removeAttribute('hidden');
      divs[1].setAttribute('hidden', 'true');
    }
    else {
      this._location.back();
    }

  }


  ngOnInit() {
    this.screenControl();


    if (localStorage.getItem(environment.tokenExpires)) {

      var dateNow = new Date();
      var dateExpiration = new Date(localStorage.getItem(environment.tokenExpires));

      if (dateNow > dateExpiration) {
        this.logOut();
      }
    }

    this.headerVisibility = true;
    AppService.changeHeaderVisibility.subscribe(result => {
      this.headerVisibility = result
    });

    this.innerWidth = window.innerWidth;
    this.hasBackNav = false;
    AppService.checkBackNav.subscribe(result => {
      this.hasBackNav = result
    });
    this.linkLoginVisibility = true;
    AppService.changeLinkLoginVisibility.subscribe(result => {
      this.linkLoginVisibility = result
    });
    this.headerBackground = '#fff';
    AppService.changeHeaderBackground.subscribe(result => {
      this.headerBackground = result
    });
    this.loggedNav = false;
    AppService.changeLoggedNav.subscribe(result => {
      this.loggedNav = result
    });

    AppService.getUserInfos.subscribe(result => {


      this.userInfos = result;

      if (result && result.notifications) {
        this.notifications = result.notifications;
        this.notifications = this.notifications.filter(item => item.MessageRead == 'No');
        this.lengthNotifications = this.notifications.length;

      }
      // else {
      //   return false;
      // }
    });

    AppService.showLoginDiv.subscribe(result => {
      this.showLogin = result
    });

    AppService.showNewPassDiv.subscribe(result => {
      this.showLogin = true;
      this.stepNewPass = true;
      this.changedPassword = false;
    });

    AppService.showNewPassDivMobile.subscribe(result => {

      this.innerWidth = window.innerWidth;
      if (window.location.href.indexOf('colaboradores') <= -1 && window.location.href.indexOf('confirmacao') <= -1 && window.location.href.indexOf('token') > -1 && window.location.href.indexOf('userId') > -1 && this.innerWidth < 768) {
        let smallBox = this.eleRef.nativeElement.querySelector("#passClick");
        smallBox.dispatchEvent(new MouseEvent('click'));
        this.stepNewPass = true;
      }
      else if (window.location.href.indexOf('colaboradores') <= -1 && window.location.href.indexOf('confirmacao') <= -1 && window.location.href.indexOf('token') > -1 && window.location.href.indexOf('userId') > -1 && this.innerWidth > 767) {
        let smallBox = this.eleRef.nativeElement.querySelector("#passClickDesk");
        smallBox.dispatchEvent(new MouseEvent('click'));
        this.stepNewPass = true;
      }
    });

    this.form = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      password: [null, Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 6. Has a minimum length of 8 characters
        Validators.minLength(8)])
      ],
      confirmPassWord: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    },
      {
        // check whether our password and confirm password match
        validator: FormValidations.passwordMatchValidator
      });

    this.getUserInfosUser();

    this.continuePassFlow();
    if (this.notifications)
      this.lengthNotifications = this.notifications.length;
  }

  screenControl() {
    this.innerWidth = window.innerWidth;
  }

  ngAfterViewInit() {
    this.continuePassFlow();
  }

  continuePassFlow() {
    if (window.location.href.indexOf('colaboradores') < -1 && window.location.href.indexOf('confirmacao') <= -1 && window.location.href.indexOf('token') > -1 && window.location.href.indexOf('userId') > -1 && this.innerWidth < 768) {
      let smallBox = this.eleRef.nativeElement.querySelector("#passClick");
      smallBox.dispatchEvent(new MouseEvent('click'));
      this.stepNewPass = true;
    }
    else if (window.location.href.indexOf('colaboradores') < -1 && window.location.href.indexOf('token') > -1 && window.location.href.indexOf('confirmacao') <= -1 && window.location.href.indexOf('userId') > -1 && this.innerWidth > 767) {
      this.linkLoginVisibility = true;
      let smallBox = this.eleRef.nativeElement.querySelector("#passClickDesk");
      smallBox.dispatchEvent(new MouseEvent('click'));
      this.stepNewPass = true;
    }
  }

  submit() {
    this.ngxService.start();
    this.activatedRoute.queryParams.subscribe(params => {
      const userId = params['userId'];
      const token = params['token'];
      const idLeadUserSimulation = params['idLeadUserSimulation'];
      this.passObj = {
        password: this.form.value.password,
        oldPassword: this.form.value.oldPassword,
        passwordResetToken: token,
        idUser: userId,
        idLeadUserSimulation: idLeadUserSimulation
      }
    });
    this.userService.putNewPass(this.passObj).subscribe(result => this.success(result), error => this.defaultError(error));
  }

  success(result) {
    if (result.leadUserSimulation) {

      this.passwordChanged = false;
      var collaborator = JSON.parse(localStorage.getItem('loggedColaborador'));
      var collaboratorDocument = "";

      if (collaborator) {
        collaboratorDocument = collaborator.document;
      }

      localStorage.setItem(environment.token, result.userToken.token);
      localStorage.setItem(environment.tokenExpires, result.userToken.expiration);

      localStorage.setItem(environment.loggedUserSession, JSON.stringify(result));

      var data: GenerateContract = {
        dealership: result.leadUserSimulation.name,
        dealershipId: result.leadUserSimulation.dealershipId,
        kmLimit: result.leadUserSimulation.kmLimit,
        timeDeadline: result.leadUserSimulation.timeDeadline,
        modelId: result.leadUserSimulation.modelId,
        selectedModel: result.leadUserSimulation.selectedClass,
        typeOfColor: result.leadUserSimulation.colorType,
        selectedColor: result.leadUserSimulation.selectedColor,
        collaboratorDocument: collaboratorDocument
      };

      this.generateContract = true;
      this.contractService.generate(data).subscribe(contractResult => this.successContract(contractResult, result), error => this.defaultError(error)).add(() => this.ngxService.stop())

    }
    else {

      this.passwordChanged = true;
      this.ngxService.stop();
      this.router.navigate(['/'], { queryParams: null });
      this.showLogin = true;
    }
  }

  successContract(result, user) {

    if (this.modalReference) {
      this.modalReference.close();
    }

    this.router.navigate(['/checkout/status', result.idContract]);
    AppService.changeLoggedNav.emit(true);
    AppService.getUserInfos.emit(user);
  }
  doLogin() {
    if (this.innerWidth > 767) {
      this.showLogin = true;
      this.passwordChanged = false;
      this.stepNewPass = false;
    }
    else {
      this.modalReference.close();
      this.router.navigate(['/login']);
    }
  }

  defaultError(error) {
    // this.showLogin = true;
    // this.stepNewPass = false;
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

    swal.fire({
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

  getUserInfosUser() {
    this.userInfos = this.loginService.getLoggedUserSession();

    if (this.userInfos) {
      if (this.userInfos.idDealershipUser != 0) {
        this.isDealership = true;
      }
      if (this.notifications) {
        this.notifications = this.userInfos.notifications;

        this.lengthNotifications = this.notifications.length;
      }
      AppService.changeLoggedNav.emit(true);
      this.userName = this.userInfos.name.split(' ')[0];
    }
  }

  logOut() {
    this.userInfos = null;
    localStorage.removeItem('dealershipLogin');
    this.loginService.removeLoggedUserSession();
    AppService.changeLoggedNav.emit(false);
    this.userName = '';
    this.router.navigate(['/']);
  }

  toggleMobileNav(evt: any) {
    if (this.mobileMenuStatus == 'hidden-mobile') {
      this.mobileMenuIconStatus = 'is-active';
      this.mobileMenuStatus = 'mobile-menu-aberto';
      this.renderer.addClass(document.body, 'modal-open');
    }
    else {
      this.mobileMenuStatus = 'hidden-mobile';
      this.mobileMenuIconStatus = '';
      this.renderer.removeClass(document.body, 'modal-open');
    }
  }

  openPassModal(content) {

    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-password', windowClass: "passwordModal" });
  }

  toggleLogin() {
    this.showLogin = !this.showLogin;
  }

  toggleChat(evt: any) {
    evt.currentTarget.parentElement.classList.toggle('hidden')
  }

  dropdownLogin() {
    if (this.menuLogout.nativeElement.className.indexOf('active') == -1) {
      this.menuLogout.nativeElement.classList.add('active');
    }
    else {
      this.menuLogout.nativeElement.classList.remove('active');
    }
  }

  dropdownLoginMobile() {
    if (this.innerWidth < 768) {
      if (this.menuLogoutMobile.nativeElement.className.indexOf('opened-logged-menu') == -1) {
        this.menuLogoutMobile.nativeElement.classList.add('opened-logged-menu');
      }
      else {
        this.menuLogoutMobile.nativeElement.classList.remove('opened-logged-menu');
      }
    }

  }

  openNotifications() {
    if (this.menuNotification.nativeElement.className.indexOf('active') == -1) {
      this.menuNotification.nativeElement.classList.add('active');
      this.itemMenuOptions.nativeElement.classList.add('menu-notification-open');
      this.notificationsOpened = true;
    }
    else {
      this.menuNotification.nativeElement.classList.remove('active');
      this.itemMenuOptions.nativeElement.classList.remove('menu-notification-open');
      this.notificationsOpened = false;
    }
  }

  redirectNotifications() {
    this.openNotifications();
    this.router.navigate(['/dashboard/notificacoes']);
  }

  openDetail(id) {
    this.openNotifications();
    this.router.navigate(['/dashboard/notificacoes', id]);
  }
}
