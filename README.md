# Тестовое задание для фронтенд разработчика в компанию “Красивый Город”

Тестовое задание, выполнено на следующем стеке

- vue 3 composition api
- typescript
- pinia
- vue router
- vite
- axios

## Запуск проекта

```sh
npm i
```

```sh
npm run dev
```

## Суть задания

Задание необходимо выполнить на Vue

1. Собрать приложение для просмотра сообщений и комментариев к ним на основе данных сервиса [jsonplaceholder](https://jsonplaceholder.typicode.com/)

    1. [posts](https://jsonplaceholder.typicode.com/posts)
    1. [comments](https://jsonplaceholder.typicode.com/comments)
    1. [users](https://jsonplaceholder.typicode.com/users)

1. Не использовать библиотеки готовых компонентов типа vuetify

1. Приложение должно включать таблицу сообщений и форму редактирования.

    1. Таблица сообщений:
        - Должна быть сгруппирована по авторам.
        - Группы должны интерактивно скрываться и раскрываться.
        - В группе показывать данные пользователя: id, username, name, company.name, website
        - Для сообщения показывать id, title, words, chars . Последние два параметра рассчитывать при отображении
    1. Форма редактирования должна содержать:
        - Id сообщения
        - Поля для редактирования title, body
        - Список комментариев, для каждого: email, name, body
