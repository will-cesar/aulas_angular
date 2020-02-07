import { Component, OnInit, HostListener, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { AppService } from '../../app.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { VehicleClass, VehicleModel } from '../models/vehiclesClass.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SimulationService } from '../services/simulation.service';
import { SimulationSession } from '../models/simulationSession.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-escolhaCarro',
  templateUrl: './escolhaCarro.component.html',
  styleUrls: ['./escolhaCarro.component.scss'],
  providers: [SimulationService]
})
export class EscolhaCarroComponent implements OnInit {

  @ViewChild("slickModalCores", { static: false }) slickModal: SlickCarouselComponent;
  @ViewChild("slickModal", { static: false }) slickModalCars: SlickCarouselComponent;


  @ViewChild('firstColor', { static: false }) firstColor: ElementRef;

  vehicleClassList$: VehicleClass[] = [];
  vehicleModelsList$: VehicleModel[] = [];
  featuredVehicleModelsList$: VehicleModel[] = [];
  selectedClass$: VehicleModel = null;

  closeResult: string;
  innerWidth: number;
  selectedColorId: number;
  mediaRepository: any = environment.mediasUrl;
  filtroAberto: boolean = false;
  listaItensSerieAberto: boolean = false;
  fundoModalAberto: boolean = false;
  categoriaSelecionada: boolean = false;
  modeloFiltro: any;
  textoFiltro: string = "Filtre por modelo +";
  currentFilter: string = "";
  session: SimulationSession;
  modelColorPhoto: string;
  showCaroussel: boolean = true;

  constructor(
    private simulationService: SimulationService,
    private modalService: NgbModal,
    private renderer: Renderer2
  ) { }


  slideConfigPlanos = {
    "centerMode": false,
    "centerPadding": '0px',
    "slidesToShow": 4,
    "infinite": false,
    "arrows": true,
    "dots": true,
    "responsive": [
      {
        "breakpoint": 769,
        "settings": {
          "centerMode": false,
          "slidesToShow": 1.2,
          "slidesToScroll": 1,
          "infinite": false,
          "arrows": false
        }
      }
    ]
  };

  slideConfigCores = {
    "centerMode": false,
    "centerPadding": '0px',
    "slidesToShow": 3,
    "infinite": false,
    "arrows": true,
    "dots": true,
    "responsive": [
      {
        "breakpoint": 769,
        "settings": {
          "centerMode": false,
          "slidesToShow": 3.2,
          "slidesToScroll": 1.2,
          "infinite": false,
          "arrows": false
        }
      }
    ]
  };

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.session = this.simulationService.getSimulationSession();

