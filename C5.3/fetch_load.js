const number_input_fetch = document.getElementById("number_input_fetch")
const send_button_fetch = document.getElementById("send_button_fetch")
const delete_images_btn_fetch = document.getElementById("delete_images_btn_fetch")
const input_error_message_fetch = document.getElementById("input_error_message_fetch")
const image_container_fetch = document.getElementById("image_container_fetch")


// 1.
number_input_fetch.addEventListener('input',
    () => {
        if (number_input_fetch.validity.valid) {
            send_button_fetch.disabled = false
            input_error_message_fetch.style.visibility = 'hidden'

        } else {
            send_button_fetch.disabled = true

            if (number_input_fetch.value.length !== 0) {
                input_error_message_fetch.style.visibility = 'visible'
            } else {
                input_error_message_fetch.style.visibility = 'hidden'
            }
        }
    })


// 2.
const get_list_of_images_fetch = function () {
    fetch(`${list_href}${number_input_fetch.value}`)
        .then(response => response.json())
        .then((data) => {
            // 1. УДАЛИТЬ ВСЕ СУЩЕСТВУЮЩИЕ КАРТИНКИ
            image_container_fetch.replaceChildren()

            // 2. ДОБАВИТЬ НОВЫЕ КАРТИНКИ
            for (let image of data) {
                const img = document.createElement('img')
                img.src = image['download_url']
                image_container_fetch.appendChild(img)
            }

            // 3. ДАТЬ ВОЗМОЖНОСТЬ УДАЛЯТЬ НОВЫЕ КАРТИНКИ
            delete_images_btn_fetch.disabled = false

        })
        .catch((data) => { console.log(`get_list_of_images_fetch(): error in fetch.then(): ${data}`)})
}


// 3.
const delete_images_fetch = function() {
    image_container_fetch.replaceChildren()
    delete_images_btn_fetch.disabled = true
}

// 4.
send_button_fetch.addEventListener('click', get_list_of_images_fetch)
delete_images_btn_fetch.addEventListener('click', delete_images_fetch)