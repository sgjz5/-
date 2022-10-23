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
            bigPicture.style.display = "block";

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
                bigPicture.style.display = "none";
            })

        })

    }
    magnifyingLens();

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
    thumbnailData();
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
                // 去掉默认的边框
                let clock = document.querySelector("#content .center #left #left-bottom .piclist .pic .clock");
                clock.classList.remove("clock");
                // 获取到当前要显示的缩略图
                liNode[i].classList.add("clock");
            })
        }
    }
    thumbnailEnter();

    // 点击缩略图左右箭头效果
    function thumbaniLeftRightClick() {
        /* 
            1.获取左右箭头按钮
            2.获取可视的div与ul元素和所有的li元素
            3.计算初始（发生起点、步长、总体运动距离值）
            4.然后再发生点击事件
        */
        // 获取左右箭头
        const forward = document.querySelector("a#forward");
        const backward = document.querySelector("a#backward");


        // 获取可视的ul元素和所有的li元素
        const ul = document.querySelector(".piclist .pic");
        const liNode = document.querySelectorAll(".piclist .pic li");

        // 初始计算
        // 起点
        let start = 0;
        // 步长
        let step = (liNode[0].offsetWidth + 20) * 2;
        // 总体运动距离值=ul宽度-div框的宽度=（图片的总数-div中显示的数量）*（li宽度+20）
        let endPositon = (liNode.length - 5) * (liNode[0].offsetWidth + 20);

        forward.addEventListener("click", () => {
            start += step;
            if (start > 0) {
                start = 0;
            }
            ul.style.left = start + "px";
        })

        backward.addEventListener("click", () => {
            start -= step;
            if (start < (-endPositon)) {
                start = -endPositon;
            }
            ul.style.left = start + "px";
        })

    }
    thumbaniLeftRightClick();

    // 商品详情的动态渲染
    function rightTopData() {
        /* 
            查找right元素
            查找goodData的details数据
            将对应数据添加到位置上

        */
        const right = document.querySelector("#content .center #right");
        const details = goodData.details;
        console.log(details.tltle);
        let str = `<!-- 商品标题 -->
        <p id="title">${details.tltle}</p>
        <!-- 商品价格 -->
        <div id="news">
            <div id="titleImg"><img src=${details.img}></div>
            <div id="details">
                <div id="price">
                    <p class="font-color">京 东 价</p>
                    <span>
                        <p>￥</p>
                        <p>${details.price}</p>
                    </span>
                    <a href="javascript:;" class="blue">降价通知</a>

                    <div id="total">
                        <p class="font-color">累计评价</p>
                        <a href="javascript:;" class="blue">${details.evaluationNum}</a>
                    </div>
                </div>

                <!-- 分割 -->
                <div id="segmentation"></div>
                <div id="activity">
                    <p class="font-color">促&nbsp;&nbsp;销</p>
                    <div>
                        <div id="forPurchasing">
                            <span class="activityTitle">限购</span>
                            <span>${details.forPurchasingIntroduce}</span>
                        </div>
                        <div id="gift">
                            <span class="activityTitle">满赠</span>
                            <span>${details.giftIntroduce}</span>
                            &nbsp;&nbsp;
                            <a href="javascript:;">详情</a><i>>></i>
                        </div>
                    </div>
                </div>
            </div>

        </div>`;
        right.innerHTML = str;
    }
    rightTopData();

    // 京东服务
    function jdservice() {
        const content = document.querySelectorAll(".yb-car")
        const ybContent = document.querySelectorAll(".yb-car .yb-car-content")
        // 层级
        let zIndex = 21;
        // 标记
        let flag = true;
        const serviceData = goodData.service;
        for (let i = 0; i < content.length; i++) {
            // 下拉框
            content[i].addEventListener("mouseover", () => {
                // 使当前的点击的层级比下拉框高
                ybContent[i].style.zIndex = zIndex + 1;
                // 确保只添加一次
                if (flag) {
                    content[i].insertAdjacentHTML("beforeend",
                        `
                    <div class="yb-car-drop">
                        <div>
                            <input type="checkbox" value=${serviceData.name[0].serviceName} id="first">
                                <a href="javascript:;"class="drop">
                                    &nbsp;${serviceData.name[0].serviceName} 
                                    <span>￥</span>
                                    <span>${serviceData.name[0].price}</span>                       
                                </a>  
                                <a href="javascript:;" class="detail">
                                        <i>详情</i>>>
                                    </a>  
                        </div>
                        
                        <div>
                            <input type="checkbox" value=${serviceData.name[1].serviceName} id="sec">
                                <a href="javascript:;" class="drop">&nbsp;${serviceData.name[1].serviceName} 
                                    <span>￥</span>
                                    <span>${serviceData.name[1].price}</span>                                  
                                </a>   
                                <a href="javascript:;" class="detail">
                                        <i>详情</i>>>
                                    </a>       
                        </div>
                    </div>
                    `
                    )
                    flag = false;
                }
            })
            content[i].addEventListener("mouseout", () => {
                ybContent[i].style.zIndex = zIndex - 1;
                const drop = content[i].querySelectorAll(".yb-car-drop")
                if (!flag && drop.length < 1) {
                    flag = true;
                }
            })


        }


    }
    jdservice()

    // 点击效果
    function click() {
        const clickArr = document.querySelectorAll("div .items");
        for (let i = 0; i < clickArr.length; i++) {
            // 选中型号选中
            if (clickArr[i].parentElement.parentElement.id == "model") {
                clickArr[i].addEventListener("click", (event) => {
                    const modelClick = document.querySelector("#model div .items a.click");
                    modelClick.classList.remove("click");
                    if (event.target.parentElement.className == "items") {
                        event.target.classList.add("click")
                    } else {
                        event.target.parentElement.classList.add("click")
                    }
                })
            } else {
                clickArr[i].addEventListener("click", (event) => {
                    console.log(event.target.parentElement.classList);
                    if (event.target.parentElement.className == "items" && event.target.classList == '') {
                        event.target.classList.add("click")
                    } else if (event.target.parentElement.classList == "") {
                        event.target.parentElement.classList.add("click")
                    } else if (event.target.parentElement.classList == "click") {
                        event.target.parentElement.classList.remove("click")
                    } else {
                        event.target.classList.remove("click")
                    }
                })
            }


        }
    }
    click()



}