import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { AppService } from '../../app.service';
import { RegisterService } from 'src/app/services/register.service';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { dashboardService } from '../services/dashboard.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss', '../dashboard.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class NotificationsComponent extends BaseFormComponent implements OnInit {

  innerWidth: number;
  readList: boolean = false;
  notifications: any[] = [];
  notificationOpen: any[] = [];
  notificationNoOpen: any[] = [];

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private dashboardService: dashboardService
  ) {
    super();
  }

  ngOnInit() {
    this.screenControl();
    this.ngxService.start();

    this.notifications = JSON.parse(localStorage.getItem('logged.user.session')).notifications;

    if (this.notifications) {
      this.filterNotifications();

    }

    this.ngxService.stop();

  }

  submit() {
    throw new Error("Method not implemented.");
  }

  changeMessagesList() {
    this.readList = !this.readList;
  }

  openNotification(id, messageRead) {
    if (messageRead == 'No') {
      this.notificationNotRead(id);
    }
    else {
      this.router.navigate(['/dashboard/notificacoes', id]);
    }
  }

  notificationNotRead(id) {
    let userLogged: any = JSON.parse(localStorage.getItem('logged.user.session'));
    let data = {
      userDocument: userLogged.document,
      recIdNotification: id
    }

    this.dashboardService.postNotificationStatus(data).subscribe(resultPending => this.successPostPendings(resultPending, id), error => this.defaultError(error));
  }

  successPostPendings(result, id) {
    this.router.navigate(['/dashboard/notificacoes', id]);
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

  screenControl() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 991) {
      AppService.changeHeaderVisibility.emit(true)
    }
    else {
      AppService.changeHeaderVisibility.emit(false)
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenControl();
  }

  arrowNavigation() {
    this.router.navigate(['/dashboard']);
  }

  filterNotifications() {
    if (this.notifications.length > 0) {
      this.notifications.map(item => {
        item.MessageRead == 'No' ? this.notificationNoOpen.push(item) : this.notificationOpen.push(item);
      });
    }
  }
}
