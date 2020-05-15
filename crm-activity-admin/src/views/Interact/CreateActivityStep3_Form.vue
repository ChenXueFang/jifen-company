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
              <img
                class="record"
                :class="{'choosedArea':PageConfig.winrecord.IsChoosed}"
                @click.stop="editDetails('winrecord',PageConfig.winrecord)"
                :src="getSrc(PageConfig.winrecord.ImgUrl)"
              />
              <div
                class="lottorybg"
                :class="{'choosedArea':PageConfig.turntablebg.IsChoosed}"
                @click.stop="editDetails('turntablebg',PageConfig.turntablebg)"
                :style="{backgroundImage:'url(' + getSrc(PageConfig.turntablebg.ImgUrl) + ')'}"
              >
                <div class="container" id="container">
                  <div id="turntable"></div>
                  <div
                    class="btnwrap"
                    :class="{'choosedArea':PageConfig.turntablestart.IsChoosed}"
                    @click.stop="editDetails('turntablestart',PageConfig.turntablestart)"
                  >
                    <img :src="getSrc(PageConfig.turntablestart.ImgUrl)" class="btn" />
                  </div>
                  <!-- 奖品扇形区域定位 -->
                  <ul class="pie">
                    <li class="slice-one slice" :class="{'choosedArea':PageConfig.prize8bg.IsChoosed}" @click.stop="editDetails('prize8bg',PageConfig.prize8bg)"></li>
                    <li class="slice-two slice" :class="{'choosedArea':PageConfig.prize7bg.IsChoosed}" @click.stop="editDetails('prize7bg',PageConfig.prize7bg)"></li>
                    <li class="slice-three slice" :class="{'choosedArea':PageConfig.prize6bg.IsChoosed}" @click.stop="editDetails('prize6bg',PageConfig.prize6bg)"></li>
                    <li class="slice-four slice" :class="{'choosedArea':PageConfig.prize5bg.IsChoosed}" @click.stop="editDetails('prize5bg',PageConfig.prize5bg)"></li>
                    <li class="slice-five slice" :class="{'choosedArea':PageConfig.prize4bg.IsChoosed}" @click.stop="editDetails('prize4bg',PageConfig.prize4bg)"></li>
                    <li class="slice-six slice" :class="{'choosedArea':PageConfig.prize3bg.IsChoosed}" @click.stop="editDetails('prize3bg',PageConfig.prize3bg)"></li>
                    <li class="slice-seven slice" :class="{'choosedArea':PageConfig.prize2bg.IsChoosed}" @click.stop="editDetails('prize2bg',PageConfig.prize2bg)"></li>
                    <li class="slice-eight slice" :class="{'choosedArea':PageConfig.prize1bg.IsChoosed}" @click.stop="editDetails('prize1bg',PageConfig.prize1bg)"></li>
                  </ul>
                  <!-- 奖品名称name定位 -->
                  <ul class="pieName">
                    <li class="name-one name" :class="{'choosedArea':PageConfig.prize6name.IsChoosed}" @click.stop="editDetails('prize6name',PageConfig.prize6name)"></li>
                    <li class="name-two name" :class="{'choosedArea':PageConfig.prize7name.IsChoosed}" @click.stop="editDetails('prize7name',PageConfig.prize7name)"></li>
                    <li class="name-three name" :class="{'choosedArea':PageConfig.prize8name.IsChoosed}" @click.stop="editDetails('prize8name',PageConfig.prize8name)"></li>
                    <li class="name-four name" :class="{'choosedArea':PageConfig.prize1name.IsChoosed}" @click.stop="editDetails('prize1name',PageConfig.prize1name)"></li>
                    <li class="name-five name" :class="{'choosedArea':PageConfig.prize2name.IsChoosed}" @click.stop="editDetails('prize2name',PageConfig.prize2name)"></li>
                    <li class="name-six name" :class="{'choosedArea':PageConfig.prize3name.IsChoosed}" @click.stop="editDetails('prize3name',PageConfig.prize3name)"></li>
                    <li class="name-seven name" :class="{'choosedArea':PageConfig.prize4name.IsChoosed}" @click.stop="editDetails('prize4name',PageConfig.prize4name)"></li>
                    <li class="name-eight name" :class="{'choosedArea':PageConfig.prize5name.IsChoosed}" @click.stop="editDetails('prize5name',PageConfig.prize5name)"></li>
                  </ul>
                </div>
              </div>
              <p
                class="rules"
                :class="{'choosedArea':PageConfig.bottomrule.IsChoosed}"
                @click.stop="editDetails('bottomrule',PageConfig.bottomrule)"
                v-html="PageConfig.bottomrule.DesName"
              ></p>

              <!-- 弹窗 -->
              <template>
                <!-- 未中奖弹窗 falg:0 -->
                <div
                  class="Popout"
                  v-if="flag==0"
                  @click.stop="editDetails('nogifttitle',PageConfig.nogifttitle)"
                >
                  <div class="mask">
                    <img class="close" src="../../assets/lottery/close.png" />
                    <div class="maskContent">
                      <h1
                        :class="{'choosedArea':PageConfig.nogifttitle.IsChoosed}"
                        v-html="PageConfig.nogifttitle.DesName"
                        @click.stop="editDetails('nogifttitle',PageConfig.nogifttitle)"
                      ></h1>
                      <p
                        :class="{'choosedArea':PageConfig.nogiftcontenttext.IsChoosed}"
                        v-html="PageConfig.nogiftcontenttext.DesName"
                        @click.stop="editDetails('nogiftcontenttext',PageConfig.nogiftcontenttext)"
                      >很遗憾，未中奖，再接再厉！</p>
                      <img
                        class="btn"
                        :class="{'choosedArea':PageConfig.nogiftconfirmbtn.IsChoosed}"
                        :src="getSrc(PageConfig.nogiftconfirmbtn.ImgUrl)"
                        @click.stop="editDetails('nogiftconfirmbtn',PageConfig.nogiftconfirmbtn)"
                      />
                    </div>
                  </div>
                </div>
                <!-- 中奖弹窗 falg:1 -->
                <div
                  class="Popout"
                  v-if="flag==1"
                  @click.stop="editDetails('getgifttitle',PageConfig.getgifttitle)"
                >
                  <div class="mask">
                    <img class="close" src="../../assets/lottery/close.png" />
                    <div class="maskContent">
                      <h1
                        :class="{'choosedArea':PageConfig.getgifttitle.IsChoosed}"
                        v-html="PageConfig.getgifttitle.DesName"
                        @click.stop="editDetails('getgifttitle',PageConfig.getgifttitle)"
                      ></h1>
                      <p>获得价值329元咖啡机一台</p>
                      <img class="prize" src="../../assets/lottery/coffee.png" />
                      <img
                        class="btn"
                        :class="{'choosedArea':PageConfig.getgiftconfirmbtn.IsChoosed}"
                        :src="getSrc(PageConfig.getgiftconfirmbtn.ImgUrl)"
                        @click.stop="editDetails('getgiftconfirmbtn',PageConfig.getgiftconfirmbtn)"
                      />
                    </div>
                  </div>
                </div>
                <!-- 填写收货地址 falg:2 -->
                <div
                  class="Popout"
                  v-if="flag==2"
                  @click.stop="editDetails('addaddresstitle',PageConfig.addaddresstitle)"
                >
                <!-- @click.stop="editDetails('addaddresstitle',PageConfig.addaddresstitle)" -->
                  <div class="mask" style="top:60px">
                    <img class="close" src="../../assets/lottery/close.png" />
                    <div class="maskContent">
                      <h1
                        style="padding-bottom:15px;"
                        :class="{'choosedArea':PageConfig.addaddresstitle.IsChoosed}"
                        v-html="PageConfig.addaddresstitle.DesName"
                        @click.stop="editDetails('addaddresstitle',PageConfig.addaddresstitle)"
                      ></h1>
                      <div @click.stop="editDetails('addaddresstitle1',PageConfig.addaddresstitle)">
                        <Form label-position="right" :label-width="40" style="padding:0 5px">
                        <FormItem label="姓名">
                          <Input readonly />
                        </FormItem>
                        <FormItem label="手机">
                          <Input readonly />
                        </FormItem>
                        <FormItem label="省份">
                          <Select placeholder></Select>
                        </FormItem>
                        <FormItem label="市区">
                          <Select placeholder></Select>
                        </FormItem>
                        <FormItem label="地区">
                          <Select placeholder></Select>
                        </FormItem>
                        <FormItem label="详细地址">
                          <Input type="textarea" readonly />
                        </FormItem>
                      </Form>
                      </div>
                      <img
                        class="btn"
                        style="margin-top:10px"
                        :class="{'choosedArea':PageConfig.addaddressconfirmbtn.IsChoosed}"
                        :src="getSrc(PageConfig.addaddressconfirmbtn.ImgUrl)"
                        @click.stop="editDetails('addaddressconfirmbtn',PageConfig.addaddressconfirmbtn)"
                      />
                      <!-- <div class="shade"></div> -->
                    </div>
                  </div>
                </div>
                <!-- 收货地址提交成功 falg:3 -->
                <div
                  class="Popout"
                  v-if="flag==3"
                  @click.stop="editDetails('addresssubmittitle',PageConfig.addresssubmittitle)"
                >
                  <div class="mask">
                    <img class="close" src="../../assets/lottery/close.png" />
                    <div class="maskContent">
                      <h1
                        style="margin-bottom:1px;"
                        :class="{'choosedArea':PageConfig.addresssubmittitle.IsChoosed}"
                        v-html="PageConfig.addresssubmittitle.DesName"
                        @click.stop="editDetails('addresssubmittitle',PageConfig.addresssubmittitle)"
                      >收货地址提交成功！</h1>
                      <p
                        style="line-height:22px;"
                        :class="{'choosedArea':PageConfig.addresssubmitcontenttext.IsChoosed}"
                        v-html="PageConfig.addresssubmitcontenttext.DesName"
                        @click.stop="editDetails('addresssubmitcontenttext',PageConfig.addresssubmitcontenttext)"
                      ></p>
                    </div>
                  </div>
                </div>
                <div
                  class="Popout"
                  v-if="flag==4"
                  @click.stop="editDetails('rulecontent',PageConfig.rulecontent)"
                >
                  <!-- 中奖记录 活动规则 falg:4 -->
                  <div class="maskBottom">
                    <div class="tabs">
                      <div v-bind:class="{'actived':activeTab==1}" @click="changeTab(1)">活动规则</div>
                      <div v-bind:class="{'actived':activeTab==2}" @click="changeTab(2)">中奖记录</div>
                      <Icon type="ios-close" />
                    </div>
                    <div class="rulesWrap scollWrap" v-if="activeTab==1">
                      <div
                        :class="{'choosedArea':PageConfig.rulecontent.IsChoosed}"
                        @click.stop="editDetails('rulecontent',PageConfig.rulecontent)"
                        style="line-height:24px"
                        v-html="PageConfig.rulecontent.DesName"
                      >
                        <!-- <div class="rulelist">
                          <p>活动时间：</p>
                          <div>2020-04-03 15:53 至 2020-04-13 13:53</div>
                        </div>
                        <div class="rulelist">
                          <p>活动规则：</p>
                          <ul>
                            <li>用户注册成为会员后可参与抽奖</li>
                            <li>每个用户仅有一-次抽奖机会</li>
                            <li>中奖产品将于地址提交后一个月内发出</li>
                            <li>此活动最终解释权归飞利浦所有</li>
                          </ul>
                        </div>
                        <div class="rulelist">
                          <p>活动说明：</p>
                          <div>说明内容说明内容说明内容说明，内容说明内容说明内容。</div>
                        </div>-->
                      </div>
                    </div>
                    <div class="recordWrap scollWrap" v-if="activeTab==2">
                      <div class="recordList">
                        <div>奖品</div>
                        <div>件数</div>
                        <div>时间</div>
                      </div>
                      <div class="recordList">
                        <div>毛球修剪器</div>
                        <div>x1</div>
                        <div>2020.03.26 23:00:26</div>
                      </div>
                      <div class="recordList">
                        <div>咖啡机</div>
                        <div>x1</div>
                        <div>2020.03.26 23:00:26</div>
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
                <v-upload ref="upload" v-on:save="saveFile" v-on:delete="deleteUpImg" :config="editConfig"></v-upload>
              </template>

              <!-- 文本编辑 -->
              <template v-if="editConfig.FormType==2">
                <p class="title underline">{{editConfig.Name}}</p>
                <v-editor ref="editor" :catchData="catchData" :html-content="editConfig.DesName"></v-editor>
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
              <!-- 表单编辑 -->
              <template v-if="editConfig.FormType==5">
                <p class="title underline" style="margin-bottom:25px">{{editConfig.Name}}</p>
                <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px" class="formEdit">
        <FormItem
                v-for="(item, index) in formDynamic.Forms"
                v-if="item.status"
                :key="index"
                :prop="'Forms.' + index + '.value'"
                 style="margin-bottom:10px">
            <Row>
                <Col span="4">
                    <Input type="text" v-model="item.index" :style="{'color':color5}"></Input>
                </Col>
                <Col span="14" offset="1">
                    <Input type="text" v-model="item.value" :placeholder="item.placeholder" :style="{'color':color5,'background':color3}"></Input>
                </Col>
                <Col span="4" offset="1">
                    <Button @click="handleRemove(index)">Delete</Button>
                </Col>
            </Row>
        </FormItem>
        <FormItem>
            <Row>
                <Col span="12">
                    <Button type="dashed" long @click="handleAdd" icon="md-add">Add item</Button>
                </Col>
            </Row>
            <Row>
        <Col span="12">
            <p>文字颜色</p>
            <ColorPicker v-model="color5" recommend />
        </Col>
        <Col span="12">
            <p>input框背景色</p>
            <ColorPicker v-model="color3" alpha />
        </Col>
    </Row>
        </FormItem>
    </Form>
                  <!-- <Form label-position="right" :label-width="40" style="padding:0 5px">
                                <FormItem
                            v-for="(item, index) in editConfig.Form"
                            v-if="item.status"
                            :key="index"
                            :label="'Item ' + item.index"
                            :prop="'items.' + index + '.value'"
                            :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
                        <Row>
                            <Col span="18">
                                <Input type="text" v-model="item.value" placeholder="Enter something..."></Input>
                            </Col>
                            <Col span="4" offset="1">
                                <Button @click="handleRemove(index)">Delete</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="12">
                                <Button type="dashed" long @click="handleAdd" icon="md-add">Add item</Button>
                            </Col>
                        </Row>
                    </FormItem>
                  </Form> -->
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
      activeTab: 1,
      canChooseBg: true, //是否可以选首页背景图，防止弹框出现时还可选择
      //转盘抽奖页配置
      PageConfig: {
        pagebg: {},
        pagetitle: {},
        turntablebg: {},
        turntablestart: {},
        winrecord: {},
        bottomrule: {},
        rulecontent: {},
        nogifttitle: {},
        nogiftconfirmbtn: {},
        nogiftcontenttext: {},
        getgifttitle: {},
        getgiftconfirmbtn: {},
        addaddresstitle: {},
        addaddressconfirmbtn: {},
        addresssubmittitle: {},
        addresssubmitcontenttext: {},
        prize1bg:{},
        prize1name:{},
        prize2bg:{},
        prize2name:{},
        prize3bg:{},
        prize3name:{},
        prize4bg:{},
        prize4name:{},
        prize5bg:{},
        prize5name:{},
        prize6bg:{},
        prize6name:{},
        prize7bg:{},
        prize7name:{},
        prize8bg:{},
        prize8name:{},
      },
      //转盘奖品列表
      drawList: [
          {
            id: "-1",
            name: "咖啡机",
            img: {
              width: 30,
              height: 45,
              src: coffee
            },
            color: "#F54644",
            bg: "#FFF",
          },
          {
            id: "no",
            name: "谢谢参与",
            img: {
              width: 30,
              height: 45,
              src: thanks
            },
            color: "#F54644",
            bg: "#FFF5D3",
          },
          {
            id: "MQ1809",
            name: "毛球修剪器",
            img: {
              width: 30,
              height: 45,
              src: trimmer
            },
            color: "#F54644",
            bg: "#FFF",
          },
          {
            id: "-2",
            name: "咖啡机",
            img: {
              width: 30,
              height: 45,
              src: coffee
            },
            color: "#F54644",
            bg: "#FFF5D3",
          },

          {
            id: "-3",
            name: "毛球修剪器",
            img: {
              width: 30,
              height: 45,
              src: trimmer
            },
            color: "#F54644",
            bg: "#FFF",
          },
          {
            id: "-4",
            name: "谢谢参与",
            img: {
              width: 30,
              height: 45,
              src: thanks
            },
            color: "#F54644",
            bg: "#FFF5D3",
          },
          {
            id: "Coffee1809",
            name: "咖啡机",
            img: {
              width: 30,
              height: 45,
              src: coffee
            },
            color: "#F54644",
            bg: "#FFF",
          },
          {
            id: "-5",
            name: "毛球修剪器",
            img: {
              width: 30,
              height: 45,
              src: trimmer
            },
            color: "#F54644",
            bg: "#FFF5D3",
          }
        ],

      //右侧编辑区域属性
      hasGroup: -1, //是否是组 1代表是组 0代表不是组
      editorType: "pagebg", //编辑区域类型
      editConfig: "", //编辑配置内容
      index:1,
      formDynamic: {
                    Forms: [
                        {
                            value: '',
                            index: 1,
                            status: 1,
                            placeholder:'say something'
                        }
                    ]
                },
      color: "",
      color3: 'rgba(25, 190,107, .5)',
      color5: '#19be6b'
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
      handleAdd () {
        debugger
          this.index++;
          this.formDynamic.Forms.push({
              value: '',
              index: this.index,
              status: 1
          });
      },
      handleRemove (index) {
          this.formDynamic.Forms[index].status = 0;
      },
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
    pickColor(color) {
      debugger
      this.editConfig.NewColorName16 = color;
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
        sortName: "SortNum",
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
      this.isLoaded = false;
      this.$post("/api/crmModuleTempletePageConfig/GetListBySC", data).then(
        res => {
          this.$Spin.hide();
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
              //转盘背景图
              else if (item.DisCode == "turntable-bg-img") {
                this.PageConfig.turntablebg = item;
              }
              //转盘按钮图片
              else if (item.DisCode == "active-btn") {
                this.PageConfig.turntablestart = item;
              }
              //中奖记录图片
              else if (item.DisCode == "prizerecord-image") {
                this.PageConfig.winrecord = item;
              }
              //活动规则底部富文本
              else if (item.DisCode == "active-rule-text") {
                this.PageConfig.bottomrule = item;
              }
              //活动规则内容
              else if (item.DisCode == "activity-rule-text") {
                this.PageConfig.rulecontent = item;
              }
              //未中奖弹窗
              else if (item.DisCode == "noprize-tip-title-text") {
                //标题
                this.PageConfig.nogifttitle = item;
              } else if (item.DisCode == "noprize-confirm-image") {
                //确定按钮
                this.PageConfig.nogiftconfirmbtn = item;
              } else if (item.DisCode == "noprize-tip-text") {
                //内容文字
                this.PageConfig.nogiftcontenttext = item;
              }
              //中奖弹窗
              else if (item.DisCode == "getprize-confirm-image") {
                //确定按钮
                this.PageConfig.getgiftconfirmbtn = item;
              } else if (item.DisCode == "getprize-text") {
                //标题
                this.PageConfig.getgifttitle = item;
              }
              //填写收货地址弹窗
              else if (item.DisCode == "fillAddress-text") {
                //标题
                this.PageConfig.addaddresstitle = item;
              } else if (item.DisCode == "fillAddress-confirm-image") {
                //确认按钮
                this.PageConfig.addaddressconfirmbtn = item;
              }
              //收货地址填写成功弹窗
              else if (item.DisCode == "subAddress-title-text") {
                //标题
                this.PageConfig.addresssubmittitle = item;
              } else if (item.DisCode == "subAddress-text") {
                //内容文字
                this.PageConfig.addresssubmitcontenttext = item;
              }
               //奖品背景颜色和字体颜色
              else if(item.DisCode.indexOf("prize")==0&&item.DisCode.indexOf("-bg-color")==6){
                var index=parseInt(item.DisCode.substring(5,6))-1;
                if(index<this.drawList.length){
                  this.drawList[index].bg=item.ColorName16;
                  var p = 'prize'+(index+1)+'bg';
                  this.PageConfig[p] = item;
                }
              }
              else if(item.DisCode.indexOf("prize")==0&&item.DisCode.indexOf("-text-color")==6){
                var index=parseInt(item.DisCode.substring(5,6))-1;
                if(index<this.drawList.length){
                  this.drawList[index].color=item.ColorName16;
                  var p = 'prize'+(index+1)+'name';
                  this.PageConfig[p] = item;
                }
              }
              this.editConfig.Form=
                [{
                  value: '',
                            index: 1,
                            status: 1
                }]
                            
                        
              
            }
            this.isLoaded = true;
            //获取转盘奖品列表
            if(this.editorType=='pagebg'){
              this.getDrawList();
            }
          } else {
            this.$Message.error(res.msg);
          }
        }
      );
    },

    //选择可编辑的内容 对应区域修改为选中状态
    editDetails(type, config) {
      if(type=='addaddresstitle1'){
this.editConfig.FormType=5
      }
      debugger
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
      } else if(this.$refs.pickcolor){
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
        pageConfigId: this.editConfig.PageConfigId
      };
      //如果没有编辑新的内容，就还保留老的
      if (this.editConfig.FormType == 1) {
        if (!this.editConfig.NewImgUrl) {
          json.ImgUrl = this.editConfig.ImgUrl;
        } else {
          json.ImgUrl = this.editConfig.NewImgUrl;
        }
      } else if (this.editConfig.FormType == 2) {
        if (!this.editConfig.NewDesName) {
          json.desName = this.editConfig.DesName;
        } else {
          json.desName = this.editConfig.NewDesName;
        }
      }else if(this.editConfig.FormType == 4){
        if (!this.editConfig.NewColorName16) {
          json.colorName16 = this.editConfig.ColorName16;
        } else {
          json.colorName16 = this.editConfig.NewColorName16;
        }
      }
      arr.push(json);
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
          if(this.pageIndexs==0){
            //直接调用this.reload()，刷新页面
            this.reload();
          }else{
            this.getPageConfig(this.pageId);
          }
        } else {
          this.$Message.error(res.msg);
        }
      });
    },

    //发布
    publish(){
      this.UpdateStep({
        currentStep: 3,
        templateName: this.step.templateName,
        baseTemplateId: this.step.baseTemplateId,
        templateId: this.step.templateId,
        templateImg: this.step.templateImg,
        activityId: this.step.activityId
      });
      this.$router.push({name:"CreateActivityStep4"})
    },

    //转盘相关方法如下
    getDrawList() {
      let size = 265;
      this.init({
        type: "transition",
        size: size,
        textSpace: 16,
        imgSpace: (54 * 90) / 100,
        values: this.drawList
      });
      // setTimeout(() => {
        this.draw(this.$el.querySelector("#turntable"));
      // }, 100);
      this.isTurning = false;
    },
    init: function(options) {
      this.opts = this.extend({}, this.defaultOpts(), options);
      if (!this.opts.values) {
        throw Error("values必须要有值");
      }

      var half = this.opts.size / 2;
      this.center = {
        x: half,
        y: half,
        r: half
      };

      //圆的x轴坐标
      this.startPoint = {
        x: this.opts.size,
        y: half
      };

      this.values = this.opts.values;
      this.count = this.opts.values.length;
      this.degree = 360 / this.count;

      this.container = null;
      this.svg = null;

      if (this.opts.container) {
        this.draw(this.opts.container);
      }
    },
    defaultOpts: function() {
      return {
        type: "frame",
        size: 320,
        textSpace: 15,
        imgSpace: 50,
        speed: 5,
        fastSpeed: 10,
        slowSpeed: 5,
        speedUp: 2000,
        speedDown: 2000,
        values: [],
        className: "turntable-effect",
        ring: 8
      };
    },
    appendCSS: function(css) {
      var head = document.head || document.getElementsByTagName("head")[0];
      var style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);
    },
    requestAnimationFrame:
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame,
    extend: function(target) {
      var arguments$1 = arguments;

      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments$1[i];
        for (var p in arg) {
          target[p] = arg[p];
        }
      }
      return target;
    },
    random: function(min, max) {
      return min + Math.floor(Math.random() * (max - min + 1));
    },
    getValueIndexById: function(id) {
      var r = this.values
        .filter(function(d) {
          return d.id == id;
        })
        .map(function(d) {
          return d.index;
        });

      return r[this.random(0, r.length - 1)];
    },
    getValueDegreeByIndex: function(index) {
      return this.values[index].degree;
    },
    setTransform: function(val) {
      this.svg.style.msTransform = val;
      this.svg.style.oTransform = val;
      this.svg.style.mozTransform = val;
      this.svg.style.webkitTransform = val;
      this.svg.style.transform = val;
    },
    turning: function() {
      this.turnTotal += this.turnBase;
      if (this.turnTotal >= 360 || this.turnTotal <= -360) {
        this.turnTotal = 0;
      }

      this.setTransform("rotate(" + -this.turnTotal + "deg)");
    },
    turned: function() {
      if (this.turnTotal >= 360 || this.turnTotal <= -360) {
        this.turnTotal = 0;
      }
      this.turnTotal += this.turnBase;

      if (parseInt(this.turnTotal, 10) == parseInt(this.turnEndDegree)) {
        cancelAnimationFrame(this.animation);
        this.setTransform("rotate(" + -this.turnTotal + "deg)");
        this.isTurning = false;
        this.turnCallback(this.opts.values[this.index]);
        return false;
      }
      this.setTransform("rotate(" + -this.turnTotal + "deg)");
      return true;
    },
    turn: function() {
      this.animation = requestAnimationFrame(
        function() {
          if (!this.isTurnStop) {
            this.turning();
            this.turn();
          } else {
            if (this.turned()) {
              this.turn();
            }
          }
        }.bind(this)
      );
    },
    start: function() {
      if (this.isTurning) {
        return;
      }
      this.turnBase = this.opts.speed;
      this.turnTotal = 0;
      this.isTurnStop = false;
      this.index = null;
      this.isTurning = true;
      this.turn();

      setTimeout(
        function() {
          this.turnBase = this.opts.fastSpeed;
        }.bind(this),
        this.opts.speedUp
      );
    },
    stop: function(id, cb) {
      this.index = this.getValueIndexById(id);
      this.turnEndDegree = this.getValueDegreeByIndex(this.index);
      this.turnBase = this.opts.slowSpeed;
      if (typeof cb !== "function") {
        cb = function() {};
      }
      this.turnCallback = cb;

      setTimeout(
        function() {
          this.turnBase = 1;
          this.isTurnStop = true;
        }.bind(this),
        this.opts.speedDown
      );
    },
    goto: function(id, cb) {
      if (this.isTurning) {
        return;
      }
      this.isTurning = true;
      var deg = Math.abs(
        this.svg.style.transform.replace("rotate(", "").replace("deg)", "") || 0
      );
      var ndeg = deg != 0 ? Math.abs(this.turnEndDegree) : 0;
      ndeg = Math.abs(this.opts.ring * 360 + deg - ndeg);

      this.index = this.getValueIndexById(id);
      this.turnEndDegree = 360 - this.getValueDegreeByIndex(this.index);
      this.turnCallback = cb;

      this.setTransform("rotate(" + (ndeg + this.turnEndDegree) + "deg)");
    },
    movePoint: function(oPoint, tPoint, dis, len) {
      var x = -1 * ((dis * (tPoint.x - oPoint.x)) / len - tPoint.x);
      var y = -1 * ((dis * (tPoint.y - oPoint.y)) / len - tPoint.y);
      return { x: x, y: y };
    },
    getPathPoint: function(oPoint, degree) {
      return {
        x: oPoint.x + oPoint.r * Math.cos(degree * (Math.PI / 180)),
        y: oPoint.y + oPoint.r * Math.sin(degree * (Math.PI / 180)),
        degree: degree
      };
    },
    setAttrs: function(ele, attrs) {
      for (var t in attrs) {
        if (t == "href") {
          ele.setAttributeNS("http://www.w3.org/1999/xlink", t, attrs[t]);
        } else {
          ele.setAttribute(t, attrs[t]);
        }
      }

      return ele;
    },
    createSvgElement: function(name) {
      return document.createElementNS("http://www.w3.org/2000/svg", name);
    },
    getPointsDistance: function(o, t) {
      return Math.sqrt(Math.pow(t.x - o.x, 2) + Math.pow(t.y - o.y, 2));
    },
    draw: function(container) {

      var this$1 = this;

      var that = this;
      this.container = container;

      var svg = this.setAttrs(this.createSvgElement("svg"), {
        width: this.opts.size,
        height: this.opts.size,
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink"
      });

      var degree = this.degree;
      var pathStartPoint = this.startPoint;
      var pathEndPoint = this.getPathPoint(this.center, degree);

      var target = this;
      this.values = this.values.map(function(info, i) {
        info.degree =
          i == 0
            ? 90 + this$1.degree / 2
            : this$1.values[i - 1].degree + this$1.degree;
        if (info.degree >= 360) {
          info.degree = info.degree - 360;
        }
        info.index = i;

        var g = target.createSvgElement("g");

        var path = target.setAttrs(target.createSvgElement("path"), {
          fill: info.bg,
          d:
            "\n          M" +
            this$1.center.x +
            ", " +
            this$1.center.y +
            "\n          L" +
            pathStartPoint.x +
            ", " +
            pathStartPoint.y +
            "\n          A" +
            this$1.center.x +
            ", " +
            this$1.center.y +
            "\n          1 0, 1\n          " +
            pathEndPoint.x +
            ", " +
            pathEndPoint.y +
            "\n          z\n        "
        });

        g.appendChild(path);

        var fanCenterPoint = {
          x: (pathEndPoint.x + pathStartPoint.x) / 2,
          y: (pathEndPoint.y + pathStartPoint.y) / 2
        };

        var centerDistance = target.getPointsDistance(
          fanCenterPoint,
          this$1.center
        );

        var textDegree = 180 - (360 - this$1.degree * 2) / 2 / 2;
        var textPoint = target.movePoint(
          this$1.center,
          fanCenterPoint,
          this$1.opts.textSpace,
          centerDistance
        );
        var rotate = textDegree + this$1.degree * i;

        var text = target.setAttrs(target.createSvgElement("text"), {
          x: textPoint.x,
          y: textPoint.y - 8,
          "text-anchor": "middle",
          fill: info.color,
          transform:
            "rotate(" + rotate + ", " + textPoint.x + ", " + textPoint.y + ")"
        });
        text.appendChild(document.createTextNode(info.name));

        g.appendChild(text);

        if (info.img) {
          var imgPoint = target.movePoint(
            this$1.center,
            fanCenterPoint,
            this$1.opts.imgSpace,
            centerDistance
          );
          var img = target.setAttrs(target.createSvgElement("image"), {
            width: info.img.width,
            height: info.img.height,
            href: info.img.src,
            x: imgPoint.x,
            y: imgPoint.y - 5,
            transform:
              "rotate(" +
              rotate +
              ", " +
              imgPoint.x +
              ", " +
              imgPoint.y +
              ") translate(" +
              -(info.img.width / 2) +
              ", " +
              -(info.img.height / 2) +
              ")"
          });
          g.appendChild(img);
        }

        svg.appendChild(g);

        pathStartPoint = pathEndPoint;
        pathEndPoint = target.getPathPoint(
          this$1.center,
          this$1.degree + this$1.degree * (i + 1)
        );

        return info;
      });

      container.appendChild(svg);
      this.svg = svg;

      if (this.opts.type == "transition") {
        this.initTransition();
      }
      this.isshowbg = true;
    },
    initTransition: function() {
      var this$1 = this;

      this.setAttrs(this.svg, { class: this.opts.className });

      this.svg.addEventListener(
        "transitionend",
        function() {
          this$1.isTurning = false;
          this$1.turnCallback(this$1.values[this$1.index]);
        },
        false
      );

      this.appendCSS(
        "\n      ." +
          this.opts.className +
          " {\n        -webkit-transition: -webkit-transform " +
          this.opts.speed +
          "s ease-in-out;\n        transition: transform " +
          this.opts.speed +
          "s ease-in-out;\n      }\n    "
      );
    },
    starLottery: function() {
      if (this.isturn == false) {
        this.isturn = true;
        setTimeout(() => {
          this.goto("no", function(val) {
            this.isturn = false;
          });
        }, 1500);
        //这里指定转到哪个位置，从后台获取
      }
    }
  }
};
</script>
<style lang="less">
.rulesWrap ul,
.rulesWrap ol {
  width: 80%;
  margin: 0 auto;
  color: #666666;
  list-style-type: disc;
  list-style-position: initial;
  li {
    line-height: 20px;
  }
}
.formEdit{
  .ivu-input{
    color: inherit;
    background-color: inherit;
  }
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
            width: 96%;
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
          height: 300px;
          margin: 0 auto;
          // background-image: url(../../assets/lottery/EHCLottery.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }

        .container {
          position: relative;
          box-sizing: border-box;
          padding-top: 17px;
          position: relative;
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
          .pie {
            width: 88%;
            height: 92%;
            position: absolute;
            left: 6%;
            top: 6.5%;
            border-radius: 50%;
            overflow: hidden;
            .slice {
              overflow: hidden;
              position: absolute;
              top: 0;
              right: 0;
              width: 50%;
              height: 50%;
              transform-origin: 0% 100%;
            }
            .slice-one {
              transform: rotate(45deg) skewY(-45deg);
            }
            .slice-two {
              transform: rotate(0) skewY(-45deg);
            }
            .slice-three {
              transform: rotate(-45deg) skewY(-45deg);
            }
            .slice-four {
              transform: rotate(-90deg) skewY(-45deg);
            }
            .slice-five {
              transform: rotate(-135deg) skewY(-45deg);
            }
            .slice-six {
              transform: rotate(-180deg) skewY(-45deg);
            }
            .slice-seven {
              transform: rotate(-225deg) skewY(-45deg);
            }
            .slice-eight {
              transform: rotate(-270deg) skewY(-45deg);
            }
          }
          .pieName{
            .name{
              width: 78px;
              height: 22px;
              position: absolute;
              // border:1px solid #fff;
            }
            .name-one{
              top:28px;
              left: 65px;
              transform: rotate(-25deg);
            }
            .name-two{
              top:28px;
              right: 65px;
              transform: rotate(25deg)
            }
            .name-three{
              top: 93px;
              right: 2px;
              transform: rotate(67deg)
            }
            .name-eight{
              top: 93px;
              left: -2px;
              transform: rotate(-67deg)
            }
            .name-four{
              top: 183px;
              right: 0px;
              transform: rotate(115deg);
            }
            .name-seven{
              top: 183px;
              left: 0;
              transform: rotate(-115deg);
            }
            .name-five{
              bottom: 15px;
              right: 66px;
              transform: rotate(157deg);
            }
            .name-six{
              bottom: 15px;
              left: 66px;
              transform: rotate(-157deg);
            }
          }
        }
        .rules {
          width: 60%;
          font-size: 14px;
          color: #fff;
          margin: 60px auto 0;
          text-decoration: underline;
          padding: 10px !important;
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
            min-height: 150px;
            padding-bottom: 15px;
            text-align: center;
            position: absolute;
            left: 10%;
            top: 100px;
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
            }
            .shade {
              width: 100%;
              height: 70%;
              position: absolute;
              left: 0;
              top: 14%;
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
            .rulesWrap,
            .recordWrap {
              padding: 0 5%;
              color: #666666;
              font-size: 12px;
              height: 80%;
              overflow-y: auto;
              text-align: left;
              .rulelist {
                p {
                  font-weight: 600;
                  color: #fc595a;
                  margin: 15px 0 10px 0;
                }
                div {
                  padding-left: 1em;
                  line-height: 20px;
                }
                ul {
                  width: 80%;
                  margin: 0 auto;
                  color: #666666;
                  list-style-type: disc;
                  list-style-position: initial;
                  li {
                    line-height: 18px;
                  }
                }
              }

              .recordList {
                text-align: center;
                display: flex;
                justify-content: space-between;
                margin: 15px 0;
                &:first-child {
                  color: #333;
                }
                div:first-child {
                  text-align: left;
                }
                div:first-child,
                div:last-child {
                  width: 40%;
                }
                div:nth-child(2) {
                  width: 20%;
                }
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

.hidescoll {
  overflow: hidden !important;
}

@media screen and (max-width: 1360px) {
  /*当屏幕尺寸小于1360px时，应用下面的CSS样式*/
  .editRight {
    width: 340px !important;
    height: 100%;
  }
}
</style>