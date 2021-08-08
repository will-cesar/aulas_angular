## Comandos úteis:
- ng new nome-do-projeto --> cria o novo projeto angular;
- ng serve --> roda a aplicação;
- ng g c nome-do-componente --> cria um novo componente. O "g" significa gerar, "c" significa componente;
- ng g m nome-do-modulo --> cria um novo modulo. O "m" significa módulo;
- ng g s nome-do-servico --> cria um novo servico. O "s" significa servico;
- ng g d node-da-diretiva --> cria uma nova diretiva. O "d" significa diretiva;
- ng g p node-do-pipe --> cria um novo pipe. O "p" significa pipe;
- ng g class node-da-diretiva --> cria uma nova class;
- ng g interface node-do-interface --> cria uma nova interface;
- ng g enum node-do-enum --> cria um novo enum;
- ng build --> gera o build de desenvolvimento;
- ng build --prod --> gera o build de produção; 
- ng lint --> escanear todo o código, verificar boas práticas do style guides, erros como ponto e vírgula, etc;
- ng test --> executa os testes unitários no projeto;
- ng e2e --> executa os testes end 2 end no projeto;


## Componentes:
- há duas formas de criar um componente, via CLI ou sem o CLI.
- sem o CLI:
    - é preciso criar o arquivo.component.ts dentro da pasta de componente;
    - configurar o decorator @Component dentro do componente, colocando selector, template e css;
    - importar classe do componente dentro de um modulo. (module.ts -> @NgModule -> declarations);
    - dentro do arquivo html, colocar a <tag> com o mesmo nome configurado no selector do component;

- com CLI:
    - utilizar o comando ng g c nome-do-componente dentro da pasta onde deseja, assim será criada uma pasta com o arquivo do componente, css, html e de testes, 
    tudo automaticamente;
    - já adiciona o componente dentro do modulo da pasta desejada;

## Modulos:
- ajuda a organizar a aplicação, desenvolvendo diretórios para armazenar arquivos relacionados ao módulo.
- o app.module.ts é o módulo raiz da aplicação.
- dentro do módulo utilizasse o decorator @NgModule, nele é declarados alguns metadados, dentre eles o declarations, imports, providers, exports;
    - declarations: listar todos os componentes, diretivas e pipes que serão utilizados no módulo;
    - imports: adiciona outros módulos que serão utilizados dentro do módulo específico ou componentes que utilizam módulos externos ao módulo configurado;
    - providers: declar os serviços que ficarão disponíveis para outros módulos;
    - bootstrap: é declarado apenas no módulo raiz, o app.module;
    - exports: exportar as declarações (componentes, diretivas e pipes) para outros módulos;
    - providers: serviços fornecedores utilizados pelos componentes de dentro do módulo;

- para criar um módulo é só utilizar o comando ng g m node-do-modulo;
- para que seja possível compartilhar esse módulo com o restante da aplicação, é necessário importar ele dentro do módulo principal (app.module.ts) 
dentro do metadado "imports" e, dentro do módulo que quer exportar é necessário colocar o metadado "exports" e colocar o nome do componente dentro.

## Templates: 
- são os arquivos html dentro da pasta do componente
- para passar variáveis de forma dinâmica entre componente e html é necessário criar ela dentro do arquivo do componente (component.ts);
    - no arquivo html, pegar a variável pela interpolação {{ nome da variável declarada no component.ts }}

## Diretivas:
- Diretivas são instruções;
- Diretivas estruturais:
    - Loop:
        - for: *ngFor="let nome-qualquer of nome-da-variavel"
            - Exemplo: <li *ngFor="let curso of cursos">{{curso}}</li>

    - Condição:
        - if: *ngIf=""
            - Exemplo: <p *ngIf="var > 0"></p>

- Diretivas de atributos:
    - Interage com os elementos em que foram aplicadas;
    - ng-class e ng-style;

- ngSwitch, ngSwitchCase e ngSwitchDefault:
    - utilizado no caso de switch and case;
    - Olhar exemplo em diretivas -> diretiva-ngswitch;

## Serviços:
- Classes responsáveis por buscar dados no servidor e enfiar dados ao mesmo;
- serviços também são uteis para não repetição de código na aplicação;
- fornece lógica de negócio e evita código duplicado;
- também podera utilizar classes utilitárias;
- o construtor é o primeiro método que é executado, pois constroe a classe;
- quando declarada uma variável "static", não é preciso instânciar o serviço para acessar ela em outro componente;
    - servicos -> cursos -> cursos.service
