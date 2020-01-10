import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { AppService } from '../../app.service';
import { RegisterService } from 'src/app/services/register.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-checkout-analyze',
  templateUrl: './analise.component.html',
  styleUrls: ['./analise.component.scss', '../checkout.module.scss', '../../components/blocos/formulario/formulario.component.scss']
})

export class CheckoutAnalyzeComponent extends BaseFormComponent implements OnInit {


  constructor(private modalService: NgbModal) {
    super();
  }

  ngOnInit() {

  }

  submit() {
    throw new Error("Method not implemented.");
  }

  openProposal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-full-proposal', windowClass: "proposalModal" });
  }

}
