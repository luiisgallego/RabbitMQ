#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error, conexion){
    conexion.createChannel(function(error, canal){
        var cola = 'task_queue';

        canal.assertQueue(cola, {durable: true});     
        canal.prefetch(1);   
        console.log("Esperando mensajes...", cola);

        canal.consume(cola, function(msg){
            var secs = msg.content.toString().split('.').length - 1; 
            console.log("Recibido: ", msg.content.toString());

            setTimeout(function(){
                console.log("Hecho");
            }, secs * 1000);

        }, {noAck: false});
    });
});
