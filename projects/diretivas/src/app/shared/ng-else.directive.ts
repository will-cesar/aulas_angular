import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngElse]'
})
export class NgElseDirective {

  @Input() set ngElse(condition: boolean) {
    if (!condition) {
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
    else {
      this._viewContainerRef.clear();
    }
  }

  constructor(
    private _templateRef: TemplateRef<any>, // pega o conteúdo que há a diretiva no html
    private _viewContainerRef: ViewContainerRef // pega o elemento que há a diretiva no html
  ) { }

}
