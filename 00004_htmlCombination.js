//各HTMLを繋げる。
function combination(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading content:', error));
}

combination('00002_header.html', 'header');
combination('00003_content.html', 'content');