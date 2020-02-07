import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassosAluguelComponent } from '../components/blocos/passosAluguel/passosAluguel.component';
import { DestaqueImagemComponent } from './blocos/destaqueImagem/destaqueImagem.component';
import { CarrosselPlanosComponent } from './blocos/carrosselPlanos/carrosselPlanos.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormularioComponent } from './blocos/formulario/formulario.component';
import { CarrosselVantagensComponent } from './blocos/carrosselVantagens/carrosselVantagens.component';
import { FAQDestaqueComponent } from './blocos/faqDestaque/faqDestaque.component';
import { DestaqueTextoImagemComponent } from './blocos/destaqueTextoImagem/destaqueTextoImagem.component';
import { FAQCompletoComponent } from './blocos/faqCompleto/faqCompleto.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { Routes, RouterModule, Router } from '@angular/router';
import { ListaVantagensComponent } from './blocos/listaVantagens/listaVantagens.component';
import { ComparativoComponent } from './blocos/comparativo/comparativo.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { FirstNamePipe } from '../pipes/firstNamePipe';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [CommonModule, SlickCarouselModule, ScrollToModule.forRoot(), RouterModule, HttpModule, HttpClientModule],
    declarations: [
        PassosAluguelComponent,
        DestaqueImagemComponent,
        CarrosselPlanosComponent,
        CarrosselVantagensComponent,
        FormularioComponent,
        FAQDestaqueComponent,
        FAQCompletoComponent,
        DestaqueTextoImagemComponent,
        ListaVantagensComponent,
        ComparativoComponent,
    ],
    exports: [
        PassosAluguelComponent,
        DestaqueImagemComponent,
        CarrosselPlanosComponent,
        CarrosselVantagensComponent,
        FormularioComponent,
        FAQDestaqueComponent,
        FAQCompletoComponent,
        DestaqueTextoImagemComponent,
        ListaVantagensComponent,
        ComparativoComponent,
    ],
    providers: []
})
export class ComponentsModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: ComponentsModule };
    }
}