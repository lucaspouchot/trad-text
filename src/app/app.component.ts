import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ConfirmationService,MessageService]
})
export class AppComponent implements OnInit {
    submitted: boolean;

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {

    }

    openNew() {
        this.submitted = false;
    }

    onUpload($event: any) {
        
    }
}
