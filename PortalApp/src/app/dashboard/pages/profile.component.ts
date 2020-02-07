import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { AppService } from '../../app.service';
import { RegisterService } from 'src/app/services/register.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { UserService } from 'src/app/login/services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import * as moment from 'moment';
import { ContractService } from 'src/app/checkout/services/contract.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../dashboard.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class ProfileComponent extends BaseFormComponent implements OnInit {
  contract: any;
  docsSuccess: boolean = false;
  hasChanges: boolean = false;
  cnhForm: FormGroup;
  passSuccess: boolean = false;
  message: string;
  passForm: FormGroup;
  passObj: { actualPassword: any; newPassword: any; newPasswordConfirmation: any; };
  docsObj: { selfieUrl: any; cnhPhotoUrl: any; cnhNumber: any; cnhValidateDate: any; cnhFirstDate: any; cnhConfirmationNumber: any; cnhCategory: any; };
  userId: any;
  user: any;
  innerWidth: number;
  profileItens: boolean = true;
  personalData: boolean = false;
  personalDataForm: boolean = true;
  documents: boolean = false;
  password: boolean = false;
  additionalDocuments: boolean = false;
  additionalPending: boolean = false;
  dataForm: FormGroup;
  nations: any[];
  IsMobile: boolean = false;
  IsUpdateData: boolean = false;
  selectedNationality: any;
  infoOpen: boolean = false;
  public imagePath;
  facePhotoImgURL: any;
  cnhImgURL: any;
  currentTab: string = 'infos-list';
  currentSubTab: string = null;
  hasFacePhoto: boolean = false;
  hasCNHPhoto: boolean = false;
  hasAlter: boolean = false;
  pendingDocumentsList: any;
  pendingDocumentsToUpload: any[] = [];
  hasAllDocs: boolean = false;
  constructor(private modalService: NgbModal, private route: ActivatedRoute, private fb: FormBuilder, private userService: RegisterService, private contractService: ContractService, private profileService: UserService, private ngxService: NgxUiLoaderService) {
    super();
  }

  ngOnInit() {

    this.fillNations();
    this.ngxService.start();
    this.userService.getLoggedUser().subscribe(result => this.successGetLoggedUser(result), error => this.defaultError(error)).add(() => this.ngxService.stop());
    this.screenControl();
    this.passForm = this.fb.group({
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

  }


  successGetLoggedUser(result) {
    this.userId = result.idUser;
    this.user = result;
    this.form = this.fb.group({
      name: [result.name, [Validators.required]],
      document: [result.document, [Validators.required]],
      email: [result.email, [Validators.required, Validators.maxLength(200)]],
      tel: [result.tel, [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      mothersName: [result.mothersName, [Validators.required]],
      birthDate: [result.birthDate ? moment(result.birthDate).format('DD/MM/YYYY') : result.birthDate, [Validators.required]],
      nationality: [result.nationality, [Validators.required]],
      RNE: [result.RNE, [Validators.required]],
      addressCEP: [result.addressCEP, [Validators.required]],
      address: [result.address, [Validators.required]],
      addressNeighborhood: [result.addressNeighborhood, [Validators.required]],
      addressNumber: [result.addressNumber],
      addressComplement: [result.addressComplement, null],
      addressCity: [result.addressCity, [Validators.required]],
      addressState: [result.addressState, [Validators.required, Validators.minLength(2)]]
    });
    this.cnhForm = this.fb.group({
      cnhNumber: [result.cnhNumber, [Validators.required]],
      cnhValidateDate: [result.cnhValidateDate ? moment(result.cnhValidateDate).format('DD/MM/YYYY') : result.cnhValidateDate, [Validators.required, FormValidations.cnhValidation()]],
      cnhFirstDate: [result.cnhFirstDate ? moment(result.cnhFirstDate).format('DD/MM/YYYY') : result.cnhFirstDate, [Validators.required, FormValidations.firstCnhValidation()]],
      cnhCategory: [result.cnhCategory, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]]
    });
    this.cnhForm.valueChanges.subscribe(
      (selectedValue) => {
        this.hasChanges = true;
      }
    );
    if (result.cnhPhotoUrl) {
      this.hasCNHPhoto = true;
      //this.cnhImgURL = result.cnhPhotoUrl;
      this.convertToDataURLviaCanvas(result.cnhPhotoUrl, "image/jpeg")
        .then(base64ImgCNH => {
          this.cnhImgURL = base64ImgCNH;
        });
    }
    if (result.selfieUrl) {
      //this.facePhotoImgURL = result.selfieUrl;
      this.convertToDataURLviaCanvas(result.selfieUrl, "image/jpeg")
        .then(base64ImgSelfie => {
          this.facePhotoImgURL = base64ImgSelfie;
        });
      this.hasFacePhoto = true;
    }
    this.contractService.getContracts(result.idUser).subscribe(result => this.successGetLoggedUserContracts(result), error => this.defaultError(error));

    this.selectedNationality = this.nations.find(x => x.value.trim() == result.nationality.trim()).key;
  }

  successGetLoggedUserContracts(result) {
    this.contract = result[0];

    if (this.contract !== undefined && this.contract.annataStatus == "PendingDocuments") {
      this.additionalPending = true;
      this.contractService.getPendingDocuments(this.contract.contract.idContract).subscribe(resultPending => this.successGetPendings(resultPending), error => this.defaultError(error));

    }
  }

  successGetPendings(resultPending) {
    this.pendingDocumentsList = resultPending;
  }

  alterDocs() {
    this.ngxService.start();
    const formattedCNHFirstDate = this.cnhForm.value.cnhFirstDate.split("/");
    const formattedCNHValidateDate = this.cnhForm.value.cnhValidateDate.split("/");
    const CNHFirstDateObject = formattedCNHFirstDate[1] + '/' + formattedCNHFirstDate[0] + '/' + formattedCNHFirstDate[2];
    const CNHValidateDateObject = formattedCNHValidateDate[1] + '/' + formattedCNHValidateDate[0] + '/' + formattedCNHValidateDate[2];
    this.docsObj = {
      selfieUrl: this.facePhotoImgURL,
      cnhPhotoUrl: this.cnhImgURL,
      cnhNumber: this.cnhForm.value.cnhNumber,
      cnhValidateDate: new Date(CNHValidateDateObject),
      cnhFirstDate: new Date(CNHFirstDateObject),
      cnhConfirmationNumber: null,
      cnhCategory: this.cnhForm.value.cnhCategory
    }
    
    this.userService.updateUserDocuments(this.docsObj, this.userId).subscribe(result => this.successAlterDocs(result), error => this.defaultError(error)).add(() => this.ngxService.stop());
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


  submit() {
    this.ngxService.start();

    const dateParts = this.form.value.birthDate.split("/");
    const dateObject = dateParts[1] + '/' + dateParts[0] + '/' + dateParts[2];
    let submitObj = this.form.value;
    submitObj['birthDate'] = new Date(dateObject);
    this.userService.updateUserData(submitObj, this.userId).subscribe(result => this.success(result), error => this.defaultError(error)).add(() => this.ngxService.stop());
  }

  uploadPendingDocument(currentUpload, docType, docId, files) {
    let currentButton = currentUpload.currentTarget.previousSibling;
    if (files.length === 0)
      return;
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    let fileInfos = files[0];
    reader.onload = (_event) => {
      currentButton.classList.add('active');
      const index = this.pendingDocumentsToUpload.findIndex((e) => e.docId === docId);
      if (index === -1) {
        this.pendingDocumentsToUpload.push({ idContract: this.contract.contract.idContract, docType: docType, docId: docId, docFile: reader.result, docExtension: fileInfos.name.split('.').pop(), docName: fileInfos.name.split('.').slice(0, -1).join('.') });
      } else {
        this.pendingDocumentsToUpload[index] = { idContract: this.contract.contract.idContract, docType: docType, docId: docId, docFile: reader.result, docExtension: fileInfos.name.split('.').pop(), docName: fileInfos.name.split('.').slice(0, -1).join('.') };
      }
      if (this.pendingDocumentsToUpload.length == this.pendingDocumentsList.length) {
        this.hasAllDocs = true;
      }
    }
  }


  submitPendingDocuments() {
    this.ngxService.start();
    this.contractService.postPendingDocuments(this.pendingDocumentsToUpload).subscribe(resultPending => this.successPostPendings(resultPending), error => this.defaultError(error));
  }

  successPostPendings(resultPending) {
    this.ngxService.stop();
    Swal.fire({
      title: 'Documentos enviados',
      html: 'Aguarde nosso retorno em relação aos documentos.',
      showCloseButton: true,
      confirmButtonText: 'OK',
      customClass: {
        popup: 'success-alert',
        header: 'success-alert-header',
        title: 'title-class',
        content: 'success-alert-content',
        actions: 'alert-action',
        confirmButton: 'button-secundary buttontextpink selectedButton',
      }
    }).then((result) => {
      if (result.value) {
        this.backProfileItens();
      }
    });
  }


  success(result) {
    this.personalData = false
    this.IsUpdateData = true;
  }

  successAlterDocs(result) {
    this.ngxService.stop();
    this.docsSuccess = true;
  }

  successNewPass(result) {
    this.ngxService.stop();
    this.passSuccess = true;
    this.passForm.reset();
  }

  editPersonalData() {
    this.profileItens = false;
    this.personalData = true;
    this.documents = false;
    this.password = false;
    this.additionalDocuments = false;
    this.IsUpdateData = false;
  }

  editDocuments() {
    this.profileItens = false;
    this.personalData = false;
    this.documents = true;
    this.password = false;
    this.additionalDocuments = false;
    this.IsUpdateData = false;
  }

  editPassword() {
    this.profileItens = false;
    this.personalData = false;
    this.documents = false;
    this.password = true;
    this.additionalDocuments = false;
    this.IsUpdateData = false;
  }

  editAdditionalDocuments() {
    this.profileItens = false;
    this.personalData = false;
    this.documents = false;
    this.password = false;
    this.additionalDocuments = true;
    this.IsUpdateData = false;
  }

  backProfileItens() {
    this.profileItens = true;
    this.personalData = false;
    this.documents = false;
    this.password = false;
    this.additionalDocuments = false;
    this.IsUpdateData = false;
    this.passSuccess = false;
    this.docsSuccess = false;
    this.currentTab = 'infos-list';
    this.pendingDocumentsToUpload = [];
  }

  changePersonalDataTab() {
    this.personalDataForm = !this.personalDataForm;
  }

  chooseFacePhoto(files) {
    console.log(files)
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.hasFacePhoto = true;
      this.facePhotoImgURL = reader.result;
      this.currentTab = 'infos-list';
      this.hasChanges = true;
    }
  }

  convertToDataURLviaCanvas(url, outputFormat) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        let canvas = <HTMLCanvasElement>document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'),
          dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        //callback(dataURL);
        canvas = null;
        resolve(dataURL);
      };
      img.src = url;
    });
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

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.hasCNHPhoto = true;
      this.cnhImgURL = reader.result;
      this.currentTab = 'infos-list';
      this.hasChanges = true;
    }
  }

  tabChange(tabName) {
    this.currentTab = tabName;
    this.currentSubTab = null;
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

  submitPassword() {
    this.ngxService.start();
    this.route.queryParams.subscribe(params => {
      const userId = params['userId'];
      const token = params['token'];
      this.passObj = {
        actualPassword: this.passForm.value.oldPassword,
        newPassword: this.passForm.value.password,
        newPasswordConfirmation: this.passForm.value.confirmPassWord,
      }
    });
    this.profileService.alterPass(this.passObj, this.userId).subscribe(result => this.successNewPass(result), error => this.defaultError(error));
  }


  screenControl() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 991) {
      AppService.changeHeaderVisibility.emit(true);
      this.IsMobile = false;
    }
    else {
      AppService.changeHeaderVisibility.emit(false);
      this.IsMobile = true
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenControl();
  }

  fillNations() {
    this.nations = [];
    this.nations.push({ key: 'Brasileiro', value: 'Brasileiro' });
    this.nations.push({ key: 'Afegão', value: 'Afegão' });
    this.nations.push({ key: 'Albanês', value: 'Albanês' });
    this.nations.push({ key: 'Argelino', value: 'Argelino' });
    this.nations.push({ key: 'Andorra', value: 'Andorra' });
    this.nations.push({ key: 'Angola', value: 'Angola' });
    this.nations.push({ key: 'AntiguaouBarbuda', value: 'AntiguaouBarbuda' });
    this.nations.push({ key: 'Argentina', value: 'Argentina' });
    this.nations.push({ key: 'Armênio', value: 'Armênio' });
    this.nations.push({ key: 'Australiano', value: 'Australiano' });
    this.nations.push({ key: 'Austríaco', value: 'Austríaco' });
    this.nations.push({ key: 'Azerbaijano,azeri', value: 'Azerbaijano,azeri' });
    this.nations.push({ key: 'Bahamense', value: 'Bahamense' });
    this.nations.push({ key: 'Bahrein', value: 'Bahrein' });
    this.nations.push({ key: 'Bengali', value: 'Bengali' });
    this.nations.push({ key: 'Barbados', value: 'Barbados' });
    this.nations.push({ key: 'Belarusian', value: 'Belarusian' });
    this.nations.push({ key: 'Belga', value: 'Belga' });
    this.nations.push({ key: 'Belize', value: 'Belize' });
    this.nations.push({ key: 'Beninês,Beninois', value: 'Beninês,Beninois' });
    this.nations.push({ key: 'Butanês', value: 'Butanês' });
    this.nations.push({ key: 'Boliviano', value: 'Boliviano' });
    this.nations.push({ key: 'BósnioouHerzegovinian', value: 'BósnioouHerzegovinian' });
    this.nations.push({ key: 'Motswana,Botsuana', value: 'Motswana,Botsuana' });
    this.nations.push({ key: 'Bruna', value: 'Bruna' });
    this.nations.push({ key: 'Bulgarian', value: 'Bulgarian' });
    this.nations.push({ key: 'Burquinabé', value: 'Burquinabé' });
    this.nations.push({ key: 'Birmanês', value: 'Birmanês' });
    this.nations.push({ key: 'Burundiano', value: 'Burundiano' });
    this.nations.push({ key: 'Cabo-verdiano', value: 'Cabo-verdiano' });
    this.nations.push({ key: 'DeCamboja', value: 'DeCamboja' });
    this.nations.push({ key: 'Camaronês', value: 'Camaronês' });
    this.nations.push({ key: 'Canadense', value: 'Canadense' });
    this.nations.push({ key: 'CentralAfricano', value: 'CentralAfricano' });
    this.nations.push({ key: 'Chadiano', value: 'Chadiano' });
    this.nations.push({ key: 'Chileno', value: 'Chileno' });
    this.nations.push({ key: 'Chinês', value: 'Chinês' });
    this.nations.push({ key: 'Colombiano', value: 'Colombiano' });
    this.nations.push({ key: 'Comoran,Comorian', value: 'Comoran,Comorian' });
    this.nations.push({ key: 'Congolês', value: 'Congolês' });
    this.nations.push({ key: 'Congolês', value: 'Congolês' });
    this.nations.push({ key: 'CostaRica', value: 'CostaRica' });
    this.nations.push({ key: 'Marfinense', value: 'Marfinense' });
    this.nations.push({ key: 'Croata', value: 'Croata' });
    this.nations.push({ key: 'Cubano', value: 'Cubano' });
    this.nations.push({ key: 'Cipriota', value: 'Cipriota' });
    this.nations.push({ key: 'Checo', value: 'Checo' });
    this.nations.push({ key: 'Dinamarquês', value: 'Dinamarquês' });
    this.nations.push({ key: 'Jibutiano', value: 'Jibutiano' });
    this.nations.push({ key: 'Dominicano', value: 'Dominicano' });
    this.nations.push({ key: 'Dominicano', value: 'Dominicano' });
    this.nations.push({ key: 'Timorense', value: 'Timorense' });
    this.nations.push({ key: 'Equatoriano', value: 'Equatoriano' });
    this.nations.push({ key: 'Egípcio', value: 'Egípcio' });
    this.nations.push({ key: 'Salvadorenho', value: 'Salvadorenho' });
    this.nations.push({ key: 'GuinéEquatorial,Equatoguinean', value: 'GuinéEquatorial,Equatoguinean' });
    this.nations.push({ key: 'Eritreia', value: 'Eritreia' });
    this.nations.push({ key: 'Estoniano', value: 'Estoniano' });
    this.nations.push({ key: 'Etíope', value: 'Etíope' });
    this.nations.push({ key: 'Fijiano', value: 'Fijiano' });
    this.nations.push({ key: 'Finnish', value: 'Finnish' });
    this.nations.push({ key: 'French', value: 'French' });
    this.nations.push({ key: 'Gabonesa', value: 'Gabonesa' });
    this.nations.push({ key: 'Gambiano', value: 'Gambiano' });
    this.nations.push({ key: 'Georgiano', value: 'Georgiano' });
    this.nations.push({ key: 'German', value: 'German' });
    this.nations.push({ key: 'Ganês', value: 'Ganês' });
    this.nations.push({ key: 'Gibraltar', value: 'Gibraltar' });
    this.nations.push({ key: 'Grego,helênico', value: 'Grego,helênico' });
    this.nations.push({ key: 'Granadino', value: 'Granadino' });
    this.nations.push({ key: 'Guatemalteco', value: 'Guatemalteco' });
    this.nations.push({ key: 'Guineense', value: 'Guineense' });
    this.nations.push({ key: 'Guiné-Bissau', value: 'Guiné-Bissau' });
    this.nations.push({ key: 'Guianense', value: 'Guianense' });
    this.nations.push({ key: 'Haitiano', value: 'Haitiano' });
    this.nations.push({ key: 'Hondurenho', value: 'Hondurenho' });
    this.nations.push({ key: 'Húngaro,magiar', value: 'Húngaro,magiar' });
    this.nations.push({ key: 'Islandês', value: 'Islandês' });
    this.nations.push({ key: 'Indiano', value: 'Indiano' });
    this.nations.push({ key: 'Indonesian', value: 'Indonesian' });
    this.nations.push({ key: 'Iraniano,persa', value: 'Iraniano,persa' });
    this.nations.push({ key: 'Iraquiano', value: 'Iraquiano' });
    this.nations.push({ key: 'Irlandês', value: 'Irlandês' });
    this.nations.push({ key: 'Israelense', value: 'Israelense' });
    this.nations.push({ key: 'Italian', value: 'Italian' });
    this.nations.push({ key: 'Marfinense', value: 'Marfinense' });
    this.nations.push({ key: 'Jamaicano', value: 'Jamaicano' });
    this.nations.push({ key: 'Japanese', value: 'Japanese' });
    this.nations.push({ key: 'Jordaniano', value: 'Jordaniano' });
    this.nations.push({ key: 'Cazaquistão,cazaque', value: 'Cazaquistão,cazaque' });
    this.nations.push({ key: 'Kenyan', value: 'Kenyan' });
    this.nations.push({ key: 'I-Kiribati', value: 'I-Kiribati' });
    this.nations.push({ key: 'Norte-coreano', value: 'Norte-coreano' });
    this.nations.push({ key: 'Sul-coreano', value: 'Sul-coreano' });
    this.nations.push({ key: 'Kuwaití', value: 'Kuwaití' });
    this.nations.push({ key: 'Quirguistão,Quirguiz,Quirguiz,Quirguiz', value: 'Quirguistão,Quirguiz,Quirguiz,Quirguiz' });
    this.nations.push({ key: 'Laos,Laos', value: 'Laos,Laos' });
    this.nations.push({ key: 'Letão,letão', value: 'Letão,letão' });
    this.nations.push({ key: 'Libanês', value: 'Libanês' });
    this.nations.push({ key: 'Basotho', value: 'Basotho' });
    this.nations.push({ key: 'Liberiano', value: 'Liberiano' });
    this.nations.push({ key: 'Líbio', value: 'Líbio' });
    this.nations.push({ key: 'Liechtensteiné', value: 'Liechtensteiné' });
    this.nations.push({ key: 'Lituano', value: 'Lituano' });
    this.nations.push({ key: 'Luxemburgo,luxemburguês', value: 'Luxemburgo,luxemburguês' });
    this.nations.push({ key: 'Macedónio', value: 'Macedónio' });
    this.nations.push({ key: 'Malgaxe', value: 'Malgaxe' });
    this.nations.push({ key: 'Malawi', value: 'Malawi' });
    this.nations.push({ key: 'Malásia', value: 'Malásia' });
    this.nations.push({ key: 'Maldivian', value: 'Maldivian' });
    this.nations.push({ key: 'Malês,malinês', value: 'Malês,malinês' });
    this.nations.push({ key: 'Maltês', value: 'Maltês' });
    this.nations.push({ key: 'Marshallese', value: 'Marshallese' });
    this.nations.push({ key: 'Martiniquais,Martinica', value: 'Martiniquais,Martinica' });
    this.nations.push({ key: 'Mauritano', value: 'Mauritano' });
    this.nations.push({ key: 'Maurício', value: 'Maurício' });
    this.nations.push({ key: 'Mexicano', value: 'Mexicano' });
    this.nations.push({ key: 'Micronésio', value: 'Micronésio' });
    this.nations.push({ key: 'Moldovan', value: 'Moldovan' });
    this.nations.push({ key: 'Monégasque,Monacan', value: 'Monégasque,Monacan' });
    this.nations.push({ key: 'Mongol', value: 'Mongol' });
    this.nations.push({ key: 'Montenegrino', value: 'Montenegrino' });
    this.nations.push({ key: 'Marroquino', value: 'Marroquino' });
    this.nations.push({ key: 'Moçambicano', value: 'Moçambicano' });
    this.nations.push({ key: 'Namibiano', value: 'Namibiano' });
    this.nations.push({ key: 'Nauruan', value: 'Nauruan' });
    this.nations.push({ key: 'Nepalês,nepalês', value: 'Nepalês,nepalês' });
    this.nations.push({ key: 'Holandês,holandês', value: 'Holandês,holandês' });
    this.nations.push({ key: 'NovaZelândia,NovaZelândia,Zelanian', value: 'NovaZelândia,NovaZelândia,Zelanian' });
    this.nations.push({ key: 'Nicaraguense', value: 'Nicaraguense' });
    this.nations.push({ key: 'Nigerien', value: 'Nigerien' });
    this.nations.push({ key: 'Nigeriano', value: 'Nigeriano' });
    this.nations.push({ key: 'Marianandonorte', value: 'Marianandonorte' });
    this.nations.push({ key: 'Norwegian', value: 'Norwegian' });
    this.nations.push({ key: 'Omanense', value: 'Omanense' });
    this.nations.push({ key: 'Paquistanês', value: 'Paquistanês' });
    this.nations.push({ key: 'Palauan', value: 'Palauan' });
    this.nations.push({ key: 'Palestino', value: 'Palestino' });
    this.nations.push({ key: 'Panamenho', value: 'Panamenho' });
    this.nations.push({ key: 'PapuaNovaGuiné,Papua', value: 'PapuaNovaGuiné,Papua' });
    this.nations.push({ key: 'Paraguaio', value: 'Paraguaio' });
    this.nations.push({ key: 'Peruano', value: 'Peruano' });
    this.nations.push({ key: 'Filipino,filipino', value: 'Filipino,filipino' });
    this.nations.push({ key: 'Polonês', value: 'Polonês' });
    this.nations.push({ key: 'Portuguese', value: 'Portuguese' });
    this.nations.push({ key: 'Porto-riquenho', value: 'Porto-riquenho' });
    this.nations.push({ key: 'Qatari', value: 'Qatari' });
    this.nations.push({ key: 'Romeno', value: 'Romeno' });
    this.nations.push({ key: 'Russian', value: 'Russian' });
    this.nations.push({ key: 'Ruandeses', value: 'Ruandeses' });
    this.nations.push({ key: 'KittitianouNevisian', value: 'KittitianouNevisian' });
    this.nations.push({ key: 'SãoLucian', value: 'SãoLucian' });
    this.nations.push({ key: 'SãoVicente,Vicentino', value: 'SãoVicente,Vicentino' });
    this.nations.push({ key: 'Samoano', value: 'Samoano' });
    this.nations.push({ key: 'Sammarinese', value: 'Sammarinese' });
    this.nations.push({ key: 'SãoTomé', value: 'SãoTomé' });
    this.nations.push({ key: 'Saudita,arábiasaudita', value: 'Saudita,arábiasaudita' });
    this.nations.push({ key: 'Senegalesa', value: 'Senegalesa' });
    this.nations.push({ key: 'Sérvio', value: 'Sérvio' });
    this.nations.push({ key: 'Seychelles', value: 'Seychelles' });
    this.nations.push({ key: 'SerraLeoa', value: 'SerraLeoa' });
    this.nations.push({ key: 'Cingapura,Cingapura', value: 'Cingapura,Cingapura' });
    this.nations.push({ key: 'Slovak', value: 'Slovak' });
    this.nations.push({ key: 'Esloveno,esloveno', value: 'Esloveno,esloveno' });
    this.nations.push({ key: 'IlhasSalomão', value: 'IlhasSalomão' });
    this.nations.push({ key: 'Somali', value: 'Somali' });
    this.nations.push({ key: 'ÁfricadoSul', value: 'ÁfricadoSul' });
    this.nations.push({ key: 'Sudanêsdosul', value: 'Sudanêsdosul' });
    this.nations.push({ key: 'Espanhol', value: 'Espanhol' });
    this.nations.push({ key: 'SriLank', value: 'SriLank' });
    this.nations.push({ key: 'Sudanês', value: 'Sudanês' });
    this.nations.push({ key: 'NoSuriname', value: 'NoSuriname' });
    this.nations.push({ key: 'Swazi', value: 'Swazi' });
    this.nations.push({ key: 'Sueco', value: 'Sueco' });
    this.nations.push({ key: 'Suíço', value: 'Suíço' });
    this.nations.push({ key: 'Sírio', value: 'Sírio' });
    this.nations.push({ key: 'Tajiquistanês', value: 'Tajiquistanês' });
    this.nations.push({ key: 'Tanzânia', value: 'Tanzânia' });
    this.nations.push({ key: 'Tailandês', value: 'Tailandês' });
    this.nations.push({ key: 'Timorense', value: 'Timorense' });
    this.nations.push({ key: 'Togoleses', value: 'Togoleses' });
    this.nations.push({ key: 'Tokelauan', value: 'Tokelauan' });
    this.nations.push({ key: 'Tonganês', value: 'Tonganês' });
    this.nations.push({ key: 'TrindadeouTobagonian', value: 'TrindadeouTobagonian' });
    this.nations.push({ key: 'Tunisiano', value: 'Tunisiano' });
    this.nations.push({ key: 'Turco', value: 'Turco' });
    this.nations.push({ key: 'Turcomanos', value: 'Turcomanos' });
    this.nations.push({ key: 'Tuvaluan', value: 'Tuvaluan' }); this.nations.push({ key: 'Uganda', value: 'Uganda' }); this.nations.push({ key: 'Ucraniano', value: 'Ucraniano' }); this.nations.push({ key: 'Emirati,Emirado,Emiri', value: 'Emirati,Emirado,Emiri' }); this.nations.push({ key: 'ReinoUnido,britânico', value: 'ReinoUnido,britânico' }); this.nations.push({ key: 'EstadosUnidos,EUA,americanos', value: 'EstadosUnidos,EUA,americanos' }); this.nations.push({ key: 'Uruguaio', value: 'Uruguaio' }); this.nations.push({ key: 'Uzbequistanês,usbeque', value: 'Uzbequistanês,usbeque' }); this.nations.push({ key: 'Ni-Vanuatu,Vanuatuan', value: 'Ni-Vanuatu,Vanuatuan' }); this.nations.push({ key: 'Vaticano', value: 'Vaticano' }); this.nations.push({ key: 'Venezuelano', value: 'Venezuelano' }); this.nations.push({ key: 'Vietnamita', value: 'Vietnamita' }); this.nations.push({ key: 'Iemenita', value: 'Iemenita' }); this.nations.push({ key: 'Zâmbia', value: 'Zâmbia' }); this.nations.push({ key: 'Zimbabuano', value: 'Zimbabuano' });
  }

  toggleHelper() {
    if (this.innerWidth < 768) {
      this.infoOpen = !this.infoOpen;
    }
  }


}
