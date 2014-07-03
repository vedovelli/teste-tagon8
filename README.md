teste-tagon8
============

Test for Tagon8

### Pré-requisitos

* GIT
* Node.js
* NPM
* Bower
* MongoDB

### Instalação

1. Clonar o repositório **git@github.com:vedovelli/teste-tagon8.git**
2. cd teste-tagon8/ && sudo npm install
3. cd public/ && bower install
4. cd ../ && node webservice.js
5. Acessar http://127.0.0.1:4730/#/account/new para criar sua conta e começar a usar o sistema
6. =D

### Arquitetura

* O projeto é _fullstack_ _javascript_ rodando em node.js
* O arquivo principal da API é o **/webservice.js**
* A programação client side é encontrada na pasta **_public_**, cujo conteúdo é servido pelo _express.js_ a partir do _webservice.js_
* O grosso da programação javascript client side está em src/js (aplicação ember.js)

### Projeto publicado

O projeto está publicado no Heroku e pode ser acessado pela URL xxx

#### Melhorias futuras

* Após a ação de login, enviar o usuário para a tela onde estava e não à lista de posts
* Adicionar transições de páginas
* Esconder os botões de gerenciamento (editar e remover), mostrando-os no MouseOver
* Remover os alertas padrão do Javascript, adicionando em seu lugar alertas do BootstrapGrowl
* Transferir as tags de posts para uma collection própria
* Transformar o campo de tags com o plugin Select2, buscando tags existentes enquanto o usuário digita
* Tornar os comentários independentes, associando a eles um controller, para que se permita fazer o sort por mais recentes
* Criar a rota /logout