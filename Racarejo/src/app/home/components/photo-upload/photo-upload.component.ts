import { element } from 'protractor';
import { map } from 'rxjs/operators';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ToastController, AlertController, LoadingController, ActionSheetController, Platform, ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { DomSanitizer } from '@angular/platform-browser'
import { PhotoDetailsComponent } from '../photo-details/photo-details';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['photo-upload.scss'],
})

export class PhotoUploadComponent implements OnInit {

  @Input() kindOfPhoto: number;
  @Input() hideSelect: boolean;
  @Input() hideDescription: boolean;
  @Input() minPhotoUpload: number;
  @Input() pendingResult;

  @Input() imagesToSet;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  loading: any;
  lastImage: Array<object> = [];

  public imageLists: any[] = []
  public index: number;

  private onPauseSubscription: Subscription;
  private onResumeSubscription: Subscription;



  constructor(
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
    private imagePicker: ImagePicker,
    private file: File,
    public camera: Camera,
    private sanitizer: DomSanitizer,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    private filePath: FilePath,
    public platform: Platform,
  ) {

    // this.onPauseSubscription = platform.pause.subscribe(() => {
    //   // do something meaningful when the app is put in the background
    //   this.saveScreenState();
    // });
    let oldState = JSON.parse(localStorage.getItem("photoUploadOnPauseEvent"));
    if (oldState) {
      this.restoreOldState(oldState);
    }
  }

