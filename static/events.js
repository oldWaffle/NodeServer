// Event Listeners
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
        case 'W':
            keys.w.pressed = true
            break;
        case 'a':
        case 'A':
            keys.a.pressed = true
            break;
        case 's':
        case 'S':
            keys.s.pressed = true
            break;
        case 'd':
        case 'D':
            keys.d.pressed = true
            break;
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
        case 'W':
            keys.w.pressed = false
            break;
        case 'a':
        case 'A':
            keys.a.pressed = false
            break;
        case 's':
        case 'S':
            keys.s.pressed = false
            break;
        case 'd':
        case 'D':
            keys.d.pressed = false
            break;
    }
})

window.addEventListener('blur', () => {
    keys.w.pressed = false
    keys.a.pressed = false
    keys.s.pressed = false
    keys.d.pressed = false
})