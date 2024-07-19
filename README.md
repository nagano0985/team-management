# Team Management Web Application

## Descrição
Este é um projeto de aplicação web para gerenciamento de times e tarefas, focado na atribuição e monitoramento de tarefas. A aplicação é construída com um front-end reativo usando React e um back-end em Node.js com integração ao Firebase para armazenamento de dados e autenticação de usuários.

## Funcionalidades
- Cadastro de membros do time (nome, email e função)
- Gestão de tarefas (descrição, prazo e prioridade)
- Atribuição de tarefas aos membros
- Tempo de alocação de tarefas
- Notificações de prazo utilizando Firebase para alertar sobre tarefas próximas do vencimento

## Tecnologias Utilizadas
- **Front-end:** React, Tailwind CSS
- **Back-end:** Node.js, Express.js
- **Banco de Dados e Autenticação:** Firebase (Firestore, Authentication, Functions)
- **Outras:** React Router, Context API

## Estrutura do Projeto
```plaintext
team-management/
├── public/
│   ├── index.html
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   ├── Navbar.js
│   │   ├── Register.js
│   │   ├── TaskManagement.js
│   │   └── TeamManagement.js
│   ├── contexts/
│   │   └── UserContext.js
│   ├── firebase.js
│   ├── App.js
│   ├── index.css
│   └── index.js
├── .gitignore
├── package.json
└── README.md


Instalação e Configuração
Pré-requisitos
Node.js instalado
Conta no Firebase

Configure o Firebase:

Crie um projeto no Firebase.
Habilite Authentication e Firestore.
Copie as configurações do Firebase para o arquivo src/firebase.js

Como Usar
Cadastro e Login
Acesse a página de registro para criar uma nova conta.
Faça login com as credenciais para acessar o dashboard.
Gerenciamento de Tarefas
No dashboard, você pode visualizar as tarefas atribuídas.
Vá para "Task Management" para adicionar novas tarefas e atribuí-las aos membros do time.
Gerenciamento de Membros
Vá para "Team Management" para adicionar novos membros ao time.
Notificações
As notificações de tarefas próximas ao prazo serão gerenciadas pelo Firebase Functions.