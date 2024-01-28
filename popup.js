const path      = document.getElementById('path');
const convert   = document.getElementById('convert');
const result    = document.getElementById('result');
const windowsToMac = document.getElementById('system-windows_to_mac');
const macToWindows = document.getElementById('system-mac_to_windows');

convert.addEventListener('click', () => {

    let system  = document.querySelector('input[name="system"]:checked').value;
    let value   = path.value;

    if (value.indexOf('\\') === 0) {
        system = 'windows_to_mac';
        windowsToMac.checked = true;
    }

    if (value.indexOf('smb://') >= 0) {
        system = 'mac_to_windows';
        macToWindows.checked = true;
    }

    switch(system) {
        case 'windows_to_mac':
            result.textContent =
                value
                    .replace(/\\/g, '/')
                    .replace('//tp-data', '/Volumes')
                    .replace('//tp-ml', '/Volumes');
            break;
        case 'mac_to_windows':
            result.textContent =
                value
                    .replace(/\//g, '\\')
                    .replace('smb:', '')
                    .replace('TP-Data', 'tp-data')
                    .replace('TP-ML', 'tp-ml');
            break;
    }

    if (value) result.style.display = 'block'
    else result.style.display = 'none'

});