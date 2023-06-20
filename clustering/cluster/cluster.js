const express = require('express');
const cluster = require('cluster');
const { cpus } = require('os');
const { cp } = require('fs/promises');
const { pid } = process;
const app = express();
const PORT = 3000;

function fib(n) {
    if (n < 3) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
}

if (cluster.isPrimary) {
    console.log(`Primary ${pid} is running`);

    for (let i = 0; i < cpus().length; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    console.log(`Worker ${pid} started`);

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.get('/cluster', (req, res) => {
        let n = parseInt(req.query.n);
        if (n > 45) {
            res.send('n is too large! Server is shutting Down ..............................');
        }
        let result = fib(n);
        res.send('Fibonacci of ' + n + ' is ' + result);
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
}