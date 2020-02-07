import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  private onResumeSubscription: Subscription;

  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    console.log("construtor")
    
    if (this.platform.is('android')) {
      document.addEventListener("resume", (event)=> this.onResume(event, this), false);
    }
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onResume(event: any, self) {
    console.log("caiu no callback: ",  event )
    if (event && event.pendingResult) {
      console.log("entrou no if")
      const status: string = event.pendingResult.pluginStatus !== null ? '' : event.pendingResult.pluginStatus.toUpperCase();  
      if ('Camera' === event.pendingResult.pluginServiceName && 'OK' !== status && event.pendingResult.result !== '') {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "imagePath": event.pendingResult.result,
          }
        };  
        self.router.navigate(['/home'], navigationExtras);
      }
    }
  }

}
