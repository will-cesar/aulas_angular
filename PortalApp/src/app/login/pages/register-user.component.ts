
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/base-form.component';

import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html'
})
export class RegisterUserComponent extends BaseFormComponent implements OnInit {

    showPassword: boolean = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private dataService: UserService
    ) {
        super()
    }


    ngOnInit() {

        var user = JSON.parse(sessionStorage.getItem('socialusers'));

        if (user) {
            this.form = this.fb.group({
                name: [user.name,],
                email: [user.email,],
                document: ['',],
                password: [null,],
                passwordConfirmation: [null],
                idFacebook: user.id
            }, { validator: this.checkPasswords })
        }
        else {
            this.form = this.fb.group({
                name: ['',],
                email: ['',],
                document: ['',],
                password: [null,],
                passwordConfirmation: [null,],
            }, { validator: this.checkPasswords })
        }


    }

    checkPasswords(form: FormGroup) {

        let pass = form.controls.password.value;
        let passCheck = form.controls.passwordConfirmation.value;

        return pass == passCheck ? null : { notSame: true }
    }

    submit() {
        //this.spinner.show();
        if (this.form.controls.idFacebook) {
            this.dataService.postWithFacebook(this.form.value).subscribe(result => this.success(result), error => this.defaultError(error));
            localStorage.setItem('socialusers', JSON.stringify(null));
        }

        else {
            this.dataService.post(this.form.value).subscribe(result => this.success(result), error => this.defaultError(error))
        }
    }

    success(result) {
        swal.fire('Tudo Certo', 'Usuário salvo com sucesso', 'success');
        this.form.reset();

        //this.onSaved.emit();

    }

    defaultError(error) {
        if (error) {
            swal.fire('Ops...', error, 'error');
        } else {
            swal.fire('Ops...', 'Houve um erro com a operação. Favor entrar em contato com o Suporte', 'error');
        }
    }

    verifyPassError() {
        return this.form.errors ? this.form.errors.notSame ? true : false : false
    }

    togglePassword() {
        return this.showPassword = !this.showPassword
    }

}
