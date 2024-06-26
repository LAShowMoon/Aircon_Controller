//import { updateXMLDoc } from "./00008_xmlfileRequest";
//유닛 클릭시 버튼이 노란색으로 변한 후 간이조작 화면 출력
export function controllerButtonOutput(button,controllerSimple,temp){
    if (button.style.backgroundColor === 'yellow') {//버튼이 노랑색일 때
        button.style.backgroundColor = 'white';
        if(controllerSimple.style.display !== 'none'){
            controllerSimple.style.display = 'none';
        }
    } else {
        button.style.backgroundColor = 'yellow';//버튼이 하얀색일 때 노란색으로 바꿈
        controllerSimple.style.display = 'flex';
            // OK 버튼 클릭 이벤트 리스너 추가
            // okButton.addEventListener('click', saveTemperature);
    }
}
// 온도 조절 함수 정의
export function updateTemperature(delta) {
    const tempDisplay = document.getElementById('temp');
    let currentTemp = parseInt(tempDisplay.textContent);
    currentTemp += delta;
    tempDisplay.textContent = `${currentTemp}℃`;
}

async function saveTemperature() {
    const tempDisplay = document.getElementById('temp');
    const currentTemp = parseInt(tempDisplay.textContent);
    try {
        await updateXMLDoc('xml/model.xml', 'temperature', currentTemp);
        alert('Temperature updated successfully!');
    } catch (error) {
        console.error('Error updating temperature:', error);
    }
}