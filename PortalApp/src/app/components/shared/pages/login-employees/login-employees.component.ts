import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { debug } from 'util';
import { SharedService } from '../../shared.service';
import { AppService } from '../../../../app.service';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login-employees',
  templateUrl: './login-employees.component.html',
  styleUrls: ['./login-employees.component.scss', '../../../../../app/register/register.module.scss', '../../../../components/blocos/formulario/formulario.component.scss']
})
export class LoginEmployeesComponent extends BaseFormComponent implements OnInit {

  innerWidth: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dataService: SharedService,
    private ngxService: NgxUiLoaderService
  ) {
    super();
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.controlScreen();
    let isLogged = localStorage.getItem('loggedColaborador');

    // if (isLogged) {
    //   this.router.navigate(['/']);
    //   return false;
    // }

    this.form = this.fb.group({
      // registration: [null, [Validators.required]],
      document: [null, [Validators.required]]
    })
  }





  submit() {
    this.ngxService.start();
    this.dataService.postCollaborator(this.form.value).subscribe(result => this.responseLoginCollaborator(result), error => this.defaultError(error)).add(() => this.ngxService.stop());

    // localStorage.setItem('loggedColaborador', JSON.stringify(this.form.value));
    // this.router.navigate(['/']);
    //this.router.navigate(['/']);
  }

  responseLoginCollaborator(result) {
    if (result.authenticated) {

      var queryParam = this.route.snapshot.queryParams;
      var urlToRedirect = "";
      if (queryParam) {
        const userId = queryParam['userId'];
        const token = queryParam['token'];
        const idLeadUserSimulation = queryParam['idLeadUserSimulation'];
        const confirmationToken = queryParam["confirmationToken"];

        if (userId && token)
          urlToRedirect = "?token=" + token + "&userId=" + userId;
        if (idLeadUserSimulation) {
          urlToRedirect = urlToRedirect + "&idLeadUserSimulation=" + idLeadUserSimulation;
        }

        if (confirmationToken) {

          localStorage.setItem('loggedColaborador', JSON.stringify(this.form.value));

          urlToRedirect = urlToRedirect + "&confirmationToken=" + true;
          this.router.navigateByUrl('/cadastro/confirmacao-email' + urlToRedirect);
          return;

        }

      }
      localStorage.setItem('loggedColaborador', JSON.stringify(this.form.value));


      this.router.navigateByUrl('/' + urlToRedirect);
    }
    else {
      Swal.fire({
        title: 'Ops...',
        html: 'A locação de veículos Loopster está disponível para colaboradores e estagiários da Renault do Brasil e Banco RCI, com pelo menos 6 meses de tempo de casa. Esse beneficio é exclusivo para os colaboradores que não possuem carro de função ou locação. Veículos limitados conforme disponibilidade. ',
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

  defaultError(error) {

    Swal.fire({
      title: 'Ops...',
      html: 'Colaborador não autenticado!',
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
    localStorage.removeItem('loggedColaborador');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.controlScreen();
  }

  controlScreen() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 767) {
      AppService.changeFooterVisibility.emit(true);
      AppService.changeHeaderBackground.emit('#ffffff');
    }
    else {
      AppService.changeFooterVisibility.emit(false);
      AppService.changeHeaderBackground.emit('#f7f7f7');
    }
  }

}
