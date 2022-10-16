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

    // 定义一个变量用来存储方向
    let dir;
    const keyArr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
    document.addEventListener("keydown", event => {
        // 设置方向,判定按下的按键是正确的
        if (keyArr.includes(event.key)) {
            dir = event.key;
        }
    });

    const food = document.getElementById("food");
    // 食物的取值在（0-290），只能是10的倍数
    function changeFood() {
        // 生成0-29的随机数
        // 0-30(包含0，不包含30，向下取整)
        const x = Math.floor(Math.random() * 30) * 10;
        const y = Math.floor(Math.random() * 30) * 10;
        // 设置食物的坐标
        food.style.top = y + 'px';
        food.style.left = x + 'px';
        console.log(x, y);
    }
    changeFood();

    /* 
        蛇的移动，最简单的方法。只改变最后一节身体的位置到目的地位置，蛇尾变成蛇头
    */
    // 每隔一段时间检查dir的值
    setTimeout(function move() {
        // 蛇头
        const snakeHead = snakes[0];
        // 获取蛇头坐标
        let x = snakeHead.offsetLeft;
        let y = snakeHead.offsetTop;
        switch (dir) {
            case "ArrowUp":
                y -= 10;
                break;
            case "ArrowDown":
                y += 10;
                break;
            case "ArrowLeft":
                x -= 10;
                break;
            case "ArrowRight":
                x += 10;
                break;
        };
        // 获取食物,写外面只检测一次
        // 检查蛇是否吃到食物
        if (snakeHead.offsetTop == food.offsetTop && snakeHead.offsetLeft == food.offsetLeft) {
            // 改变食物的位置
            changeFood();
            // 增加蛇的身体
            snake.insertAdjacentHTML("beforeend", "<div></div>");
        };
        // 获取尾巴
        const tail = snakes[snakes.length - 1];
        // 移动蛇的位置
        tail.style.left = x + "px";
        tail.style.top = y + "px";
        // 将尾巴移动到蛇头的位置(上面改变的是CSS样式，结构没变，所以需要改结构才能动)
        snake.insertAdjacentElement("afterbegin", tail);

        setTimeout(move, 300);
    }, 300);
}
