# StockSimples - Sistema de Inventário

Este projeto é um sistema de inventário simples, construído com [React no frontend](https://github.com/gabrielmunck/StockSimples-Frontend) e [PHP no backend](https://github.com/gabrielmunck/StockSimples-Backend).

## Requisitos

- Node.js e npm
- PHP 7.4 ou superior
- Servidor web (como Apache)
- MySQL
- Composer

## Configuração do Projeto

### Frontend

1. Navegue até a pasta do frontend:

cd inventory-system/frontend

2. Instale as dependências:

npm install

3. Inicie o servidor de desenvolvimento:

npm start

O aplicativo estará disponível em `http://localhost:3000`.

### Backend

1. Navegue até a pasta do backend:

cd inventory-system/backend

2. Instale as dependências do PHP usando o Composer:

composer require phpoffice/phpspreadsheet

3. Configure seu servidor web (como Apache) para servir os arquivos PHP do diretório backend(Eu usei o XAMPP).

4. Configure o banco de dados:
- Crie um banco de dados MySQL chamado `inventory`
- Edite o arquivo `backend/db/connection.php` com suas credenciais de banco de dados

5. Importe a estrutura do banco de dados (você precisará criar um script SQL para isso).

6. Caso voce esteja usando o XAMPP, basta copiar a pasta do backend para a pasta htdocs do Apache.

## Estrutura do Projeto

- `frontend/`: Contém o código React
- `src/`: Código-fonte do React
 - `components/`: Componentes React
 - `App.js`: Componente principal
 - `App.css`: Estilos principais
 - `index.js`: Ponto de entrada do React
- `backend/`: Contém o código PHP
 - `api/`: Endpoints da API
 - `db/`: Configuração do banco de dados

## Funcionalidades

- Listar produtos
- Adicionar novos produtos
- Editar produtos existentes
- Excluir produtos
- Exportar lista de produtos para Excel

## Desenvolvimento

Para desenvolver este projeto, você precisará ter conhecimentos em:

- React.js
- PHP
- MySQL
- HTML/CSS

## Dependências Principais

### Frontend
- React
- react-dom

### Backend
- PHPSpreadsheet (para exportação Excel)

## Notas Adicionais

- Certifique-se de que o PHP está configurado corretamente no seu servidor web.
- Verifique se as permissões de arquivo estão corretas para que o PHP possa ler e escrever arquivos conforme necessário.
- Ajuste as URLs no código frontend se o backend estiver hospedado em um endereço diferente de `http://localhost`.
