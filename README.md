# rabbitmq-playground

Este projeto busca implementar alguns testes utilizando RabbitMQ para aprender os conceitos da documentação oficial.

## Materiais abordados

- [x] Task Queue
  - [x] Queues
  - [x] Prefetch
  - [x] Manual ACK
- [x] Publisher and Subscriber
  - [x] Exchanges (fanout)
  - [x] Temporary queues
  - [x] Bindings
- [ ] 
- [ ] Production Checklist
  - [ ] [Veja neste link](https://rabbitmq.com/production-checklist.html)
- [ ] Monitoring
  - [ ] [Veja neste link](https://rabbitmq.com/monitoring.html)

</br>

## Playground

### Hello world
Envia e recebe uma mensagem "Hello world".

### Task Queue</b>

Simula o envio de tarefas pesadas/demoradas.

### Email sender

Simula uma API que envia emails ao receber uma requisição na rota `/send`.