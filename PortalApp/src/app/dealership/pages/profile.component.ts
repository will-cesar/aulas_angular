import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { AppService } from '../../app.service';
import { RegisterService } from 'src/app/services/register.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/login/services/user.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DealershipService } from '../services/dealership.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../dealership.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class ProfileComponent extends BaseFormComponent implements OnInit {

  innerWidth: number;
  profileItens: boolean = true;
  personalData: boolean = false;
  personalDataForm: boolean = true;
  dataForm: FormGroup;
  nations: any[];
  IsMobile: boolean = false;
  IsUpdateData: boolean = false;
  password: boolean = false;
  userInfos: any;
  constructor(private modalService: NgbModal, private route: ActivatedRoute, private fb: FormBuilder, private dealershipService: DealershipService, private ngxService: NgxUiLoaderService) {
    super();
  }

  ngOnInit() {
    this.screenControl();
    this.fillNations();

    this.userInfos = JSON.parse(localStorage.getItem('logged.user.session'));


    this.form = this.fb.group({
      oldPassword: ['', [Validators.required]],
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




  submit() {
    this.ngxService.start();
    var dealsership = JSON.parse(localStorage.getItem('logged.user.session'));
    var obj = {

      email: dealsership.email,
      password: this.form.value.oldPassword,
      newPassword: this.form.value.confirmPassWord,
    }
    debugger;
    this.dealershipService.changePassword(obj).subscribe(result => this.successChangePassword(), error => this.defaultError(error)).add(() => this.ngxService.stop());


    this.form.reset();
    // throw new Error("Method not implemented.");
  }

  successChangePassword() {
    this.backProfileItens();
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

  editPersonalData() {
    this.profileItens = false;
    this.personalData = true;
    this.IsUpdateData = false;
  }

  backProfileItens() {
    this.profileItens = true;
    this.personalData = false;
    this.IsUpdateData = false;
    this.password = false;
  }

  changePersonalDataTab() {
    this.personalDataForm = !this.personalDataForm;
  }

  editPassword() {
    this.profileItens = false;
    this.password = true;
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
    this.nations.push({ key: 'Brasileiro                                       ', value: 'Brasileiro                                         ' });

    this.nations.push({ key: 'Afegão                                           ', value: 'Afegão                                             ' });
    this.nations.push({ key: 'Albanês                                          ', value: 'Albanês                                            ' });
    this.nations.push({ key: 'Argelino                                         ', value: 'Argelino                                           ' });
    this.nations.push({ key: 'Andorra                                          ', value: 'Andorra                                            ' });
    this.nations.push({ key: 'Angola                                           ', value: 'Angola                                             ' });
    this.nations.push({ key: 'Antigua ou Barbuda                               ', value: 'Antigua ou Barbuda                                 ' });
    this.nations.push({ key: 'Argentina                                        ', value: 'Argentina                                          ' });
    this.nations.push({ key: 'Armênio                                          ', value: 'Armênio                                            ' });
    this.nations.push({ key: 'Australiano                                      ', value: 'Australiano                                        ' });
    this.nations.push({ key: 'Austríaco                                        ', value: 'Austríaco                                          ' });
    this.nations.push({ key: 'Azerbaijano, azeri                               ', value: 'Azerbaijano, azeri                                 ' });
    this.nations.push({ key: 'Bahamense                                        ', value: 'Bahamense                                          ' });
    this.nations.push({ key: 'Bahrein                                          ', value: 'Bahrein                                            ' });
    this.nations.push({ key: 'Bengali                                          ', value: 'Bengali                                            ' });
    this.nations.push({ key: 'Barbados                                         ', value: 'Barbados                                           ' });
    this.nations.push({ key: 'Belarusian                                       ', value: 'Belarusian                                         ' });
    this.nations.push({ key: 'Belga                                            ', value: 'Belga                                              ' });
    this.nations.push({ key: 'Belize                                           ', value: 'Belize                                             ' });
    this.nations.push({ key: 'Beninês, Beninois                                ', value: 'Beninês, Beninois                                  ' });
    this.nations.push({ key: 'Butanês                                          ', value: 'Butanês                                            ' });
    this.nations.push({ key: 'Boliviano                                        ', value: 'Boliviano                                          ' });
    this.nations.push({ key: 'Bósnio ou Herzegovinian                          ', value: 'Bósnio ou Herzegovinian                            ' });
    this.nations.push({ key: 'Motswana, Botsuana                               ', value: 'Motswana, Botsuana                                 ' });
    this.nations.push({ key: 'Bruna                                            ', value: 'Bruna                                              ' });
    this.nations.push({ key: 'Bulgarian                                        ', value: 'Bulgarian                                          ' });
    this.nations.push({ key: 'Burquinabé                                       ', value: 'Burquinabé                                         ' });
    this.nations.push({ key: 'Birmanês                                         ', value: 'Birmanês                                           ' });
    this.nations.push({ key: 'Burundiano                                       ', value: 'Burundiano                                         ' });
    this.nations.push({ key: 'Cabo-verdiano                                    ', value: 'Cabo-verdiano                                      ' });
    this.nations.push({ key: 'De Camboja                                       ', value: 'De Camboja                                         ' });
    this.nations.push({ key: 'Camaronês                                        ', value: 'Camaronês                                          ' });
    this.nations.push({ key: 'Canadense                                        ', value: 'Canadense                                          ' });
    this.nations.push({ key: 'Central Africano                                 ', value: 'Central Africano                                   ' });
    this.nations.push({ key: 'Chadiano                                         ', value: 'Chadiano                                           ' });
    this.nations.push({ key: 'Chileno                                          ', value: 'Chileno                                            ' });
    this.nations.push({ key: 'Chinês                                           ', value: 'Chinês                                             ' });
    this.nations.push({ key: 'Colombiano                                       ', value: 'Colombiano                                         ' });
    this.nations.push({ key: 'Comoran, Comorian                                ', value: 'Comoran, Comorian                                  ' });
    this.nations.push({ key: 'Congolês                                         ', value: 'Congolês                                           ' });
    this.nations.push({ key: 'Congolês                                         ', value: 'Congolês                                           ' });
    this.nations.push({ key: 'Costa Rica                                       ', value: 'Costa Rica                                         ' });
    this.nations.push({ key: 'Marfinense                                       ', value: 'Marfinense                                         ' });
    this.nations.push({ key: 'Croata                                           ', value: 'Croata                                             ' });
    this.nations.push({ key: 'Cubano                                           ', value: 'Cubano                                             ' });
    this.nations.push({ key: 'Cipriota                                         ', value: 'Cipriota                                           ' });
    this.nations.push({ key: 'Checo                                            ', value: 'Checo                                              ' });
    this.nations.push({ key: 'Dinamarquês                                      ', value: 'Dinamarquês                                        ' });
    this.nations.push({ key: 'Jibutiano                                        ', value: 'Jibutiano                                          ' });
    this.nations.push({ key: 'Dominicano                                       ', value: 'Dominicano                                         ' });
    this.nations.push({ key: 'Dominicano                                       ', value: 'Dominicano                                         ' });
    this.nations.push({ key: 'Timorense                                        ', value: 'Timorense                                          ' });
    this.nations.push({ key: 'Equatoriano                                      ', value: 'Equatoriano                                        ' });
    this.nations.push({ key: 'Egípcio                                          ', value: 'Egípcio                                            ' });
    this.nations.push({ key: 'Salvadorenho                                     ', value: 'Salvadorenho                                       ' });
    this.nations.push({ key: 'Guiné Equatorial, Equatoguinean                  ', value: 'Guiné Equatorial, Equatoguinean                    ' });
    this.nations.push({ key: 'Eritreia                                         ', value: 'Eritreia                                           ' });
    this.nations.push({ key: 'Estoniano                                        ', value: 'Estoniano                                          ' });
    this.nations.push({ key: 'Etíope                                           ', value: 'Etíope                                             ' });
    this.nations.push({ key: 'Fijiano                                          ', value: 'Fijiano                                            ' });
    this.nations.push({ key: 'Finnish                                          ', value: 'Finnish                                            ' });
    this.nations.push({ key: 'French                                           ', value: 'French                                             ' });
    this.nations.push({ key: 'Gabonesa                                         ', value: 'Gabonesa                                           ' });
    this.nations.push({ key: 'Gambiano                                         ', value: 'Gambiano                                           ' });
    this.nations.push({ key: 'Georgiano                                        ', value: 'Georgiano                                          ' });
    this.nations.push({ key: 'German                                           ', value: 'German                                             ' });
    this.nations.push({ key: 'Ganês                                            ', value: 'Ganês                                              ' });
    this.nations.push({ key: 'Gibraltar                                        ', value: 'Gibraltar                                          ' });
    this.nations.push({ key: 'Grego, helênico                                  ', value: 'Grego, helênico                                    ' });
    this.nations.push({ key: 'Granadino                                        ', value: 'Granadino                                          ' });
    this.nations.push({ key: 'Guatemalteco                                     ', value: 'Guatemalteco                                       ' });
    this.nations.push({ key: 'Guineense                                        ', value: 'Guineense                                          ' });
    this.nations.push({ key: 'Guiné-Bissau                                     ', value: 'Guiné-Bissau                                       ' });
    this.nations.push({ key: 'Guianense                                        ', value: 'Guianense                                          ' });
    this.nations.push({ key: 'Haitiano                                         ', value: 'Haitiano                                           ' });
    this.nations.push({ key: 'Hondurenho                                       ', value: 'Hondurenho                                         ' });
    this.nations.push({ key: 'Húngaro, magiar                                  ', value: 'Húngaro, magiar                                    ' });
    this.nations.push({ key: 'Islandês                                         ', value: 'Islandês                                           ' });
    this.nations.push({ key: 'Indiano                                          ', value: 'Indiano                                            ' });
    this.nations.push({ key: 'Indonesian                                       ', value: 'Indonesian                                         ' });
    this.nations.push({ key: 'Iraniano, persa                                  ', value: 'Iraniano, persa                                    ' });
    this.nations.push({ key: 'Iraquiano                                        ', value: 'Iraquiano                                          ' });
    this.nations.push({ key: 'Irlandês                                         ', value: 'Irlandês                                           ' });
    this.nations.push({ key: 'Israelense                                       ', value: 'Israelense                                         ' });
    this.nations.push({ key: 'Italian                                          ', value: 'Italian                                            ' });
    this.nations.push({ key: 'Marfinense                                       ', value: 'Marfinense                                         ' });
    this.nations.push({ key: 'Jamaicano                                        ', value: 'Jamaicano                                          ' });
    this.nations.push({ key: 'Japanese                                         ', value: 'Japanese                                           ' });
    this.nations.push({ key: 'Jordaniano                                       ', value: 'Jordaniano                                         ' });
    this.nations.push({ key: 'Cazaquistão, cazaque                             ', value: 'Cazaquistão, cazaque                               ' });
    this.nations.push({ key: 'Kenyan                                           ', value: 'Kenyan                                             ' });
    this.nations.push({ key: 'I-Kiribati                                       ', value: 'I-Kiribati                                         ' });
    this.nations.push({ key: 'Norte-coreano                                    ', value: 'Norte-coreano                                      ' });
    this.nations.push({ key: 'Sul-coreano                                      ', value: 'Sul-coreano                                        ' });
    this.nations.push({ key: 'Kuwaití                                          ', value: 'Kuwaití                                            ' });
    this.nations.push({ key: 'Quirguistão, Quirguiz, Quirguiz, Quirguiz        ', value: 'Quirguistão, Quirguiz, Quirguiz, Quirguiz          ' });
    this.nations.push({ key: 'Laos, Laos                                       ', value: 'Laos, Laos                                         ' });
    this.nations.push({ key: 'Letão, letão                                     ', value: 'Letão, letão                                       ' });
    this.nations.push({ key: 'Libanês                                          ', value: 'Libanês                                            ' });
    this.nations.push({ key: 'Basotho                                          ', value: 'Basotho                                            ' });
    this.nations.push({ key: 'Liberiano                                        ', value: 'Liberiano                                          ' });
    this.nations.push({ key: 'Líbio                                            ', value: 'Líbio                                              ' });
    this.nations.push({ key: 'Liechtenstein é                                  ', value: 'Liechtenstein é                                    ' });
    this.nations.push({ key: 'Lituano                                          ', value: 'Lituano                                            ' });
    this.nations.push({ key: 'Luxemburgo, luxemburguês                         ', value: 'Luxemburgo, luxemburguês                           ' });
    this.nations.push({ key: 'Macedónio                                        ', value: 'Macedónio                                          ' });
    this.nations.push({ key: 'Malgaxe                                          ', value: 'Malgaxe                                            ' });
    this.nations.push({ key: 'Malawi                                           ', value: 'Malawi                                             ' });
    this.nations.push({ key: 'Malásia                                          ', value: 'Malásia                                            ' });
    this.nations.push({ key: 'Maldivian                                        ', value: 'Maldivian                                          ' });
    this.nations.push({ key: 'Malês, malinês                                   ', value: 'Malês, malinês                                     ' });
    this.nations.push({ key: 'Maltês                                           ', value: 'Maltês                                             ' });
    this.nations.push({ key: 'Marshallese                                      ', value: 'Marshallese                                        ' });
    this.nations.push({ key: 'Martiniquais, Martinica                          ', value: 'Martiniquais, Martinica                            ' });
    this.nations.push({ key: 'Mauritano                                        ', value: 'Mauritano                                          ' });
    this.nations.push({ key: 'Maurício                                         ', value: 'Maurício                                           ' });
    this.nations.push({ key: 'Mexicano                                         ', value: 'Mexicano                                           ' });
    this.nations.push({ key: 'Micronésio                                       ', value: 'Micronésio                                         ' });
    this.nations.push({ key: 'Moldovan                                         ', value: 'Moldovan                                           ' });
    this.nations.push({ key: 'Monégasque, Monacan                              ', value: 'Monégasque, Monacan                                ' });
    this.nations.push({ key: 'Mongol                                           ', value: 'Mongol                                             ' });
    this.nations.push({ key: 'Montenegrino                                     ', value: 'Montenegrino                                       ' });
    this.nations.push({ key: 'Marroquino                                       ', value: 'Marroquino                                         ' });
    this.nations.push({ key: 'Moçambicano                                      ', value: 'Moçambicano                                        ' });
    this.nations.push({ key: 'Namibiano                                        ', value: 'Namibiano                                          ' });
    this.nations.push({ key: 'Nauruan                                          ', value: 'Nauruan                                            ' });
    this.nations.push({ key: 'Nepalês, nepalês                                 ', value: 'Nepalês, nepalês                                   ' });
    this.nations.push({ key: 'Holandês, holandês                               ', value: 'Holandês, holandês                                 ' });
    this.nations.push({ key: 'Nova Zelândia, Nova Zelândia, Zelanian           ', value: 'Nova Zelândia, Nova Zelândia, Zelanian             ' });
    this.nations.push({ key: 'Nicaraguense                                     ', value: 'Nicaraguense                                       ' });
    this.nations.push({ key: 'Nigerien                                         ', value: 'Nigerien                                           ' });
    this.nations.push({ key: 'Nigeriano                                        ', value: 'Nigeriano                                          ' });
    this.nations.push({ key: 'Marianan do norte                                ', value: 'Marianan do norte                                  ' });
    this.nations.push({ key: 'Norwegian                                        ', value: 'Norwegian                                          ' });
    this.nations.push({ key: 'Omanense                                         ', value: 'Omanense                                           ' });
    this.nations.push({ key: 'Paquistanês                                      ', value: 'Paquistanês                                        ' });
    this.nations.push({ key: 'Palauan                                          ', value: 'Palauan                                            ' });
    this.nations.push({ key: 'Palestino                                        ', value: 'Palestino                                          ' });
    this.nations.push({ key: 'Panamenho                                        ', value: 'Panamenho                                          ' });
    this.nations.push({ key: 'Papua Nova Guiné, Papua                          ', value: 'Papua Nova Guiné, Papua                            ' });
    this.nations.push({ key: 'Paraguaio                                        ', value: 'Paraguaio                                          ' });
    this.nations.push({ key: 'Peruano                                          ', value: 'Peruano                                            ' });
    this.nations.push({ key: 'Filipino, filipino                               ', value: 'Filipino, filipino                                 ' });
    this.nations.push({ key: 'Polonês                                          ', value: 'Polonês                                            ' });
    this.nations.push({ key: 'Portuguese                                       ', value: 'Portuguese                                         ' });
    this.nations.push({ key: 'Porto-riquenho                                   ', value: 'Porto-riquenho                                     ' });
    this.nations.push({ key: 'Qatari                                           ', value: 'Qatari                                             ' });
    this.nations.push({ key: 'Romeno                                           ', value: 'Romeno                                             ' });
    this.nations.push({ key: 'Russian                                          ', value: 'Russian                                            ' });
    this.nations.push({ key: 'Ruandeses                                        ', value: 'Ruandeses                                          ' });
    this.nations.push({ key: 'Kittitian ou Nevisian                            ', value: 'Kittitian ou Nevisian                              ' });
    this.nations.push({ key: 'São Lucian                                       ', value: 'São Lucian                                         ' });
    this.nations.push({ key: 'São Vicente, Vicentino                           ', value: 'São Vicente, Vicentino                             ' });
    this.nations.push({ key: 'Samoano                                          ', value: 'Samoano                                            ' });
    this.nations.push({ key: 'Sammarinese                                      ', value: 'Sammarinese                                        ' });
    this.nations.push({ key: 'São Tomé                                         ', value: 'São Tomé                                           ' });
    this.nations.push({ key: 'Saudita, arábia saudita                          ', value: 'Saudita, arábia saudita                            ' });
    this.nations.push({ key: 'Senegalesa                                       ', value: 'Senegalesa                                         ' });
    this.nations.push({ key: 'Sérvio                                           ', value: 'Sérvio                                             ' });
    this.nations.push({ key: 'Seychelles                                       ', value: 'Seychelles                                         ' });
    this.nations.push({ key: 'Serra Leoa                                       ', value: 'Serra Leoa                                         ' });
    this.nations.push({ key: 'Cingapura, Cingapura                             ', value: 'Cingapura, Cingapura                               ' });
    this.nations.push({ key: 'Slovak                                           ', value: 'Slovak                                             ' });
    this.nations.push({ key: 'Esloveno, esloveno                               ', value: 'Esloveno, esloveno                                 ' });
    this.nations.push({ key: 'Ilhas Salomão                                    ', value: 'Ilhas Salomão                                      ' });
    this.nations.push({ key: 'Somali                                           ', value: 'Somali                                             ' });
    this.nations.push({ key: 'África do Sul                                    ', value: 'África do Sul                                      ' });
    this.nations.push({ key: 'Sudanês do sul                                   ', value: 'Sudanês do sul                                     ' });
    this.nations.push({ key: 'Espanhol                                         ', value: 'Espanhol                                           ' });
    this.nations.push({ key: 'Sri Lank                                         ', value: 'Sri Lank                                           ' });
    this.nations.push({ key: 'Sudanês                                          ', value: 'Sudanês                                            ' });
    this.nations.push({ key: 'No Suriname                                      ', value: 'No Suriname                                        ' });
    this.nations.push({ key: 'Swazi                                            ', value: 'Swazi                                              ' });
    this.nations.push({ key: 'Sueco                                            ', value: 'Sueco                                              ' });
    this.nations.push({ key: 'Suíço                                            ', value: 'Suíço                                              ' });
    this.nations.push({ key: 'Sírio                                            ', value: 'Sírio                                              ' });
    this.nations.push({ key: 'Tajiquistanês                                    ', value: 'Tajiquistanês                                      ' });
    this.nations.push({ key: 'Tanzânia                                         ', value: 'Tanzânia                                           ' });
    this.nations.push({ key: 'Tailandês                                        ', value: 'Tailandês                                          ' });
    this.nations.push({ key: 'Timorense                                        ', value: 'Timorense                                          ' });
    this.nations.push({ key: 'Togoleses                                        ', value: 'Togoleses                                          ' });
    this.nations.push({ key: 'Tokelauan                                        ', value: 'Tokelauan                                          ' });
    this.nations.push({ key: 'Tonganês                                         ', value: 'Tonganês                                           ' });
    this.nations.push({ key: 'Trindade ou Tobagonian                           ', value: 'Trindade ou Tobagonian                             ' });
    this.nations.push({ key: 'Tunisiano                                        ', value: 'Tunisiano                                          ' });
    this.nations.push({ key: 'Turco                                            ', value: 'Turco                                              ' });
    this.nations.push({ key: 'Turcomanos                                       ', value: 'Turcomanos                                         ' });
    this.nations.push({ key: 'Tuvaluan                                         ', value: 'Tuvaluan                                           ' });
    this.nations.push({ key: 'Uganda                                           ', value: 'Uganda                                             ' });
    this.nations.push({ key: 'Ucraniano                                        ', value: 'Ucraniano                                          ' });
    this.nations.push({ key: 'Emirati, Emirado, Emiri                          ', value: 'Emirati, Emirado, Emiri                            ' });
    this.nations.push({ key: 'Reino Unido, britânico                           ', value: 'Reino Unido, britânico                             ' });
    this.nations.push({ key: 'Estados Unidos, EUA, americanos                  ', value: 'Estados Unidos, EUA, americanos                    ' });
    this.nations.push({ key: 'Uruguaio                                         ', value: 'Uruguaio                                           ' });
    this.nations.push({ key: 'Uzbequistanês, usbeque                           ', value: 'Uzbequistanês, usbeque                             ' });
    this.nations.push({ key: 'Ni-Vanuatu, Vanuatuan                            ', value: 'Ni-Vanuatu, Vanuatuan                              ' });
    this.nations.push({ key: 'Vaticano                                         ', value: 'Vaticano                                           ' });
    this.nations.push({ key: 'Venezuelano                                      ', value: 'Venezuelano                                        ' });
    this.nations.push({ key: 'Vietnamita                                       ', value: 'Vietnamita                                         ' });
    this.nations.push({ key: 'Iemenita                                         ', value: 'Iemenita                                           ' });
    this.nations.push({ key: 'Zâmbia                                           ', value: 'Zâmbia                                             ' });
    this.nations.push({ key: 'Zimbabuano                                       ', value: 'Zimbabuano                                         ' });
  }


}
