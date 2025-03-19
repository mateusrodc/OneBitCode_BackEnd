# OneBitFlix Backend

## Descrição

Este é o backend do projeto OneBitFlix, responsável por fornecer a API e a lógica de negócios para a aplicação.

## Tecnologias Utilizadas

* Node.js
* Express.js
* Sequelize
* PostgreSQL
* AdminJS
* AWS S3

## Pré-requisitos

* Node.js (versão X.X.X)
* npm (ou yarn)
* PostgreSQL (ou banco de dados de sua preferência)
* Credenciais da AWS (se estiver usando S3)

## Instalação

1.  Clone o repositório:

    ```bash
    git clone [link repositorio]
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

    ou

    ```bash
    yarn install
    ```

3.  Configure as variáveis de ambiente:

    * Crie um arquivo `.env` na raiz do projeto.
    * Defina as variáveis de ambiente necessárias (por exemplo, `DATABASE_URL`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`).

4.  Execute as migrações do banco de dados:

    ```bash
    npx sequelize-cli db:migrate
    ```

5.  Inicie o servidor:

    ```bash
    npm run dev
    ```

    ou

    ```bash
    yarn dev
    ```

## Configuração do AdminJS

1.  Acesse o painel do AdminJS em `http://localhost:3000/admin` (ou a URL configurada).
2.  Faça login com as credenciais configuradas.

## Configuração do AWS S3

1.  Configure as credenciais da AWS no arquivo `.env`.
2.  Crie um bucket S3 para armazenar os arquivos.
3.  Configure as permissões de acesso ao bucket.


## Contribuição

1.  Faça um fork do repositório.
2.  Crie uma branch com a sua feature: `git checkout -b minha-feature`.
3.  Faça commit das suas mudanças: `git commit -m 'Adiciona minha feature'`.
4.  Faça push para a sua branch: `git push origin minha-feature`.
5.  Abra um pull request.


## Contato

* Mateus Rodrigues Costa - mateusrdcs@gmail.com

## Agradecimentos

* Agradecer a OneBitCode pelo treinamento
