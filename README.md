teste-tagon8
============

Test for Tagon8

### Pré-requisitos

* Node.js
* NPM
* Bower
* MongoDB

### Instalação

1. Clonar o repositório **git@github.com:vedovelli/teste-tagon8.git**
2. cd teste-tagon8/ && bower install
3. cd node/ && sudo npm install
4. **node webservice.js** (ou _nodemon_ _webservice.js_ ou qualquer _deamon_ que se esteja acostumado)
5. [opcional] Criar um vhost apontando para a pasta do projeto

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