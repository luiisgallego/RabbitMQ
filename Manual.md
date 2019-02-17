## Instalación de RabbitMQ MAC OS

Realizamos los siguientes pasos:
1. Instalamos:
    ~~~
    brew update
    brew install rabbitmq
    ~~~
2. Configuramos:
    2.1. Añadimos en ~/.bash_profile lo siguiente: *export PATH=$PATH:/usr/local/sbin*
3. Arrancamos RabbitMQ:
    ~~~
    rabbitmq-server
    ~~~

## RabbitMQ - NodeJS

### Send

La idea básica que sigue es crear una conexión con *RabbitMQ* y posteriormente crear un canal mediante la conexión creada.

Una vez dentro de la conexión del canal, podemos crearnos una cola cualquiera, esta tiene que tener el mismo nombre que la que usemos en el receptor, sino, nunca conectarán. Finalmente en el enviador, enviaremos el contenido que deseemos.

### Receive

Sigue la misma idea de conexión que el enviador. Pero difiere en una cuestión importante, aquí no enviamos contenido, sino que lo recibimos de forma *asíncrona*. Esto conlleva a que el receptor esté continuamente esperando a que alguien envie contenido por el canal y la cola concreta.