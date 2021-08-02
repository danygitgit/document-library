/**
 * 复制文本
 * @param  this
 * @param  {String}  val  必填，需要复制的字符串
 * @date 2021-8-2
 * @version 0.0.1
 */

function copyText(val) {
    // 创建一个input 元素
    // createElement() 方法通过指定名称创建一个元素
    let newInput = document.createElement("input");
    // 将传入的的数据赋值给input的value值
    newInput.value = val;
    // appendChild() 方法向节点添加最后一个子节点。
    document.body.appendChild(newInput);
    // 选中input元素中的文本
    // select() 方法用于选择该元素中的文本。
    newInput.select();
    // 执行浏览器复制命令
    //  execCommand方法是执行一个对当前文档，当前选择或者给出范围的命令
    document.execCommand("Copy");
    // 清空输入框
    newInput.remove();
    // 下面是element的弹窗 不需要的自行删除就好
    this.$message({
        message: "复制成功",
        type: "success",
    });
}