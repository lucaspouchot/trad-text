import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from "primeng/toolbar";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from "primeng/toast";
import { FileUploadModule } from 'primeng/fileupload';
import { RippleModule } from "primeng/ripple";
import { ConfirmationService } from 'primeng/api';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ConfirmDialogModule,
        InputTextareaModule,
        ButtonModule,
        ToolbarModule,
        FileUploadModule,
        ToastModule,
        RippleModule,
    ],
    providers: [ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule { }
