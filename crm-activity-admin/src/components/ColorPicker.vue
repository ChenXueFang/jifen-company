<template>
  <div class="colorWrap">
    <span class="label" v-bind:class="{'label2':initLength}">{{labelText}}:</span>
    <div class="chooseColor">
      <Input class="colorIpt" v-model="initColor" readonly/>
      <colorPicker v-model="initColor" v-on:change="headleChangeColor" :defaultColor="baceColor"/>
    </div>
    <div class="colorBox" v-bind:style="{background:initColor}"></div>
  </div>
</template>

<script>
export default {
  name: "colorPick",
  data(){
      return {
        // initColor:"",
      }
  },
  props: ['labelText','initColor',"item",'initLength','baceColor'],
  methods:{
    headleChangeColor(color){
      this.initColor = color;
      this.$emit("pick",color,this.item);
    },
  }
};
</script>

<style lang="less">
.m-colorPicker .box{
  width: 260px!important;
}
.m-colorPicker .box.open{
  z-index: 999;
}
.m-colorPicker{
  position: absolute!important;
  left:0;
  top:0;
  .colorBtn {
    width: 260px!important;
    height: 32px!important;
    background: none!important;
  }
}
@media screen and (max-width: 1360px) { /*当屏幕尺寸小于1360px时，应用下面的CSS样式*/
  .m-colorPicker .box,.m-colorPicker .colorBtn{
      width: 220px!important;
  }
}
</style>
<style lang="less" scoped>
.colorWrap {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .label {
    margin-right: 5px;
  }
  .label2{
        width: 100px;
        text-align: right;
        +.chooseColor{
          width: 212px;
          .colorIpt{
            width: 95%;
          }
        }
  }
  .chooseColor {
    width: 260px;
    height: auto;
    position: relative;
    .colorIpt{
      width: 100%;
    }
  }
  .colorBox {
    width: 20px;
    height: 20px;
  }
}
@media screen and (max-width: 1360px) { /*当屏幕尺寸小于1360px时，应用下面的CSS样式*/
  .chooseColor {
      width: 200px!important;
  }
}
</style>