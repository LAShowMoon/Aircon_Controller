let elementZoom = 1; // 기본 비율

// 화면크기 축소
function elementZoomOut() {
  elementZoom -= 0.1;
  // 화면크기 최대 축소율 0.7배
  if (elementZoom < 0.7) {
    elementZoom = 0.7; 
    alert("これ以上縮小できません。");
  }
  applyElementZoom();
}

// 화면크기 확대
function elementZoomIn() {
  elementZoom += 0.1;
  // 화면크기 최대 확대율 2배
  if (elementZoom > 2) {
    elementZoom = 2;
    alert("これ以上拡大できません。");
  }
  applyElementZoom();
}

// 원래 화면크기로 되돌아가기
function elementZoomReset() {
  elementZoom = 1;
  applyElementZoom();
}

function applyElementZoom() {
  const element = document.getElementById('expand');
  element.style.transform = `scale(${elementZoom})`;
}