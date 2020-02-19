const express = require('express');

const server = express();

var produtos = [
{ id: 1, nome: 'Computador', preco: 1200.20 },
{ id: 2, nome: 'Mouse', preco: 20.50 },
{ id: 3, nome: 'Teclado', preco: 220.50 }
];

server.use(express.json());

server.get('/produto', function(request, response) {
    return response.json(produtos);

})

server.get('/produto/:id', function(request, response) {
    const id = request.params.id;
    const produto = produtos.filter(p => p.id == id);
    return response.json(produto);
})

server.post('/produto', function(request, response) {
    const produto = request.body;
    produtos.push(produto);
    return response.status(201).send();
})

server.delete('/produto/:id', function(request, response) {
    const id = request.params.id;
    produtos = produtos.filter(p => p.id != id);
    return response.status(200).send();
})

server.put('/produto/:id', (request, response) => {
    const id = request.params.id;
    const produto = request.body;

    produtos.forEach(p => {
        if(p.id == id) {
            p.nome = produto.nome;
            p.preco = produto.preco;
            return;
        }
    })
    return response.send();
})

server.listen(3000);

