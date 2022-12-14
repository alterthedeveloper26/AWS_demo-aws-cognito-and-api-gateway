## Description

User and Subscription service

## Environment
- NodeJS: 14 (or higher)
- Yarn: 1.22 (or higher, no yarn 2)

## Installation

```bash
$ yarn
```

## Running the app
 CREATE EXTENSION postgis;
 CREATE EXTENSION postgis_topology;
 
```bash
# before start
$ yarn build

$ yarn db:migrate

# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

## Code base structure
```js
+-- dist
+-- src
|   +-- base // base entity, error, response...
|   |   +-- baseDto.ts
|   |   +-- baseEntity.ts
|   |   +-- baseError.ts
|   |   +-- baseResponse.ts
|   |   +-- ...
|   +-- common // shared types, functions, constants ...
|   |   +-- utils
|   |   +-- constants // include all contants used, can use // ===== to separate targets
|   |   +-- types
|   |   +-- decorators
|   |   +-- interceptors
|   |   +-- middlewares
|   |   +-- ...
|   +-- modules // contains all modules to build the application
|   |   +-- domains // domain entity: user, subscription, car ...
|   |   |   +-- exampleEntity
|   |   |   |   +-- dto.ts // can use dto folder if there are multiple dtos
|   |   |   |   +-- entity.ts // can use entity folder if there are multiple entities
|   |   |   |   +-- controller.ts // can use controller folder if there are multiple controllers
|   |   |   |   +-- service.ts // can use service folder if there are multiple services
|   |   |   |   +-- types.ts // includes types, interfaces, enums... Can use // ===== to separate targets
|   |   +-- auth // Authentication module
|   |   +-- shared // shared modules used by mutiple entity modules: database, redis, rabbitmq, elastic search, aws,    external services...
|   |   +-- config // config module to get config from specific targets: env, secret-manager(aws) ...
|   +-- test
+-- .env
+-- other files...
```

## Extensions needed
- Typescript Import Sorter [here](https://marketplace.visualstudio.com/items?itemName=mike-co.import-sorter)
- Prettier [here](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)#   A W S _ d e m o - a w s - c o g n i t o - a n d - a p i - g a t e w a y  
 #   A W S _ d e m o - a w s - c o g n i t o - a n d - a p i - g a t e w a y  
 