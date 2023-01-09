const basic_href = 'https://picsum.photos/'

const number_input_width = document.getElementById("number_inp_width_id")
const number_input_height = document.getElementById("number_inp_height_id")
const send_btn = document.getElementById("send_btn_id")
const delete_images_btn = document.getElementById("delete_images_btn_id")
const error_message_width = document.getElementById("width_error_message_id")
const error_message_height = document.getElementById("height_error_message_id")
const image_container = document.getElementById("image_container_id")


// 1. ВАЛИДАЦИЯ ПОЛЕЙ
number_input_width.addEventListener('input',
    () => {
        if (number_input_width.validity.valid && number_input_height.validity.valid) {
            send_btn.disabled = false
            error_message_width.style.visibility = 'hidden'
        } else {
            send_btn.disabled = true
        }


        if ((number_input_width.value < 100 || number_input_width.value > 300) && number_input_width.value.length !== 0) {
            error_message_width.style.visibility = 'visible'
        } else {
            error_message_width.style.visibility = 'hidden'
        }

    })

number_input_height.addEventListener('input',
    () => {
        if (number_input_width.validity.valid && number_input_height.validity.valid) {
            // ДАННЫЕ ВЕРНЫ, УБРАТЬ СООБЩЕНИЯ ОБ ОШИБКАХ, РАЗБЛОКИРОВАТЬ КНОПКУ
            send_btn.disabled = false
            error_message_height.style.visibility = 'hidden'
        } else {
            // ДАННЫЕ НЕВЕРНЫ, ЗАБЛОКИРОВАТЬ КНОПКУ
            send_btn.disabled = true
        }

        if ((number_input_height.value < 100 || number_input_height.value > 300) && number_input_height.value.length !== 0) {
            error_message_height.style.visibility = 'visible'
        } else {
            error_message_height.style.visibility = 'hidden'
        }
    })


// 2.
const useFetch = function () {
    const options = {
        method: 'GET',
        redirect: 'follow'
    }
    return fetch(`${basic_href}${number_input_width.value}/${number_input_height.value}`, options)
        .then(response => response.url)
        .then(img_url => img_url)
        .catch((error) => { console.log(`error in fetch: ${error}`)})
}

const get_image = async function() {
    send_btn.disabled = true
    const img_url = await useFetch()
    console.log(`get_list_of_images_fetch_async(): got ${img_url}`)
    // 1. УДАЛИТЬ ВСЕ СУЩЕСТВУЮЩИЕ КАРТИНКИ
    image_container.replaceChildren()

    // 2. ДОБАВИТЬ НОВУЮ КАРТИНКУ
    const img = document.createElement('img')
    img.src = img_url
    image_container.appendChild(img)

    // 3. ДАТЬ ВОЗМОЖНОСТЬ УДАЛЯТЬ НОВЫЕ КАРТИНКИ
    delete_images_btn.disabled = false

    // 4. ВЕРНУТЬ ВОЗМОЖНОСТЬ ПОЛУЧАТЬ КАРТИНКИ
    send_btn.disabled = false
}


// 3.
const delete_images = function() {
    image_container.replaceChildren()
    delete_images_btn.disabled = true
}

// 4.
send_btn.addEventListener('click', get_image)
delete_images_btn.addEventListener('click', delete_images)