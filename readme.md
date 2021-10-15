## Node.js REST-API for contact book

## RUN:
 
- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок

## REST API for handle contacts.

## MongoDB database

- @ GET /api/contacts
ничего не получает
вызывает функцию listContacts для работы с json-файлом contacts.json
возвращает массив всех контактов в json-формате со статусом 200

- @ GET /api/contacts/:contactId
Не получает body
Получает параметр contactId
вызывает функцию getById для работы с json-файлом contacts.json
если такой id есть, возвращает обьект контакта в json-формате со статусом 200
если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404

- @ POST /api/contacts
Получает body в формате {name, email, phone}
Если в body нет каких-то обязательных полей, возвращает json с ключом {"message": "missing required name field"} и статусом 400
Если с body все хорошо, добавляет уникальный идентификатор в объект контакта
Вызывает функцию addContact(body) для сохранения контакта в файле contacts.json
По результату работы функции возвращает объект с добавленным id {id, name, email, phone} и статусом 201

- @ DELETE /api/contacts/:contactId
Не получает body
Получает параметр contactId
вызывает функцию removeContact для работы с json-файлом contacts.json
если такой id есть, возвращает json формата {"message": "contact deleted"} и статусом 200
если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404

- @ PUT /api/contacts/:contactId
Получает параметр contactId
Получает body в json-формате c обновлением любых полей name, email и phone
Если body нет, возвращает json с ключом {"message": "missing fields"} и статусом 400
Если с body все хорошо, вызывает функцию updateContact(contactId, body) (напиши ее) для обновления контакта в файле contacts.json
По результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404

- @ PATCH /api/contacts/:contactId/favorite
Получает параметр contactId
Получает body в json-формате c обновлением поля favorite
Если body нет, возвращает json с ключом {"message": "missing field favorite"} и статусом 400
Если с body все хорошо, вызывает функцию updateStatusContact(contactId, body) (напиши ее) для обновления контакта в базе
По результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404

## Joi validation for (POST, PUT, PATCH)

## SIGNUP request

### POST /users/signup
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}

- Registration validation error

Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой библиотеки валидации>

- Registration conflict error

Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
  "message": "Email in use"
}

- Registration success response

Status: 201 Created
Content-Type: application/json
ResponseBody: {
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}

## SIGNIN request

### POST /users/login
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}

-Login validation error

Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой библиотеки  валидации>

- Login success response
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "token": "exampletoken",
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}

- Login auth error
Status: 401 Unauthorized
ResponseBody: {
  "message": "Email or password is wrong"
}

-Middleware unauthorized error

Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}

## LOGOUT request

### POST /users/logout
Authorization: "Bearer {{token}}"

- Logout unauthorized error

Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}

- Logout success response

Status: 204 No Content

### GET /users/current
Authorization: "Bearer {{token}}"

- Current user unauthorized error

Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}

- Current user success response

Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "email": "example@example.com",
  "subscription": "starter"
}

## Pagination

- mongoose-paginate-v2 for contacts collection (GET /contacts?page=1&limit=20)

## Filter contacts

- filter by field "favorite" (GET /contacts?favorite=true)

## Update subscription

### PATCH /users

- Subscription must have enum ['starter', 'pro', 'business']
- Default value ['starter']

## Upload avatar by multer

- create default avatar with gravatar by signup
- upload new avatar
PATCH "/users/avatars"

- handled uploading avatar with jimp

## Verification email with SendGrid

### Verification request
GET /auth/verify/:verificationToken

- Verification user Not Found
Status: 404 Not Found
ResponseBody: {
  message: 'User not found'
}

- Verification success response
Status: 200 OK
ResponseBody: {
  message: 'Verification successful',
}

### Resending email request (additional opportunity)

- POST /users/verify/
Получает body в формате { email }
Если в body нет обязательного поля email, возвращает json с ключом {"message": "missing required field email"} и статусом 400
Если с body все хорошо, выполняем повторную отправку письма с verificationToken на указанный email, но только если пользователь не верифицирован
Если пользователь уже прошел верификацию отправить json с ключом { message: "Verification has already been passed"} со статусом 400 Bad Request

Resending a email request
POST /users/verify
Content-Type: application/json
RequestBody: {
  "email": "example@example.com"
}

-Resending email validation error
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой библиотеки валидации>

-Resending a email success response
Status: 200 Ok
Content-Type: application/json
ResponseBody: {
  "message": "Verification email sent"
}

- Resend email for verified user
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: {
  message: "Verification has already been passed"
}

