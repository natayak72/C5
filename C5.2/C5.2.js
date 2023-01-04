let fs = require('fs')

/**
 * C5.2 задание 1
 * 
 * Вам дана заготовка и результат, который вы должны получить. 
 * Ваша задача — написать код, который будет преобразовывать 
 * XML в JS-объект и выводить его в консоль.
 */

const c52_1 = function() {
    let convert = require('xml-js')

    let xml_file_path = './c521_test.xml'
    let xml_file_data = fs.readFileSync(xml_file_path, 'utf8');

    // Преобразование XML в JS-объект
    // let result = JSON.parse(convert.xml2json(xml_file_data, {compact: true, spaces: 4}))

    console.log(convert.xml2json(xml_file_data))
    let result = JSON.parse(convert.xml2json(xml_file_data))



    // Вывод в консоль JS-Объекта
    // console.log(JSON.stringify(result))
}


/**
 * C5.2 задание 2
 * 
 * Вам дана заготовка и результат, который вы должны получить. 
 * Ваша задача — написать код, который будет преобразовывать 
 * JSON в JS-объект и выводить его в консоль.
 */
const c52_2 = function() {
    json_file_path = 'с522_test.json'
    json_file_data = fs.readFileSync(json_file_path, 'utf8')
    console.log(JSON.parse(json_file_data))
}

c52_1()
// c52_2()