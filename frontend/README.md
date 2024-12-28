# Como Executar o Sistema Frontend

Este documento fornece as instruções para configurar e executar o sistema frontend do projeto de mapa interativo utilizando Angular.

## Pré-requisitos
Certifique-se de ter os seguintes itens instalados:

1. **Node.js** (versão LTS recomendada) e **npm**:
   - [Baixar Node.js](https://nodejs.org/)
2. **Angular CLI**:
   - [Instalar Angular CLI](https://angular.io/cli):
     ```bash
     npm install -g @angular/cli
     ```

## Estrutura do Repositório
Abaixo está a estrutura do diretório do frontend para facilitar a navegação:

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── formulario/         # Componente do formulário de entrada
│   │   │   │   ├── formulario.component.html
│   │   │   │   ├── formulario.component.scss
│   │   │   │   ├── formulario.component.spec.ts
│   │   │   │   └── formulario.component.ts
│   │   │   ├── login/              # Componente de login
│   │   │   │   ├── login.component.html
│   │   │   │   ├── login.component.scss
│   │   │   │   ├── login.component.spec.ts
│   │   │   │   └── login.component.ts
│   │   │   ├── mapa/               # Componente do mapa interativo
│   │   │   │   ├── mapa.component.html
│   │   │   │   ├── mapa.component.scss
│   │   │   │   ├── mapa.component.spec.ts
│   │   │   │   └── mapa.component.ts
│   │   ├── services/               # Serviços para comunicação com o backend
│   │   │   ├── api.service.ts
│   │   │   ├── linhas.service.ts
│   │   │   ├── mapas.service.ts
│   │   │   ├── paradas.service.ts
│   │   │   └── viagens.service.ts
│   │   ├── app.component.html      # Componente principal
│   │   ├── app.component.scss
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── index.html                  # HTML principal
│   ├── main.ts                     # Ponto de entrada do Angular
│   ├── styles.scss                 # Estilos globais
├── angular.json                    # Configuração do Angular
├── package.json                    # Dependências do projeto
└── tsconfig.json                   # Configuração do TypeScript
```

## Configuração do Projeto

1. **Clone o Repositório**:
   Faça o clone do repositório para sua máquina local:
   ```bash
   git clonehttps://github.com/KevinAllysson/bus2.git
   cd bus2/frontend
   ```

2. **Instale as Dependências**:
   No diretório do frontend, execute o seguinte comando:
   ```bash
   npm install
   ```

3. **Configuração da URL do Backend**:
   Certifique-se de que a URL do backend está definida corretamente no arquivo `api.service.ts` ou outro serviço relevante. Exemplo:
   ```typescript
   private baseUrl = 'http://localhost:3000'; // URL do backend
   ```

## Execução do Sistema

1. **Iniciar o Servidor**:
   Execute o seguinte comando para iniciar o servidor de desenvolvimento:
   ```bash
   ng serve
   ```

2. **Acessar o Sistema**:
   O sistema estará disponível no navegador em:
   ```
   http://localhost:4200
   ```

## Funcionalidades Implementadas

- **Login:** Página inicial simples para login.
- **Mapa Interativo:**
  - Exibe paradas de ônibus como marcadores.
  - Permite seleção de linhas e viagens.
  - Atualiza o mapa com base na interação do usuário.
- **Formulário:** Entrada de dados (a ser configurada).

## Scripts Disponíveis

- `ng serve`: Inicia o servidor de desenvolvimento.
- `ng test`: Executa os testes unitários do frontend usando Karma.
- `ng build`: Gera a build para produção.

## Solução de Problemas

1. **Angular CLI Não Encontrado**:
   - Se você receber um erro indicando que o Angular CLI não está instalado, execute:
     ```bash
     npm install -g @angular/cli
     ```

2. **Erro de Conexão com o Backend**:
   - Certifique-se de que o backend está rodando e que a URL no serviço (`api.service.ts`) está configurada corretamente.

3. **Porta em Uso**:
   - Caso a porta 4200 já esteja ocupada, inicie o servidor em outra porta:
     ```bash
     ng serve --port 4300
     ```

## Contribuição
Para contribuir com o projeto:
1. Faça um fork do repositório.
2. Crie uma branch para suas alterações.
3. Envie um pull request explicando suas mudanças.

---