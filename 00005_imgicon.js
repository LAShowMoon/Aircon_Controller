 // XMLファイルを呼んでくる
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

// XMLファイルを呼んできて、イメージを追加する関数。
async function displayFloorIconSetting() {
    try {
        const xmlImagres = await loadXMLDoc('xml/images.xml');
        const images = xmlImagres.getElementsByTagName('floor');//xml 자료의 제일 앞부분 id정의쪽

        const xmlModel = await loadXMLDoc('xml/model.xml');
        const models = xmlModel.getElementsByTagName('ctrl');

        const imageContainer = document.getElementById('imageContainer');

        for (let i = 0; i < images.length; i++) {
            const imageGroup = images[i].getAttribute('Group');

            for (let o = 0; o < models.length; o++) {
                const modelGroup = models[o].getAttribute('Group');

                if (imageGroup === modelGroup) {
                    const src = images[i].getAttribute('src');
                    const x = parseInt(images[i].getAttribute('x'));
                    const y = parseInt(images[i].getAttribute('y'));
                    const temp = parseInt(models[o].getAttribute('temp'));

                    //イメージ呼び出し
                    const img = document.createElement('img');
                    img.setAttribute('src', src);
                    img.setAttribute('class', 'image');
                    img.style.left = `${x}px`;
                    img.style.top = `${y}px`;

                    //モデル情報呼び出し
                    const tempText = document.createElement('p');
                    tempText.textContent = `Temp: ${temp}°C`;
                    tempText.style.position = 'absolute';
                    tempText.style.left = `${x}px`;
                    tempText.style.top = `${y + 100}px`; // Adjust position as needed

                    imageContainer.appendChild(img);
                    imageContainer.appendChild(tempText);
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}
/*
async function displayFloorModelSetting() {
    try {
        const xmlDoc = await loadXMLDoc('xml/images.xml');
        const images = xmlDoc.getElementsByTagName('floor');//xml의 제일 앞부분 

        const imageContainer = document.getElementById('imageContainer');

        for (let i = 0; i < images.length; i++) {
            const src = images[i].getAttribute('src');
            const x = parseInt(images[i].getAttribute('x'));
            const y = parseInt(images[i].getAttribute('y'));

            const img = document.createElement('img');
            img.setAttribute('src', `${src}`);
            img.setAttribute('class', 'image');
            img.style.left = `${x}px`;
            img.style.top = `${y}px`;
            //img.width = '50px';
            //img.height = '50px';

            imageContainer.appendChild(img);
        }
    } catch (error) {
        console.error(error);
    }
}
*/
// 페이지가 로드되면 이미지를 표시
window.onload = displayFloorIconSetting;