  ngOnDestroy() {
    // always unsubscribe your subscriptions to prevent leaks
    //this.onPauseSubscription.unsubscribe();
    //this.onResumeSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pendingResult) {
      if (changes.pendingResult.currentValue) {
        this.successGetPicture(changes.pendingResult.currentValue, this.camera.PictureSourceType.CAMERA)
      }
    }
    if (changes.imagesToSet) {
      if (changes.imagesToSet.currentValue) {
        this.imageLists = [];
        if (changes.imagesToSet.currentValue.images && changes.imagesToSet.currentValue.images.length > 0) {
          this.presentLoading();
          changes.imagesToSet.currentValue.images.forEach(async (element, index) => {
            let data = await this.getSanitizedImage({
              "images": element,
              "description": changes.imagesToSet.currentValue.description[index],
              "kindOfPhoto": changes.imagesToSet.currentValue.kindOfPhoto,
              "folder": false
            })
            this.imageLists.push(data);
            if (index == (changes.imagesToSet.currentValue.images.length - 1)) {
              this.dismissLoading();
            }
          });
        }
      }
    }
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

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return this.file.dataDirectory + img;
    }
  }


  excluirItem(index) {
    this.imageLists.splice(index, 1);
  }

  loadMultipleImageFromGallery() {

    this.imagePicker.hasReadPermission()
      .then(res => {
        if (res) {
          this.openGallery();
        } else {
          this.imagePicker.requestReadPermission()
            .then(res => {
              if (res === 'ok') {
                this.openGallery();
              }
            })
        }
      })
      .catch(error => console.log(error));
  }

  openGallery() {
    let options = {
      maximumImagesCount: 15,
      correctOrientation: true,
      quality: 100,
      allowEdit: true,
      outputType: 0,
    }
    this.imagePicker.getPictures(options)
      .then(async file => {
        console.log("teste");
        let images = []
        for (let index = 0; index < file.length; index++) {
          images.push({
            "images": file[index],
            "description": "",
            "kindOfPhoto": this.kindOfPhoto,
            "folder": false
          });
        }

        images.forEach(async element => {
          let data = await this.getSanitizedImage(element)
          this.imageLists.push(data);
        });

      });
  }

  public async presentActionSheet() {

    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecione a origem da imagem',
      buttons: [
        {
          text: 'Carregar da Biblioteca',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Tirar Foto',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancelar'
        }
      ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    if (this.platform.is('android')) {
      this.saveScreenState();
    }

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => this.successGetPicture(imagePath, sourceType),
      (err) => {
        this.defaultError('Error while selecting image.');
      });
  }

  successGetPicture(imagePath, sourceType) {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(async success => {

      let data = await this.getSanitizedImage({
        "images": this.file.dataDirectory + newFileName,
        "description": "",
        "kindOfPhoto": this.kindOfPhoto,
        "folder": false
      })

      this.imageLists.push(data);
    }, error => {
      this.defaultError('Error while storing file.');
    });
  }

  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  public imageName(img) {
    if (img === null) {
      return '';
    } else {
      let aux = img.split("/");
      return aux[aux.length - 1];
    }
  }

  getSanitizedImage(data) {
    return new Promise((resolve, reject) => {
      if (typeof (data.images) == "string") {
        let aux = data.images.split("/")
        let imageName = aux[aux.length - 1];
        aux.splice(aux.length - 1, 1);
        let path = aux.join('/') + "/";
        this.file.readAsDataURL(path, imageName)
          .then((result) => {
            let sanitized = this.sanitizer.bypassSecurityTrustUrl(result);
            data["sanitized"] = sanitized;
            resolve(data);
          })
          .catch((err) => {
            reject(err);
            console.log("error: " + JSON.stringify(err));
          });
      } else {
        data["sanitized"] = [];
        let count = 0;
        data.images.forEach(async element => {
          let aux = element.split("/")
          let imageName = aux[aux.length - 1];
          aux.splice(aux.length - 1, 1);
          let path = aux.join('/') + "/";
          let result = await this.file.readAsDataURL(path, imageName)
          let sanitized = this.sanitizer.bypassSecurityTrustUrl(result);
          data["sanitized"].push(sanitized);
          count++;
          if (count == data.images.length) {
            resolve(data);
          }
        });

      }
    })
  }


  async presentDetailsModal(imgList) {
    let profileModal = await this.modalCtrl.create({ component: PhotoDetailsComponent, componentProps: { imgList: imgList, index: this.imageLists.indexOf(imgList) } });
    await profileModal.present();
    const { data } = await profileModal.onWillDismiss();
    console.log(data.action)
    console.log("imaflist", JSON.stringify(this.imageLists));
    if (data.action == 'salvar') {
      data.imageLists = await this.getSanitizedImage(data.imageLists);
      console.log("data", JSON.stringify(data.imageLists));
      this.imageLists[data.index] = data.imageLists;
    }
    console.log("imaflist", JSON.stringify(this.imageLists));
  }

  finishUploadStep() {
    let result = {
      "images": [],
      "description": [],
      "kindOfPhoto": this.kindOfPhoto,
      "folder": true
    }
    this.imageLists.forEach(element => {
      result.images.push(element.images)
      result.description.push(element.description)
    });
    if (result.images.length >= this.minPhotoUpload) {
      this.onSubmit.emit(result);
      this.imageLists = [];
    } else {
      this.defaultError(`A quantidade minima de fotos a serem enviadas nesse passo é de ${this.minPhotoUpload}`)
    }
  }

  saveScreenState() {
    let images = [];
    this.imageLists.forEach(element => {
      images.push({
        "images": element.images,
        "description": element.description,
        "kindOfPhoto": element.kindOfPhoto,
        "folder": false
      })
    });
    let state = {
      lastImage: this.lastImage,
      imageLists: images,
      index: this.index,
    }
    localStorage.setItem("photoUploadOnPauseEvent", JSON.stringify(state));
  }

  restoreOldState(state) {
    this.lastImage = this.lastImage.concat(state.lastImage);
    this.imageLists = this.imageLists.concat(state.imageLists);
    console.log(this.imageLists);
    this.index = state.index;
    this.imageLists.forEach(async element => {
      element = await this.getSanitizedImage(element);
    });
    localStorage.removeItem("photoUploadOnPauseEvent");
  }
}
