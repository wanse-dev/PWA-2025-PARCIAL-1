# PWA-2025-PARCIAL-1

## Comando para la ejecución:
- npm run dev

## Rutas de cada endpoint para probar en postman
### POST
createPost: POST - http://localhost:3000/api/posts/
getPosts: GET - http://localhost:3000/api/posts/
getPostById: GET - http://localhost:3000/api/posts/:id
updatePost: PATCH - http://localhost:3000/api/posts/update/:id
deletePost: DELETE - http://localhost:3000/api/posts/delete/:id
giveLike: PATCH - http://localhost:3000/api/posts/like/:id
### USER
createUser: POST - http://localhost:3000/api/users/
getUsers: GET - http://localhost:3000/api/users/
getUserById: GET - http://localhost:3000/api/users/:id
updateUser: PUT - http://localhost:3000/api/users/update/:id
disableUser: PATCH - http://localhost:3000/api/users/disable/:id
enableUser: PATCH - http://localhost:3000/api/users/enable/:id

## Aclaraciones:
Las cuentas que aparecen como que contribuyeron ambas son mías, ya que me creé recientemente una cuenta nueva de github pero me quedó la anterior conectada. De todos modos edité el autor de los primeros commits para que queden a nombre de la cuenta con la que creé el repo.

## Diagrama de clases
Dejo a continuación un diagrama de clases sencillo que me sirvió únicamente a modo orientativo para no tener que estar constantemente buscando los requisitos en la consigna del parcial.

![Diagrama de clases](https://i.imgur.com/s9B6yF0.png)