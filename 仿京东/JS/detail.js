window.onload = function () {
    let imgindex = 0;
    const imgData = goodData.img;
    navPathDataBind();
    // 路劲导航的数据渲染
    function navPathDataBind() {
        /* 
               1.先获取路径导航的页面元素（nav-path）
               2.获取所需的数据（）
               3.由于数据需要动态产生，相应的DOM元素也应该是动态产生的，根据数据的数量来进行创建DOM元素
               4.遍历数据，创建DOM元素的最后一条，只创建a标签，不创建i标签
           */
        const navPath = document.querySelector("#content #nav-path")
        // 获取数组
        const path = goodData.path;
        // 遍历数组
        for (let i = 0; i < path.length; i++) {
            // 创建a标签
            let aNode = document.createElement("a");
            aNode.innerText = path[i].title;

            // 创建i标签
            let iNode = document.createElement("i");
            iNode.className = "fa fa-angle-right";

            // 最后一个a不用i
            if (i == path.length - 1) {
                aNode.className = "ellipsis";
                navPath.appendChild(aNode);
            } else {
                // 让navPath元素追加a和i
                aNode.href = path[i].url;
                navPath.appendChild(aNode);
                navPath.appendChild(iNode);
            }
        }
    }


    // 放大镜
    function magnifyingLens() {
        /*
            1.获取小图框元素，并设置移入事件
            2.动态创建蒙版和大图
            3.移出鼠标，蒙版和大图消失
        */

        const smallPicture = document.querySelector("#small-picture");
        const bigPicture = document.querySelector("#big-picture");

        // 默认小图
        const smallImg = document.createElement("img");
        smallImg.src = imgData[imgindex].b;
        smallPicture.appendChild(smallImg);

        smallPicture.addEventListener("mouseenter", (event) => {
            // 创建大图框
            const bigImg = document.createElement("img");
            bigImg.src = imgData[imgindex].d;
            bigPicture.appendChild(bigImg);



            // 创建蒙版
            const maskElement = document.createElement('div');
            maskElement.id = "mask";
            // 添加
            smallPicture.appendChild(maskElement);

            smallPicture.addEventListener("mousemove", (event) => {
                /* 
                    蒙版移动
                    蒙版移动距离为，从中心到页面最左边
                    移动距离=鼠标点距离浏览器左侧距离-蒙版宽度一半-小图框到页面左边的距离
                    event.clientX-smallPicture.getBoundingClientRect().let-maskElement.offSetwidth/2
                */
                let x = event.clientX - smallPicture.getBoundingClientRect().left - maskElement.offsetWidth / 2;
                let y = event.clientY - smallPicture.getBoundingClientRect().top - maskElement.offsetHeight / 2;

                if (x < 0) {
                    x = 0;
                } else if (x > (smallPicture.clientWidth - maskElement.offsetWidth)) {
                    // clientWidth宽不包含边框，offsetWidth包含边框
                    x = smallPicture.clientWidth - maskElement.offsetWidth;

                }

                if (y < 0) {
                    y = 0;
                } else if (y > (smallPicture.clientHeight - maskElement.offsetHeight)) {
                    y = smallPicture.clientHeight - maskElement.offsetHeight;
                }
                maskElement.style.left = x + "px";
                maskElement.style.top = y + "px";

                // 大图移动
                // 二者成比例
                /* 
                    蒙版元素移动的距离=小图框宽度-蒙版元素的宽度
                    大图片元素的距离=大图片宽度-大图框元素的宽度
                */
                let scale = (smallPicture.clientWidth - maskElement.offsetWidth) / (bigImg.offsetWidth - bigPicture.clientWidth);

                bigImg.style.left = -x / scale + "px";
                bigImg.style.top = -y / scale + "px";


            })

            smallPicture.addEventListener("mouseleave", () => {
                maskElement.remove();
                bigImg.remove();
            })

        })

    }
    magnifyingLens()

    // 动态渲染放大镜缩略图数据
    function thumbnailData() {
        /* 
            1.获取ul
            2.获取data.js下的图片数据
            3.遍历数组
        */
        const pic = document.querySelector("ul.pic")


        for (let i = 0; i < imgData.length; i++) {
            // 创建元素
            const liNode = document.createElement("li");
            const imgNode = document.createElement("img");
            // 生成
            imgNode.src = imgData[i].s;
            liNode.appendChild(imgNode);
            pic.appendChild(liNode);
        }

    }
    thumbnailData()
    // 切换缩略图的效果
    function thumbnailEnter() {
        /* 
            获取所有li元素，并且循环发生点击事件
            点击缩略图需要确定其下表位置来找到对应小图路径和大图路径替换现有的src的值
        */
        const liNode = document.querySelectorAll("ul.pic li");
        const smallPicture = document.querySelector("#small-picture");

        for (let i = 0; i < liNode.length; i++) {
            imgindex = i;//给全局的imgindex赋值，让其他函数可以获取下标
            liNode[0].className = "clock";
            liNode[i].addEventListener('mouseover', () => {
                liNode[i].firstElementChild.src = imgData[i].s;
                smallPicture.children[1].src = imgData[i].b;
                let clock = document.querySelector("#content .center #left #left-bottom .piclist .pic .clock");
                clock.classList.remove("clock");
                // 获取到当前要显示的缩略图
                liNode[i].classList.add("clock");
            })


        }





    }
    thumbnailEnter()




}