- para criar um serviço é necessário criar um arquivo .service.ts;
- comando para criar: ng g s nome-do-servico;
    - será criado os arquivos nome-do-arquivo.service.spec.ts e nome-do-arquivo.service.ts.
- para chamar um service dentro de um componente é necessário importar o mesmo dentro do arquivo do componente.ts desejado;
- Injeção de dependência:
    - fazer com que o angular forneça uma instância da classe de serviço, sem precisar instânciar manualmente;
    - o decorator @Injectable() fornece essa possibilidade de injetar a classe sem instânciar ela;
    - para fazer a injeção é necessário declarar a classe dentro do constructor no componente
        - exemplo: constructor(private primeiroServico: PrimeiroServicoService) == declara a variavel "primeiroServico" do tipo "PrimeiroServicoService", 
        que é a classe importada no arquivo;
        - o "private" guarda o escopo desse acesso da classe dentro do constructor;
    - a injeção de dependencia cria a instância do service, dentro do construtor, passando a referencia dessa instância para que uma outra classe
    possa utilizar também;
    - O decorator @Injectable() diz para o angular que é uma classe injetável; Exemplo: servicos -> cursos -> cursos.service;
    - é necessário declarar nos providers do module que será utilizado o serviço com injeção;
    - exemplo sem e com o uso de injeção de dependencia: servicos -> cursos -> cursos.component;

- Padrão singleton:
    - ter apenas uma instância da classe para toda a aplicação;
    - dividir em módulos, declarar os componentes dentro desses módulos, exportar os mesmos e declarar o módulo no app.component;
    - assim terão componentes replicáveis dentro da aplicação, mas com apenas uma instância dentro do módulo;
    - com cada componente declarando no provider um serviço, e esse serviço seja replicado em diversos componente, cada um se comportará da maneira
    em que o componente manipula o serviço, apenas afetando aquele componente, e não outros componente da aplicação;  
    - é preciso declarar o "providers: []" dentro do decorator @Component;
        - exemplo: servicos -> criar-curso // servicos -> cursos; 

## Property Binding e Interpolação
- Data Binding: uma forma de associar informações que estão no componente para o template, e vice e versa. Tipos:
    - Interpolação "{{ valor }}": (componente -> template);
    - Property binding "[propriedade]="valor": (componente -> template);
        - (evento)="handler": (template -> componente);
    - Two way data binding [(ngModel)]="propriedade";

## Class e style binding:
- é possível criar uma váriavel dentro de um elemento html através da # mais o nome da variável
    - exemplo <select #classe (change)="0">
    - assim fica armazenado dentro da var classe as propriedades do elemento
    - exemplos de class e style binding: projeto data-binding -> app -> data-binding -> data-binding.component.html

## Event binding:
- eventos pré definidos no angular;
- https://developer.mozilla.org/pt-BR/docs/Web/API/Event;
- exemplos em: projeto data-binding -> app -> data-binding -> data-binding.component.html;

## Two-way data binding:
- junta o binding de propriedade e de evento em um lugar só;
- [(ngModel)]="nome" dentro do elemento;
- exemplos em: projeto data-binding -> app -> meu-form -> meu-form.component.html;
- ngModel é uma diretiva do angular que pertence ao "FormsModule", onde precisa ser importado no module

## Input properties:
- é utilizado para passar dados pelo html para outro componente;
- dentro de um componente pai, colocar um componente pelo seu seletor, dentro dele adicionar uma propriedade que tenha o mesmo nome da váriavel 
dentro do componente filho, assim essa variável poderá ser acessada no html do componente filho.
- dentro do componente filho é necessário utilizar o decorator @Input();
    - no decorator é possível colocar o nome da propriedade externa, que é recebida, e o nome da propriedade interna, armazenada em uma variável;
        - exemplo: @Input('nome') nomeCurso: string = '';

- Exemplo: 
    - <app-curso [nome]="nomeDoCurso"></app-curso>
    - Esse exemplo está em: data-binding -> app -> data-binding -> data-binding.component.html;
    - o app-curso está em: data-binding -> app -> input-property -> input-property.component.html;

## Output properties:
- é utilizado para exibir os dados para fora do elemento, pelo componente pai;
- Esse exemplo está em: data-binding -> app -> data-binding -> data-binding.component.html;
- o app-curso está em: data-binding -> app -> input-property -> output-property.component.html; 

