<template>
  <div class="uploadWrap">
    <Upload
      ref="upload"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      :on-progress="handleProgress"
      type="drag"
      :action="uploadUrl + '?appid=' + customCode"
      style="display: inline-block;width:160px;position:relative"
    >
      <div style="width: 160px;height:160px;line-height: 160px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
      <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
        <template v-if="item.status === 'finished'">
          <img :src="item.url" />
          <div class="demo-upload-list-cover" @click.stop="handleView(item)">
            <Icon type="ios-eye-outline" @click.stop="handleView(item)"></Icon>
            <Icon type="ios-trash-outline" @click.stop="handleRemove(item)"></Icon>
          </div>
        </template>
        <template v-else>
          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
      </div>
    </Upload>
    <Modal title="查看大图" v-model="visible" :mask-closable="false">
      <img :src="viewImg" v-if="visible" style="max-width: 100%" />
    </Modal>
  </div>
</template>

<script>
import { baseUrl, uploadUrl,imgUrl } from "../utils/env";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "uploadImg",
  data() {
    return {
      imgUrl: imgUrl,
      uploadUrl: uploadUrl,
      uploadList: [],
      viewImg: "",
      visible: false
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  created() {
    if(this.user.length>0){
      this.customCode = JSON.parse(this.user).CustomCode;
    }
  },
  props: ['srcurl','config'],
  watch:{
    srcurl(value){
      if(value){
        var imgInfo={}
        imgInfo.status ='finished'
        imgInfo.url=this.getSrc(value)
        imgInfo.showProgress=false
        imgInfo.percentage=100

        this.uploadList.push(imgInfo)
      }
    }
  },
  mounted(){
    // this.uploadList = this.$refs.upload.fileList;
  },
  methods: {
    getSrc(src) {
      return this.imgUrl + src;
    },
    //上传图片相关方法如下
    handleView(item) {
      this.visible = true;
      this.viewImg = item.url;
    },
    handleRemove(file) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "您确定删除该图片吗？",
        onOk: () => {
          const fileList = this.$refs.upload.fileList;
          // this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
          this.$refs.upload.fileList.splice(0,this.$refs.upload.fileList.length);
          this.uploadList.splice(0,this.uploadList.length);

          if(this.config){ //编辑页面元素'
            this.$emit('delete',this.config)
          }else{
            this.$emit("del",'');
          }
        },
        onCancel: () => {}
      });
    },
    handleSuccess(res, file) {
      file.oldurl = res.rows[0];
      file.url = baseUrl + res.rows[0];
      file.name = "上传图片";
      //子组件向父组件传值
      this.$emit("save", res.rows[0],this.config);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件格式不正确，请上传 jpg jpeg 或 png 格式的图片。"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制",
        desc: "文件太大，不能超过2M。"
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: "只能上传1张图片。"
        });
      }
      return check;
    },
    handleProgress(event, file, fileList) {
      // uploadList 就是 原文档中的那个渲染的 uplist 是个数组，所以要把filelist 赋值给他
      this.uploadList = fileList;

      // 调用监听 上传进度 的事件
      event.target.onprogress = event => {
        let uploadPercent = parseFloat(
          ((event.loaded / event.total) * 100).toFixed(2)
        ); // 保留两位小数，具体根据自己需求做更改

        // 手动设置显示上传进度条 以及上传百分比
        file.showProgress = true;
        file.percentage = uploadPercent;
      };
    }
  }
};
</script>

<style lang="less" scoped>
.uploadWrap {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}
.demo-upload-list {
  display: inline-block;
  width: 160px;
  height: 160px;
  text-align: center;
  line-height: 160px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
  position: absolute;
  left: 0;
  top: 0;
}
.demo-upload-list img {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  left:0;
  top:0;
  bottom:0;
  right:0;
  margin: auto;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 25px;
  cursor: pointer;
  margin: 0 2px;
}
.uploadWrap .ivu-icon-ios-camera {
  font-size: 40px !important;
}
</style>