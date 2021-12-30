const path      = document.getElementById('path');
const convert   = document.getElementById('convert');
const result    = document.getElementById('result');

convert.addEventListener('click', () => {

    let system  = document.querySelector('input[name="system"]:checked').value;
    let value   = path.value;

    switch(system) {
        case 'windows_to_mac':
            result.textContent = value.replace(/\\/g, '/');
            break;
        case 'mac_to_windows':
            result.textContent = value.replace(/\//g, '\\');
            break;
    }

});