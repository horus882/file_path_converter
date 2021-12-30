const path      = document.getElementById('path');
const convert   = document.getElementById('convert');
const result    = document.getElementById('result');

convert.addEventListener('click', () => {

    let value = path.value.replace(/\\/g, '/');
    result.textContent = value;

});