# Como Executar o Sistema Backend

Este documento fornece as instruções para configurar e executar o sistema backend do projeto de mapa interativo utilizando Nest.js e MySQL.

## Pré-requisitos
Certifique-se de ter os seguintes itens instalados:

1. **Node.js** (versão LTS recomendada) e **npm**:
   - [Baixar Node.js](https://nodejs.org/)
2. **MySQL**:
   - Certifique-se de que o serviço MySQL está rodando e que você tem credenciais de acesso.

## Estrutura do Repositório
Abaixo está a estrutura do diretório do backend para facilitar a navegação:

```
backend/
├── database/
│   ├── csv/
│   │   ├── linhas.csv         # Dados de linhas
│   │   ├── paradas.csv        # Dados de paradas
│   │   └── viagens.csv        # Dados de viagens
│   ├── create_tables.sql      # Script para criar tabelas
│   ├── drop_tables.sql        # Script para apagar tabelas
│   └── import_data.sql        # Script para importar dados
├── src/
│   ├── database/
│   │   ├── database.module.ts
│   │   └── database.providers.ts
│   ├── linhas/
│   │   ├── dto/
│   │   │   ├── create-linha.dto.ts
│   │   │   └── update-linha.dto.ts
│   │   ├── linhas.controller.ts
│   │   ├── linhas.entity.ts
│   │   ├── linhas.module.ts
│   │   └── linhas.service.ts
│   ├── paradas/
│   │   ├── dto/
│   │   │   └── create-parada.dto.ts
│   │   ├── paradas.controller.ts
│   │   ├── paradas.entity.ts
│   │   ├── paradas.module.ts
│   │   └── paradas.service.ts
│   ├── viagens/
│   │   ├── viagens.controller.ts
│   │   ├── viagens.module.ts
│   │   ├── viagens.service.ts
│   │   └── viagem.entity.ts
│   ├── app.controller.ts      # Controlador principal
│   ├── app.module.ts          # Módulo principal
│   ├── app.service.ts         # Serviço principal
│   └── main.ts                # Ponto de entrada
├── test/
│   ├── app.controller.spec.ts # Testes do controlador principal
│   └── viagens.service.spec.ts
├── package.json               # Dependências do projeto
├── nest-cli.json              # Configuração do NestJS
└── tsconfig.json              # Configuração do TypeScript
```

## Configuração do Banco de Dados

1. **Criação do Banco de Dados**:
   - Execute o script de criação do banco localizado em `database/create_tables.sql` para criar o banco de dados necessário.
   ```bash
   mysql -u root -p < database/create_tables.sql
   ```

2. **População Inicial de Dados**:
   - Insira os dados iniciais utilizando o script `database/import_data.sql`.
   ```bash
   mysql -u root -p < database/import_data.sql
   ```

## Configuração do Projeto

1. **Clone o Repositório**:
   Faça o clone do repositório para sua máquina local:
   ```bash
   git clone https://github.com/KevinAllysson/bus2.git
   cd bus2/backend
   ```

2. **Instale as Dependências**:
   No diretório do backend, execute o seguinte comando:
   ```bash
   npm install
   ```

3. **Configure a Conexão com o Banco**:
   Abra o arquivo `src/app.module.ts` e configure os parâmetros de conexão:
   ```typescript
   TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'bus2',
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
   }),
   ```

## Execução do Sistema

1. **Iniciar o Servidor**:
   Execute o seguinte comando para iniciar o servidor:
   ```bash
   npm run start:dev
   ```

2. **Verificar Endpoints**:
   Após o servidor estar em execução, os endpoints estarão disponíveis em:
   ```
   http://localhost:3000
   ```

3. **Documentação da API**:
   Acesse a documentação da API gerada automaticamente pelo Swagger:
   ```
   http://localhost:3000/api
   ```

## Funcionalidades Implementadas

- **Rotas disponíveis:**
  - `GET /paradas`: Buscar todas as paradas.
  - `GET /linhas`: Buscar todas as linhas.
  - `GET /viagens`: Buscar todas as viagens.
  - `GET /viagens/:paradaId`: Buscar viagens associadas a uma parada.
  - `GET /paradas/:viagemId`: Buscar todas as paradas de uma viagem.

## Scripts Disponíveis

- `npm run start`: Inicia o servidor em modo de produção.
- `npm run start:dev`: Inicia o servidor em modo de desenvolvimento.
- `npm run test`: Executa os testes unitários.
- `npm run build`: Compila o código TypeScript para JavaScript.

## Solução de Problemas

1. **Erro de Conexão com o Banco**:
   - Verifique se as credenciais configuradas em `app.module.ts` estão corretas.
   - Confirme que o serviço MySQL está em execução.

2. **Porta em Uso**:
   - Caso a porta padrão (3000) esteja ocupada, altere no arquivo `main.ts`:
     ```typescript
     await app.listen(3001);
     ```

3. **Banco Não Configurado**:
   - Certifique-se de que os scripts SQL de criação e população foram executados corretamente.

## Contribuição
Para contribuir com o projeto:
1. Faça um fork do repositório.
2. Crie uma branch para suas alterações.
3. Envie um pull request explicando suas mudanças.

---