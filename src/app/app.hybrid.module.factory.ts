import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ENV_PROVIDERS } from './environment';

export function HybridAppFactory(options) {
    @NgModule({
        bootstrap: options.bootstrapComponents,
        declarations: options.declarations,
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            ...options.imports
        ],
        providers: [
            ENV_PROVIDERS,
            ...options.providers
        ]
    })
    class AppModule {
      constructor(public appRef: ApplicationRef) {}
    };
    return AppModule;
};
