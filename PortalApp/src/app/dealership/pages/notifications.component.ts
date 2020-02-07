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


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss', '../dealership.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class NotificationsComponent extends BaseFormComponent implements OnInit {

  innerWidth: number;
  readList:boolean = false;
  notificationOpen:boolean = false;

  constructor(
    private modalService: NgbModal, 
    private route: ActivatedRoute,
    private router: Router
    ) {
    super();
  }

  ngOnInit() {
    this.screenControl();

  }


  submit() {
    throw new Error("Method not implemented.");
  }

  changeMessagesList() {
    this.readList = !this.readList;
  }

  openNotification(){
    this.notificationOpen = true;
  }

  closeNotification(){
    this.notificationOpen = false;
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
    if (this.notificationOpen) {
      this.notificationOpen = false
    }
    else {
      this.router.navigate(['/dashboard']);
    }
  }
}
