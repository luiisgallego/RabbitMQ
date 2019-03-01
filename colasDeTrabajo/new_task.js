#!/usr/bin/env node

// Dependencias
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error, conexion){
    conexion.createChannel(function(error, canal){
        var cola = 'task_queue';
        var msg = process.argv.slice(2).join('') || "Hola mundo!"
        
        canal.assertQueue(cola, {durable: true});
        canal.sendToQueue(cola, Buffer.from(msg), {persistent: true});

        console.log("[x] Enviado '%s'", msg);
    });
    setTimeout(function(){
        conexion.close();
        process.exit(0)
    }, 500);
});
