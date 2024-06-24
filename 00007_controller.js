//유닛 클릭시 버튼이 노란색으로 변한 후 간이조작 화면 출력
export function controllerButtonOutput(button,controllerSimple){
    if (button.style.backgroundColor === 'yellow') {//버튼이 노랑색일 때
        button.style.backgroundColor = 'white';
        if(controllerSimple.style.display !== 'none'){
            controllerSimple.style.display = 'none';
        }
    } else {
        button.style.backgroundColor = 'yellow';//버튼이 하얀색일 때 노란색으로 바꿈
        controllerSimple.style.display = 'flex';
    }
}