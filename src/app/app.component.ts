import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { FileUpload } from "primeng/fileupload";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ConfirmationService,MessageService]
})
export class AppComponent implements OnInit {
    submitted: boolean;
    fileNewName: string;

    translations: Array<{label:string; items: Array<{key: string; value: string; changed: boolean}>}>;
    selectedTranslation: string
    selectedGroup: string;
    selectedKey: string;

    showExportDialog: boolean;

    private setting = {
        element: {
            dynamicDownload: null as HTMLElement
        }
    }

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) {
    }

    ngOnInit() {
        //this.primengConfig.ripple = true;
        this.fileNewName = '';
        this.submitted = false;
        this.showExportDialog = false;
        this.translations = [];
        try {
            const translation = JSON.parse(localStorage.getItem("translation"));
            if (translation) {
                this.translations = translation;
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    myUploader($event: any, fileUpload: FileUpload) {
        if ($event.files.length === 0) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No file selected' });
        }
        const file = $event.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            this.submitted = true;
            this.translations = this.contentToTranslations(reader.result.toString());
            this.messageService.add({ severity: 'info', summary: 'File Loaded', detail: '' });
            localStorage.removeItem("translation");
            fileUpload.clear();
        };
    }

    onChange($event: { value: {key: string; value: string; changed: boolean} }) {
        this.selectedKey = $event.value.key;
        this.selectedGroup = this.translations.find(t => t.items.find(i => i.key === this.selectedKey)).label;
        this.selectedTranslation = $event.value.value;
        localStorage.setItem("translation", JSON.stringify(this.translations));
    }

    contentToTranslations(content: string): Array<{label:string; items: Array<{key: string; value: string; changed: boolean}>}> {
        const translations: Array<{label:string; items: Array<{key: string; value: string; changed: boolean}>}> = [];
        const lines = content.split('\n');
        let currentGroup = '';
        let currentGroupItems = [];
        for (const line of lines) {
            if( line.trim() === '' ) {
                continue;
            }
            if (line.startsWith('#')) {
                if (currentGroup !== '') {
                    translations.push({label: currentGroup, items: currentGroupItems});
                }
                currentGroup = line.substring(1, line.length - 1).trim();
                currentGroupItems = [];
            }
            else {
                const key = line.substring(0, line.indexOf('='));
                let value = line.substring(line.indexOf('=') + 1);
                value = value.replaceAll('\\n', '\n');
                if (value.endsWith('\n') || value.endsWith('\r')) {
                    value = value.substring(0, value.length - 1);
                }
                currentGroupItems.push({key: key, value: value, changed: false});
            }
        }
        return translations;
    }

    translationChange($event: any) {
        try {
            const translation = this.translations.find(t => t.label == this.selectedGroup).items.find(i => i.key === this.selectedKey);
            translation.value = $event.target.value;
            translation.changed = true;
        }
        catch (e) {
            console.log(e);
        }
    }

    export() {
        const content = this.translations.map(t => {
            return `\n# ${t.label}\n` + t.items.map(i => `${i.key}=${i.value.replaceAll('\n', '\\n')}`).join('\n');
        }).join('\n');
        this.dyanmicDownloadByHtmlTag({
            fileName: this.fileNewName,
            text: content
        });
        this.showExportDialog = false;
    }

    private dyanmicDownloadByHtmlTag(arg: {
        fileName: string,
        text: string
    }) {
        if (!this.setting.element.dynamicDownload) {
            this.setting.element.dynamicDownload = document.createElement('a');
        }
        const element = this.setting.element.dynamicDownload;
        const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
        element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
        element.setAttribute('download', arg.fileName);

        var event = new MouseEvent("click");
        element.dispatchEvent(event);
    }

    showDialog() {
        this.showExportDialog = true;
    }
}
