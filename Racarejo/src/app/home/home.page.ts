import { Component, OnInit } from '@angular/core';
import { Base64 } from '@ionic-native/base64/ngx';
import { VehiclePhotoService } from '../api/vehicle-photo.service';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { VehicleService } from '../api/vehicle.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loading: any;
  step: number = 1;
  mainMessage: string = "";
  vehicle: any = {};
  pictureStep: number = 0;

  stepIndicators = [
    {
      pictureStepMessages: "Envie foto diagonal da lateral esquerda frontal",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie foto diagonal da lateral direita frontal",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie foto diagonal da lateral esquerda traseira",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie foto diagonal da lateral direita traseira",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie foto do Capô aberto",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie foto do estepe",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie foto do velocímetro e indicador de combustível comprovando Km (ligar o motor)",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie fotos do banco do motorista",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie fotos do banco do passageiro",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie fotos do banco traseiro",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie fotos do forro de porta do veículo",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie fotos do forro de teto do veículo",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie foto do CRLV",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie foto da bateria",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie foto da chave",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie foto da chave reserva",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie foto do manual",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie fotos da carroceria e interno",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie foto do pneu frontal esquerdo",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie foto do pneu frontal direito",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie foto do pneu traseiro esquerdo",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie foto do pneu traseiro direito",
      minPhotoPerStep: 1,
      descriptionField: true
    },
    {
      pictureStepMessages: "Envie fotos de todas as avarias",
      minPhotoPerStep: 1,
      descriptionField: false
    },
  ]



  imagesToUpload: any[] = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  count = 0;

  pendingResult;

  imageToSet = {};

  private onPauseSubscription: Subscription;

  constructor(
    private base64: Base64, 
    private route: ActivatedRoute,
    private dataService: VehiclePhotoService,
    private vehicleService: VehicleService,
    private alertCtrl: AlertController,
    public platform: Platform,
    public loadingController: LoadingController
  ) {
    this.onPauseSubscription = platform.pause.subscribe(() => {
      // do something meaningful when the app is put in the background
      this.saveScreenState();
    })
    let oldState = JSON.parse(localStorage.getItem("homeOnPauseEvent"));
    if (oldState) {
      this.restoreOldState(oldState);
    }
  }

  ngOnDestroy() {
    // always unsubscribe your subscriptions to prevent leaks
    this.onPauseSubscription.unsubscribe();
  }

  ngOnInit() {
    this.setMainMessageAccordingStep();
  }

  formFinished(result) {
    this.vehicle = result;
    this.step = 2;
    this.setMainMessageAccordingStep();
  }

  pictureStepHandler() {
    this.pictureStep++;
    if (this.pictureStep == 14 && !this.vehicle.hasKey) {
      this.pictureStep++;
    }
    if (this.pictureStep == 15 && !this.vehicle.hasBackupKey) {
      this.pictureStep++;
    }
    if (this.pictureStep == 16 && !this.vehicle.hasHandbook) {
      this.pictureStep++;
    }
    if (this.pictureStep == 17 && !this.vehicle.isComercial) {
      this.pictureStep++;
    }
    if (this.pictureStep == 22 && !this.vehicle.malfunctions) {
      this.pictureStep++;
    }
    if (this.pictureStep > 22) {
      return true;
    }
    return false;
  }

  pictureStepBackHandler() {
    this.pictureStep--;
    if (this.pictureStep == 22 && !this.vehicle.malfunctions) {
      this.pictureStep--;
    }
    if (this.pictureStep == 17 && !this.vehicle.isComercial) {
      this.pictureStep--;
    }
    if (this.pictureStep == 16 && !this.vehicle.hasHandbook) {
      this.pictureStep--;
    }
    if (this.pictureStep == 15 && !this.vehicle.hasBackupKey) {
      this.pictureStep--;
    }
    if (this.pictureStep == 14 && !this.vehicle.hasKey) {
      this.pictureStep--;
    }
  }

  setMainMessageAccordingStep() {
    if (this.step == 1) {
      this.mainMessage = "Preencha o formulário";
    }
    if (this.step == 2) {
      this.mainMessage = this.stepIndicators[this.pictureStep]["pictureStepMessages"];
    }
    if (this.step == 3) {
      this.mainMessage = "Confira as fotos";
    }
  }

  uploadFinished(result) {
    this.imagesToUpload[this.pictureStep] = result;
    if (this.pictureStepHandler()) {
      this.step = 3;
    }
    this.setMainMessageAccordingStep();
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

  async photoCheckedout(result) {
    let count = 0;
    await this.presentLoading();
    result.forEach(async element => {

      let aux = element.images.split("/")
      let imageName = aux[aux.length - 1];
      aux.splice(aux.length - 1, 1);
      let path = aux.join('/') + "/";
      let imagePath = await this.createBase64(element['images']);

      let data = {
        "idVehicle": this.vehicle.idVehicle,
        "description": element['description'],
        "kindOfPhoto": element['kindOfPhoto'],
        "type": imageName.split('.')[1],
        "imageData": imagePath["value"]
      };
      debugger
      this.dataService.post(data).subscribe(
        response => this.successSubmit(result, response),
        error => this.defaultError(error)
      );;
    });
  }

  successSubmit(result, response) {
    this.count++;
    if (this.count == result.length) {
      this.vehicleService.finishForm(this.vehicle.idVehicle).subscribe(
        response => {
          this.dismissLoading();
          this.resetPage();
        },
        error => {
          this.dismissLoading();
          this.defaultError(error)
        }
      );;
    }
  }

  async resetPage() {
    const alert = await this.alertCtrl.create({
      header: "Upload finalizado",
      message: "Todos os envios foram concluídos",
      buttons: [{
        text: 'Ok',
        handler: (blah) => {
          localStorage.setItem("vehicle", null);
          this.step = 1;
          this.pictureStep = 0;
          this.vehicle = {};
          this.imagesToUpload = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
          this.count = 0
          this.setMainMessageAccordingStep();
        }
      }]
    });
    await alert.present();
  }

  createBase64(pathForImage) {
    return new Promise((resolve, reject) => {
      this.base64.encodeFile(pathForImage).then((base64File: string) => {
        let aux = base64File.split(',')[1]
        return resolve({ "value": aux })
      })
    })
  }

  saveScreenState() {
    this.imagesToUpload.forEach(element => {
      element["sanitized"] = ''
    });
    let state = {
      loading: this.loading,
      step: this.step,
      mainMessage: this.mainMessage,
      vehicle: this.vehicle,
      pictureStep: this.pictureStep,
      imagesToUpload: this.imagesToUpload,
      count: this.count
    }
    localStorage.setItem("homeOnPauseEvent", JSON.stringify(state));
  }

  restoreOldState(state) {
    this.loading = state["loading"];
    this.step = state["step"];
    this.mainMessage = state["mainMessage"];
    this.vehicle = state["vehicle"];
    this.pictureStep = state["pictureStep"];
    this.imagesToUpload = state["imagesToUpload"];
    this.count = state["count"];
    localStorage.removeItem("homeOnPauseEvent");
    this.route.queryParams.subscribe((params) => {
      if (params["imagePath"]) {
        console.log(params["imagePath"])
        this.pendingResult = params["imagePath"];
      }
    })
  }

  back(step, pictureStep) {
    if (step == 2) {
      if (pictureStep > 0) {
        this.pictureStepBackHandler();
      } else {
        this.step = 1;
      }
    }
    if (step == 3) {
      this.step = 2;
      this.pictureStepBackHandler();
    }
    this.setMainMessageAccordingStep();
  }

  getDescripitionField() {
    return this.stepIndicators[this.pictureStep]['descriptionField']
  }

  getImagesToSet(){
    return this.imagesToUpload[this.pictureStep];
  }
}
