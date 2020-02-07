import { Component, OnInit, HostListener } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { cmsService } from './../services/cms.service';
import { environment } from '../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { AppService } from '../app.service';

declare var FB: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../app.component.scss'],
  providers: [cmsService]
})

export class HomeComponent implements OnInit {

  videoVisibility: any;
  vantagemAtiva: any;
  pageContent: any = [];
  slides: any = [];
  slidesVantagens: any = [];
  listaPerguntas: any = [];
  listaComponentes: any = [];
  listaConteudo: any = [];
  mediaRepository: any = environment.mediasUrl;


  constructor(private cmsService: cmsService, public sanitizer: DomSanitizer, private ngxService: NgxUiLoaderService) { }
  public innerWidth: any;
  ngOnInit() {
    /*     (window as any).fbAsyncInit = function() {
          FB.init({
            appId      : '2400225663551134',
            cookie     : true,
            xfbml      : true,
            version    : 'v3.1'
          });
          FB.AppEvents.logPageView();
        };
    
        (function(d, s, id){
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement(s); js.id = id;
           js.src = "https://connect.facebook.net/en_US/sdk.js";
           fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));
         this.vantagemAtiva = this.slidesVantagens[0]; */

    /*      this.getPageComponents();
         this.loadComponents(); */
    this.getPageContent();

    AppService.showNewPassDivMobile.emit();
    this.innerWidth = window.innerWidth;
  }



  submitLogin() {
    console.log("submit login to facebook");
    // FB.login();
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        /* make the API call */
        FB.api(
          response.authResponse.userID,
          function (response) {
            if (response && !response.error) {
              /* handle the result */
              console.log(response)
            }
          }
        );
      }
      else {
        console.log('User login failed');
      }
    });

  }

  getPageContent() {
    this.cmsService.getPageById(21).subscribe(result => this.successLoadPageContent(result), error => this.defaultError());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }


  successLoadPageContent(result) {
    result.conteudo.map(item => {
      this.listaConteudo.push(item);
    });
  }

  defaultError() {

  }








}
