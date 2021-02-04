const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight; //픽셀을 다루는 윈도우가 얼마나큰지 알려주는 것, 내가 값을 넣어줄 수도 있으나, 이 경우에는 직접 캔버스의 크기를 가져왔음.


ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height); //이거를 해주지 않으면 그림판 완성한 것을 저장할 때 배경이 투명으로 저장이 된다. 우리는 HTML의 배경을 설정해줬지만 아직 canvas(pixel manipulator canvas)의 배경색을 설정하지 않았기 때문.
ctx.strokeStyle = INITIAL_COLOR; //처음 색상은 검정으로 시작하도록
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;// 그림 그리는 선의 두께


let painting = false;
let filling = false;

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
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value; // 왜 밸류인지는 브라우저 콘솔에서 확인할 수 있다.
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";

    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height); //이렇게 안해주면 필링과 페인팅이 동시에 진행되기 때문에 if를 넣어주어서 paint의 경우를 제외시켜주는 것
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();//저장되는 default값은 png! 하지만 다른 타입의 값으로 변경시켜줄 수 있다.
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[✍🎨]";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //mousedown은 클릭하고 있는 상태, up은 클릭했던 손을 뗐을 때
    canvas.addEventListener("mouseup", stopPainting); //"" 속은 eventlistner가 가지고 있는 기능. 내가 해당 기능을 했을 떄 함수가 실행되도록
    canvas.addEventListener("mouseleave", stopPainting); //마우스가 요소를 떠날 때
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}