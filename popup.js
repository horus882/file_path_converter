const path      = document.getElementById('path');
const convert   = document.getElementById('convert');
const result    = document.getElementById('result');
const windowsToMac = document.getElementById('system-windows_to_mac');
const macToWindows = document.getElementById('system-mac_to_windows');

const handleConvert = () => {

    let system  = document.querySelector('input[name="system"]:checked').value;
    let value   = path.value;

    if (value) {

        let tempArray = value.split('\\');

        if (tempArray.length > 1) {
            system = 'windows_to_mac';
            windowsToMac.checked = true;
        } else {
            tempArray = value.split('/');
            if (tempArray.length > 1) {
                system = 'mac_to_windows';
                macToWindows.checked = true;
            } else {
                system = 'invalid_path';
            }
        }

        if (value.indexOf('\\') === 0) {
            system = 'windows_to_mac';
            windowsToMac.checked = true;
        }

        if (value.indexOf('smb://') >= 0 || value.indexOf('/Volumes') === 0) {
            system = 'mac_to_windows';
            macToWindows.checked = true;
        }

        result.value = '';

        switch(system) {
            case 'windows_to_mac':
                let formattedValue = value
                        .replace(/\\/g, '/')
                        .replace('//tp-data', '/Volumes')
                        .replace('//TP-Data', '/Volumes')
                        .replace('//TP-DATA', '/Volumes')
                        .replace('//tp-ml', '/Volumes')
                        .replace('//TP-Ml', '/Volumes')
                        .replace('//TP-ML', '/Volumes');
                if (formattedValue.indexOf('/Volumes') < 0) formattedValue = '/Volumes' + formattedValue;
                result.value = formattedValue;
                break;
            case 'mac_to_windows':
                result.value =
                    value
                        .replace(/\//g, '\\')
                        .replace('smb:', '')
                        .replace('TP-Data', 'tp-data')
                        .replace('TP-ML', 'tp-ml')
                        .replace('\\Volumes', '');
                break;
            case 'invalid_path':
                result.value = '無效的檔案路徑';
        }

        result.style.display = 'block'
        result.focus();
        result.select();

    } else {

        result.style.display = 'none'

    }

}

path.addEventListener('keypress', (e) => {
    if (e.code === 'Enter' || e.key === 'Enter' || e.keyCode === 13) {
        handleConvert();
    }
});

convert.addEventListener('click', handleConvert);

path.focus();