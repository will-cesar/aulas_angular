import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from '../../app.service';
import { SimulationSession } from '../models/simulationSession.model';
import { SimulationService } from '../services/simulation.service';
import { environment } from '../../../environments/environment';
import { SimulationPriceRequest } from '../models/requests/simulationPriceRequest.model';
import { SimulationPrice } from '../models/simulationPrice.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SimulationDataRequest } from '../models/requests/simulationDataRequest.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { BaseFormComponent } from '../../shared/base-form.component';
@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss', '../../components/blocos/formulario/formulario.component.scss'],
  providers: []
})


export class ResumoComponent extends BaseFormComponent implements OnInit {

  successMail: boolean = false;
  innerWidth: number;
  mailBoxVisibility: string = 'hidden-info';
  simulationSession: SimulationSession;
  simulationPriceRequest: SimulationPriceRequest;
  simulationPrice: SimulationPrice;
  mediaRepository: any = environment.mediasUrl;
  closeResult: string;
  form: FormGroup;


  constructor(
    private simulationService: SimulationService,
    private modalService: NgbModal, private fb: FormBuilder,
    private ngxService: NgxUiLoaderService, private router: Router) { super(); }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });

    this.getSimulationSession();

    AppService.updatePriceSession.subscribe(result => {
      this.getSimulationSession();
    });

    this.innerWidth = window.innerWidth;

    if (this.innerWidth < 768) {
      AppService.changeFooterVisibility.emit(false)
      AppService.changeHeaderBackground.emit('#f7f7f7')
    }
    if (!this.simulationSession || !this.simulationSession.selectedClass) {
      this.router.navigate(['/simulador']);
    }


  }

  getSimulationSession() {
    this.simulationSession = this.simulationService.getSimulationSession();

    if (this.simulationSession) {
      this.simulationPriceRequest
        = {

          modelId: this.simulationSession.selectedClass.modelId,
          kmLimit: this.simulationSession.kmLimit,
          timeDeadline: this.simulationSession.dealdlineTime,
          typeOfColor: this.simulationSession.colorType,


        }


      this.simulationService.getSimulationPrice(this.simulationPriceRequest).subscribe(result => this.success(result));
    }


  }

  success(result) {

    this.simulationPrice = result
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 767) {
      AppService.changeFooterVisibility.emit(true)
      AppService.changeHeaderBackground.emit('#ffffff')
    }
    else {
      AppService.changeFooterVisibility.emit(false)
      AppService.changeHeaderBackground.emit('#f7f7f7')
    }
  }


  toggleMailBox() {
    if (this.mailBoxVisibility == 'hidden-info') {
      this.mailBoxVisibility = '';
    }
    else {
      this.mailBoxVisibility = 'hidden-info';
    }
  }

  submit() {

    this.ngxService.start();
    if (this.simulationSession) {

      var priceSession = JSON.parse(sessionStorage.getItem(environment.simulationPriceSession));

      var request: SimulationDataRequest = {
        brandId: this.simulationSession.selectedClass.brand,
        classId: this.simulationSession.selectedClass.class,
        modelId: this.simulationSession.selectedClass.model,
        color: this.simulationSession.selectedColor.color,
        timeDeadline: this.simulationSession.dealdlineTime,
        kmLimit: this.simulationSession.kmLimit,
        name: this.form.value.name,
        surname: this.form.value.surname,
        colorType: this.simulationSession.colorType,
        email: this.form.value.email,
        installmentAmount: priceSession.installmentAmount,
        totalValue: priceSession.totalValue,
        numberOfInstallments: priceSession.numberOfInstallments,
        guaranteeDeposit: priceSession.guaranteeDeposit


      }
      this.simulationService.postSimulationDataEmail(request).
        subscribe(result => this.successEmail(result), error => this.defaultError(error)).add(this.ngxService.stop());
    }

  }
  successEmail(result) {
    //swal.fire("Tudo certo", "E-mail enviado com sucesso", "success");
    this.successMail = true;
    this.form.reset();
  }

  defaultError(error) {
    var errorMessage = '';
    if (error.error) {
      if (error.error.errors) {
        errorMessage = '';
        error.error.errors.forEach(element => {
          errorMessage += '<br /> - ' + element.value;
        });
      }
    }

    swal.fire({
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
}
