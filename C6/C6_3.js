const chat_send_msg_btn = document.getElementById('chat_send_msg_btn_id')
const clear_chat_btn = document.getElementById('clear_chat_btn_id')
const chat_send_location_btn = document.getElementById('chat_send_location_btn_id')
const chat_input = document.getElementById('chat_input_id')
const chat_window = document.getElementById('chat_window_id')

const MESSAGE_ELEM_STYLE = 'text-align: right;padding-bottom: 10px; margin: 25px 15px 0 15px;'
let MY_COORDINATES = ''

const wsUri = "wss://echo-ws-service.herokuapp.com";
const websocket = new WebSocket(wsUri);
const clearChat = function () {
    chat_window.replaceChildren()
}
websocket.onopen = function(evt) {
    chat_send_msg_btn.textContent = 'Отправить'
    chat_send_msg_btn.disabled = false
};
websocket.onerror = function(evt) {
    console.error(evt.data)
};
websocket.onmessage = function(evt) {
    const recvMessage = document.createElement('p')
    recvMessage.textContent = evt.data
    chat_window.appendChild(recvMessage)
};


const sendMessage = function () {
    websocket.send(chat_input.value);
    const sentMessage = document.createElement('p')
    sentMessage.style.cssText = MESSAGE_ELEM_STYLE
    sentMessage.textContent = chat_input.value
    chat_window.appendChild(sentMessage)
}

const error = function() {
    console.error('error(): Невозможно получить ваше местоположение')
}

const success = function(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    MY_COORDINATES = `Широта: ${latitude} °, Долгота: ${longitude} °`

    let link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    const link_element = createLinkElement(link)
    chat_window.appendChild(link_element)
}

const sendLocation = function() {
    if (!navigator.geolocation) {
        console.error('Geolocation не поддерживается вашим браузером')
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function createLinkElement(link) {
    const basic_element = document.createElement('div')
    basic_element.style.cssText = MESSAGE_ELEM_STYLE


    const link_element = document.createElement('a')
    link_element.setAttribute('href', link)
    link_element.setAttribute('target', '_blank')
    link_element.textContent = 'Место';

    basic_element.appendChild(link_element)

    return basic_element
}



chat_send_msg_btn.addEventListener('click', sendMessage)
clear_chat_btn.addEventListener('click', clearChat)
chat_send_location_btn.addEventListener('click', sendLocation)
