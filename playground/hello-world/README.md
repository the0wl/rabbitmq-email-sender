# Hello world
    
Envia e recebe uma mensagem "Hello world"

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