## Ciclo de vida do componente:
- ngOnChanges: ativado antes do ngOnInit e quando o valor property-binding é atualizado;
- ngOnInit: quando o Component é inicializado;
- ngDoCheck: ativado a cada ciclo de verificação de mudanças;
- ngAfterContentInit: depois de inserir conteúdo externo na view;
- ngAfterContentChecked: a cada verificação de conteúdo inserido;
- ngAfterViewChecked: a cada verificação de conteúdo / conteúdo filho;
- ngOnDestroy: antes da diretiva/component ser destruído;

## Utilizando pré-processadores:
- Sass, Lass, stylus
- é possível gerar um novo projeto já com esses pré processadores instalados:
    - ng new nome-do-projeto --style=sass;
    - ng new nome-do-projeto --style=less;
    - ng new nome-do-projeto --style=stylus;

- ou utilizar já em um projeto existente:
    - ng set defaults.styleExt scss;
    - ng set defaults.styleExt less;
    - ng set defaults.styleExt styl;

## Gerando build de desenvolvimento:
- ng build;
- o build é gerado dentro do diretório dist;
- apresentam 3 arquivos:
    - index.html == index.html limpo;
    - main.bundle.js == possui todo o código fonte da aplicação (css e html);
    - polyfills.bundle.js == código auxiliar ao browser para ler a aplicação;

## Gerando build de produção:
- ng build --prod;
- minifica o código js da aplicação;
- css e templates html já minificados e incluídos em main.bundle.js

# Operador Elvis:
- Utilizado para identificar caso seja um valor nulo ou não e exibir na tela
- Exemplo: diretivas -> operador-elvis

## ng-content:
- Utilizado para passar a informação digitada dentro do seletor principal do componente para dentro do html do componente
- Exemplo: diretivas -> exemplo-ng-content.component e diretivas -> app.component.html

## Diretiva de atributo:
- com o ng g d nome-da-diretiva é possível criar uma diretiva nova no projeto
- utiliza o decorator de @Directive;
- no seletor é possível filtrar o tipo de elemento que você quer usar, exemplo:
    - selector: p[nomeDoSeletor];
    -           button[nomeDoSeletor];
- é preciso criar um construtor instanciando o ElementRef, que é responsável por referenciar o elemento no DOM;
- ElementRef => Referencia do elemento. Utilizado como injeção de dependencia;
- o grande problema do ElementRef são vulnerabilidades na aplicação devido o acesso diretamente ao elemento pelo DOM;
- por isso há como utilizar o Renderer também para a mesma função;
- Seta o elemento dentro de algum método vindo da injeção de dependencia com 3 elementos ('elemento renderizado', 'nome do atributo', 'valor');
- exemplo: diretivas -> shared -> fundo-amarelo.directive.ts;

## HostListener e HostBinding
- HostListener "escuta" o elemento host, ou seja, o elemento hospedeiro da diretiva;
- pode colocar o nome do evento que será "escutado" no elemento;
- metadado + nome do evento + function
    - exemplo: diretivas -> shared -> highlight-mouse.diretives.ts;  

- HostBinding é um metadado que permite que faça a associação de um determinado atributo da diretiva para um determinado atributo do html
- metadado + tipo de atributo + variável;
- associa o atributo a uma variável;
    - exemplo: diretivas -> shared -> highlight-mouse.diretives.ts;

## Diretiva Input com property binding
- com o metadado @Input é posivel colocar um valor na diretiva dentro do html.
- exemplo: <p [highlight]="'red'" [dafaultColor]="'grey'">
- assim, o valor colocado no html é passado para o arquivo .ts e tratado conforme solicitado
- exemplo: diretivas -> shared -> highlight.diretives.ts;

## Diretiva de estrutura
- com o ng g d nome-da-diretiva é possível criar uma diretiva de estrutura nova no projeto;
- uma diretiva que irá modificar a estrutura do DOM;
- exemplo: diretivas -> shared -> ng-else.diretives.ts;
    - Utilizado o metadado @Input para receber um valor;
    - utiliza o "set" para "escutar" toda vez q ele for setado, modificado;
    - quando modificado, o "set" modifica o valor do template da diretiva;
    - TemplateRef: faz referencia ao template;
    - ViewContainerRef: faz referencia ao container da view, ou seja, o conteúdo q será renderizado;

## Serviços:
- Classes responsáveis por buscar dados no servidor e enfiar dados ao mesmo;
- serviços também são uteis para não repetição de código na aplicação;
- fornece lógica de negócio e evita código duplicado;
- também podera utilizar classes utilitárias;
- o construtor é o primeiro método que é executado, pois constroe a classe;
- quando declarada uma variável "static", não é preciso instânciar o serviço para acessar ela em outro componente;
    - servicos -> cursos -> cursos.service

