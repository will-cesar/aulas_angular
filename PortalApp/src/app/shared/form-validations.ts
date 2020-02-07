import { FormArray, FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';

import * as moment from "moment";

export class FormValidations {

    static requiredMinCheckbox(min = 1) {
        const validator = (formArray: FormArray) => {
            const totalChecked = formArray.controls
                .map(v => v.value)
                .reduce((total, current) => current ? total + current : total, 0);
            return totalChecked >= min ? null : { required: true };
        };
        return validator;
    }

    static cepValidator(control: FormControl) {

        const cep = control.value;
        if (cep && cep !== '') {
            const validacep = /^[0-9]{8}$/;
            return validacep.test(cep) ? null : { cepInvalido: true };
        }
        return null;
    }

    static ageValidator() {
        return (control: AbstractControl): Validators => {
            const birthDate = control.value;
            if(birthDate){
                const dateParts = birthDate.split("/");
                const dateObject = dateParts[1]+'/'+dateParts[0]+'/'+dateParts[2]; 
                if(dateObject !== undefined){
                    const age = moment().diff(dateObject, 'years');
                    const isLegal = (age >= 18);
                    return isLegal ? null : {menorDeIdade: true} 
                }
                return null;
            }
        };
    }

    static cnhValidation() {
        return (control: AbstractControl): Validators => {
            const cnhValidateDate = control.value;
            if (cnhValidateDate && cnhValidateDate !== '') {
                const dateParts = cnhValidateDate.split("/");
                const dateObject = dateParts[1]+'/'+dateParts[0]+'/'+dateParts[2]; 
                if(dateObject !== undefined){
                    return moment(dateObject).isAfter() ? null : { cnhVencida: true }
                }
            }
            return null;
        };
    }

    static firstCnhValidation() {
        return (control: AbstractControl): Validators => {
            const firstCnhValidateDate = control.value;
            if (firstCnhValidateDate && firstCnhValidateDate !== '') {
                const dateParts = firstCnhValidateDate.split("/");
                const dateObject = dateParts[1]+'/'+dateParts[0]+'/'+dateParts[2]; 
                if(dateObject !== undefined){
                    return moment(dateObject).isBefore() ? null : { dataInvalida: true }
                }
            }
            return null;
        };
    }


    static samePassCheck() {
        return (control: AbstractControl): Validators => {
            const password = control.value;
            const confirmPassWord = control.value;

            if (password !== '' && confirmPassWord !== '') {
                return password == confirmPassWord ? null : { notSamePass: true }
            }
            return null;
        };
    }

    static checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        let pass = group.get('password').value;
        let confirmPass = group.get('confirmPassWord').value;

        return pass === confirmPass ? null : { notSame: true }     
    }

    static passwordMatchValidator(control: AbstractControl) {
        const password: string = control.get('password').value; // get password from our password form control
        const confirmPassword: string = control.get('confirmPassWord').value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
          // if they don't match, set an error in our confirmPassword form control
          control.get('confirmPassWord').setErrors({ NoPassswordMatch: true });
        }
      }

    static sameMailCheck() {
        return (control: AbstractControl): Validators => {
            const email = control.value.email;
            const confirmationEmail = control.value.confirmationEmail;

            if (email !== '' && confirmationEmail !== '') {
                return email == confirmationEmail ? null : { notSameMail: true }
            }
            return null;
        };
    }


    static equalsTo(otherField: string) {
        const validator = (formControl: FormControl) => {
            if (otherField == null) {
                throw new Error('É necessário informar um campo.');
            }

            if (!formControl.root || !(<FormGroup>formControl.root).controls) {
                return null;
            }

            const field = (<FormGroup>formControl.root).get(otherField);

            if (!field) {
                throw new Error('É necessário informar um campo válido.');
            }

            if (field.value !== formControl.value) {
                return { equalsTo: otherField };
            }

            return null;
        };
        return validator;
    }

    static isValidCpf() {
        return (control: AbstractControl): Validators => {
            const cpf = control.value;
            if (cpf) {
                let numbers, digits, sum, i, result, equalDigits;
                equalDigits = 1;
                if (cpf.length < 11) {
                    return null;
                }

                for (i = 0; i < cpf.length - 1; i++) {
                    if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                        equalDigits = 0;
                        break;
                    }
                }

                if (!equalDigits) {
                    numbers = cpf.substring(0, 9);
                    digits = cpf.substring(9);
                    sum = 0;
                    for (i = 10; i > 1; i--) {
                        sum += numbers.charAt(10 - i) * i;
                    }

                    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

                    if (result !== Number(digits.charAt(0))) {
                        return { cpfNotValid: true };
                    }
                    numbers = cpf.substring(0, 10);
                    sum = 0;

                    for (i = 11; i > 1; i--) {
                        sum += numbers.charAt(11 - i) * i;
                    }
                    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

                    if (result !== Number(digits.charAt(1))) {
                        return { cpfNotValid: true };
                    }
                    return null;
                } else {
                    return { cpfNotValid: true };
                }
            }
            return null;
        };
    }

    static isCheckboxChecked() {
        return (control: AbstractControl): Validators => {
            const checked = control.value;

            if (!checked)
                return { checkboxNotChecked: true };

            return null;
        }
    }

    static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
        const config = {
            'required': `${fieldName} é obrigatório.`,
            'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
            'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
            'cepInvalido': 'CEP inválido.',
            'emailInvalido': 'Email já cadastrado!',
            'equalsTo': 'Campos não são iguais',
            'pattern': 'Campo inválido'
        };

        return config[validatorName];
    }

    static dateValidator(format = "dd/MM/YYYY"): any {
        return (control: FormControl): { [key: string]: any } => {
            const val = moment(control.value, format, true);

            if (!val.isValid()) {
                return { invalidDate: true };
            }

            return null;
        };
    }
}