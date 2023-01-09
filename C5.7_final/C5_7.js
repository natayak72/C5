const basic_href = 'https://picsum.photos/v2/list?'

const page_num_inp = document.getElementById("page_num_inp_id")
const limit_inp = document.getElementById("limit_inp_id")
const send_btn = document.getElementById("send_btn_id")
const delete_images_btn = document.getElementById("delete_images_btn_id")
const error_message = document.getElementById("error_message_id")
const image_container = document.getElementById("image_container_id")


const ERR_WRONG_PAGE_NUM_MESSAGE = 'Неверно указан номер страницы!'
const ERR_WRONG_LIMIT_MESSAGE = 'Неверно указан лимит!'
const ERR_WRONG_PAGE_NUM_AND_LIMIT_MESSAGE = 'Неверно указан номер страницы и лимит!'



// 1. ВАЛИДАЦИЯ ПОЛЕЙ
const checkInputs = function () {
    const limitEmpty = limit_inp.value.length === 0
    const limitValid = limit_inp.validity.valid

    const pagesEmpty = page_num_inp.value.length === 0
    const pagesValid = page_num_inp.validity.valid

    if (limitValid && pagesValid) {
        send_btn.disabled = false
        error_message.style.visibility = 'hidden'
    } else {
        send_btn.disabled = true
        if (pagesValid && !limitValid) {
            if (!limitEmpty) {
                error_message.textContent = ERR_WRONG_LIMIT_MESSAGE
                error_message.style.visibility = 'visible'
            }
        } else if (!pagesValid && limitValid) {
            if (!pagesEmpty) {
                error_message.textContent = ERR_WRONG_PAGE_NUM_MESSAGE
                error_message.style.visibility = 'visible'
            }
        } else {
            if (pagesEmpty && limitEmpty) {
                error_message.style.visibility = 'hidden'
            } else if (limitEmpty) {
                error_message.textContent = ERR_WRONG_PAGE_NUM_MESSAGE
                error_message.style.visibility = 'visible'
            } else if (pagesEmpty) {
                error_message.textContent = ERR_WRONG_LIMIT_MESSAGE
                error_message.style.visibility = 'visible'
            } else  {
                error_message.textContent = ERR_WRONG_PAGE_NUM_AND_LIMIT_MESSAGE
                error_message.style.visibility = 'visible'
            }

        }

    }
}
page_num_inp.addEventListener('input', checkInputs)
limit_inp.addEventListener('input', checkInputs)

// 2. ЗАГРУЗКА ИЗОБРАЖЕНИЙ
const get_images = function () {
    const fetch_url = `${basic_href}page=${page_num_inp.value}&limit=${limit_inp.value}`
    fetch(fetch_url)
        .then(response => response.json())
        .then((data) => {
            // 1. УДАЛИТЬ ВСЕ СУЩЕСТВУЮЩИЕ КАРТИНКИ
            image_container.replaceChildren()

            // 2. ПОЧИСТИТЬ LOCAL_STORAGE
            localStorage.setItem('images', JSON.stringify([]))

            // 3. ДОБАВИТЬ НОВЫЕ КАРТИНКИ
            let images = []
            for (let image of data) {
                const img = document.createElement('img')
                img.src = image['download_url']
                image_container.appendChild(img)
                images.push(image['download_url'])
            }

            // 4. ДАТЬ ВОЗМОЖНОСТЬ УДАЛЯТЬ НОВЫЕ КАРТИНКИ
            delete_images_btn.disabled = false

            // 5. ДОБАВИТЬ НОВЫЕ КАРТИНКИ В LOCAL_STORAGE
            localStorage.setItem('images', JSON.stringify(images))
        })
        .catch((data) => { console.error(`get_list_of_images_fetch(): error in fetch.then(): ${data}`)})
}


// 3. УДАЛЕНИЕ КАРТИНОК
const delete_images = function() {
    image_container.replaceChildren()
    localStorage.removeItem('images')
    delete_images_btn.disabled = true
}

// 4.ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ НАЖАТИЙ
send_btn.addEventListener('click', get_images)
delete_images_btn.addEventListener('click', delete_images)

// 5. ЗАГРУЗИТЬ КАРТИНКИ ИЗ LOCAL_STORAGE
if (localStorage.getItem('images') !== null) {
    delete_images_btn.disabled = false
    for (let image of JSON.parse(localStorage.getItem('images'))) {
        const img = document.createElement('img')
        img.src = image
        image_container.appendChild(img)
    }
}
