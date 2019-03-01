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

Podemos ver las colas que tenemos operativas:
~~~
rabbitmqctl list_queues
~~~

## HELLO WORLD

### Send

La idea básica que sigue es crear una conexión con *RabbitMQ* y posteriormente crear un canal mediante la conexión creada.

Una vez dentro de la conexión del canal, podemos crearnos una cola cualquiera, esta tiene que tener el mismo nombre que la que usemos en el receptor, sino, nunca conectarán. Finalmente en el enviador, enviaremos el contenido que deseemos.

### Receive

Sigue la misma idea de conexión que el enviador. Pero difiere en una cuestión importante, aquí no enviamos contenido, sino que lo recibimos de forma *asíncrona*. Esto conlleva a que el receptor esté continuamente esperando a que alguien envie contenido por el canal y la cola concreta.

## COLAS DE TRABAJO - ROUND ROBIN

En este ejemplo generaremos una cadena que será leída por el productor (esta cadena se pasa como argumento en la llamada), en la que cada punto será un segundo a esperar en el consumidor, para asi simular una carga de trabajo.

Lo bueno de las colas de tareas es que si se está acumulando mucho trabajo
podemos agregar más trabajadores => ESCALABILIDAD.

- noAck: Para informar que el mensaje ha sido recibido, si esta en false se envía.

- Para no perder la cola si se cae el servidor de RabbitMQ:
    canal.assertQueue(cola, {durable: true});  => Tanto en productor como consumidor.
- Si no queremos perder los mensajes (persistent):
    canal.sendToQueue(cola, Buffer.from(msg), {persistent: true});
- Si queremos que un trabajador no tome un nuevo trabajo hasta que no termine el anterior:
    canal.prefetch(1);

## PUBLICAR - SUBSCRIBIR

