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
5. Acessar http://127.0.0.1:4730

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