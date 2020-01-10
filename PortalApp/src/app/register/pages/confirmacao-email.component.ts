import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/login/services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { GenerateContract } from 'src/app/checkout/models/generateContract.model';
import { ContractService } from 'src/app/checkout/services/contract.service';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmacao-email',
  templateUrl: './confirmacao-email.component.html',
  styleUrls: ['./confirmacao-email.component.scss', '../../checkout/pages/status.component.scss']
})
export class ConfirmacaoEmailComponent implements OnInit {
  userId: string;
  token: string;
  response: any;

  constructor(private route: ActivatedRoute, private userService: UserService, private ngxService: NgxUiLoaderService, private contractService: ContractService,
    private router: Router) { }

  ngOnInit() {

    var queryParam = this.route.snapshot.queryParams;
    var urlToRedirect = "";

    if (queryParam) {

      this.ngxService.start();

      const userId = queryParam['userId'];
      const token = queryParam['token'];
      const idLeadUserSimulation = queryParam['idLeadUserSimulation'];

      if (userId) {

        var obj = {
          userId: parseInt(userId),
          token: token,
          idLeadUserSimulation: null
        }

        if (idLeadUserSimulation) {
          obj.idLeadUserSimulation = idLeadUserSimulation
        }

        this.userService.confirmEmail(obj).subscribe(result => this.successResponse(result), error => this.defaultError(error)).add(() => this.ngxService.stop());
      }

    }
  }

  successResponse(result) {
    this.response = result;
    localStorage.setItem(environment.token, this.response.userToken.token);
    localStorage.setItem(environment.tokenExpires, this.response.userToken.expiration);

    localStorage.setItem(environment.loggedUserSession, JSON.stringify(this.response));

    AppService.changeLoggedNav.emit(true);
    AppService.getUserInfos.emit(result);
  }

  contract() {
    var collaborator = JSON.parse(localStorage.getItem('loggedColaborador'));
    var collaboratorDocument = "";

    if (collaborator) {
      collaboratorDocument = collaborator.document;
    }

    localStorage.setItem(environment.token, this.response.userToken.token);
    localStorage.setItem(environment.tokenExpires, this.response.userToken.expiration);

    localStorage.setItem(environment.loggedUserSession, JSON.stringify(this.response));

    var data: GenerateContract = {
      dealership: this.response.leadUserSimulation.dealership,
      dealershipId: this.response.leadUserSimulation.dealershipId,
      kmLimit: this.response.leadUserSimulation.kmLimit,
      timeDeadline: this.response.leadUserSimulation.timeDeadline,
      modelId: this.response.leadUserSimulation.modelId,
      selectedModel: this.response.leadUserSimulation.selectedClass,
      typeOfColor: this.response.leadUserSimulation.colorType,
      selectedColor: this.response.leadUserSimulation.selectedColor,
      collaboratorDocument: collaboratorDocument
    };
    this.ngxService.start();
    this.contractService.generate(data).subscribe(contractResult => this.successContract(contractResult), error => this.defaultError(error)).add(() => this.ngxService.stop())
  }

  successContract(result) {


    this.router.navigate(['/checkout/status', result.idContract]);
  }

  defaultError(error) {
    var errorMessage = '';
    this.router.navigate(['/']);

    if (error.error) {
      if (error.error.errors) {
        errorMessage = '';
        error.error.errors.forEach(element => {
          errorMessage += '<br /> - ' + element.value;
        });
      }
    }

    Swal.fire({
      title: 'Ops...',
      html: errorMessage,
      showCloseButton: true,
      confirmButtonText: 'OK',
      customClass: {
        popup: 'error-alert',
        header: 'error-alert-header',
        title: 'title-class',
        content: 'error-alert-content',
        actions: 'alert-action',
        confirmButton: 'button-secundary buttontextpink selectedButton',
      }
    });
  }

}