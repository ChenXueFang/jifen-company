<template>
  <div class="CreateActivityStep3 feedback">
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
            <template>
              <div
                class="NewProductTrialFeedback GCFeedback"
                :class="{'choosedArea':PageConfig.pagebg.IsChoosed&&canChooseBg}"
                v-if="PageConfig.pagebg.PageCode=='page-01'"
                :style="{backgroundImage:'url(' + getSrc(PageConfig.pagebg.ImgUrl) + ')'}"
                @click="editDetails('pagebg',PageConfig.pagebg)"
              >
                <img class="title" :class="{'choosedArea':PageConfig.titleImage.IsChoosed}"
                  @click.stop="editDetails('titleImage',PageConfig.titleImage)" :src="getSrc(PageConfig.titleImage.ImgUrl)" />
                <!-- 块内容 -->
                <div>
                  <div
                    class="infoWrap"
                    v-for="(item,index) in PageConfig.jsons"
                    :key="index"
                    style="margin-top:0.6rem" :class="{'choosedArea':PageConfig.forminfo['IsChoosed'] && choosedIndex==index}"
                  >
                    <div class="infoList" style="position:relative" @click.stop="editDetails('forminfo',item,index)">
                      <div class="listtitle" v-if="item.Title">
                        <i></i>
                        <span v-html="item.Title.DesName"></span>
                      </div>
                      <div class="listintro" v-html="item.intro.DesName" v-if="item.intro"></div>
                      <template v-if="item.uploadimage">
                         <!-- v-if="item.imgtext" -->
                        <span class="intro" v-html="item.imgtext.DesName" v-if="item.imgtext"></span>
                        <span class="video" v-html="item.videotext.DesName" v-if="item.videotext"></span>
                        <ul class="clear">
                          <li
                            class="fl" v-if="item.uploadimage"
                            :style="{backgroundImage:'url(' + getSrc(item.uploadimage.ImgUrl)+ ')'}"
                          >
                          </li>
                          <li v-if="item.uploadimage"
                            class="fl"
                            :style="{backgroundImage:'url(' + getSrc(item.uploadimage.ImgUrl)+ ')'}"
                          >
                          </li>
                          <li v-if="item.uploadimage"
                            class="fl"
                            :style="{backgroundImage:'url(' + getSrc(item.uploadimage.ImgUrl)+ ')'}"
                          >
                          </li>
                          <li
                            class="fl" v-if="item.uploadimage"
                            :style="{backgroundImage:'url('  + getSrc(item.uploadimage.ImgUrl)+ ')'}"
                          >
                            <div class="details">
                            </div>
                          </li>
                        </ul>
                        <div
                          class="tips"
                          v-if="item.tip"
                          :style="{color:item.tip.ColorName16}"
                          v-html="item.tip.DesName"
                        ></div>
                      </template>
                    </div>
                    
                    <div class="infoList" v-if="item.inputbg">
                       <!-- :style="{color:item.Title.ColorName16}" -->
                       <textarea
                        :style="{backgroundImage:'url(' + getSrc(item.inputbg.ImgUrl)+ ')'}"
                        name="textarea"
                        maxlength="1000"
                        rows="2" readonly
                      ></textarea> 
                    </div>
                  </div>
                </div>
                <!-- 内容结束 -->
                <img class="commitbtn" :class="{'choosedArea':PageConfig.commitbtn.IsChoosed}"
                        @click.stop="editDetails('commitbtn',PageConfig.commitbtn)"
                        :src="getSrc(PageConfig.commitbtn.ImgUrl)" />
                <!-- <van-popup
                  class="Popout content2"
                  :close-on-click-overlay="false"
                  v-model="hassubmit"
                >
                  <div class="title2" v-html="PageConfig.successModal.text.DesName"></div>
                  <img class="close" @click="CloseWx" src="../../assets/CloseIcon.png" />
                </van-popup>
                <van-popup
                  class="Popout content2"
                  :close-on-click-overlay="false"
                  v-model="IsSubmot"
                >
                  <div class="title2" v-html="PageConfig.confirmModal.text.DesName"></div>
                  <div class="clear btns">
                    <img
                      class="fl"
                      @click="IsSubmot=false"
                      :src="PageConfig.confirmModal.returnbtn.ImgUrl"
                    />
                    <img
                      class="fr"
                      @click="feedbackPreview"
                      :src="PageConfig.confirmModal.submitbtn.ImgUrl"
                    />
                  </div>
                </van-popup>
                <van-popup
                  class="Popout content2"
                  :close-on-click-overlay="false"
                  v-model="IsDelete"
                >
                  <div
                    class="title2"
                    style="margin-top:0"
                    v-html="PageConfig.deleteModal.text.DesName"
                  ></div>
                  <div class="clear btns">
                    <img
                      class="fl"
                      @click="RemoveImg"
                      :src="PageConfig.deleteModal.submitbtn.ImgUrl"
                    />
                    <img
                      class="fr"
                      @click="IsDelete=false"
                      :src="PageConfig.deleteModal.returnbtn.ImgUrl"
                    />
                  </div>
                </van-popup> -->
              </div>
            </template>
            <!--page-02页面-->
            <template>
            <!-- 新品试用反馈预览 -->
              <div class="NewProductTrialPreview" :class="{'choosedArea':PageConfig.pagebg.IsChoosed&&canChooseBg}" v-if="PageConfig.pagebg.PageCode=='page-02'" :style="{backgroundImage:'url(' + getSrc(PageConfig.pagebg.ImgUrl) + ')'}" @click="editDetails('pagebg',PageConfig.pagebg)">
                  <div class="Preview" :style="{backgroundImage:'url(' + getSrc(PageConfig.contentbg.ImgUrl) + ')'}" :class="{'choosedArea':PageConfig.contentbg.IsChoosed}" @click.stop="editDetails('contentbg',PageConfig.contentbg)">
                    <img class="logo" :class="{'choosedArea':PageConfig.logoimage.IsChoosed}"
                            @click.stop="editDetails('logoimage',PageConfig.logoimage)"
                            :src="getSrc(PageConfig.logoimage.ImgUrl)">
                    <img class="title" :class="{'choosedArea':PageConfig.titleImage.IsChoosed}"
                            @click.stop="editDetails('titleImage',PageConfig.titleImage)"
                            :src="getSrc(PageConfig.titleImage.ImgUrl)"/>
                      <!-- 开箱篇 -->
                    <div class="infoWrap" style="margin-top:0.5rem">
                      <div class="infoList" style="position:relative">
                          <div class="listtitle">
                              XX篇
                          </div>
                          <div class="swiper-button">
                            <img :src="getSrc(PageConfig.leftarrow.ImgUrl)" :class="{'choosedArea':PageConfig.leftarrow.IsChoosed}" @click.stop="editDetails('leftarrow',PageConfig.leftarrow)">
                            <div></div>
                            <img :src="getSrc(PageConfig.rightarrow.ImgUrl)" :class="{'choosedArea':PageConfig.rightarrow.IsChoosed}" @click.stop="editDetails('rightarrow',PageConfig.rightarrow)">
                          </div>
                      </div>
                    </div>
                  </div> 
                  <div class="btns" style="padding-bottom:80px">
                    <img class="fl" :class="{'choosedArea':PageConfig.cxbjimg.IsChoosed}"
                        @click.stop="editDetails('cxbjimg',PageConfig.cxbjimg)"
                        :src="getSrc(PageConfig.cxbjimg.ImgUrl)">
                    <img class="fr" :class="{'choosedArea':PageConfig.qrtjimg.IsChoosed}"
                        @click.stop="editDetails('qrtjimg',PageConfig.qrtjimg)"
                        :src="getSrc(PageConfig.qrtjimg.ImgUrl)">
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- 右侧编辑模块 -->
        <div class="editRight">
          <div class="title">编辑内容</div>
          <div class="editWrap">
            <!-- 编辑区域 -->
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
              <!-- 块元素-->
              <template v-if="editConfig.FormType=='block'">
                <p class="title underline">内容编辑</p>
                <Collapse v-model="value2" accordion>
                  <Panel :name="String(index)" :key="index" v-for="(item,index) in editConfigBlock" class="formItem">
                    <div class="listtitle" style="display:inline-block;">
                      <i></i>
                      <span v-html="item.Title.DesName"></span>
                      <div class="delete" @click.stop="deletForm(index,item.Title.GroupIndex)">
                        <img src="../../assets/close.png" alt="">
                      </div>
                    </div>
                  <template slot="content">
                    <div>
                      <p class="title underline">{{item.Title.Name}}</p>
                      <v-editor ref="editor" :catchData="catchData" :item="item.Title" :html-content="item.Title.DesName"></v-editor>
                    </div>
                    <div>
                      <p class="title underline">{{item.intro.Name}}</p>
                      <v-editor ref="editor" :catchData="catchData" :item="item.intro" :html-content="item.intro.DesName"></v-editor>
                    </div>
                    <div class="uploadBox" v-if="item.imgtext">
                      <div>
                        <p class="title underline">{{item.imgtext.Name}}</p>
                        <v-editor ref="editor" :catchData="catchData" :item="item.imgtext" :html-content="item.imgtext.DesName"></v-editor>
                      </div>
                      <div>
                        <p class="title underline">{{item.videotext.Name}}</p>
                        <v-editor ref="editor" :catchData="catchData" :item="item.videotext" :html-content="item.videotext.DesName"></v-editor>
                      </div>
                      <div>
                        <p class="title">{{item.uploadimage.Name}}</p>
                        <div class="explain">{{item.uploadimage.Remark}}</div>
                        <v-upload
                          ref="upload"
                          v-on:save="saveFile"
                          v-on:delete="deleteUpImg"
                          :config="item.uploadimage"
                        ></v-upload>
                      </div>
                      <div>
                        <p class="title underline">{{item.tip.Name}}</p>
                        <v-editor ref="editor" :catchData="catchData" :item="item.tip" :html-content="item.tip.DesName"></v-editor>
                      </div>
                      <div class="delete" @click.stop="deleteUploadBox(index,item)">
                        <img src="../../assets/close.png" alt="">
                      </div>
                    </div>
                    <div>
                      <p class="title">{{item.inputbg.Name}}</p>
                      <div class="explain">{{item.inputbg.Remark}}</div>
                      <v-upload
                        ref="upload"
                        v-on:save="saveFile"
                        v-on:delete="deleteUpImg"
                        :config="item.inputbg"
                      ></v-upload>
                    </div>
                    
                  </template>
                </Panel>
              </Collapse>
                <div class="conAdd" @click="handleAdd">
                  <span>继续添加</span>
                </div>
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
import coffee from "../../assets/lottery/coffee.png"; //以import的方式导入图片
import thanks from "../../assets/lottery/EhcThanks.png";
import trimmer from "../../assets/lottery/trimmer.png";
const _ = require("lodash");

