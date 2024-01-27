# Task Queue

Simula o envio de tarefas pesadas/demoradas

> Foram adicionadas as seguintes variáveis de ambiente: `USER`, `PASS`, `HOST`, `PORT`.

> A task possui também a variável `MESSAGE`.

> O worker possui também as variáveis `PREFETCH` e `NOACK`. A descrição do uso delas está documentada no código.

> Utilize-as por meio do comando `docker run -e` ou crie um arquivo `.env` na pasta do serviço antes de criar a imagem.

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