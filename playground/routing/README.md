# Routing
    
Entregar uma mensagem para vários consumidores. Os consumidores só recebem mensagens nas quais estão inscritos com sua `routing key`.

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
docker exec -it rabbit-1 rabbitmq-plugins enable rabbitmq_management
```

Agora é possível acessar a interface visual do rabbitmq através de seu navegador na porta `8080`. Por padrão o usuário e senha são `guest`.

</br>

<b>3. Crie as imagens dockerfile</b>

Vá até a pasta `playground/routing/emit` e execute o comando:

```
docker build -t rabbitmq-pub-example .
```

Vá até a pasta `playground/routing/consume` e execute o comando:

```
docker build -t rabbitmq-sub-example .
```

</br>

<b>4. Crie os containers</b>

Instancie dois ou mais workers (utilize um em cada terminal, pois este ficará bloqueado por 1 minuto):

```
docker run -it --rm --net rabbits -e ROUTE="info" --name worker-1 rabbitmq-sub-example
docker run -it --rm --net rabbits -e ROUTE="info" --name worker-2 rabbitmq-sub-example
docker run -it --rm --net rabbits -e ROUTE="error" --name worker-3 rabbitmq-sub-example
```

Agora envie 3 mensagens pelo menos, para conseguir observar a funcionalidade:

```
docker run -it --rm --net rabbits -e ROUTE="info" -e MESSAGE="type=1 action=1 user-id=jt9a6g.6gfds.g678 description=\"User logged in\"" rabbitmq-pub-example
docker run -it --rm --net rabbits -e ROUTE="info" -e MESSAGE="type=3 action=2 user-id=jt9a6g.6gfds.g678 description=\"Check notifications list\"" rabbitmq-pub-example
docker run -it --rm --net rabbits -e ROUTE="error" -e MESSAGE="type=3 action=3 user-id=jt9a6g.6gfds.g678 description=\"Cannot get the notifications list\"" rabbitmq-pub-example
```