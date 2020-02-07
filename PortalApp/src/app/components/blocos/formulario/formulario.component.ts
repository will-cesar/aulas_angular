
import { Component, OnInit, Renderer2, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  Router, Event, NavigationStart, RoutesRecognized,
  RouteConfigLoadStart, RouteConfigLoadEnd,
  NavigationEnd, NavigationCancel, NavigationError
} from '@angular/router';
import Swal from 'sweetalert2';
import { cmsService } from '../../../services/cms.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  providers: []
})
export class FormularioComponent implements OnInit {

  public innerWidth: any;
  @Input() bgBloco: string;
  @Input() titulo: string;
  @Input() corTitulo: string;
  @Input() subTitulo: string;
  @Input() corSubTitulo: string;
  @Input() camposForm: any[];
  @ViewChild('contactForm', { static: false }) contactForm: ElementRef;
  formContent: any = [];
  formObj: any = {};

  constructor(private router: Router, private cmsService: cmsService, private ngxService: NgxUiLoaderService, ) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    console.log(this.contactForm)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  submit() {
    this.formObj = {};
    this.formContent = [];
    this.ngxService.start();

    Array.from(this.contactForm.nativeElement.querySelectorAll('.floating-input')).forEach(element => {
      this.formContent.push((element as HTMLInputElement).value);

    });
    this.formObj = {
      "Nome": this.formContent[0],
      "SobreNome": this.formContent[1],
      "Telefone": this.formContent[2],
      "Email": this.formContent[3],
      "Assunto": this.formContent[4],
      "Mensagem": this.formContent[5]
    }
    if (this.formContent.length > 0) {
      //console.log(this.formContent)
      this.cmsService.sendTalkWithUsForm(this.formObj).subscribe(result => this.success(result), error => this.error(error)).add(() => this.ngxService.stop());
    }
    else {
      this.ngxService.stop();
      Swal.fire({
        title: 'Preencha o formulário para enviar a mensagem!',
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

    //this.success();
  }

  success(result) {

    Swal.fire({
      title: 'Mensagem enviada com sucesso!',
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
    });
  }

  error(error) {
    if (error && error.status == 200) {
      Swal.fire({
        title: 'Mensagem enviada com sucesso!',
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
      });

    }
    else {
      Swal.fire({
        title: 'Erro ao enviar a mensagem. Tente novamente!',
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
  }

}
