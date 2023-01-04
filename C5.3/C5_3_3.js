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

const number_input = document.getElementById("number_input")
const send_button = document.getElementById("send_button")
const input_error_message = document.getElementById("input_error_message")
const image = document.getElementById("image")
const image_container = document.getElementById("image_container")

number_input.addEventListener('input',
    () => {
        if (number_input.validity.valid) {
            send_button.disabled = false
            input_error_message.style.visibility = 'hidden'

         } else {
             send_button.disabled = true

            if (number_input.value.length !== 0) {
                input_error_message.style.visibility = 'visible'
            } else {
                input_error_message.style.visibility = 'hidden'
            }
         }
    })


const get_list_of_images = function() {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", `${href}${number_input.value}`, ['async'])

    xhr.send()

    xhr.onload = function() {
        // 1. УДАЛИТЬ ВСЕ СУЩЕСТВУЮЩИЕ КАРТИНКИ
        image_container.replaceChildren()

        // 2. ДОБАВИТЬ НОВЫЕ КАРТИНКИ
        let res = JSON.parse(xhr.response)
        for (let image of res) {
            const img = document.createElement('img')
            img.src = image['download_url']
            image_container.appendChild(img)
        }
      };
}


send_button.addEventListener('click', get_list_of_images)
