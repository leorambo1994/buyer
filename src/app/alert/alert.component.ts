import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
//想要 <alert></alert> 生效并避免错误，一定要在 alert.component.ts 中引入 { NgModule, NO_ERRORS_SCHEMA } 
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';  

import { AlertService } from './alert.service';

@Component({
    selector: 'alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => { 
            this.message = message; 
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
} 

