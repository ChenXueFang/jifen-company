<template>
  <div class="CreateActivityStep3">
    <div class="stepWrap">
      <Steps :current="step.currentStep">
        <Step title="选择模板" content="选择你要编辑的模板" class="my-step1"></Step>
        <Step title="基本信息设置" content="填写活动基本信息"></Step>
        <Step title="编辑模板" content="编辑你选择的模板"></Step>
        <Step title="发布成功" content="发布成功，可在互动管理查看"></Step>
      </Steps>
    </div>
    <div class="content">
      <!-- 编辑模板 -->
      <div class="editTemplate">
        <!-- 左侧模块 -->
        <div class="editLeft">
          <div class="title">
            活动页面
            <span>共{{pageList.length}}页</span>
          </div>
          <div class="leftWrap scollWrap">
            <ul>
              <li
                v-bind:class="{'choosed':pageIndexs==index}"
                v-for="(item,index) in pageList"
                :key="item.PageId"
                @click="choosedPage(index,item)"
              >
                <div class="title">{{item.PageName}}</div>
                <img :src="item.msgList.PageImg_URL" />
              </li>
            </ul>
          </div>
        </div>
        <!-- 中间模块 -->
        <div class="editCenter">
          <div class="title">编辑页面</div>
          <!-- 转盘抽奖 -->
          <div class="lottery scollWrap" v-show="isLoaded">
            <div
              class="center"
              :class="{'choosedArea':PageConfig.pagebg.IsChoosed&&canChooseBg}"
              @click="editDetails('pagebg',PageConfig.pagebg)"
              :style="{backgroundImage:'url(' + getSrc(PageConfig.pagebg.ImgUrl) + ')'}"
            >
              <div class="lotteryHeader">
                <img
                  class="title"
                  :class="{'choosedArea':PageConfig.pagetitle.IsChoosed}"
                  @click.stop="editDetails('pagetitle',PageConfig.pagetitle)"
                  :src="getSrc(PageConfig.pagetitle.ImgUrl)"
                />
              </div>
              <div class="lottorybg">
                <div class="container" id="container">
                  <div id="trial" class="trial" v-if="PageConfig.pagebg.PageCode=='page-01'">
                    <!-- 增加表单 -->
                    <div :class="{'choosedArea':PageConfig.forminfo['IsChoosed']}">
                      <div
                        class="infoList"
                        :key="index"
                        v-for="(item,index) in PageConfig.forminfo.formlist"
                      >
                        <div @click.stop="editDetails('forminfo',item)">
                          <span>{{item.Name}}</span>
                          <input
                            type="text"
                            readonly
                            :style="{backgroundColor:item.ColorName16}"
                            v-model="item.value"
                            :placeholder="'请输入'+item.Name"
                          />
                        </div>
                      </div>
                    </div>

                    <div style="padding: 10px 5px;">
                      <div style="margin-bottom:5px" @click.stop="editDetails('uploadtip',PageConfig.uploadtip)" :class="{'choosedArea':PageConfig.uploadtip.IsChoosed}"
                        v-html="PageConfig.uploadtip.DesName">添加图片</div>
                      <div>
                        <img
                          class="addpicbtn"
                          :class="{'choosedArea':PageConfig.addpicbtn.IsChoosed}"
                          @click.stop="editDetails('addpicbtn',PageConfig.addpicbtn)"
                          :src="getSrc(PageConfig.addpicbtn.ImgUrl)"
                        />
                      </div>
                    </div>
                    <div>
                      <img
                        class="submitbtn"
                        :class="{'choosedArea':PageConfig.submitbtn.IsChoosed}"
                        @click.stop="editDetails('submitbtn',PageConfig.submitbtn)"
                        :src="getSrc(PageConfig.submitbtn.ImgUrl)"
                      />
                    </div>
                  </div>

                  <!--page-02页面-->
                  <div class="trial" v-if="PageConfig.pagebg.PageCode=='page-02'">
                    <div style="text-align: center;margin-top: 35px;">
                      <h2
                        :class="{'choosedArea':PageConfig.tittext.IsChoosed}"
                        v-html="PageConfig.tittext.DesName"
                        @click.stop="editDetails('tittext',PageConfig.tittext)"
                      ></h2>
                      <img
                        class="qrimage"
                        :class="{'choosedArea':PageConfig.qrimage.IsChoosed}"
                        @click.stop="editDetails('qrimage',PageConfig.qrimage)"
                        :src="getSrc(PageConfig.qrimage.ImgUrl)"
                      />
                      <p
                        class="foottext"
                        :class="{'choosedArea':PageConfig.foottext.IsChoosed}"
                        v-html="PageConfig.foottext.DesName"
                        @click.stop="editDetails('foottext',PageConfig.foottext)"
                      ></p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 弹窗 -->
              <template>
                <!-- 删除图片 falg:0 -->
                <div
                  class="Popout"
                  v-if="flag==0"
                  @click.stop="editDetails('delpic',PageConfig.delpic)"
                >
                  <div class="mask">
                    <div class="maskContent">
                      <h1
                        :class="{'choosedArea':PageConfig.delpic.IsChoosed}"
                        v-html="PageConfig.delpic.DesName"
                        @click.stop="editDetails('delpic',PageConfig.delpic)"
                      ></h1>
                      <div>
                        <img
                          class="submitdelpicbtn"
                          :class="{'choosedArea':PageConfig.submitdelpicbtn.IsChoosed}"
                          @click.stop="editDetails('submitdelpicbtn',PageConfig.submitdelpicbtn)"
                          :src="getSrc(PageConfig.submitdelpicbtn.ImgUrl)"
                        />
                        <img
                          class="canceldelpicbtn"
                          :class="{'choosedArea':PageConfig.canceldelpicbtn.IsChoosed}"
                          @click.stop="editDetails('canceldelpicbtn',PageConfig.canceldelpicbtn)"
                          :src="getSrc(PageConfig.canceldelpicbtn.ImgUrl)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 确认提交 falg:1 -->
                <div
                  class="Popout"
                  v-if="flag==1"
                  @click.stop="editDetails('getgifttitle',PageConfig.getgifttitle)"
                >
                  <div class="mask">
                    <div class="maskContent1">
                      <img
                        class="comfrimimg"
                        :class="{'choosedArea':PageConfig.comfrimimg.IsChoosed}"
                        @click.stop="editDetails('comfrimimg',PageConfig.comfrimimg)"
                        :src="getSrc(PageConfig.comfrimimg.ImgUrl)"
                      />

                      <h1
                        :class="{'choosedArea':PageConfig.comfriminfo.IsChoosed}"
                        v-html="PageConfig.comfriminfo.DesName"
                        @click.stop="editDetails('comfriminfo',PageConfig.comfriminfo)"
                      ></h1>
                      <div>
                        <img
                          class="submitdelpicbtn"
                          :class="{'choosedArea':PageConfig.returnedit.IsChoosed}"
                          @click.stop="editDetails('returnedit',PageConfig.returnedit)"
                          :src="getSrc(PageConfig.returnedit.ImgUrl)"
                        />
                        <img
                          class="canceldelpicbtn"
                          :class="{'choosedArea':PageConfig.confirmsubmit.IsChoosed}"
                          @click.stop="editDetails('confirmsubmit',PageConfig.confirmsubmit)"
                          :src="getSrc(PageConfig.confirmsubmit.ImgUrl)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- 右侧编辑模块 -->
        <div class="editRight">
          <div class="title">编辑内容</div>
          <div class="editWrap">
            <div class="editContent scollWrap">
              <!-- 图片编辑 -->
              <template v-if="editConfig.FormType==1">
                <p class="title">{{editConfig.Name}}</p>
                <div class="explain">{{editConfig.Remark}}</div>
                <v-upload
                  ref="upload"
                  v-on:save="saveFile"
                  v-on:delete="deleteUpImg"
                  :config="editConfig"
                ></v-upload>
              </template>

              <!-- 文本编辑 -->
              <template v-if="editConfig.FormType==2">
                <p class="title underline">{{editConfig.Name}}</p>
                <v-editor ref="editor" :catchData="catchData" :html-content="editConfig.DesName"></v-editor>
              </template>

              <!-- 表单控件/输入框-->
              <template v-if="editConfig.FormType==3">
                <p class="title underline">编辑表单内容</p>
                <div :key="index" v-for="(item,index) in PageConfig.forminfo.formlist" class="formItem">
                  <div style="margin:10px 0;display: flex;align-items: center;justify-content: center;">
                    <span class="forminfotit">标题：</span>
                    <input class="forminfoinput" ref="input" v-model="item.Name" maxlength="500" />
                  </div>
                  <div style="margin:10px 0;display: flex;align-items: center;justify-content: center;">
                    <span class="forminfotit">AttrName：</span>
                    <input class="forminfoinput" ref="input" v-model="item.AttrName" maxlength="500" />
                  </div>
                  <div>
                    <v-color-picker
                      ref="pickcolor"
                      :item="item"
                      v-on:pick="pickColor"
                      :init-color="item.ColorName16"
                      :label-text="'输入框样式'" 
                      init-length="242"
                      bace-color='#e4f9ff'
                    ></v-color-picker>
                  </div>
                  <div class="delete" @click="deletForm(index)">
                    <img src="../../assets/close.png" alt="">
                  </div>
                  <!-- <div class="conAdd delete" @click="deletForm">
                    <span>删除</span>
                  </div> -->
                  <!-- <p class="underline" style="margin-top:15px"></p> -->
                </div>
                <div class="conAdd" @click="handleAdd">
                  <span>继续添加</span>
                </div>
              </template>

              <!-- 颜色编辑 -->
              <template v-if="editConfig.FormType==4">
                <p class="title underline" style="margin-bottom:25px">{{editConfig.Name}}</p>
                <v-color-picker
                  ref="pickcolor"
                  v-on:pick="pickColor"
                  :init-color="editConfig.ColorName16"
                  :label-text="'编辑颜色'"
                ></v-color-picker>
              </template>
            </div>

            <!-- 按钮区域 -->
            <div class="btnWrap">
              <Button @click="cancelEdit">取消</Button>
              <Button type="primary" @click="saveEdit">保存</Button>
              <Button type="success" @click="publish">发布</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { baseUrl, uploadUrl, imgUrl } from "../../utils/env";
