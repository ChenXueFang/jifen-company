<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left;"></div>
  </div>
</template>

<script>
import Editor from "wangeditor";
export default {
  name: "wangeditor",
  data() {
    return {
      editor: null,
      editorContent: "",
    };
  },
  // catchData是一个类似回调函数，来自父组件，主要是用来获取富文本编辑器中的html内容
  props: ['catchData','keyType','htmlContent','item'], // 接收父组件的方法/属性
  watch:{
    htmlContent(value){
      if (value !== this.editor.txt.html()&&value!=null) {
        this.editor.txt.html(this.htmlContent.toString())
      }
    }
  },
  mounted(){
    this.initEditor();
  },
  methods: {
    //初始化富文本
    initEditor() {
      this.editor = new Editor(this.$refs.editorElem);
      // 编辑器的事件，每次改变会获取其html内容
      this.editor.customConfig.onchange = html => {
        this.editorContent = html;
        console.log(this.editorContent,1)
        console.log(this.keyType,2)
        
        // this.$emit('catchData',this.editorContent,this.keyIndex）//子组件向父组件传值
        this.catchData(this.editorContent,this.keyType,this.item); // 把这个html通过catchData的方法传入父组件
      };
      this.editor.customConfig.menus = [
        // 菜单配置
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        // "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        // 'strikeThrough', // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "list", // 列表
        "justify", // 对齐方式
        // "link", // 插入链接
        // 'quote', // 引用
        // 'emoticon', // 表情
        // 'image', // 插入图片
        // 'table', // 表格
        // 'code', // 插入代码
        'undo', // 撤销
        // 'redo' // 重复
      ];
      // 自定义字体
      this.editor.customConfig.fontNames = [
          '宋体',
          '微软雅黑',
          'Arial',
      ]
      this.editor.customConfig.zIndex = 100;
      this.editor.create(); // 创建富文本实例

      if(this.htmlContent!=null){
        this.editor.txt.html(this.htmlContent.toString())
      }
      
    },
  }
};
</script>

<style>
.w-e-toolbar{
  flex-wrap: wrap!important;
  border-radius: 5px 5px 0 0;
  background-color: #fff!important;
  /* justify-content: space-around; */
}
.w-e-text-container{
  height: 160px!important;
  border-radius: 0 0 5px 5px;
}
.w-e-toolbar .w-e-menu{
  padding: 5px!important;
}
</style>
<style lang="less" scoped>
#wangeditor{
  margin-bottom: 10px;
}
</style>