import { Component, OnInit } from '@angular/core';
import { NavParams  } from '@ionic/angular';
import { NavController, ModalController } from '@ionic/angular';
import { ActionSheetController, ToastController, AlertController, Platform, LoadingController } from '@ionic/angular';

import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { DomSanitizer } from '@angular/platform-browser';

import { element } from 'protractor';
import { map } from 'rxjs/operators';
import { Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { Subscription } from 'rxjs'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Generated class for the PhotoDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

declare var cordova: any;
@Component({
  selector: 'photo-details',
  templateUrl: 'photo-details.html',
  styleUrls: ['photo-details.scss'],
})
export class PhotoDetailsComponent implements OnInit {
  public imageLists: any = [];
  public index :number;
  kindOfPhoto;
  
  constructor(public params: NavParams,
              private file: File,
              public camera: Camera, 
              private imagePicker: ImagePicker,
              private filePath: FilePath, 
              private sanitizer: DomSanitizer,
              public actionSheetCtrl: ActionSheetController,
              public toastCtrl: ToastController, 
              public platform: Platform,
              private alertCtrl: AlertController,
              public viewCtrl: ModalController) {
    
  }
  
  
  async ngOnInit(){
    let data = this.params.get('imgList');
    let imageListsAux = JSON.parse(JSON.stringify(data));
    let aux = await this.getSanitizedImage(imageListsAux.images)
    imageListsAux.sanitized = aux['sanitized'];

    this.kindOfPhoto = imageListsAux.kindOfPhoto;
    let imageAux = []
    imageListsAux.images.forEach((element, index) => {
      imageAux.push({
        "images": element,
        "description": imageListsAux.description[index],
        "kindOfPhoto": imageListsAux.kindOfPhoto,
        'sanitized': imageListsAux.sanitized[index],
        "folder": false
      })
    });

    this.imageLists = imageAux;
    
    this.index = this.params.get('index');
  }


  dismiss(action,imgs) {
    console.log(imgs);
    let imagePaths = [];
    let descriptions = [];
    if(imgs){
      imgs.forEach(element => {
        imagePaths.push(element.images)
        descriptions.push(element.description)
      });
    }

    let data = {
      "imageLists": {
        "images": imagePaths,
        "description": descriptions,
        "kindOfPhoto": this.kindOfPhoto,
        "folder": true
      },
      "action": action,
      "index": this.index 
    }
    this.viewCtrl.dismiss(data);
  }

  excluirItem(index) {
    if(this.imageLists.length>1){
      this.imageLists.splice(index, 1);
    }
    else{
      this.defaultError("Cada pasta deve conter pelo menos uma imagem!");
    }
  }
  
  takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
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
    }, (err) => {
      this.defaultError('Error while selecting image.');
    });
  }
 
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(async success => {
        let data = {
          "images": this.file.dataDirectory + newFileName,
          "description": "",
          "kindOfPhoto": this.kindOfPhoto,
          "folder": false
        };
        let aux = await this.getSanitizedImage(this.file.dataDirectory + newFileName);
        data["sanitized"] = aux["sanitized"] 
        this.imageLists.push(data);      
    }, error => {
      this.defaultError('Error while storing file.');
    });
  }

  createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }

  defaultError(error) {
    console.log(error)
    if(error["message"]){
      this.showAlert('Ops', error["message"], null);
    }else if (typeof(error) == "string"){
      this.showAlert('Ops', error, null);      
    }
    else{
      this.showAlert('Ops', "Erro ao enviar requisição, contate o suporte!", null);      
    }
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

  getSanitizedImage(data) {
    return new Promise((resolve, reject) => {
      if (typeof (data) == "string") {
        let aux = data.split("/")
        let imageName = aux[aux.length - 1];
        aux.splice(aux.length - 1, 1);
        let path = aux.join('/') + "/";
        this.file.readAsDataURL(path, imageName)
          .then((result) => {
            let sanitized = {value: this.sanitizer.bypassSecurityTrustUrl(result), origin: data};
            resolve({sanitized:sanitized});
          })
          .catch((err) => {
            reject(err);
            console.log("error: " + JSON.stringify(err));
          });
      } else {
        let response = [];
        data.forEach(element => {
          response.push("")
        });
        let count = 0;
        data.forEach(async (element,index) => {
          let aux = element.split("/")
          let imageName = aux[aux.length - 1];
          aux.splice(aux.length - 1, 1);
          let path = aux.join('/') + "/";
          let result = await this.file.readAsDataURL(path, imageName)
          let sanitized = {value: this.sanitizer.bypassSecurityTrustUrl(result), origin: element} ;
          response[index] = sanitized;
          count++;
          if (count == data.length) {
            resolve({sanitized:response});
          }
        });
      }
    })
  }
}

