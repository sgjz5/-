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
    document.addEventListener("keydown", event => {

        // evnet.key获取按下的按键
        /* 
            按下按键不松开会持续触发
                但是第一次与第二次直接有间隔

            贪吃蛇游戏蛇不能停
        */
        switch (event.key) {
            case "ArrowUp":
                snakeHead.style.top = snakeHead.offsetTop - 10 + "px";
                console.log("上");
                break;
            case "ArrowDown":
                snakeHead.style.top = snakeHead.offsetTop + 10 + "px";
                console.log("下");
                break;
            case "ArrowLeft":
                snakeHead.style.left = snakeHead.offsetLeft - 10 + "px";
                console.log("左");
                break;
            case "ArrowRight":
                // 获取蛇当前的位置加上移动距离
                snakeHead.style.left = snakeHead.offsetLeft + 10 + "px";
                break;
        }



    })
}
