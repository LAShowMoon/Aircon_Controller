import { controllerButtonOutput } from "./00007_controller.js";
 // XMLファイルを呼んでくる
 function loadXMLDoc(filename) {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            console.log(this.readyState);
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
        const xmlImages = await loadXMLDoc('xml/floorConnect.xml');
        const images = xmlImages.getElementsByTagName('floorCont');

        const xmlModel = await loadXMLDoc('xml/model.xml');
        const models = xmlModel.getElementsByTagName('ctrl');
        const controllerSimple = document.getElementById('controllerSimple');
        const imageContainer = document.getElementById('imageContainer'); 
        const filterButton = document.getElementById('filterButton');
        filterButton.innerHTML = '';
        imageContainer.innerHTML = '';
         //既存のイメージとテキストを消します。
        

        for (let i = 0; i < images.length; i++) {
            const imageGroup = images[i].getAttribute('Group');
            const imageFloor = images[i].getAttribute('floor');

            for (let o = 0; o < models.length; o++) {
                const modelGroup = models[o].getAttribute('Group');
                
                //groupを比較する。
                if (imageGroup === modelGroup && imageFloor === selectedFloor) {
                    //const src = images[i].getAttribute('src');
                    const x = parseInt(images[i].getAttribute('x'));
                    const y = parseInt(images[i].getAttribute('y'));
                    const temp = parseInt(models[o].getAttribute('temp'));
                    const model = models[o].getAttribute('model');
                    const modelerror = models[o].getAttribute('error');
                    let icon_src = '';
                    if(modelerror === "ON"){
                        icon_src = await iconError();
                    }else{
                        icon_src = await icon_distinguish(model);
                    }
                    //イメージ呼び出し
                    //여기서부터 함수로 정리 가능하지 않을까.
                    const button = document.createElement('button');
                    button.style.position = 'absolute';
                    button.style.border = '1px solid';
                    button.style.left = `${x}px`;
                    button.style.top = `${y}px`;

                    const img = document.createElement('img');
                    img.setAttribute('src', icon_src);
                    img.setAttribute('class', 'image');
                    button.appendChild(img);

                    //필터버튼 쪽 이미지 출현
                    const filterBT = document.createElement('button');
                    const filterimg = document.createElement('img');
                    filterimg.setAttribute('src', icon_src);
                    filterimg.setAttribute('class', 'filterimage');
                    filterBT.appendChild(filterimg);
                    filterButton.appendChild(filterBT);

                    //モデル情報呼び出し
                    const tempText = document.createElement('p');
                    tempText.textContent = `Temp: ${temp}°C / Model:${model}`;
                    tempText.style.top = -`80px`;
                    button.appendChild(tempText);
                    
                    //버튼을 눌렀을 때 이미지 노란색으로 변함
                    button.addEventListener('click', function() {
                        controllerButtonOutput(button,controllerSimple);
                    });
                    imageContainer.appendChild(button);
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
        select.oninput = function(){
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
//아이콘 구별 후 src반환
async function icon_distinguish(iconNumber){
    try{
        const xmlIconNumber = await loadXMLDoc('xml/iconNumber.xml');
        const IconSet = xmlIconNumber.getElementsByTagName('iconSet');//xml 자료의 제일 앞부분 id정의쪽

        for(let i = 0; i < IconSet.length; i++){
            const icon = IconSet[i].getAttribute('icon');

            if(iconNumber === icon){
                const src = IconSet[i].getAttribute('src');
                return src;
            }
        }
        return 'image_icon/noSignal_icon.png';
    }catch (error) {
    console.error(error);
    return 'image_icon/noSignal_icon.png';
    }
}
//모델xml에 에러가 on일경우 기종을 무시하고 에러아이콘 표시
async function iconError(){
    try{
        const xmlIconNumber = await loadXMLDoc('xml/iconNumber.xml');
        const IconSet = xmlIconNumber.getElementsByTagName('iconSet');//xml 자료의 제일 앞부분 id정의쪽

        for(let i = 0; i < IconSet.length; i++){
            const icon = IconSet[i].getAttribute('icon');

            if(icon === "ERROR"){
                const src = IconSet[i].getAttribute('src');
                return src;
            }
        }
        return 'image_icon/noSignal_icon.png';
    }catch (error) {
    console.error(error);
    return 'image_icon/noSignal_icon.png';
    }
}
// ページがロードされるとイメージとテキストを呼び出す。
window.onload = function() {
    floorSystemSetting();
    displayFloorIconSetting();
};
