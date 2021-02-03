const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight; //픽셀을 다루는 윈도우가 얼마나큰지 알려주는 것, 내가 값을 넣어줄 수도 있으나, 이 경우에는 직접 캔버스의 크기를 가져왔음.


ctx.strokeStyle = "#2c2c2c"; //처음 색상은 검정으로 시작하도록
ctx.lineWidth = 2.5;// 그림 그리는 선의 두께


let painting = false;

function stopPainting(event) {
    painting = false;
}

function startPainting() {
    painting = true;

}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) { //painting는 false를 디폴트값으로 설정해뒀기 때문임.
        ctx.beginPath(); // path는 선 마우스의 xy로 선을 옮기는 것
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y); //여기까지 선이 그려지는 것
        ctx.stroke(); //현재의 sub-path를 현재의 stroke style로 획을 긋는 역할.path를 만들고 획을 그어주는 역할
    } //lineTo와 stroke는 내가 마우슬 움직이는 내내 발생하는 것
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}



if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //mousedown은 클릭하고 있는 상태, up은 클릭했던 손을 뗐을 때
    canvas.addEventListener("mouseup", stopPainting); //"" 속은 eventlistner가 가지고 있는 기능. 내가 해당 기능을 했을 떄 함수가 실행되도록
    canvas.addEventListener("mouseleave", stopPainting); //마우스가 요소를 떠날 때
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);