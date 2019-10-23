import { Directive, ElementRef, Renderer } from '@angular/core';
// ElementRef => Referencia do elemento. Utilizado como injeção de dependencia
// o grande problema do ElementRef são vulnerabilidades na aplicação devido o acesso diretamente ao elemento pelo DOM;
// por isso há como utilizar o Renderer também para a mesma função 

@Directive({
  selector: '[fundoAmarelo]'
})
export class FundoAmareloDirective {

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer  
  ) {
    // console.log(this._elementRef);  
    // this._elementRef.nativeElement.style.backgroundColor = 'yellow';
    this._renderer.setElementStyle(this._elementRef.nativeElement, 'background-color', 'yellow');
  }

}
