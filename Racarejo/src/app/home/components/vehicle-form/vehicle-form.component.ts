import { map } from 'rxjs/operators';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { VehicleService } from "../../../api/vehicle.service";
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['vehicle-form.scss']
})

export class VehicleFormComponent implements OnInit {
  form: FormGroup;
  loading: any;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  private onPauseSubscription: Subscription;

  constructor(
    private vehicleService: VehicleService,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
    public platform: Platform,
  ) {
    debugger
    this.onPauseSubscription = platform.pause.subscribe(() => {
      // do something meaningful when the app is put in the background
      this.saveScreenState();
    });
    let user = JSON.parse(localStorage.getItem(environment.user));
    this.form = this.fb.group({
      plate: ['', [Validators.required]],
      km: ['', [Validators.required]],
      aboveTwi: [false, [Validators.required]],
      malfunctions: [false, [Validators.required]],
      hasKey: [false, [Validators.required]],
      hasBackupKey: [false, [Validators.required]],
      hasHandbook: [false, [Validators.required]],
      isComercial: [false, [Validators.required]],
      idUser: [user.idUser, [Validators.required]]
    });
    let vehicle = JSON.parse(localStorage.getItem("vehicle"))
    
    if(vehicle){
      this.vehicleService.getById(vehicle["idVehicle"]).subscribe(
        response => {
          if(!response['formFinished']){
            this.restoreOldState(vehicle);
          }
        },
        error => {
          this.dismissLoading();          
          this.defaultError(error)
        }
      );;
    }

    // let oldState = JSON.parse(localStorage.getItem("vehicleFormOnPauseEvent"));
    // if (oldState) {
    //   this.restoreOldState(oldState);
    // }
  }

  ngOnInit() {

  }

  defaultError(error) {
    console.log(error)
    if (error["message"]) {
      this.showAlert('Ops', error["message"], null);
    } else if (typeof (error) == "string") {
      this.showAlert('Ops', error, null);
    }
    else {
      this.showAlert('Ops', "Erro ao enviar requisição, contate o suporte!", null);
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Aguarde'
    });
    this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss();
  }

  async showAlert(title, message, func) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: [{
        text: 'Ok',
        handler: (blah) => func
      }]
    });

    await alert.present();
  }

  async submit() {
    if (this.form.valid) {
      await this.presentLoading();
      this.vehicleService.post(this.form.value).pipe(finalize(() => this.dismissLoading())).subscribe(
        result => this.successSubmit(result),
        error => this.defaultError(error)
      );
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

  successSubmit(result) {
    let data = {
      idVehicle: result.idVehicle,
      plate: result.plate,
      km: result.km,
      aboveTwi: result.aboveTwi,
      malfunctions: result.malfunctions,
      hasKey: this.form.value.hasKey,
      hasBackupKey: this.form.value.hasBackupKey,
      hasHandbook: this.form.value.hasHandbook,
      isComercial: this.form.value.isComercial
    }
    localStorage.setItem("vehicle", JSON.stringify(data));

    localStorage.setItem("vehicleFormOnPauseEvent", null);

    this.form.value.plate = "";
    this.form.value.km = "";
    this.form.value.aboveTwi = false;
    this.form.value.malfunctions = false;
    this.form.value.hasKey = false;
    this.form.value.hasBackupKey = false;
    this.form.value.hasHandbook = false;
    this.form.value.isComercial = false;
      
    this.onSubmit.emit(data);
  }

  saveScreenState() {
    let state = {
      plate: this.form.value.plate,
      km: this.form.value.km,
      aboveTwi: this.form.value.aboveTwi,
      malfunctions: this.form.value.malfunctions,
      hasKey: this.form.value.hasKey,
      hasBackupKey: this.form.value.hasBackupKey,
      hasHandbook: this.form.value.hasHandbook,
      isComercial: this.form.value.isComercial
    }
    localStorage.setItem("vehicleFormOnPauseEvent", JSON.stringify(state));
  }

  restoreOldState(state) {
    this.form.get('plate').setValue(state['plate']);
    this.form.get('km').setValue(state['km']);
    this.form.get('aboveTwi').setValue(state['aboveTwi']);
    this.form.get('malfunctions').setValue(state['malfunctions']);
    this.form.get('hasKey').setValue(state['hasKey']);
    this.form.get('hasBackupKey').setValue(state['hasBackupKey']);
    this.form.get('hasHandbook').setValue(state['hasHandbook']);
    this.form.get('isComercial').setValue(state['isComercial']);
    localStorage.removeItem("vehicleFormOnPauseEvent");
  }
}
