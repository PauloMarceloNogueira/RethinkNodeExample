# README #

# TWITTER CONSUMER REALTIME - USING PIPELINE DESIGN #
Middleware para acesso a API do Scup


# DEV #

## Requirements ##
**Atenção**: Somente testado em sistemas linux/Mac

  - Instalação do [Node.js]
  - Instalaçâo do RethinkDB
  - RethinkDB rodando (rethinkdb)

## Installation ##
  - git clone https://github.com/PauloMarceloNogueira/RethinkNodeExemple.git
  - cd RethinkNodeExemplo
  - nodemon twitterConsumer.js
  - nodemon itemPipeline.js
  - nodemon interfaceWeb.js


## Config ##
  - Entrar no /settings/settingsDev.js
  - Trocar as configurações
  - Renomear o arquivo para settings.js

## Usage ##
  - localhost:8080 -> Dash do banco
  - localhost:3000 -> Painel de Coleta
  - localhost:3002 -> Dash do sistema
