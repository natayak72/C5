const number_input_xhr = document.getElementById("number_input_xhr_id")
const send_button_xhr = document.getElementById("send_button")
const xhr_delete_images_btn = document.getElementById("delete_images_btn_xhr_id")
const input_error_message = document.getElementById("input_error_message")
const image_container = document.getElementById("image_container_xhr_id")

// 1. валидация ввода
number_input_xhr.addEventListener('input',
    () => {
        if (number_input_xhr.validity.valid) {
            send_button_xhr.disabled = false
            input_error_message.style.visibility = 'hidden'

        } else {
            send_button_xhr.disabled = true

            if (number_input_xhr.value.length !== 0) {
                input_error_message.style.visibility = 'visible'
            } else {
                input_error_message.style.visibility = 'hidden'
            }
        }
    })

// 2. получение данных с бэка
const get_list_of_images_xhr = function() {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", `${list_href}${number_input_xhr.value}`, ['async'])

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

        // 3. ДАТЬ ВОЗМОЖНОСТЬ УДАЛЯТЬ НОВЫЕ КАРТИНКИ
        xhr_delete_images_btn.disabled = false
    };
}

// 3. удаление данных
const delete_images_xhr = function() {
    image_container.replaceChildren()
    xhr_delete_images_btn.disabled = true
}


// 4. назначение кнопок
send_button_xhr.addEventListener('click', get_list_of_images_xhr)
xhr_delete_images_btn.addEventListener('click', delete_images_xhr)