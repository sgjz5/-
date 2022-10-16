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
    /* 
        游戏禁止掉头
            1.身体超过2
            2.不能是相反方向
        处理
            保持原来的方向不变（不修改dir的值）
    */
    // 定义一个变量用来存储方向
    let dir;
    // 保存按键状态
    let keyActive = true;
    const keyArr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    // 创建一个对象
    const reObj = {
        ArrowDown: "ArrowUp",
        ArrowUp: "ArrowDown",
        ArrowRight: "ArrowLeft",
        ArrowLeft: "ArrowRight"
    };
    document.addEventListener("keydown", event => {
        // 设置方向,判定按下的按键是正确的
        if (keyActive == true && keyArr.includes(event.key)) {
            // 身体大于2的时候，前一个方向与后一个方向不同就不能掉头
            if (snakes.length < 2 || reObj[dir] !== event.key) {
                dir = event.key;
                // 防止一次按两下导致掉头
                keyActive = false;
            }
        }
    });
    const food = document.getElementById("food");
    // 食物的取值在（0-290），只能是10的倍数
    function changeFood() {
        // 生成0-29的随机数
        // 0-30(包含0，不包含30，向下取整)
        const x = Math.floor(Math.random() * 30) * 10;
        const y = Math.floor(Math.random() * 30) * 10;

        for (let i = 0; i < snakes.length; i++) {
            while (x == snakes[i].offsetLeft && y == snakes[i].offsetTop) {
                const x = Math.floor(Math.random() * 30) * 10;
                const y = Math.floor(Math.random() * 30) * 10;
            }
        }
        // 设置食物的坐标
        food.style.top = y + 'px';
        food.style.left = x + 'px';
    }
    // 获取分数和level
    const scoreText = document.querySelector("#score span");
    const levelText = document.querySelector("#level span");
    // 创建变量存储分数和等级
    let score = 0;
    let level = 1;
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
        // 实际移动的是蛇尾（只有一个的时候蛇头=蛇尾）
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
            // 分数
            score++;
            scoreText.textContent = score;
            // 升级等级
            if (score % 10 == 0 && level < 14) {
                level++;
                levelText.textContent = level;
            }
        };
        /* 
            添加游戏终止条件
                1.撞到四面的墙
                2.撞到自己
        */
        // 判断是否撞墙
        if (x < 0 || x > 290 || y < 0 || y > 290) {
            if (confirm(`游戏结束,分数为${score}`)) {
                // 游戏结束
                location.reload();
            } else {
                return;
            }
        };
        // 判断是否撞到自己，头尾撞没事
        for (let i = 0; i < snakes.length - 1; i++) {
            if (snakes[i].offsetLeft == x && snakes[i].offsetTop == y) {
                if (confirm(`游戏结束,分数为${score}`)) {
                    location.reload();
                } else {
                    return;
                }

            }
        }
        // 获取尾巴
        const tail = snakes[snakes.length - 1];
        // 移动蛇的位置
        tail.style.left = x + "px";
        tail.style.top = y + "px";
        // 将尾巴移动到蛇头的位置(上面改变的是CSS样式，结构没变，所以需要改结构才能动)
        snake.insertAdjacentElement("afterbegin", tail);
        setTimeout(move, 300 - level * 20);
        // 进入定时器说明按键事件结束，可以再按
        keyActive = true;
    }, 300);
}
