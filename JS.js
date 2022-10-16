window.onload = function () {
    // 按下方向键控制蛇运动
    /*
        按键事件keydown keyup 
        键盘事件只能判定在可以获取焦点的元素或则doucument
    */

    // 获取蛇
    const snake = document.getElementById("snake");
    // 获取蛇的所有部位
    const snakes = snake.getElementsByTagName("div");
    // 蛇头
    const snakeHead = snakes[0];
    // 定义一个变量用来存储方向
    let dir;
    document.addEventListener("keydown", event => {
        // 设置方向
        dir = event.key;

    })
    // 每隔一段时间检查dir的值
    setTimeout(function move() {
        switch (dir) {
            case "ArrowUp":
                snakeHead.style.top = snakeHead.offsetTop - 10 + "px";
                break;
            case "ArrowDown":
                snakeHead.style.top = snakeHead.offsetTop + 10 + "px";
                break;
            case "ArrowLeft":
                snakeHead.style.left = snakeHead.offsetLeft - 10 + "px";           
                break;
            case "ArrowRight":
                // 获取蛇当前的位置加上移动距离
                snakeHead.style.left = snakeHead.offsetLeft + 10 + "px";
                break;
        }
        setTimeout(move,300)
    }, 300)
}
