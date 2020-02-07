import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from './components/shared/shared.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private dataService: SharedService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        let collaborator = JSON.parse(localStorage.getItem('loggedColaborador'));
        var queryParam = route.queryParams;
        var urlToRedirect = "";
        if (queryParam) {
            const userId = queryParam['userId'];
            const token = queryParam['token'];
            const idLeadUserSimulation = queryParam['idLeadUserSimulation'];
            const confirmationToken = queryParam['confirmationToken'];

            if (userId && token)
                urlToRedirect = "?token=" + token + "&userId=" + userId;
            if (idLeadUserSimulation) {
                urlToRedirect = urlToRedirect + "&idLeadUserSimulation=" + idLeadUserSimulation;
            }

            if (confirmationToken) {
                urlToRedirect = urlToRedirect + "&confirmationToken=" + confirmationToken;
            }

        }
        if (collaborator) {
            this.dataService.postCollaborator(collaborator).subscribe(result => this.responseLoginCollaborator(result, collaborator, urlToRedirect), error => this.defaultError(error));
            return true;
        }


        this.router.navigateByUrl('/colaboradores' + urlToRedirect);
        return false;
    }

    responseLoginCollaborator(response, collaborator, urlToRedirect) {

        if (!response.authenticated) {

            this.router.navigateByUrl('/colaboradores' + urlToRedirect);
            localStorage.removeItem('loggedColaborador');
        }
        localStorage.setItem('loggedColaborador', JSON.stringify(collaborator));
    }

    defaultError(error) {
        localStorage.removeItem('loggedColaborador');
    }
}