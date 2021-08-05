import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AlunosGuard implements CanActivateChild {

    constructor() {}

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean>|boolean {

        console.log('AlunosGuard');

        if (state.url.includes('editar')) {
            // alert('Usuário sem acesso')
            // return false;
        }

        return true;
    }
}