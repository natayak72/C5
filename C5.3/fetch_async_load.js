const number_input_fetch_async = document.getElementById("number_input_fetch_async")
const send_button_fetch_async = document.getElementById("send_button_fetch_async")
const delete_images_btn_fetch_async = document.getElementById("delete_images_btn_fetch_async")
const input_error_message_fetch_async = document.getElementById("input_error_message_fetch_async")
const image_container_fetch_async = document.getElementById("image_container_fetch_async")


// 1.
number_input_fetch_async.addEventListener('input',
    () => {
        if (number_input_fetch_async.validity.valid) {
            send_button_fetch_async.disabled = false
            input_error_message_fetch_async.style.visibility = 'hidden'

        } else {
            send_button_fetch_async.disabled = true

            if (number_input_fetch_async.value.length !== 0) {
                input_error_message_fetch_async.style.visibility = 'visible'
            } else {
                input_error_message_fetch_async.style.visibility = 'hidden'
            }
        }
    })


// 2.
const useFetch = function () {
    return fetch(`${list_href}${number_input_fetch_async.value}`)
        .then(response => response.json())
        .then(json => json)
        .catch((error) => { console.log(`error in fetch: ${error}`)})
}

const get_list_of_images_fetch_async = async function() {
    send_button_fetch_async.disabled = true
    const images_list = await useFetch()
    // 1. УДАЛИТЬ ВСЕ СУЩЕСТВУЮЩИЕ КАРТИНКИ
    image_container_fetch_async.replaceChildren()

    // 2. ДОБАВИТЬ НОВЫЕ КАРТИНКИ
    for (let image of images_list) {
        const img = document.createElement('img')
        img.src = image['download_url']
        image_container_fetch_async.appendChild(img)
    }

    // 3. ДАТЬ ВОЗМОЖНОСТЬ УДАЛЯТЬ НОВЫЕ КАРТИНКИ
    delete_images_btn_fetch_async.disabled = false

    // 4. ВЕРНУТЬ ВОЗМОЖНОСТЬ ПОЛУЧАТЬ КАРТИНКИ
    send_button_fetch_async.disabled = false
}


// 3.
const delete_images_fetch_async = function() {
    image_container_fetch_async.replaceChildren()
    delete_images_btn_fetch_async.disabled = true
}

// 4.
send_button_fetch_async.addEventListener('click', get_list_of_images_fetch_async)
delete_images_btn_fetch_async.addEventListener('click', delete_images_fetch_async)