export default {
  inject: ["reload"], //注入依赖
  name: "CreateActivityLottery",
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
      //转盘抽奖页配置
      PageConfig: {
        pagebg: {},
        titleImage: {},
        commitbtn:{},
        jsons:[],
        contentbg:{},
        logoimage:{},
        cxbjimg:{},
        qrtjimg:{},
        leftarrow:{},
        rightarrow:{},

        forminfo: { formlist: [] },
        uploadtip: {},
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
      editConfigBlock:[],
      color: "",
      value2:'0',
      choosedIndex:0,
      deleteGroup:''
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
    saveFile(src,item) {
      item.ImgUrl = src;
      // this.editConfig.NewImgUrl = src;
    },
    //删除已上传的图片
    deleteUpImg(config) {
      config.ImgUrl = '';
      // this.editConfig.NewImgUrl = "";
    },
    //获取富文本内容--给editConfig赋值新的属性
    catchData(val, type,item) {
      item.DesName=val;
      // item.Title.DesName = val;
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
        pageIndex: 1,
        sortName:'GroupIndex',
        sortOrder:'asc'
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
              if (item.DisCode == "bg-image") {
                this.PageConfig.pagebg = item;
              }
              //标题图片
              else if (item.DisCode == "title-image") {
                this.PageConfig.titleImage = item;
              }
              //点击提交图片
              else if (item.DisCode == "commit-btn") {
                this.PageConfig.commitbtn = item;
              }
              //内容背景
              else if (item.DisCode == "contentbg-image") {
                this.PageConfig.contentbg = item;
              }
              //logo
              else if (item.DisCode == "logo-image") {
                this.PageConfig.logoimage = item;
              }
              //重新编辑按钮
              else if (item.DisCode == "cxbj-btn") {
                this.PageConfig.cxbjimg = item;
              }
              //确认提交按钮
              else if (item.DisCode == "qrtj-btn") {
                this.PageConfig.qrtjimg = item;
              }
              else if (item.DisCode == "left-arrow") {
                this.PageConfig.leftarrow = item;
              }
              else if (item.DisCode == "rigth-arrow") {
                this.PageConfig.rightarrow = item;
              }
              
              //表单
              else if (item.DisCode == "form-info") {
                this.PageConfig.forminfo.formlist.push(item);
              } else if (item.DisCode == "upload-tip") {
                this.PageConfig.uploadtip = item;
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
            // this.PageConfig.jsons.push({Title:{DesName:""},intro:{DesName:""},imgtext:{DesName:""},videotext:{DesName:""},tip:{DesName:""},uploadimage:{ImgUrl:""},tip:{DesName:""}})
            let tempArr = [];
            this.PageConfig.jsons=[];
            for (let i = 0; i < this.pageDetails.length; i++) {
              if (tempArr.indexOf(this.pageDetails[i].GroupIndex) === -1 && this.pageDetails[i].GroupIndex) {
                tempArr.push(this.pageDetails[i].GroupIndex);
                if(this.pageDetails[i].DisCode.indexOf("group-title")>-1){
                    this.PageConfig.jsons.push({
                        Title: this.pageDetails[i],
                        FormType:'block'
                    })
                }
                else if(this.pageDetails[i].DisCode.indexOf("group-intro")>-1){
                  this.PageConfig.jsons.push({
                        intro: this.pageDetails[i],
                        FormType:'block'
                    })
                }
                else if(this.pageDetails[i].DisCode.indexOf("group-imgtex")>-1){
                  this.PageConfig.jsons.push({
                        imgtext: this.pageDetails[i],
                        FormType:'block'
                    })
                }
                else if(this.pageDetails[i].DisCode.indexOf("group-videotext")>-1){
                  this.PageConfig.jsons.push({
                        videotext: this.pageDetails[i],
                        FormType:'block'
                    })
                }
                else if(this.pageDetails[i].DisCode.indexOf("group-tip")>-1){
                  this.PageConfig.jsons.push({
                        tip: this.pageDetails[i],
                        FormType:'block'
                    })
                }
                else if(this.pageDetails[i].DisCode.indexOf("group-upload-bg")>-1){
                  this.PageConfig.jsons.push({
                        uploadimage: this.pageDetails[i],
                        FormType:'block'
                    })
                }
                else if(this.pageDetails[i].DisCode.indexOf("group-input-bg")>-1){
                    this.PageConfig.jsons.push({
                        inputbg: this.pageDetails[i],
                        FormType:'block'
                    })
                }
              } else if(this.pageDetails[i].GroupIndex){
                for (let j = 0; j < tempArr.length; j++) {
                  if (tempArr[j] == this.pageDetails[i].GroupIndex) {
                    if(this.pageDetails[i].DisCode.indexOf("group-title")>-1){
                      this.PageConfig.jsons[j].Title=this.pageDetails[i]
                    }
                    else if(this.pageDetails[i].DisCode.indexOf("group-intro")>-1){
                      this.PageConfig.jsons[j].intro=this.pageDetails[i]
                }
                    else if(this.pageDetails[i].DisCode.indexOf("group-imgtex")>-1){
                        this.PageConfig.jsons[j].imgtext=this.pageDetails[i]
                    }else if(this.pageDetails[i].DisCode.indexOf("group-videotext")>-1){
                        this.PageConfig.jsons[j].videotext=this.pageDetails[i]
                    }
                    else if(this.pageDetails[i].DisCode.indexOf("group-tip")>-1){
                        this.PageConfig.jsons[j].tip=this.pageDetails[i]
                    }else if(this.pageDetails[i].DisCode.indexOf("group-upload-bg")>-1){
                        this.PageConfig.jsons[j].uploadimage=this.pageDetails[i];
                    }else if(this.pageDetails[i].DisCode.indexOf("group-input-bg")>-1){
                        this.PageConfig.jsons[j].inputbg=this.pageDetails[i]
                    }
                    break;
                  }
                }
              }}
              console.log(tempArr,'tempArr')
            this.isLoaded = true;
          } else {
            this.$Message.error(res.msg);
          }
          
          
          console.log(this.PageConfig,'this.PageConfig')
        }
      );
    },

    //选择可编辑的内容 对应区域修改为选中状态
    editDetails(type, config,index) {
      debugger
      this.editorType = type;
      // if(type=='forminfo'){
      //   this.editConfig[0] = config;
      // }else{
this.editConfig = config;
      // }
      this.editConfigBlock= [config];
      console.log(this.editConfigBlock,'this.editConfigBlock')
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
      if(type=='forminfo'){
        this.choosedIndex=index;
      }
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
      debugger
      let url="/api/crmModuleTempletePageConfig/SavePageConfig";
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
          FormList[i].ak = this.step.activityNo;
          // 不是新增的就赋值pageConfigId
          if (FormList[i].pageConfigId == "isAddForm") {
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
      }else if (this.editConfig.FormType == "block") {
        url="/api/crmModuleTempletePageConfig/SaveGroupPageConfig?tempId="+this.step.templateId+"&pageId="+this.pageId+"&deleteGroup="+this.deleteGroup;
        var FormList = this.editConfigBlock;
        // var FormList1 = JSON.stringify(this.editConfigBlock);
        // var FormList = JSON.parse(FormList1);
        // 给表单数组里的ak值赋值
        for (var i = 0; i < FormList.length; i++) {
          var modelList=[]
          Object.keys(FormList[i]).forEach((j,v)=>{
            if(j!='FormType'){
              modelList.push({...FormList[i][j],ak : this.step.activityNo})
            }
          })
          arr.push({
            modelList
          })
          // if (!FormList[i].Name) {
          //   this.$Notice.warning({
          //     title: "标题不能为空！",
          //     desc: ""
          //   });
          //   return;
          // }
          // if (!FormList[i].AttrName) {
          //   this.$Notice.warning({
          //     title: "AttrName不能为空！",
          //     desc: ""
          //   });
          //   return;
          // }
          // FormList[i].ak = this.step.activityNo;
          // 不是新增的就赋值pageConfigId
          // if (FormList[i].pageConfigId == "isAddForm") {
          //   FormList[i].pageConfigId = "";
          // }
        }
        // arr = FormList;
        console.log(arr,'arr')
      } 

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
        url,
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
    deletForm(index,GroupIndex) {
      // this.PageConfig.forminfo.formlist.splice(index, 1);
      this.deleteGroup=GroupIndex || '';
      this.editConfigBlock.splice(index, 1);
    },
    deleteUploadBox(index,item){
      this.$delete(item,'imgtext')
      this.$delete(item,'tip')
      this.$delete(item,'uploadimage')
      this.$delete(item,'videotext')
    },
    //继续添加表单项
    handleAdd() {
      console.log(this.editConfigBlock,'editConfigBlock')
      this.editConfigBlock.push({
        FormType:'block',
        Title:{
          DesName:this.editConfigBlock[0].Title.DesName,
          Name: this.editConfigBlock[0].Title.Name,
          DisCode:this.editConfigBlock[0].Title.DisCode,
          TemplateId:this.editConfigBlock[0].Title.TemplateId,
          PageId:this.editConfigBlock[0].Title.PageId
        },
        imgtext:{
          DesName:this.editConfigBlock[0].imgtext.DesName,
          Name: this.editConfigBlock[0].imgtext.Name,
          DisCode:this.editConfigBlock[0].imgtext.DisCode,
          TemplateId:this.editConfigBlock[0].imgtext.TemplateId,
          PageId:this.editConfigBlock[0].imgtext.PageId
        },
        inputbg:{
          Name: this.editConfigBlock[0].inputbg.Name,
          ImgUrl:this.editConfigBlock[0].inputbg.ImgUrl,
          Remark:this.editConfigBlock[0].inputbg.Remark,
          DisCode:this.editConfigBlock[0].inputbg.DisCode,
          TemplateId:this.editConfigBlock[0].inputbg.TemplateId,
          PageId:this.editConfigBlock[0].inputbg.PageId
        },
        intro:{
          DesName:this.editConfigBlock[0].intro.DesName,
          Name: this.editConfigBlock[0].intro.Name,
          DisCode:this.editConfigBlock[0].intro.DisCode,
          TemplateId:this.editConfigBlock[0].intro.TemplateId,
          PageId:this.editConfigBlock[0].intro.PageId
        },
        tip:{
          DesName:this.editConfigBlock[0].tip.DesName,
          Name: this.editConfigBlock[0].tip.Name,
          DisCode: this.editConfigBlock[0].tip.DisCode,
          TemplateId:this.editConfigBlock[0].tip.TemplateId,
          PageId:this.editConfigBlock[0].tip.PageId
        },
        uploadimage:{
          Name: this.editConfigBlock[0].uploadimage.Name,
          ImgUrl: this.editConfigBlock[0].uploadimage.ImgUrl,
          Remark:this.editConfigBlock[0].uploadimage.Remark,
          DisCode:this.editConfigBlock[0].uploadimage.DisCode,
          TemplateId:this.editConfigBlock[0].uploadimage.TemplateId,
          PageId:this.editConfigBlock[0].uploadimage.PageId
        },
        videotext:{
          DesName:this.editConfigBlock[0].videotext.DesName,
          Name: this.editConfigBlock[0].videotext.Name,
          DisCode:this.editConfigBlock[0].videotext.DisCode,
          TemplateId:this.editConfigBlock[0].videotext.TemplateId,
          PageId:this.editConfigBlock[0].videotext.PageId
        }
        // pageConfigId: "isAddForm"
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
<style>
.feedback .w-e-text-container{
  height: 60px!important;
}
</style>
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
        .NewProductTrialFeedback {
          width: 100%;
          /* height: 100%; */
          // min-height: 100vh;
          height: auto;
          overflow-x: hidden;
          background-color:#ffffff;
          /* background-image: url(../../../assets/GCFeedBackBg.png); */
          background-repeat: no-repeat;
          /* background-size: cover; */
          // background-size: 100% auto;
          background-size: 100% 100%;
          position: relative;
          text-align: center;
        }
        .tips{
            width:100%;
            height: auto;
            margin:8px 0 10px 0;
            font-size: 10px;
            color: #333;
            font-weight: lighter;
        }
        .introText{
            width:100%;
            height: auto;
            margin:0 0 8px 0;
        }
        .title{
          width:45%;
          margin: 30px 0 30px 30px;
          display: block;
        }
        .intro{
            display: inline-block;
          color: #227ead;
          /* padding-left: 0.15rem; */
          padding-left:0;
          font-size: 12px;
          margin-bottom: 5px;
        }
        .infoWrap{
            width: 91%;
            height: auto;
            margin: 0 auto;
            text-align: left;
            margin-bottom: 30px
        }
        .infoWrap .infoList{
            position: relative;
            /* color: #227ead; */
            color: #227ead;
        }
        .listtitle{
            /* color: #227ead; */
            color: #227ead;
            font-weight: bold;
            font-size: 16px;
            margin: 5px 0;
        }
        .listtitle i{
            width: 5px;
            height: 5px;
            background-color: #227ead;
            display: inline-block;
            border-radius: 100%;
            margin-right: 5px;
            vertical-align: 3px;
        }
        .listintro{
            font-size: 12px;
            /* color: #227ead; */
            color: #227ead;
            font-weight: lighter;
            margin-bottom: 6px;
        }

        .infoList .video{
            float: right;
            margin-right: 8px;
            /* color: #227ead; */
            color: #227ead;
            display: inline-block;
          font-size: 12px;
          margin-bottom: 3px;
        }
        .baseInfo .infoList input{
            width: 100%;
            /* height: 0.6rem; */
            padding:5px 8px;
            background-color: #ffffff;
          box-shadow: inset 0px 0px 27px 0px 
            rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          border: solid 1px #227ead;
            outline: none;
            text-indent: 8px;
            color: #227ead;
        }
        /* .infoWrap p{
            text-align: left;
            color: #3c3b3b;
            font-size: 0.2rem;
            margin: 0.15rem 0;
        } */
        .infoList textarea{
            // width:90%;
            width: 100%;
            height: 70px;
            /* background-color: #ffffff; */
          /* box-shadow: inset 0px 0px 27px 0px 
            rgba(0, 0, 0, 0.2); */
            background-size: 100% 100%;
          border-radius: 10px;
          border: none;
            font-size: 14px;
            outline: none;
            margin-bottom: 8px;
            padding: 10px 15px;
            /* color: #227ead; */
        }
        .infoList ul {
            width: 100%;
            height: auto;
            padding: 0;
            margin: 0;
            list-style-type: none;
            list-style-position: inside;
        }

        .infoList ul li {
            width: 20%;
            height: 70px;
            margin-right: 4%;
            background-color: transparent;
            position: relative;
            text-align: center;
            vertical-align: middle;
            /* background-image: url(../../../assets/GCuploadImgBg.png); */
            background-size: 100% 100%;
        }
        .infoList ul li:last-child{
            margin-right:0;
            margin-left: 6%
        }
        .infoList ul li .details {
            width: 100%;
            height: 100%;
            /* overflow: hidden; */
            position: relative;
        }

        .infoList ul li .upImg {
            width: 100%;
            height: 100%;
            background-color: #ffffff;
          box-shadow: inset 0px 0px 27px 0px 
            rgba(0, 0, 0, 0.2);
          border-radius: 6px;
          border: solid 1px #227ead;
            box-sizing: border-box;
            overflow: hidden;
            position: absolute;
            left:0;
            top:0;
            display: flex;
            justify-content: center;
            align-items:center;
        }
        .infoList ul li .upImg img{
            /* max-width:100%;
            max-height:100%; */
            width:100%;
            min-height:70px;
            overflow: hidden;
        }
        .remove {
            width: 20px;
            height: auto;
            position: absolute;
            top: -10px;
            right: -10px;
            z-index: 100;
        }
        .commitbtn{
            width: 50%;
            margin-bottom: 20px;
        }
        .clear::after {
            content: "";
            display: block;
            clear: both;
        }

        .fl {
            float: left;
        }

        .fr {
            float: right;
        }
        video{
            width: 75px;
            height: 75px;
        }
        .Popout {
          width: 75%;
          border-radius: 10px;
          padding: 10px;
          overflow-y: visible;
          max-width: 560px;
        }
        .close{
            width:35p;
            height:auto;
            position: absolute;
            left:0;
            right:0;
            bottom:-60px;
            margin:0 auto;
            background-color:transparent;
        }
        .close1{
          width:35px!important;
          bottom:-40px; 
        }
        .content2{
            /* width: 95%; */
            height: auto;
            padding:20px 15px;
            background-color: #fff;
            margin: auto;
          /* background-image: url(../../../assets/GCnewfeedbackbg.png); */
            /* height: 2.5rem; */
            background-size: 100% auto;
            background-repeat: no-repeat;
            border-radius: 5px;
        }
        .content2 .product2{
            height: 80px;
            width: auto;
            top: -40px;
        }
        .content2 .title2{
            font-size: 18px;
            color: #333;
            /* margin-top: 25px; */
        }
        .btns{
            width: 95%;
            margin:20px auto 0;
        }
        .btns img{
            width: 46% !important;
        }

        .NewProductTrialPreview {
  width: 100%;
  // min-height: 100vh;
  overflow-x: hidden;
  background-color:#D9D9D9;
  background-repeat: no-repeat;
 background-size: 100% auto;
  position: relative;
}
.Preview{
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: auto;
    margin-top: 15px;
    padding-bottom: 60px;
    width: 92%;
    // min-height: 75vh;
}
.NewProductTrialPreview .title{
  width:45%;
  margin: 15px auto 40px auto;
}
.logo{
    width:50px;
    display:block;
    margin:45px auto 10px auto;
    padding-top:40px
}
.infoWrap{
    width: 85%;
    height: auto;
    margin: 0 auto;
    text-align: left;
    margin-bottom: 30px
}
 .infoList{
    height: auto;
    text-align: left;
    font-size: 14px;
}
.infoList .description{
    font-size: 14px;
    width: 90%;
    word-break: break-all;
    margin: 5px;
}
.NewProductTrialPreview .listtitle{
    color: #227ead;
    font-weight: bold;
    font-size: 16px;
    margin: 10px 0;
    text-align: center
}
.NewProductTrialPreview .listtitle i{
    width: 5px;
    height: 5px;
    background-color: #227ead;
    display: inline-block;
    border-radius: 100%;
    margin-right: 5px;
    vertical-align: 3px;
}
.swiper-button{
  width: 80%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div{
    background-color: #ccc;
    width: 50%;
    height: 160px;
    border-radius: 5px;
  }
  img{
    width: 10px;
  }
}
.NewProductTrialPreview .infoList .video{
    float: right;
    margin-right: 8px
}
.NewProductTrialPreview .swiperCenter{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.NewProductTrialPreview .swiperCenter img{
      position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 50%;
    transform: translate(0, -50%);
    width: 65%;
}
.clear::after {
    content: "";
    display: block;
    clear: both;
}

.fl {
    float: left;
}

.fr {
    float: right;
}
.btns{
    width: 90%;
    margin: auto;
    margin-top: 40px;
}
.btns img{
    width: 48% !important;
}
.maskvideo{
    background-color: rgba(0, 0, 0, 1) !important;
}
.imgshow .bigimg{
    max-width: 90%;
    max-height: 90%;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    
}
.imgshow video{
    width: 100%;
    height: 85%;
    margin: auto;
    z-index: 99;
    position: relative;
    margin-top: 15%;
}
.imgshow .closevideo{
    right: 20px !important;
    position: absolute;
    top: 20px;
    width: 35px;
    z-index: 999
}
.maskdiv{
position: absolute;
    left: 0;
    right: 0;
    z-index: 99;
    background-size: contain;
    width: 60px !important;
    height: auto;
    min-height: auto !important
}
.Popout {
  width: 75%;
  border-radius: 10px;
  padding: 10px;
  overflow-y: visible;
  max-width: 560px;
}
.imgshow{
    width: 100% ;
    height: 100%;
    border-radius: 0;
    background-color: transparent;
}
.close{
    width:35px;
    height:auto;
    position: absolute;
    left:0;
    right:0;
    bottom:-60px;
    margin:0 auto;
    background-color:transparent;
}
.close1{
   width:35px!important;
   bottom:-40px; 
}
.content2{
    height: auto;
    padding:20px 15px;
    background-color: #fff;
    margin: auto;
    background-size: 100% auto;
    background-repeat: no-repeat;
    border-radius: 5px;
}
.content2 .title2{
    font-size: 18px;
    color: #333;
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
          // margin-bottom: 10px;
              font-weight: bold;
          line-height: 30px;
        }
        
        .underline {
          border-bottom: 1px solid #d7d7d7;
        }
        .formItem {
          // padding: 20px 10px 10px;
          // margin: 10px 0;
          background: #f4f4f4;
          box-shadow: 2px 3px 6px #f4f4f4;
          position: relative;
          .uploadBox{
            background-color: #f4f4f4;
            box-shadow: 2px 3px 6px #ccc;
            padding: 10px 5px;
            position: relative;
          }
          .colorIpt {
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
.delete {
  position: absolute;
  top: 8px;
  right: 15px;
  width: 20px;
  height: 20px;
  background: red;
  border-radius: 50%;
  img {
    width: 100%;
    vertical-align: super;
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