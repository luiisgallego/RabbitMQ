#!/usr/bin/env node

// Dependencias
var amqp = require('amqplib/callback_api');

// Conectamos con RabbitMQ
amqp.connect('amqp://localhost', function(error, conexion){
    // Creamos canal
    conexion.createChannel(function(error, canal){
        // Declaramos la cola que vamos a consumir
        // Tiene que ser igual a la cola de enviar
        var cola = 'hello';

        // Es necesario declarar la cola ya que podemos
        // iniciar el consumidor antes que el editor
        canal.assertQueue(cola, {durable: false});
        
        // Consumimos de forma ASINCRONA
        console.log("Esperando mensajes...", cola);
        canal.consume(cola, function(msg){
            console.log("Recibido: ", msg.content.toString());
        }, {noAck: true});
    });
});
