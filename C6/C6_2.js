// ----------------------------- C6.2
const get_screen_size_btn = document.getElementById('get_screen_size_btn_id')
const send_notification_btn = document.getElementById('send_notification_btn_id')
const screen_size_p = document.getElementById('screen_size_p_id')
screen_size_p.style.visibility = 'hidden'

const create_notification = function () {
    if (!("Notification" in window)) {
        console.log("Нет поддержки Notification API");
    }// Если Notification API и разрешение на отправку
    // есть, то отправим уведомление
    else if (Notification.permission === "granted") {
        new Notification("Hello!");
    } // Если Notification API есть, но нет разрешения и нет
    // запрета, то можно запросить разрешение
    else if (Notification.permission !== "denied") {
        Notification.requestPermission()
            .then(function (permission) {
                if (permission === "granted") {
                    let notification = new Notification("Hi there!");
                }
            });
    }
    // Последний случай - пользователь запретил уведомления
    // Тогда показать уведомления нельзя
}

const showScreenSize = function() {
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight

    const message = `Экран (ВхШ): ${height}x${width} `
    screen_size_p.textContent = message
    screen_size_p.style.visibility = 'visible'

    alert(`Экран (ВхШ): ${height}x${width} `)

}

send_notification_btn.addEventListener('click', create_notification)
get_screen_size_btn.addEventListener('click', showScreenSize)


// ----------------------------- C6.3


