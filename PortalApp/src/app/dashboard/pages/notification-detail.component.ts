import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { AppService } from '../../app.service';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: [
    './notification-detail.component.scss',
    '../dashboard.module.scss',
    '../../components/blocos/formulario/formulario.component.scss',
    './notifications.component.scss'
  ]
})
export class NotificationDetailComponent implements OnInit {

  id: string;
  notifications: any[];
  notification: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.ngxService.start();

    this.notifications = JSON.parse(localStorage.getItem('logged.user.session')).notifications;

    if (this.notifications) {
      this.filterNotification();

    }
    this.ngxService.stop();
  }

  arrowNavigation() {
    this.router.navigate(['/dashboard/notificacoes']);
  }

  filterNotification() {
    this.id = this.route.snapshot.params['id'];
    this.notification = this.notifications.filter(x => x.RecIdNotification == this.id);
    this.notification = this.notification[0];
  }

  closeNotification() {
    this.router.navigate(['/dashboard/notificacoes']);
  }

}
