window.onload = function () {


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

        smallPicture.addEventListener("mouseenter", (event) => {
            // 创建大图框
            const bigImg = document.createElement("img");
            bigImg.src = "./IMG/hs1da.avif";
            bigPicture.appendChild(bigImg);


            // 创建蒙版
            const maskElement = document.createElement('div');
            maskElement.id = "mask";
            // 添加
            smallPicture.appendChild(maskElement);

            // 出现大图
            bigPicture.style.display = "block";

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
            })

            smallPicture.addEventListener("mouseleave", () => {
                maskElement.remove();
                bigImg.remove();
                bigPicture.style.display = "none";
            })

        })

    }
    magnifyingLens()
}