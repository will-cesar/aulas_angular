import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from '../../app.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { User } from '../models/user.model';
import { Validators, FormBuilder } from '@angular/forms';
import { FormValidations } from 'src/app/shared/form-validations';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as moment from 'moment';
import Compress from 'compress.js';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss', '../register.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})
export class DocumentosComponent extends BaseFormComponent implements OnInit {


  infoOpen: boolean = false;
  innerWidth: number;
  public imagePath;
  facePhotoImgURL: any;
  cnhImgURL: any;
  public message: string;
  currentTab: string = 'infos-list';
  currentSubTab: string = null;
  hasFacePhoto: boolean = false;
  hasCNHPhoto: boolean = false;
  closeResult: string;
  sessionUser: User;
  showBreadcrumbMobile: boolean = true;

  constructor(private modalService: NgbModal, private dataService: RegisterService, private fb: FormBuilder, private router: Router, private ngxService: NgxUiLoaderService) {
    super();
  }

  ngOnInit() {
    this.controlScreen();

    this.sessionUser = this.dataService.getUserSession();

    if (this.sessionUser) {

      this.form = this.fb.group({
        cnhNumber: [this.sessionUser.cnhNumber, [Validators.required]],
        cnhValidateDate: [this.sessionUser.cnhValidateDate ? moment(this.sessionUser.cnhValidateDate).format('DD/MM/YYYY') : this.sessionUser.cnhValidateDate, [Validators.required, FormValidations.cnhValidation()]],
        cnhFirstDate: [this.sessionUser.cnhFirstDate ? moment(this.sessionUser.cnhFirstDate).format('DD/MM/YYYY') : this.sessionUser.cnhFirstDate, [Validators.required, FormValidations.firstCnhValidation()]],
        cnhCategory: [this.sessionUser.cnhCategory, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
        name: [this.sessionUser.name, [Validators.required, Validators.maxLength(200)]],
        document: [this.sessionUser.document, [Validators.required, FormValidations.isValidCpf()]],
        email: [this.sessionUser.email, [Validators.required, Validators.maxLength(200)]],
        tel: [this.sessionUser.tel, [Validators.required, Validators.maxLength(15)]],
        termsAndConditions: [this.sessionUser.termsAndConditions, [Validators.required, FormValidations.isCheckboxChecked()]],
        //termsShareData: [this.sessionUser.termsShareData, [Validators.required, FormValidations.isCheckboxChecked()]],
        birthDate: [this.sessionUser.birthDate, [Validators.required]],
        nationality: [this.sessionUser.nationality, [Validators.required]],
        rne: [this.sessionUser.rne],
        addressCEP: [this.sessionUser.addressCEP],
        address: [this.sessionUser.address],
        addressNumber: [this.sessionUser.addressNumber],
        addressComplement: [this.sessionUser.addressComplement],
        addressNeighborhood: [this.sessionUser.addressNeighborhood],
        addressCity: [this.sessionUser.addressCity],
        addressState: [this.sessionUser.addressState], password: [this.sessionUser.password],
        confirmPassword: [this.sessionUser.confirmPassword],
        idLeadUserSimulation: [this.sessionUser.idLeadUserSimulation]
      });

    }
    else {
      this.form = this.fb.group({
        birthDate: [null, [Validators.required]],
        nationality: [null, [Validators.required]],
        rne: [null]
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

  chooseFacePhoto(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    const compress = new Compress();
    compress.compress([...files], {
      size: 4,
      quality: 0.75,
      maxWidth: 1920,
      maxHeight: 1920,
      resize: true
    }).then(res => {
      this.hasFacePhoto = true;
      this.facePhotoImgURL = `${res[0].prefix}${res[0].data}`;
      this.currentTab = 'infos-list';
    });

    let div = document.querySelector('.infos-list');
    div.classList.remove('hide');

    // var reader = new FileReader();
    // this.imagePath = files;
    // reader.readAsDataURL(files[0]);
    // reader.onload = (_event) => {
    //   this.hasFacePhoto = true;
    //   this.facePhotoImgURL = reader.result;
    //   this.currentTab = 'infos-list';
    // }
  }

  chooseCNHPhoto(files) {
    console.log(files)
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    const compress = new Compress();
    compress.compress([...files], {
      size: 4,
      quality: 0.75,
      maxWidth: 1920,
      maxHeight: 1920,
      resize: true
    }).then(res => {
      this.hasCNHPhoto = true;
      this.cnhImgURL = `${res[0].prefix}${res[0].data}`;
      this.currentTab = 'infos-list';
    });

    let div = document.querySelector('.infos-list');
    div.classList.remove('hide');

    // var reader = new FileReader();
    // this.imagePath = files;
    // reader.readAsDataURL(files[0]);
    // reader.onload = (_event) => {
    //   this.hasCNHPhoto = true;
    //   this.cnhImgURL = reader.result;
    //   this.currentTab = 'infos-list';
    // }
  }


  tabChange(tabName) {
    this.currentTab = tabName;
    this.currentSubTab = null;

    if (this.currentTab == 'cnh-infos') {
      localStorage.setItem('currentTabDoc', this.currentTab);
    }
    else {
      localStorage.removeItem('currentTabDoc');
    }

    if (this.currentTab == 'face-photo' || this.currentTab == 'cnh-photo') {
      let div = document.querySelector('.infos-list');
      div.classList.add('hide');
    }
    else {
      let div = document.querySelector('.infos-list');
      div.classList.remove('hide');
    }
  }

  subTabChange(subTabName) {
    this.currentSubTab = subTabName;
  }

  openFacePhoto(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-face-photo', windowClass: "documentModal" });
  }

  openCNHPhoto(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-face-photo', windowClass: "documentModal" });
  }

  openCNHModalInfo(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-cnh-info', windowClass: "documentModal" });
  }

  submit() {
    var obj = this.form.value;

    const formattedCNHFirstDate = this.form.value.cnhFirstDate.split("/");
    const formattedCNHValidateDate = this.form.value.cnhValidateDate.split("/");
    const CNHFirstDateObject = formattedCNHFirstDate[1] + '/' + formattedCNHFirstDate[0] + '/' + formattedCNHFirstDate[2];
    const CNHValidateDateObject = formattedCNHValidateDate[1] + '/' + formattedCNHValidateDate[0] + '/' + formattedCNHValidateDate[2];

    obj.selfieUrl = this.facePhotoImgURL;
    obj.cnhPhotoUrl = this.cnhImgURL;
    obj.cnhFirstDate = new Date(CNHFirstDateObject);
    obj.cnhValidateDate = new Date(CNHValidateDateObject);


    var socialUsers = JSON.parse(sessionStorage.getItem('socialusers'));
    if (socialUsers) {
      if (socialUsers.provider == "FACEBOOK")

        obj.idFacebook = socialUsers.id;
      else if (socialUsers.provider == "GOOGLE")
        obj.idGoogle = socialUsers.id;

    }
    if (!this.facePhotoImgURL) {

      Swal.fire({
        title: 'Atenção',
        html: 'Precisamos de uma foto do rosto para continuar',
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
    else if (!this.cnhImgURL) {

      Swal.fire({
        title: 'Atenção',
        html: 'Precisamos de uma foto da cnh para continuar',
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
    else {
      Swal.fire({
        title: 'Aguarde!',
        html: 'Estamos processando as informações, isso pode levar alguns minutos.',
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

      this.dataService.postStepFour(obj).subscribe(result => this.success(result), error => this.defaultError(error)).add(() => this.ngxService.stop());
    }
  }

  success(result) {
    Swal.close();
    this.dataService.postUserSession(this.form.value);


    this.router.navigate(['/cadastro/conclusao', result.idUser]);
  }

  defaultError(response) {
    Swal.close();
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

  toggleHelper() {
    if (this.innerWidth < 768) {
      this.infoOpen = !this.infoOpen;
    }
  }


}
