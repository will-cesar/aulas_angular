import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  verificaValidTouched(campo){
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep, form) {
    cep = cep.replace(/\D/g, '');

    if (cep != "") {
      let validacep = /^[0-9]{8}$/;

      if(validacep.test(cep)){

        this.resetaDadosForm(form);

        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .subscribe(data => { this.populaDadosForm(data, form) });  
      }
    }
  }

  populaDadosForm(dados, formulario){
    // formulario.setValue({ ==> seta todos os valores do formulario
    //     nome: formulario.value.nome,
    //     email: formulario.value.email, 
    //     endereco: {
    //       rua: dados.logradouro,
    //       cep: dados.cep,
    //       numero: '',
    //       complemento: dados.complemento,
    //       bairro: dados.bairro,
    //       cidade: dados.localidade,
    //       estado: dados.uf
    //     }
    // });

    console.log(formulario);

    formulario.form.patchValue({ // ==> seta os valores de campos específicos
      endereco: {
        rua: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosForm(formulario){
    formulario.form.patchValue({ // ==> seta os valores de campos específicos
      endereco: {
        rua: null,
        // cep: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  onSubmit(form) {
    console.log(form);
    console.log(this.usuario);

    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
      .subscribe(dados=> console.log(dados));
  }

}
