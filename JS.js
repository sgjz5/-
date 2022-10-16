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
        };
        // 获取食物,写外面只检测一次
        // 检查蛇是否吃到食物
        if (snakeHead.offsetTop == food.offsetTop && snakeHead.offsetLeft == food.offsetLeft) {
            // 改变食物的位置
            changeFood();
            // 增加蛇的身体
            snake.insertAdjacentHTML("beforeend", "<div></div>")
        };
        setTimeout(move, 300);
    }, 300);
}
