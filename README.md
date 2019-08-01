# react
Código com objetivo teste do reactjs + nodejs 

Comando para abrir o app react
.\reactapp> npm run start

Comando para abrir o servidor node
.\reactapp> node .\server\main.js

## Arquitetura

### server
O Servidor é MVC, e as Rotas do servidor fazem validação de sessão e retornam os dados requisistados com o httpstatus adequado.
Se o retorno for adequado, é retornado um httpstatus 200 + dados.
Quando há alguma falha no fluxo, é retornado uma resposta com http status 4xx. Ex: se o usuário tentar acessar uma página restrita, será retornado https status 401 + uma mensagem
https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status

### client
O Client tem uma arquitetura MVC, e faz o controle das rotas, definindo qual view será exibida ou não.
As chamadas são feitas atravez de uma classe de serviço, e retornam uma promessa. Se o http status for 2xx a promessa executa a função de sucesso, caso contrário a de falha.

De acordo com os retornos desses request as vies são escollhidas.

## Escopo desenvolvido até o momento
Foi feito a funcionalidade básica para fazer login e salvar usuário, dessa forma validando a arquitetura e todo o fluxo de de dados, desde o client até a base de dados
As outras funcionalidades seguirão a mesma arquitetura em desenvolvimento


## TODO
### Server 
1. Escolher uma API para fazer a modelagem da base de dados. Atualmente estou usando SQL puro pois não achei uma api que eu me agrade

### Client
1. Implementar view para recuperar senha e criar usuário

