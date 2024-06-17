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
async function displayFloorIconSetting(selectedFloor) {
    try {
        const xmlImagres = await loadXMLDoc('xml/images.xml');
        const images = xmlImagres.getElementsByTagName('floorImg');//xml 자료의 제일 앞부분 id정의쪽

        const xmlModel = await loadXMLDoc('xml/model.xml');
        const models = xmlModel.getElementsByTagName('ctrl');

        const imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = ''; //既存のイメージとテキストを消します。

        for (let i = 0; i < images.length; i++) {
            const imageGroup = images[i].getAttribute('Group');

            for (let o = 0; o < models.length; o++) {
                const modelGroup = models[o].getAttribute('Group');

                if (imageGroup === modelGroup && imageGroup === selectedFloor) {
                    const src = images[i].getAttribute('src');
                    const x = parseInt(images[i].getAttribute('x'));
                    const y = parseInt(images[i].getAttribute('y'));
                    const temp = parseInt(models[o].getAttribute('temp'));
                    const model = models[o].getAttribute('model');

                    //イメージ呼び出し
                    const img = document.createElement('img');
                    img.setAttribute('src', src);
                    img.setAttribute('class', 'image');
                    img.style.left = `${x}px`;
                    img.style.top = `${y}px`;

                    //モデル情報呼び出し
                    const tempText = document.createElement('p');
                    tempText.textContent = `Temp: ${temp}°C / Model:${model}`;
                    tempText.style.position = 'absolute';
                    tempText.style.left = `${x}px`;
                    tempText.style.top = `${y + 70}px`; // Adjust position as needed

                    imageContainer.appendChild(img);
                    imageContainer.appendChild(tempText);
                    
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}
//階層のXMLを呼び出し、出力。
// XMLファイルを呼んできて、イメージを追加する関数。
async function floorSystemSetting() {
    try {
        const xmlFloors = await loadXMLDoc('xml/floorSet.xml');
        const floors = xmlFloors.getElementsByTagName('floorSetting');//xml 자료의 제일 앞부분 id정의쪽
        const floorSet = document.getElementById('floorSet');


        
        const select = document.createElement('select');
        //여기서 onchange는 변경된 직후가 아니라 변경 후 포커스가 벗어났을 때 이벤트를 발생시킨다.
        //그러기 때문에 oninput를 사용하여 값이 바뀔 때마다 이벤트를 발생시킨다.
        select.onchange = function(){
            const selectedFloor = select.value;
            displayFloorIconSetting(selectedFloor);
        }
        

        for (let i = 0; i < floors.length; i++) {
            const floor = floors[i].getAttribute('floor');
            const floorName = floors[i].getAttribute('floorName');

            const option = document.createElement('option');
            option.value = floor;
            option.textContent = floorName; 
            //floorName.length > 20 ? `${floorName.substring(0, 17)}...` : floorName;
            //このように文字数の制限ができる。
            select.appendChild(option);
        }
        
        floorSet.appendChild(select);
    } catch (error) {
        console.error(error);
    }
}
// ページがロードされるとイメージとテキストを呼び出す。
window.onload = function() {
    floorSystemSetting();
    displayFloorIconSetting();
};