- Injeção de dependencia:
- a injeção de dependencia cria a instância do service, dentro do construtor, passando a referencia dessa instância para que uma outra classe
possa utilizar também;
- O decorator @Injectable() diz para o angular que é uma classe injetável; Exemplo: servicos -> cursos -> cursos.service;
- é necessário declarar nos providers do module que será utilizado o serviço com injeção;
    - exemplo sem e com o uso de injeção de dependencia: servicos -> cursos -> cursos.component;

- Padrão singleton:
- ter apenas uma instância da classe para toda a aplicação;
- dividir em módulos, declarar os componentes dentro desses módulos, exportar os mesmos e declarar o módulo no app.component;
- assim terão componentes replicáveis dentro da aplicação, mas com apenas uma instância dentro do módulo;
- com cada componente declarando no provider um serviço, e esse serviço seja replicado em diversos componente, cada um se comportará da maneira
em que o componente manipula o serviço, apenas afetando aquele componente, e não outros componente da aplicação;  
- é preciso declarar o "providers: []" dentro do decorator @Component;
    - exemplo: servicos -> criar-curso // servicos -> cursos; 

## Pipes:
- é como se fosse um filtro de front, onde há formatações de valores dentro do DOM sem passar pelo ts
- nos pipes é possível colocar parâmetros neles
    - por exemplo nos pipes de number, nele é possível formatar casas decimais 
    - exemplo: {{ variavel | number:'2.1-2' }}
        - o primeiro '2' representa a quantidade de inteiros que irá aparecer
        - pós o ponto "." é possível colocar um número mínimo de casas decimais até a o número máximo
    
    - por exemplo pipe de data
    - exemplo: {{ variavel | date:'dd/MM/yyyy' }}

- para criar um pipe é necessário utilizar o comando ng g p nome-do-pipe
- também é necessário declarar ele no modulo que será utilizado (no declarations)
    - exemplo de pipe criado: pipes -> camel-case.pipe.ts

- internacionalização nos pipes
- é possível setar uma localização padrão para os pipes da aplicação
    - é necessário adicionar um novo provider dentro do módulo desejado
    - exemplo:
        {
            provide: LOCALE_ID,
            useValue: 'pt'
        }
    - necessário importar o "registerLocaleData" do @angular/common
    - importar o "localePt" do "@angular/common/locales/pt" 
    - e chamar o método registerLocaleData com os parâmetros
        - exemplo: registerLocaleData(localePt, 'pt');
        - pipes -> app.modules.ts

- também é possível utilizar pipes em loops

- Pipe puro:
- um pipe puro não olha as modificações do valor que é passado como parâmetro para o médoto de transform
    - exemplo: pipes -> filtro-array.pipe // pipes -> exemplos-pipes.component

- Pipe impuro:
- o pipe impuro olha as modificações do valor mara o método transform
    - exemplo: pipes -> filtro-array-impuro
    - nesse exemplo, é utilizado o "extends" do FiltroArrayPipe, dessa forma é herdado para dentro do método as outras functions do método extendido

## Rotas:
- é gerado automaticamente pelo angular cli um arquivo chamado app-routing.module
- nele é possível configurar as rotas principais da aplicação;
- para configurar, é necessário criar uma varial de rotas, instanciando o "Routes" e aplicando cada objeto especificando qual é a rota a ser utilizada
    - path: o caminho para o determinado componente;
    - component: renderiza um componente;
- exemplo: rotas -> app-routing.modules.ts;

- [routerLink]:
    - é utilizado para redirecionar para a url que desejar, como se fosse o "href"
    - exemplo: rotas -> app.component.html;

- [routerLinkActive]:
    - utilizado para sinalizar qual é a rota ativa no momento;
    - é possível adicionar uma classe no elemento sinalizado;
    - exemplo: rotas -> app.component.html;

- ActivatedRoute:
    - classe do angular onde é possível capturar um atributo dentro da rota;
        - exemplo: rotas -> curso-detalhe.component
        - também pode ser utilizado com o snapshot da rota
            - ex: "this.route.snapshot.params['id'];"

- Router:
    - é possível redirecionar para qual rota desejar através da classe "Router", que é importanda e instanciada no construtor
    - exemplo: rotas -> curso-detalhe.component

- QueryParams:
    - [queryParams]
    - utilizado para passar uma query na rota
    - a query irá aparecer logo após o ponto de interrogação criado pelo próprio comando
        - exemplo: "/cursos?pagina=1"
        - cursos no caso já existe, o qu está após o "?" é a query
    - exemplo: rotas -> app.component.html // rotas -> cursos.component

