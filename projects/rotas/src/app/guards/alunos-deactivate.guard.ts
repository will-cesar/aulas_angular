import { Injectable } from '@angular/core';
import { AlunoFormComponent } from '../alunos/aluno-form/aluno-form.component';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { IFormCanDeactivate } from './iform-candeactivate';

@Injectable()
// export class AlunosDeactivateGuard implements CanDeactivate<AlunoFormComponent> {
export class AlunosDeactivateGuard implements CanDeactivate<IFormCanDeactivate> {
  
  canDeactivate(
    // component: AlunoFormComponent,
    component: IFormCanDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    console.log('Guarda de desativação');

    // return component.podeMudarRota();
    return component.podeDesativar();
  }
}