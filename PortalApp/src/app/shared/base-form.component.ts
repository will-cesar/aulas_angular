import { Component, OnInit } from "@angular/core";
import { FormGroup, FormArray } from "@angular/forms";

export abstract class BaseFormComponent implements OnInit {

  form: FormGroup;

  constructor() { };

  ngOnInit() {
  }

  abstract submit();

  onSubmit() {

    if (this.form.valid) {
      this.submit();
    }
    else {
      this.verifyFormValidations(this.form);
    }
  }

  verifyFormValidations(formGroup: FormGroup | FormArray) {

    Object.keys(formGroup.controls).forEach(field => {
      const controle = formGroup.get(field);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verifyFormValidations(controle);
      }
    });
  }

  reset() {
    this.form.reset();
  }

  verifyRequired(field: string) {
    return (this.form.get(field).hasError('required') &&
      (this.form.get(field).touched || this.form.get(field).dirty)
    );
  }

  applyCssError(field: string) {

    if (field == "passwordConfirmation") {
      let hasErrors = this.form.errors ? true : false;
      let hasDanger = hasErrors && this.form.errors.notSame ? true : false;

      return {
        'has-danger': hasDanger ? true : this.verifyInvalidAndTouched(field, null),
      }
    }
    else {
      return {
        'has-danger': this.verifyInvalidAndTouched(field, null),
      }
    }
  }

  verifyInvalidAndTouched(field, formParam?: string) {
    let formView: any = '';
    let currentForm = formParam || this.form;
    currentForm && !formParam || formParam == 'form' ? formView = 'form' : formView = formParam;
    let value = this[formView].get(field).value
    let trimmedValue = value ? isNaN(value) ? value.trim() : value : null

    if (value == "" || trimmedValue == "") {
      this[formView].get(field).setErrors({ 'empty': true })
    }

    return (
      !this[formView].get(field).valid &&
      (this[formView].get(field).touched || this[formView].get(field).dirty)
    );

  }


}