import UploadImg from "@/components/UploadImg.vue";
import RichEditor from "@/components/RichEditor.vue";
import ColorPicker from "@/components/ColorPicker.vue";
const _ = require("lodash");

export default {
  inject: ["reload"], //注入依赖
  name: "CreateActivityTrial",
  data() {
    return {
      imgUrl: imgUrl, //图片域名
      isLoaded: false, //接口是否加载完

      //左侧属性
      pageList: [], //左侧活动页面列表
      pageIndexs: 0, //左侧选中index
      pageId: 0, //左侧活动页id

      //中间属性
      pageDetails: [], //中间页面元素详情
      flag: -1, //弹窗显示状态
      canChooseBg: true, //是否可以选首页背景图，防止弹框出现时还可选择
      //新品试用表单填写页面配置
      PageConfig: {
        pagebg: {},
        pagetitle: {},
        forminfo: { formlist: [] },
        uploadtip:{},
        addpicbtn: {},
        submitbtn: {},

        delpic: {}, //删除图片弹窗
        submitdelpicbtn: {}, //删除图片确认按钮
        canceldelpicbtn: {}, //删除图片取消按钮

        comfrimimg: {}, //确认提交信息弹窗-标题图片
        comfriminfo: {}, //确认提交信息弹窗-标题
        confirmsubmit: {}, //确认提交信息弹窗-确认提交
        returnedit: {}, //确认提交信息弹窗-返回修改

        tittext: {}, // page2页面文字标题
        qrimage: {}, // page2页面二维码图片
        foottext: {}, // page2页面文字提示

        getgifttitle: {}
      },

      //右侧编辑区域属性
      hasGroup: -1, //是否是组 1代表是组 0代表不是组
      editorType: "pagebg", //编辑区域类型
      editConfig: "", //编辑配置内容
      color: "",
      index : 1
    };
  },
  components: {
    "v-upload": UploadImg,
    "v-editor": RichEditor,
    "v-color-picker": ColorPicker
  },
  computed: {
    ...mapGetters(["step"])
  },
  created() {
    this.getTemplatePage();
  },
  mounted() {
    this.addProperty();
  },
  methods: {
    ...mapActions(["UpdateStep"]),

    //给页面配置元素增加IsChoosed属性
    addProperty() {
      _.mapKeys(this.PageConfig, (value, key) => {
        this.PageConfig[key].IsChoosed = false;
      });
    },
    getSrc(src) {
      return this.imgUrl + src;
    },
    //获取上传图片--给editConfig赋值新的属性
    saveFile(src) {
      this.editConfig.NewImgUrl = src;
    },
    //删除已上传的图片
    deleteUpImg(config) {
      this.editConfig.NewImgUrl = "";
    },
    //获取富文本内容--给editConfig赋值新的属性
    catchData(val, type) {
      this.editConfig.NewDesName = val;
    },
    //获取选择的颜色--给editConfig赋值新的属性
    pickColor(color, item) {
      // debugger
      this.editConfig.NewColorName16 = color;
      item.ColorName16 = color;
    },
    //获取基础模板的页面列表
    getTemplatePage() {
      var data = {
        templateId: this.step.baseTemplateId,
        pageSize: 9999,
        pageIndex: 1,
        sortName: "SortIndex",
        sortOrder: "asc"
      };
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 50
              }
            }),
            h("div", "Loading")
          ]);
        }
      });
      this.$post("/api/crmModuleTemplatePage/GetListBySC", data).then(res => {
        this.$Spin.hide();
        if (res.state == 1) {
          this.pageList = res.rows;
          this.pageId = this.pageList[0].PageId;
          this.getPageConfig(this.pageList[0].PageId);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    //选择左侧活动页--获取中间页面配置明细
    choosedPage(index, page) {
      this.pageId = page.PageId;
      this.pageIndexs = index;
      this.editorType = "";

      // 出现弹框时 首页背景不可选
      if (this.pageIndexs > 0) {
        this.canChooseBg = false;
        if (page.PageCode != "page-01") {
          this.canChooseBg = true;
        }
      } else {
        this.canChooseBg = true;
      }
      //弹框显示状态
      if (!page.ShowFlag) {
        this.flag = -1;
      } else {
        this.flag = page.ShowFlag;
      }

      //改变左侧活动页面时 清空所有选中状态
      _.mapKeys(this.PageConfig, (value, key) => {
        this.PageConfig[key].IsChoosed = false;
      });
      // 动态改变对象 & 克隆
      var pageConfigStr = JSON.stringify(this.PageConfig);
      this.PageConfig = JSON.parse(pageConfigStr);

      this.getPageConfig(page.PageId);
    },
    //获取中间页面配置明细
    getPageConfig(pageId) {
      var data = {
        templateId: this.step.templateId,
        pageId: pageId,
        pageSize: 9999,
        pageIndex: 1
      };
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 50
              }
            }),
            h("div", "Loading")
          ]);
        }
      });
      this.isLoaded = false;
      this.$post("/api/crmModuleTempletePageConfig/GetListBySC", data).then(
        res => {
          this.$Spin.hide();
          this.PageConfig.forminfo = { formlist: [] };
          if (res.state == 1) {
            this.pageDetails = res.rows;

            //给页面元素增加是否选中属性 默认第一条数据选中
            _.forEach(this.pageDetails, (a, index) => {
              if (index == 0) {
                a.IsChoosed = true;
                this.editConfig = a;
              } else {
                a.IsChoosed = false;
              }
            });
            if (this.pageDetails.length == 0) {
              return;
            }
            //给页面配置元素赋值
            for (var i = 0; i < this.pageDetails.length; i++) {
              var item = this.pageDetails[i];
              //背景图片
              if (item.DisCode == "background-image") {
                this.PageConfig.pagebg = item;
              }
              //标题图片
              else if (item.DisCode == "title-image") {
                this.PageConfig.pagetitle = item;
              }
              //表单
              else if (item.DisCode == "form-info") {
                this.PageConfig.forminfo.formlist.push(item);
              }
              else if (item.DisCode == "upload-tip"){
                this.PageConfig.uploadtip = item;
              }
              //添加图片
              else if (item.DisCode == "uploadbg-image") {
                this.PageConfig.addpicbtn = item;
              }
              //提交按钮
              else if (item.DisCode == "submit-button") {
                this.PageConfig.submitbtn = item;
              }

              //删除图片弹窗
              else if (item.DisCode == "delete-title-text") {
                this.PageConfig.delpic = item;
              }
              //删除图片确认按钮
              else if (item.DisCode == "confirm-delete-button") {
                this.PageConfig.submitdelpicbtn = item;
              }
              //删除图片取消按钮
              else if (item.DisCode == "cancle-delete-button") {
                this.PageConfig.canceldelpicbtn = item;
              }
              //确认提交信息弹窗-图片
              else if (item.DisCode == "confirm-title-image") {
                this.PageConfig.comfrimimg = item;
              }
              //确认提交信息弹窗-标题
              else if (item.DisCode == "confirm-title-text") {
                this.PageConfig.comfriminfo = item;
              }
              //确认提交信息弹窗-返回修改
              else if (item.DisCode == "confirm-submit-button") {
                this.PageConfig.confirmsubmit = item;
              }
              //确认提交信息弹窗-确认提交
              else if (item.DisCode == "confirm-return-edit") {
                this.PageConfig.returnedit = item;
              }

              //提交成功页
              else if (item.DisCode == "title-text") {
                this.PageConfig.tittext = item;
              }
              //二维码图片  qr-image
              else if (item.DisCode == "qr-image") {
                this.PageConfig.qrimage = item;
              }
              //文字提示 foot-text
              else if (item.DisCode == "foot-text") {
                this.PageConfig.foottext = item;
              }
            }
            this.isLoaded = true;
          } else {
            this.$Message.error(res.msg);
          }
        }
      );
    },

    //选择可编辑的内容 对应区域修改为选中状态
    editDetails(type, config) {
      this.editorType = type;
      this.editConfig = config;

      //父组件 通过ref修改子组件的值 清空uploadList
      if (this.$refs.upload) {
        this.$refs.upload.uploadList = [];
      }
      _.mapKeys(this.PageConfig, (value, key) => {
        if (key == type) {
          this.PageConfig[key].IsChoosed = true;
        } else {
          this.PageConfig[key].IsChoosed = false;
        }
      });
      // 动态改变对象 & 克隆
      var pageConfigStr = JSON.stringify(this.PageConfig);
      this.PageConfig = JSON.parse(pageConfigStr);
    },
    //取消编辑
    cancelEdit() {
      //父组件 通过ref修改子组件的值 清空uploadList editorContent
      if (this.$refs.upload) {
        this.$refs.upload.uploadList = [];
      } else if (this.$refs.editor) {
        this.$refs.editor.editorContent = "";
        this.$refs.editor.htmlContent = "";
      } else if (this.$refs.pickcolor) {
        this.$refs.pickcolor.initColor = "";
      }
    },
    //保存编辑
    saveEdit() {
      if (!this.editConfig) {
        return;
      }
      var arr = [];
      var json = {
        pageConfigId: this.editConfig.PageConfigId,
        ak: this.step.activityNo
      };
      //如果没有编辑新的内容，就还保留老的
      if (this.editConfig.FormType == 1) {
        if (!this.editConfig.NewImgUrl) {
          json.ImgUrl = this.editConfig.ImgUrl;
        } else {
          json.ImgUrl = this.editConfig.NewImgUrl;
        }
        arr.push(json);
      } else if (this.editConfig.FormType == 2) {
        if (!this.editConfig.NewDesName) {
          json.desName = this.editConfig.DesName;
        } else {
          json.desName = this.editConfig.NewDesName;
        }
        arr.push(json);
      } else if (this.editConfig.FormType == 3) {
        var FormList = this.PageConfig.forminfo.formlist;
        // 给表单数组里的ak值赋值
        for (var i = 0; i < FormList.length; i++) {
          if(!FormList[i].Name){
            this.$Notice.warning({
                    title: '标题不能为空！',
                    desc:''
                });
            return;
          }
          if(!FormList[i].AttrName){
            this.$Notice.warning({
                    title: 'AttrName不能为空！',
                    desc:''
                });
            return;
          }
          FormList[i].ak = this.step.activityNo;
          // 不是新增的就赋值pageConfigId
          if ((FormList[i].pageConfigId == "isAddForm")) {
            FormList[i].pageConfigId = "";
          }
        }
        // 表单颜色
        // if (!this.editConfig.NewColorName16) {
        //   for (var i = 0; i < FormList.length; i++) {
        //     FormList[i].colorName16 = this.editConfig.ColorName16;
        //   }
        // } else {
        //   for (var i = 0; i < FormList.length; i++) {
        //     FormList[i].colorName16 = this.editConfig.NewColorName16;
        //   }
        // }
        arr = FormList;
      } else if (this.editConfig.FormType == 4) {
        if (!this.editConfig.NewColorName16) {
          json.colorName16 = this.editConfig.ColorName16;
        } else {
          json.colorName16 = this.editConfig.NewColorName16;
        }
        arr.push(json);
      }
      // arr.push(json);
      console.log(json);

      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 50
              }
            }),
            h("div", "Loading")
          ]);
        }
      });
      this.isLoaded = false;
      this.$post(
        "/api/crmModuleTempletePageConfig/SavePageConfig",
        JSON.stringify(arr)
      ).then(res => {
        this.$Spin.hide();
        this.isLoaded = true;
        if (res.state == 1) {
          //当修改转盘页面元素时 刷新页面 防止转盘重复draw问题
          if (this.pageIndexs == 0) {
            //直接调用this.reload()，刷新页面
            this.reload();
          } else {
            this.getPageConfig(this.pageId);
          }
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    // 表单删除
    deletForm(index) {
      this.PageConfig.forminfo.formlist.splice(index, 1);
      this.index--;
      // this.PageConfig.forminfo.formlist.push({
      //   Name: "",
      //   ColorName16: "",
      //   AttrName: "",
      //   index: this.index,
      //   DisCode: this.PageConfig.forminfo.formlist[0].DisCode,
      //   TemplateId: this.PageConfig.forminfo.formlist[0].TemplateId,
      //   PageId: this.PageConfig.forminfo.formlist[0].PageId,
      //   pageConfigId: "isAddForm"
      // });
    },
    //继续添加表单项
    handleAdd() {
      this.index++;
      this.PageConfig.forminfo.formlist.push({
        Name: "",
        ColorName16: "",
        AttrName: "",
        index: this.index,
        DisCode: this.PageConfig.forminfo.formlist[0].DisCode,
        TemplateId: this.PageConfig.forminfo.formlist[0].TemplateId,
        PageId: this.PageConfig.forminfo.formlist[0].PageId,
        pageConfigId: "isAddForm"
      });
    },
    //发布
    publish() {
      this.UpdateStep({
        currentStep: 3,
        templateName: this.step.templateName,
        baseTemplateId: this.step.baseTemplateId,
        templateId: this.step.templateId,
        templateImg: this.step.templateImg,
        activityId: this.step.activityId,
        activityNo: this.step.activityNo
      });
      this.$router.push({ name: "CreateActivityStep4" });
    }
  }
};
</script>
<style lang="less" scoped>
.CreateActivityStep3 {
  text-align: left;
  min-width: 800px;
}
.ivu-form-item {
  margin-bottom: 5px;
}
.stepWrap {
  padding: 15px 10px 10px 10px;
  background-color: #fff;
  box-shadow: 0px 6px 8px 0px rgba(6, 15, 53, 0.05);
  border-radius: 10px;
}
.content {
  margin-top: 15px;
  border-radius: 10px;
  padding: 10px 0 0 0;
  .editTemplate {
    width: 100%;
    height: calc(100vh - 180px);
    min-height: 480px;
    display: flex;
    justify-content: space-between;

    .editLeft {
      width: 300px;
      height: 100%;
      .title span {
        color: #666;
        font-size: 10px;

        margin-left: 5px;
      }
      .leftWrap {
        width: 100%;
        height: calc(100% - 30px);
        background: #fff;
        box-shadow: 0px 6px 8px 0px rgba(6, 15, 53, 0.05);
        border-radius: 10px;
        margin-top: 10px;
        overflow-y: auto;
        ul {
          width: 240px;
          padding: 20px 0 0 0;
          margin: 0 auto;

          li {
            height: auto;
            margin: 0 auto 20px;
            padding-bottom: 10px;
            background-color: #ffffff;
            border: solid 1px #ebebeb;
            border-radius: 10px;
            text-align: center;
            &.choosed {
              box-shadow: 0px 0px 13px 0px rgba(53, 61, 100, 0.22);
            }
            .title {
              text-align: center;
              padding: 15px 0 8px 0;
            }
            img {
              width: 200px;
              height: auto;
            }
          }
        }
      }
    }
    .editCenter {
      width: 340px;
      height: 100%;

      // 转盘页面
      .lottery {
        width: 340px;
        height: calc(100% - 30px);
        overflow-y: auto;
        margin-top: 10px;
        position: relative;
        .center {
          margin: 0 auto;
          text-align: center;
          width: 330px;
          min-height: 580px;
          height: auto;
          overflow-x: hidden;
          // background-image: url(../../assets/lottery/EHCBg.jpg);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          position: relative;
        }
        .lotteryHeader {
          width: 100%;
          height: 170px;
          position: relative;
          z-index: 2;
          text-align: center;
          .title {
            width: 35%;
            height: auto;
            margin: 30px auto 0;
          }
        }
        .record {
          width: 65px;
          position: absolute;
          right: 0;
          top: 145px;
          z-index: 10;
        }
        .lottorybg {
          width: 300px;
          height: auto;
          margin: 0 auto;
          margin-top: -75px;
          border-radius: 5px;
          background-color: #fff;
        }

        .container {
          position: relative;
          box-sizing: border-box;
          padding: 50px 20px;

          .trial {
            text-align: left;
            position: relative;

            .qrimage {
              width: 50%;
              margin: 20px 0;
            }
            .foottext {
              line-height: 25px;
            }
          }
          .addpicbtn {
            width: 30%;
          }
          .submitbtn {
            width: 100%;
            margin-top: 20px;
          }
          .btnwrap {
            position: absolute;
            width: 80px;
            height: 100px;
            top: 50%;
            left: 50%;
            margin-left: -40px;
            margin-top: -55px;
            transform: translateZ(0);
            outline: 1px solid transparent;
            z-index: 1;
          }
          .btn {
            position: absolute;
            width: 80px;
            top: 0;
            left: 0;
          }
        }
        .Popout {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 100;
          .mask {
            width: 80%;
            background-color: #ffffff;
            border-radius: 10px;
            min-height: 110px;
            padding-bottom: 15px;
            text-align: center;
            position: absolute;
            left: 10%;
            top: 125px;
            .close {
              width: 25px;
              height: auto;
              position: absolute;
              top: -20px;
              right: -20px;
            }
            .maskContent {
              width: 90%;
              margin: 20px auto 0;
              position: relative;
              h1 {
                font-size: 18px;
                // color: #fc595a;
                margin-bottom: 15px;
                padding: 5px 0 !important;
              }
              p {
                font-size: 14px;
                color: #666666;
                padding: 5px 0 !important;
              }
              .prize {
                display: block;
                width: 50px;
                margin: 10px auto 0;
              }
              .btn {
                width: 120px;
                margin-top: 15px;
                padding: 5px !important;
              }

              .submitdelpicbtn {
                width: 45%;
                display: inline-block;
              }
              .canceldelpicbtn {
                width: 45%;
                display: inline-block;
                margin-left: 5%;
              }
            }
            .maskContent1 {
              width: 90%;
              margin: 20px auto 0;
              position: relative;
              h1 {
                font-size: 18px;
                // color: #fc595a;
                margin-bottom: 15px;
                padding: 25px 0 5px 0 !important;
              }
              p {
                font-size: 14px;
                color: #666666;
                padding: 5px 0 !important;
              }
              .prize {
                display: block;
                width: 50px;
                margin: 10px auto 0;
              }
              .btn {
                width: 120px;
                margin-top: 15px;
                padding: 5px !important;
              }

              .submitdelpicbtn {
                width: 45%;
                display: inline-block;
              }
              .canceldelpicbtn {
                width: 45%;
                display: inline-block;
                margin-left: 5%;
              }
              .comfrimimg {
                width: 30%;
                position: absolute;
                margin-top: -60px;
                margin-left: -35px;
              }
            }
          }
          .maskBottom {
            width: 100%;
            height: 80%;
            background-color: #ffffff;
            border-radius: 25px 25px 0px 0px;
            position: absolute;
            left: 0;
            bottom: 0;
            .tabs {
              width: 90%;
              height: auto;
              border-bottom: 1px solid #c9c9c9;
              display: flex;
              padding: 15px 0 10px 0;
              margin: 0 auto 15px;
              position: relative;
              div {
                margin-right: 15px;
                color: #999;
                line-height: 20px;
                &.actived {
                  color: #fc595a;
                  font-weight: 600;
                  border-bottom: 1px solid;
                }
              }
              .ivu-icon {
                font-size: 25px;
                position: absolute;
                right: 0;
              }
            }
          }
        }
      }
    }
    .editRight {
      width: 400px;
      height: 100%;
      .editWrap {
        width: 100%;
        height: calc(100% - 30px);
        background: #fff;
        box-shadow: 0px 6px 8px 0px rgba(6, 15, 53, 0.05);
        border-radius: 10px;
        margin-top: 5px;
        position: relative;
        .editContent {
          padding: 25px 20px;
          height: calc(100% - 50px);
          overflow-y: auto;
        }
        .title {
          width: 100%;
          color: #333333;
          margin-bottom: 10px;
          line-height: 30px;
        }
        .underline {
          border-bottom: 1px solid #d7d7d7;
        }
        .formItem{
          padding: 20px 10px 10px;
          margin: 10px 0;
          background: #f4f4f4;
          box-shadow: 2px 3px 6px #f4f4f4;
          position: relative;
          .colorIpt{
            width: 85%;
          }
        }
        .explain {
          width: 100%;
          font-size: 12px;
          color: #ff3434;
          text-align: center;
          padding: 10px 0;
          background-color: #ffefef;
          border-top: 1px solid #d7d7d7;
          box-sizing: border-box;
        }
        .btnWrap {
          width: 100%;
          padding: 0 20px;
          height: 50px;
          position: absolute;
          bottom: 0;
          left: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          button {
            width: 90px;
            height: 32px;
          }
        }
      }
    }
  }
  .choosedArea {
    border: dashed 1px red;
    background: rgba(0, 0, 0, 0.15);
    // padding: 0 !important;
  }
  /*定义滚动条高宽 分别对应横竖滚动条的尺寸*/
  .scollWrap::-webkit-scrollbar {
    width: 5px;
    height: 0.1px;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  .scollWrap::-webkit-scrollbar-track {
    width: 1px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
  }

  /*定义滑块 内阴影+圆角*/
  .scollWrap::-webkit-scrollbar-thumb {
    width: 5px;
    height: 10px;
    border-radius: 1px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    background-color: #dedede;
  }
}
.infoList {
  width: 100%;
  height: auto;
  text-align: left;
  font-size: 14px;
  margin-top: 10px;
  position: relative;
}
.infoList span {
  display: inline-block;
  color: #333;
  padding-left: 8px;
  font-size: 14px;
  margin-bottom: 5px;
}
.infoList input {
  width: 100%;
  height: 40px;
  background-color: #e4f9ff;
  border-radius: 20px;
  border: none;
  outline: none;
  text-indent: 8px;
  color: #333;
}
.forminfotit {
  display: inline-block;
  width: 78px;
}
.forminfoinput {
  // width: 72%;
  width: 60%;
  height: 30px;
  border: 1px solid #dcdee2;
  border-radius: 5px;
  padding-left: 5px;
}
.conAdd {
  width: 100%;
  border: 1px solid #dcdee2;
  height: 30px;
  text-align: center;
  line-height: 30px;
  margin-top: 10px;
  border-radius: 3px;
}
.delete{
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 20px;
  background: red;
  border-radius: 50%;
  img{
    width: 100%;
  }
}

@media screen and (max-width: 1360px) {
  /*当屏幕尺寸小于1360px时，应用下面的CSS样式*/
  .editRight {
    width: 340px !important;
    height: 100%;
  }
  .forminfoinput {
    widows: 260px !important;
  }
}
</style>