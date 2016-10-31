import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from "./shared/shared.module";

export function HybridAppFactory(options) {
    @NgModule({
        bootstrap: options.bootstrapComponents,
        declarations: options.declarations,
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            SharedModule
        ],
        providers: [
            options.providers
        ]
    })
    class AppModule {
      constructor(public appRef: ApplicationRef) {}
    };
    return AppModule
};
