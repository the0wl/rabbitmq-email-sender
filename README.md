# rabbitmq-email-sender

Este projeto busca implementar uma solução básica para o envio de e-mails utilizando RabbitMQ como sistema de mensageria. Teremos três instancias:

- Gerenciador RabbitMQ
- Um serviço produtor
- Um serviço consumidor

## Informações importantes

- Os dois serviços estarão disponíveis como subrepositórios dentro deste repositório. Para testá-los basta criar um container para cada aplicação ou instalar os pacotes necessários para rodar localmente em sua IDE.
- Os serviços serão desenvolvidos em Delphi e Node.js (escolha arbitrária).

## Produtor

Uma API que envia e-mails de propaganda para o usuário especificado.

```
curl -X POST http://seuendereco.com/send/ \
     -H "Content-Type: application/json" \
     -d '{"advertising_id": "seu_id_aqui", "email": "seuemail@example.com"}'
```

Haverá um padrão de e-mails a serem gerados, baseado no ``advertising_id``.

> Poderia haver um terceiro serviço para gerar o html do e-mail, porém não é o nosso foco.

## Consumidor

Serviço que envia e-mail contendo o ``Payload`` recebido.
