// XML 파일을 불러오는 함수
function loadXMLDoc(filename) {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseXML);
            } else if (this.readyState == 4) {
                reject(new Error('Failed to load XML file'));
            }
        };
        xhttp.open("GET", filename, true);
        xhttp.send();
    });
}

// XML 파일을 불러와서 이미지를 추가하는 함수
async function displayImages() {
    try {
        const xmlDoc = await loadXMLDoc('xml/images.xml');
        const images = xmlDoc.getElementsByTagName('image');

        const imageContainer = document.getElementById('imageContainer');

        for (let i = 0; i < images.length; i++) {
            const src = images[i].getAttribute('src');
            const x = parseInt(images[i].getAttribute('x'));
            const y = parseInt(images[i].getAttribute('y'));

            const img = document.createElement('img');
            img.setAttribute('src', `images/${src}`);
            img.setAttribute('class', 'image');
            img.style.left = `${x}px`;
            img.style.top = `${y}px`;

            imageContainer.appendChild(img);
        }
    } catch (error) {
        console.error(error);
    }
}

// 페이지가 로드되면 이미지를 표시
window.onload = displayImages;