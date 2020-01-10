import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AppService {
    static changeTextFooter: EventEmitter<any> = new EventEmitter<any>();
    static changeHeaderBackground: EventEmitter<any> = new EventEmitter<any>();
    static changeHeaderVisibility: EventEmitter<any> = new EventEmitter<any>();
    static changeFooterVisibility: EventEmitter<any> = new EventEmitter<any>();
    static changeLinkLoginVisibility: EventEmitter<any> = new EventEmitter<any>();
    static changeBreadCrumbVisibility: EventEmitter<any> = new EventEmitter<any>();
    static loadVehicleClass: EventEmitter<any> = new EventEmitter<any>();
    static updatePriceSession: EventEmitter<any> = new EventEmitter<any>();
    static checkBackNav: EventEmitter<any> = new EventEmitter<any>();
    static getUserInfos: EventEmitter<any> = new EventEmitter<any>();
    static changeLoggedNav: EventEmitter<any> = new EventEmitter<any>();
    static showLoginDiv: EventEmitter<any> = new EventEmitter<any>();
    static showNewPassDiv: EventEmitter<any> = new EventEmitter<any>();
    static showNewPassDivMobile: EventEmitter<any> = new EventEmitter<any>();

    loadVehicleClass(result: any) {
        AppService.loadVehicleClass.emit(result);
    }



}