import express from 'express';

const app = express();

app.use(express.json());

// Rota: Endereço completo da requisição
// Recurso: Qual entidade estamos acessando do sistema

// GET: Buscar uma ou mais informações do back-end
// POST: Criar uma nova informação no back-end
// PUT: Atualizar uma informação existente no back-end
// DELETE: Remove uma informação do back-end

// Exemplo:
// POST => http://localhost:3333/users = Criar um usuário
// GET => http://localhost:3333/users = Listar usuário
// GET => http://localhost:3333/users/5 = Buscar dados usuário com ID 5

// Request Param: Paramêtros que vem na rota que identificam um recuso
// Query Param: Paramêtros que vem na própria rota geralmente opcionais para filtros, paginação ...
// Request Body: Paramêtros para criação/atualização de informações

// Exemplo de uso KNEX
// SELECT * FROM users WHERE name = 'Diego'
// knex('users').where('name', 'Diego').selct('*')

const users = [
    'Diego', // 0
    'Cleiton', // 1
    'Robson', // 2
    'Daniel' // 3
];

app.get('/users', (request, response) => {
    const search = String(request.query.search);

    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

    return response.json(filteredUsers);
});

app.get('/users/:id', (request, response) => {
    const id = Number(request.params.id);
    const user = users[id];
    return response.json(user);
});

app.post('/users', (request, response) => {
    const data = request.body;
    const user = {
        name: data.name,
        email: data.email
    }

    return response.json(user);
});

app.listen(3333);
