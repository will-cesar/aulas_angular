import { Component, OnInit, HostListener } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Event, Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { cmsService } from './services/cms.service';
import { LoginService } from './login/services/login.service';
import { UserService } from './login/services/user.service';
import { RegisterService } from './services/register.service';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  pageHeight: string = '77vh';
  title = 'Loopster';
  footerContent: any;
  constructor(private router: Router, private cmsService: cmsService, private loginService: LoginService, private userService: RegisterService) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.pageHeight = '77vh';
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        this.pageHeight = 'auto';
        if (event.url.indexOf('/cadastro') > -1) {

        }
        else {
          sessionStorage.removeItem(environment.userRegisterSession);
          sessionStorage.removeItem('socialusers');
        }


        var user = this.loginService.getLoggedUserSession();
        var dealershipLogin = localStorage.getItem("dealershipLogin");
        
        if (dealershipLogin && dealershipLogin == 'true' && event.url.indexOf('/dashboard') > -1) {
          if (event.url.indexOf('/noti') > -1) {

          }
          else {
            this.router.navigate(['/concessionaria']);
          }
        }

        if (user && (!dealershipLogin || dealershipLogin != 'true')) {
          this.userService.getLoggedUser().subscribe(result => this.userResult(result), error => this.defaultError(error));
        }
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user

      }
    });

  }

  userResult(result) {

    this.loginService.postLoggedUserSession(result);
    AppService.getUserInfos.emit(result);
  }

  ngOnInit() {
    this.getFooterContent();
  }
  ngAfterViewInit() {
  }


  getFooterContent() {
    this.cmsService.getFooter().subscribe(result => this.successLoadFooterContent(result), error => this.defaultError(error));
  }

  successLoadFooterContent(result) {
    this.footerContent = result;
  }

  defaultError(response) {
    if (response.statusCode = 401) {
      this.loginService.removeLoggedUserSession();
      AppService.changeLoggedNav.emit(false);
      console.log('desautorizado');
    }
  }
}