import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from '../../app.service';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormValidations } from 'src/app/shared/form-validations';
import { User } from '../models/user.model';
import { RegisterService } from 'src/app/services/register.service';
import { ɵangular_packages_router_router_c, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-nacionalidade',
  templateUrl: './nacionalidade.component.html',
  styleUrls: ['./nacionalidade.component.scss', '../register.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})
export class NacionalidadeComponent extends BaseFormComponent implements OnInit {

  showBreadcrumbMobile: boolean = true;
  innerWidth: number;
  isBrazilian: boolean;
  infoOpen: boolean = false;
  sessionUser: User;
  nations: any[];


  constructor(private fb: FormBuilder, private dataService: RegisterService,
    private ngxService: NgxUiLoaderService,
    private router: Router, ) {
    super();
  }

  ngOnInit() {
    this.fillNations();
    this.isBrazilian = true;
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
        birthDate: [this.sessionUser.birthDate ? moment(this.sessionUser.birthDate).format('DD/MM/YYYY') : this.sessionUser.birthDate, [Validators.required, FormValidations.ageValidator()]],
        nationality: [this.sessionUser.nationality, [Validators.required]],
        rne: [this.sessionUser.rne],
        addressCEP: [this.sessionUser.addressCEP],
        address: [this.sessionUser.address],
        addressNumber: [this.sessionUser.addressNumber],
        addressComplement: [this.sessionUser.addressComplement],
        addressNeighborhood: [this.sessionUser.addressNeighborhood],
        addressCity: [this.sessionUser.addressCity],
        addressState: [this.sessionUser.addressState],
        password: [this.sessionUser.password, [Validators.required]],
        confirmPassword: [this.sessionUser.confirmPassword, [Validators.required]],
        idLeadUserSimulation: [this.sessionUser.idLeadUserSimulation]
      });

    }
    else {
      this.form = this.fb.group({
        birthDate: [null, [Validators.required, FormValidations.ageValidator()]],
        nationality: [null, [Validators.required]],
        rne: [null],
        password: [null, [Validators.required]],
        confirmPassword: [null, [Validators.required]],
      });
      this.router.navigate(['/cadastro']);
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



  selectNationality(event: any) {
    if (event.trim() !== 'Brasileiro') {
      this.isBrazilian = false;
      this.form.controls.rne.setValidators([Validators.required]);
    }
    else {
      this.form.controls.rne.setValidators(null);
      this.isBrazilian = true;
    }

    this.form.controls.rne.updateValueAndValidity();
    console.log(this.form)
  }

  submit() {
    const dateParts = this.form.value.birthDate.split("/");
    const dateObject = dateParts[1] + '/' + dateParts[0] + '/' + dateParts[2];
    let submitObj = this.form.value;
    submitObj['birthDate'] = new Date(dateObject);
    this.dataService.postStepTwo(submitObj).subscribe(result => this.success(result), error => this.defaultError(error)).add(() => this.ngxService.stop());
  }

  success(result) {
    this.dataService.postUserSession(this.form.value);



    this.router.navigate(['/cadastro/endereco']);


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




  toggleHelper() {
    if (this.innerWidth < 768) {
      this.infoOpen = !this.infoOpen;
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
}
