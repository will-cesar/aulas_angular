
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { cmsService } from '../../../services/cms.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [cmsService]
})
export class FooterComponent implements OnInit {

  footerContent: any;
  //rotaAtual:any;
  mediaRepository: any = environment.mediasUrl;
  chatText:string;
  footerVisibility:boolean;

  constructor(
    private router: Router,
    private cmsService: cmsService,
      private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.chatText = 'Simule Agora';
    this.footerVisibility = true;
    AppService.changeTextFooter.subscribe(result => {
      this.chatText = result
    });
    AppService.changeFooterVisibility.subscribe(result => {
      this.footerVisibility = result
    });
    if(sessionStorage.getItem('termsUrl')){
      sessionStorage.removeItem('termsUrl');
    }
    this.getFooterContent();
  }

  scroll() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  

  getFooterContent() {
    this.cmsService.getFooter().subscribe(result => this.successLoadFooterContent(result), error => this.defaultError());
  }

  successLoadFooterContent(result) {
    this.footerContent = result;
    sessionStorage.setItem('termsUrl', result.termos_de_uso);
  }

  defaultError() {
    
  }


}
