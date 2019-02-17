#!/usr/bin/env node

// Dependencias
var amqp = require('amqplib/callback_api');

// Conectamos con RabbitMQ
amqp.connect('amqp://localhost', function(error, conexion){
    // Creamos canal
    conexion.createChannel(function(error, canal){
        // Declaramos la cola 
        var cola = 'hello';
        var msg = 'Hello World!';
        
        // Enviamos
        // La cola se creará solo si no existe ya
        canal.assertQueue(cola, {durable: false});
        canal.sendToQueue(cola, Buffer.from(msg));

        console.log("Enviado Hello World.");
    });
    setTimeout(function(){
        conexion.close();
        process.exit(0)
    }, 500);
});
