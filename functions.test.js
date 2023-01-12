let mirror_string = require('./functions')


test('проверка функции переворачивания строки',
    () => {
    expect(mirror_string('abcde')).toBe('edcba')
    })