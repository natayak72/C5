/*
Напишите код приложения, интерфейс которого представляет собой 
input и кнопку. 
В input можно ввести любое число. 
При клике на кнопку должно происходить следующее:

Если число не попадает в диапазон от 
1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
Если число попадает в диапазон от 1 до 10 — 
сделать запрос c помощью XHR по 
URL https://picsum.photos/v2/list?limit=10, 
где get-параметр limit — это введённое число.
Пример: если пользователь ввёл 5, то запрос 
будет вида https://picsum.photos/v2/list?limit=5.
После получения данных вывести ниже картинки на экран.
*/
console.log('Начало работы...')

const list_href = 'https://picsum.photos/v2/list?limit='

// --------------- XHR
// убрано в файл xhr_load.js


// --------------- fetch
// убрано в файл fetch_load.js


// --------------- fetch_async
// убрано в файл fetch_async_load.js



