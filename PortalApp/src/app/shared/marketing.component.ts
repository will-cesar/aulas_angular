import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'app-marketing',
    templateUrl: './marketing.component.html',
})

export class MarketingComponent implements OnInit {

    constructor(private ngxService: NgxUiLoaderService) { }

    ngOnInit() {

    }
}