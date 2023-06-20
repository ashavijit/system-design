const express = require ('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/cluster', (req, res) => {
    let n = parseInt(req.query.n);
    if (n>45){
        res.send('n is too large! Server is shutting Down ..............................' );
    }
    let result = fibonacci(n);
    res.send('Fibonacci of ' + n + ' is ' + result);
});

function fibonacci(n) {
    if (n <= 1)
        return n;
    else
        return fibonacci(n - 1) + fibonacci(n - 2);
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});