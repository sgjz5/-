window.onload = function () {
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