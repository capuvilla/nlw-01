# Ecoleta
> Projeto construído durante o Next Level Week #01

![](readme/capa.png)

## Dependencias

> Necessário NodeJS

## Tecnologias

> Server
>- Node.JS
> Web
>- React
> Mobile
>- React Native

## Configurações

### Para o backend

- Criar uma pasta para o backend, e inicializar um projeto node:
- Aqui utilizaremos a pasta server
- Acessar esta pasta e executar npm init -y
- npm install express
- npm install @types/express -D
- npm install typescript -D
- npm install ts-node -D
- npm install ts-node-dev -D
- npx tsc --init
- npm install knex
- npm install sqlite3
- yarn add multer
- yarn add @types/multer -D

Adicionar em package.json, em scripts:
"dev": "ts-node-dev src/server.ts"
Onde src/server.ts => É o caminho para o arquivo criado como server.ts

- npm run dev

>CORS
>- npm install cors
>- npm install @types/cors -D

### Entidades

- points (pontos de coleta)
    - image
    - name
    - email
    - whatsapp
    - latitude
    - longitude
    - city
    - uf
- items (itens para coleta)
    - image
    - title
- point_items (Relacionamento dos itens que um ponto coleta) *muitos para muitos (N-N) (Pivot)*
    - point_id
    - item_id

### Migrations = Hitórico do banco de dados

- Create table points
- Create table users
- Para importar as migrations:
npx knex migrate:latest --knexfile knexfile.ts migrate:latest

### Para o frontend

- Inicializa um projeto react na pasta desejada (neste caso web), adicionando o template do typescript:
- npx create-react-app web --template=typescript
- npm install react-icons
- npm install react-router-dom
- npm install @types/react-router-dom -D
- npm i leaflet
- npm i react-leaflet
- npm install @types/react-leaflet -D
- npm install axios

- npm start

### Funcionalidades da aplicação

- Cadastro do ponto de coleta
- Lista os itens de coleta
- Listar pontos (filtro por estado/cidade/items)
- Listar ponto de coleta específico

### Para Mobile

- Instalar o expo CLI
- yarn global add expo-cli

- Criar o projeto mobile
- expo init mobile

- expo-template-blank-typescript

Importar as fontes para o projeto
expo install expo-font @expo-google-fonts/ubuntu @expo-google-fonts/roboto

yarn add @react-navigation/native

expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

yarn add @react-navigation/stack

expo install react-native-maps

expo install expo-constants
yarn add react-native-emoji --save
expo install react-native-svg

### Observações

- Rota: Endereço completo da requisição
- Recurso: Qual entidade estamos acessando do sistema

- GET: Buscar uma ou mais informações do back-end
- POST: Criar uma nova informação no back-end
- PUT: Atualizar uma informação existente no back-end
- DELETE: Remove uma informação do back-end

- Exemplo:
- POST => http://localhost:3333/users = Criar um usuário
- GET => http://localhost:3333/users = Listar usuário
- GET => http://localhost:3333/users/5 = Buscar dados usuário com ID 5

- Request Param: Paramêtros que vem na rota que identificam um recuso
- Query Param: Paramêtros que vem na própria rota geralmente opcionais para filtros, paginação ...
- Request Body: Paramêtros para criação/atualização de informações

- Exemplo de uso KNEX
- SELECT * FROM users WHERE name = 'Diego'
- knex('users').where('name', 'Diego').selct('*')

> Extrutura antiga do React
```sh
function App() {
    return React.createElement('h1', {
        children: 'Hello World'
    });
}
```

> Extrutura nova do React
```sh
function App() {
    return (
        < h1 > Hello World </ h1 >
    );
}
```

JSX: Sintaxe de XML dentro do JavaScript
