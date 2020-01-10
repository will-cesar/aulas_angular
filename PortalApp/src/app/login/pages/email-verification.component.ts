import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-email-verification',
    templateUrl: './email-verification.component.html'
})
export class EmailVerificationComponent implements OnInit {

    userName: string

    token: string;
    userId: string;
    label: string;

    constructor(private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private dataService: UserService) {
    }


    ngOnInit() {

        this.route.queryParams.subscribe(params => {
            this.token = params['token'];
            this.userId = params['userId'];
        });

        this.label = "E-mail ainda não verificado ! "
        var verifyObj = {
            userId: this.userId,
            token: this.token
        }

        this.dataService.confirmEmail(verifyObj).subscribe(result => this.success());

    }



    success() {
        this.label = "E-mail verificado ! ";


    }

    defaultError(error) {
        if (error) {
            swal.fire('Ops...', error, 'error');
        } else {
            swal.fire('Ops...', 'Houve um erro com a operação. Favor entrar em contato com o Suporte', 'error');
        }
    }
}