    if (this.session) {
      this.session.actualStep = 1;
      this.simulationService.postSimulationSessionObj(this.session);
    }
    if (this.innerWidth < 768) {
      this.showCaroussel = false;
      AppService.changeFooterVisibility.emit(false)
    }
    this.getVehicleClassList();
    AppService.loadVehicleClass.subscribe(result => {
      if (result) {
        this.getVehicleClassList();
      }
    });
    this.modelColorPhoto = '';
    console.log(this.slickModal)
    console.log(this.slickModalCars)

  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 767) {
      AppService.changeFooterVisibility.emit(true)
    }
    else {
      AppService.changeFooterVisibility.emit(false)
    }
  }

  toggleCarousel() {
    this.showCaroussel = !this.showCaroussel;
  }

  toggleFiltro() {
    this.filtroAberto = !this.filtroAberto;
    this.textoFiltro = this.filtroAberto ? 'Filtre por modelo -' : 'Filtre por modelo +';
    this.fundoModalAberto = !this.fundoModalAberto;
    this.modeloFiltro = null;
    this.currentFilter = '';
    (this.filtroAberto && this.innerWidth <= 767) ? this.renderer.addClass(document.body, 'modal-open') : this.renderer.removeClass(document.body, 'modal-open');
  }

  toggleSerialItensList() {
    this.listaItensSerieAberto = !this.listaItensSerieAberto;
    this.fundoModalAberto = !this.fundoModalAberto;
    (this.listaItensSerieAberto && this.innerWidth <= 767) ? this.renderer.addClass(document.body, 'modal-open') : this.renderer.removeClass(document.body, 'modal-open');
  }

  toggleFundo() {
    this.fundoModalAberto = !this.fundoModalAberto;
    this.filtroAberto = false;
    this.listaItensSerieAberto = false;
    this.renderer.removeClass(document.body, 'modal-open')
  }


  filtrarModelo(evt: any, model: any, brand: any) {
    this.modeloFiltro = null;
    if (this.slickModalCars !== undefined) {
      this.slickModalCars.unslick();
    }
    if (this.slickModal !== undefined) {
      this.slickModal.unslick();
    }
    Array.from(document.querySelectorAll('.' + evt.currentTarget.classList[0] + '')).forEach(element => {
      element.classList.remove('active')
    });
    evt.currentTarget.classList.add("active");
    
    this.modeloFiltro = model;
    this.currentFilter = '' + brand + ' ' + model + ''
    this.filtroAberto = this.innerWidth < 768 ? !this.filtroAberto : this.filtroAberto;
    if (this.fundoModalAberto && this.innerWidth < 768) {
      this.toggleFundo();
    }
    setTimeout(() => this.slickModalCars.initSlick(), 0);
    // setTimeout(() => this.slickModal.initSlick(), 0);
  }

  selecionarPlano(evt: any, model: any) {
    this.selectedClass$ = null;
    this.categoriaSelecionada = false;
    if (this.slickModal !== undefined) {
      this.slickModal.unslick();
    }
    // else{
    //   setTimeout(() => this.slickModal.initSlick(), 0);
    // }
    //setTimeout(() => this.slickModal.initSlick(), 0);
    // if (this.slickModal == undefined) {
    //   this.slickModal.initSlick();
    // }
    // Array.from(document.querySelectorAll('.slide-content')).forEach(element => {
    //   element.classList.remove('active')
    // });
    // evt.currentTarget.parentElement.parentElement.classList.add('active')
    
    this.selectedClass$ = model;
    this.categoriaSelecionada = true;

    //this.selectedColorId = model.vehicleColors[0].cmsId;
    this.modelColorPhoto = model.vehicleColors[0].featuredPhoto;

    if (this.session) {
      this.session.selectedClass = model;
      this.simulationService.postSimulationSessionObj(this.session);
    }
    else {
      this.session = {
        actualStep: 1,
        selectedClass: model,
        kmLimit: environment.kmLimitMin,
        dealdlineTime: environment.timemin,
        colorType: model.vehicleColors[0].colorType,
        selectedColor: model.vehicleColors[0],
        dealershipId: null,
        dealserhip: null,
        region: null
      }

      this.selectedColorId = model.vehicleColors[0].cmsId;

      this.simulationService.postSimulationSessionObj(this.session);
    }
  }


  getVehicleClassList() {
    this.simulationService.getVehicleClassList().subscribe(result => this.successGetVehicleClass(result), error => this.defaultError(error));
  }

  successGetVehicleClass(result) {
    this.vehicleClassList$ = result;
    var annataIdSession = sessionStorage.getItem('annataId');
    result.forEach(item => {
      item.vehicleModels.forEach(item => {

        if (annataIdSession) {
          if (item.modelId == annataIdSession) {
            this.selectedClass$ = item;
            this.modelColorPhoto = item.vehicleColors[0].featuredPhoto;
            this.selectedColorId = item.vehicleColors[0].cmsId;
          }
        }

        this.vehicleModelsList$.push(item);
        if (item.featuredCarousel) {
          this.featuredVehicleModelsList$.push(item);
        }

      });
    });

    sessionStorage.removeItem('annataId');

    // var session = this.simulationService.getSimulationSession();

    // if (session) {
    //   this.selectedClass$ = session.selectedClass;
    //   this.modelColorPhoto = session.selectedClass.featuredPhoto;
    // }



  }

  defaultError(response) {
    var errorMessage = 'Houve um erro com a operação. Favor entrar em contato com o Suporte';

    if (response.error) {
      if (response.error.errors) {
        errorMessage = '';
        response.error.errors.forEach(element => {
          errorMessage += '<br />' + element.value;
        });
      }
    }
    Swal.fire({
      title: 'Erro ao carregar veículos',
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

  selectColor(color: any, event: any) {
    event.preventDefault();
    var session = this.simulationService.getSimulationSession();

    if (session) {
      session.colorType = color.colorType;
      session.selectedColor = color;

      if (!session.dealdlineTime)
        session.dealdlineTime = environment.timemin;

      if (!session.kmLimit)
        session.kmLimit = environment.kmLimitMin;
    }
    else {
      session = {
        actualStep: 1,
        dealdlineTime: environment.timemin,
        kmLimit: environment.kmLimitMin,
        selectedClass: this.selectedClass$,
        colorType: color.colorType,
        selectedColor: color
      }
    }

    this.modelColorPhoto = color.featuredPhoto;

    this.simulationService.postSimulationSessionObj(session);

    this.selectedColorId = color.cmsId;

    // Array.from(document.querySelectorAll('.thumb-cor')).forEach(element => {
    //   element.classList.remove('selected-color')
    // });
    // event.currentTarget.classList.add('selected-color');
  }


}