- Lazy loading:
    - é utilizado para carregar apenas o modulo por vez, quando entrar na rota
    - no "app-routing.module.ts" é necessário criar uma rota padrão para o módulo, onde dentro do modulo havera outro arquivo routing
        - nesse arquivo routing interno do modulo, é configurada as rotas filhas dele
    - no "app-routing.module.ts" colocar assim:
        - Exemplo: { path: 'cursos', loadChildren: './cursos/cursos.module#CursosModule'}
        - loadChildren para carregar as rotas filhas desse modulo em questão
        - é necessário também retirar dos imports do app.module o modulo que está configurado para o lazy loading 

- Guarda de rotas:
    - é um tipo de serviço que implementa um determinado um método que é usado como um guarda de rota
    - os guardas de rotas sempre precisam ser chamados nos "providers" dos modulos
    - é injetado diretamente na rota pelo atributo "canActivate"
        - esse atributo espera o nome da classe onde está configurado o guarda de rota
        - dentro dessa classe é configurado o método "canActivate", que o mesmo espera dois atributos
    - exemplo: rotas -> guards -> auth.guard.ts // rotas -> app-routing.module.ts

- canActivate:
    - parametro utilizado para verificar um modulo por inteiros

- canActivateChild:
    - verifica as rotas filhas de um modulo
    - exemplo: rotas -> alunos -> alunos.routing.module.ts // rotas -> guards -> alunos.guard.ts

- CanDeactivate:
    - verifica se o usuário pode desativar uma rota específica
    - é utilizado quando "trava" o redirecionamento para uma outra rota, nisso é possível validar se deseja trocar de rota ou não
        - exemplo: rotas -> guards -> alunos-deactivate.guard.ts // rotas -> alunos -> aluno-form -> aluno-form.component.ts  

- Resolver:
    - utilizado para obter informações antes do componente ser renderizado
    - é útil para carregar informações dos services, assim os resultados aparecem no html de forma mais rápida
        - exemplos: rotas -> alunos -> guards -> aluno-detalhe.resolver.ts // 
                    rotas -> alunos -> alunos.routing.module.ts

- canLoad:
    - verifica se o usuário tem permissão para carregar o script do módulo
        - exemplo: rotas -> guards -> auth.guard.ts

- Rota para "Página não encontrada":
    - Exemplo: rotas -> app-routing.module.ts

- Rota "home":
    - redirecionar as rotas vazias para uma com "/home"
    - utilizar os atributos "redirectTo", onde será o endereço que for direcionado
    - "pathMatch" onde serão verificados os pacotes de rotas
        - exemplo: rotas -> app-routing.module.ts

## Interface:
- é um arquivo typescript onde é possível implementar métodos que podem ser utilizados em outros componentes quando for ativado;
    - exemplo: rotas -> guards -> iform-candeactivate.ts // 
               rotas -> guards -> alunos-deactivate.guard.ts //
               rotas -> alunos -> aluno-form -> aluno-form.component.ts

## Forms:
- o angular apresenta um formato específico para utilizar formulários dentro da sua estrutura.
- o [(ngModel)] dentro do input é utilizado para guardar as informações e atualizar elas nas variáveis
- forms template x reactive (data driven)
    - Orientado a template: Fomulário é criado e configurado no HTML. Angular deduz um FormGroup a partir do HTML
        - exemplos: forms -> app -> template-form
        
    - Orientado a dados: Formulário é criado programaticamente e é sincronizado com o DOM/HTML
        - exemplos: forms -> app -> data-form

## Estruturação de uma aplicação Angular:
- Sugestão de estrutura:
    - Authentication Module
        - Login
        - Registration
        - Reset-password
        - Forgot-password
        - Main confirmation
    
    - Core Module
        - Services
            - Common Services:
                - HTTP Service - responsável por todas as operações CRUD da aplicação
                - Error Handling - responsável por mostrar o erro no console ou exibir uma mensagem de erro para o usuário
                - Utility Services - todas as funções reutilizáveis para a manipulação de dados, como data, strings e helper functions
                - Storage Service - serviço para salvar dados dentro da aplicação
        - Guards
        - Reusable Components
        - Common Pages
        - Common Modules

    - Main Dashboard
        - Application Pages
        - Navigation
        - User Interface
        - Templates

## NgRx
- https://next.ngrx.io
- Entity data - https://next.ngrx.io/guide/data