# Projeto de Mapa Interativo

Este é um sistema completo para exibição de mapas interativos, desenvolvido para auxiliar usuários a localizar viagens e paradas de ônibus próximas. O projeto foi implementado com tecnologias modernas para o backend e frontend.

## Tecnologias Utilizadas

### Backend
- **NestJS**: Framework Node.js para criação de APIs robustas.
- **TypeORM**: ORM para gerenciamento do banco de dados.
- **MySQL**: Banco de dados relacional utilizado para armazenar informações de paradas, linhas e viagens.
- **Swagger**: Documentação automática da API.

### Frontend
- **Angular**: Framework para desenvolvimento de aplicações web reativas e modulares.
- **Angular Material**: Componentes para estilização e responsividade.
- **Leaflet**: Biblioteca para exibição de mapas interativos.

## Estrutura do Repositório

```
project-root/
├── backend/                  # Código do backend
├── frontend/                 # Código do frontend
├── README.md                 # Documentação principal do projeto
├── package.json              # Dependências do projeto raiz
└── scripts/                  # Scripts auxiliares (se aplicável)
```

## Configuração do Projeto

### 1. Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- **Node.js** (versão LTS): [Baixar Node.js](https://nodejs.org/)
- **npm** ou **yarn** para gerenciar pacotes.
- **MySQL**: Configurado e em execução para o backend.

### 2. Instalar Dependências
Clone o repositório e instale as dependências:
```bash
# Clone o repositório
git clone https://github.com/KevinAllysson/bus2.git
cd bus2

# Instale as dependências do projeto
npm install
```

### 3. Configuração do Banco de Dados
Certifique-se de configurar o banco de dados antes de executar o projeto. Consulte a documentação específica do backend em `backend/README.md`.

### 4. Executar o Projeto
Inicie o projeto usando o seguinte comando:
```bash
npm run dev
```
Esse comando iniciará tanto o servidor do backend quanto o frontend simultaneamente.

### 5. Acessar o Sistema
- **Frontend:** O sistema estará acessível em [http://localhost:4200](http://localhost:4200).
- **Backend:** A API estará acessível em [http://localhost:3000](http://localhost:3000).

## Contribuição
Contribuições são bem-vindas! Para contribuir:
1. Faça um fork do repositório.
2. Crie uma branch para suas alterações:
   ```bash
   git checkout -b minha-nova-feature
   ```
3. Envie um pull request explicando suas alterações.

## Licença
Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.

---