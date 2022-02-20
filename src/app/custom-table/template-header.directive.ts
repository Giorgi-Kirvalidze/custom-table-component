import { Directive, Input, TemplateRef } from "@angular/core";

@Directive({selector: '[template]'})

export class TemplateHeaderDirective {
    @Input('template') templateName!: string; 
    /* name of our template reference header and body */

    constructor(public readonly template: TemplateRef<any>){

    }
}