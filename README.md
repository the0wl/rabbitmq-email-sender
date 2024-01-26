# rabbitmq-playground

Este projeto busca implementar alguns testes utilizando RabbitMQ para aprender os conceitos da documentação oficial.

</br>

## Playground

</br>

<details>
  <summary>
    <b>Hello world</b>
    <p>Envia e recebe uma mensagem "Hello world".</p>
  </summary>

  </br>

  <b>1. Criar uma rede</b>

  Crie uma rede (chamarei a minha de **rabbits**) para que todos containers consigam se comunicar:

  ```
  docker network create rabbits
  ```
  
  </br>

  <b>2. Criar o servidor rabbitmq</b>    

  Crie um container em segundo plano na rede criada no passo anterior expondo a porta 8080. Neste caso utilizei a imagem `rabbitmq:3.8`.

  ```
  docker run -d --rm --net rabbits -p 8080:15672 --hostname rabbit-1 --name rabbit-1 rabbitmq:3.8
  ```

  Agora abra o terminal bash do container:

  ```
  docker exec -it rabbit-1 bash
  ```

  Você pode executar o comando `rabbitmqctl` para utilizar o CLI do rabbitmq. 

  ```
  rabbitmqctl
  ```

  No nosso caso queremos o `rabbitmq-plugins` que permite instalar uma série de ferramentas úteis. Instalaremos o `rabbitmq_management`.

  ```
  rabbitmq-plugins enable rabbitmq_management
  ```
  ```
  exit
  ```

  Agora é possível acessar a interface visual do rabbitmq através de seu navegador na porta `8080`. Por padrão o usuário e senha são `guest`.

  </br>

  <b>3. Crie as imagens dockerfile</b>

  Vá até a pasta `playground/hello-world/send` e execute o comando:

  ```
  docker build -t rabbitmq-send-example .
  ```

  Vá até a pasta `playground/hello-world/receive` e execute o comando:

  ```
  docker build -t rabbitmq-receive-example .
  ```

  </br>

  <b>4. Crie os containers</b>

  ```
  docker run -it --rm --net rabbits rabbitmq-send-example
  ```

  ```
  docker run -it --rm --net rabbits rabbitmq-receive-example
  ```

</details>

<details>
  <summary>
    <b>Task Queue</b>
    <p>Simula o envio de tarefas pesadas/demoradas.</p>
  </summary>

  </br>

  <b>1. Veja no exemplo "Hello world" como criar uma rede</b>

  <b>2. Veja no exemplo "Hello world" como criar o servidor RabbitMQ</b>    

  <b>3. Crie as imagens dockerfile</b>

  Vá até a pasta `playground/task-queue/task` e execute o comando:

  ```
  docker build -t rabbitmq-task-example .
  ```

  Vá até a pasta `playground/task-queue/worker` e execute o comando:

  ```
  docker build -t rabbitmq-worker-example .
  ```

  </br>

  <b>4. Crie os containers</b>

  Instancie dois ou mais workers (utilize um em cada terminal, pois este ficará bloqueado por 1 minuto):

  ```
  docker run -it --rm --net rabbits --name worker-1 rabbitmq-worker-example
  docker run -it --rm --net rabbits --name worker-2 rabbitmq-worker-example
  ```

  Agora envie 3 mensagens pelo menos, para conseguir observar a funcionalidade:

  ```
  docker run -it --rm --net rabbits -e MESSAGE="Task 1" rabbitmq-task-example
  docker run -it --rm --net rabbits -e MESSAGE="Task 2" rabbitmq-task-example
  docker run -it --rm --net rabbits -e MESSAGE="Task 3" rabbitmq-task-example
  ```

</details>

<details>
  <summary>
    <b>Email sender</b>
    <p>Simula uma API que envia emails ao receber uma requisição na rota <code>/send</code>.</p>
  </summary>

  </br>

  <details>
    <summary>Definição</summary>
  
  ---

  <b>Produtor</b>

  <p>Uma API que envia e-mails de propaganda para o usuário especificado.<p>

  ```
  curl -X POST http://seuendereco.com/send/ \
      -H "Content-Type: application/json" \
      -d '{"advertising_id": "seu_id_aqui", "email": "seuemail@example.com"}'
  ```

  <p>Haverá um padrão de e-mails a serem gerados, baseado no <code>advertising_id</code>.</p>

  > Poderia haver um terceiro serviço para gerar o html do e-mail, porém não é o foco do projeto.

  </br>

  <b>Consumidor</b>

  <p>Serviço que envia e-mail contendo o <code>Payload</code> recebido.</p>
  
  ---

  </details>

  </br>

  <b>1. Veja no exemplo "Hello world" como criar uma rede</b>

  <b>2. Veja no exemplo "Hello world" como criar o servidor RabbitMQ</b>    

  <b>3. Crie as imagens dockerfile</b>

  ```
    A ser feito
  ```

</details>