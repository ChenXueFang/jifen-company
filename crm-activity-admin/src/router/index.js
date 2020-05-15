import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页'
        },
        component: () => import('../views/Home.vue')
      },
      // 互动管理-------------------------------------
      {
        path: '/ActivityManagement',
        name: 'ActivityManagement',
        meta: {
          title: '互动管理'
        },
        component: () => import('../views/Interact/ActivityManagement.vue')
      },
      //source配置
      {
        path: '/SourceConfig',
        name: 'SourceConfig',
        meta: {
          title: 'Source配置'
        },
        component: () => import('../views/BasicData/SourceConfig.vue')
      },
      {
        path: '/CreateActivityStep1',
        name: 'CreateActivityStep1',
        meta: {
          title: '创建活动'
        },
        component: () => import('../views/Interact/CreateActivityStep1.vue')
      },
      {
        path: '/RotaryPrizeAllocation',
        name: 'RotaryPrizeAllocation',
        meta: {
          title: '转盘奖品维护'
        },
        component: () => import('../views/Interact/RotaryPrizeAllocation.vue')
      },
      // 互动管理-数据查看（转盘活动）
      {
        path: '/DataViewFissionDraw',
        name: 'DataViewFissionDraw',
        meta: {
          title: '转盘活动数据查看'
        },
        component: () => import('../views/Interact/DataViewFissionDraw.vue')
      },
      // 互动管理-数据查看（新品试用活动）
      {
        path: '/DataViewNewProduceUse',
        name: 'DataViewNewProduceUse',
        meta: {
          title: '新品试用活动数据查看'
        },
        component: () => import('../views/Interact/DataViewNewProduceUse.vue')
      },
      {
        path: '/CreateActivityStep2',
        name: 'CreateActivityStep2',
        meta: {
          title: '创建活动'
        },
        component: () => import('../views/Interact/CreateActivityStep2.vue')
      },
      {
        path: '/CreateActivityLottery',
        name: 'CreateActivityLottery',
        meta: {
          title: '转盘抽奖编辑模板'
        },
        component: () => import('../views/Interact/CreateActivityStep3_Lottery.vue')
      },
      {
        path: '/CreateActivityLottery1',
        name: 'CreateActivityLottery1',
        meta: {
          title: '转盘抽奖编辑模板'
        },
        component: () => import('../views/Interact/CreateActivityStep3_Lottery1.vue')
      },
      {
        path: '/CreateActivityForm',
        name: 'CreateActivityForm',
        meta: {
          title: 'form表单编辑模板'
        },
        component: () => import('../views/Interact/CreateActivityStep3_Form.vue')
      }, { 
        path: '/CreateActivityTrial',
        name: 'CreateActivityTrial',
        meta: {
          title: '新品试用表单填写编辑模板'
        },
        component: () => import('../views/Interact/CreateActivityStep3_trial.vue')
      },
      { 
        path: '/CreateActivityFeedback',
        name: 'CreateActivityFeedback',
        meta: {
          title: '使用反馈编辑模板'
        },
        component: () => import('../views/Interact/CreateActivityStep3_feedback.vue')
      },
      {
        path: '/CreateActivityStep4',
        name: 'CreateActivityStep4',
        meta: {
          title: '创建活动'
        },
        component: () => import('../views/Interact/CreateActivityStep4.vue')
      },
      // 系统管理-客户管理
      {
        path: '/CustomerManagement',
        name: 'CustomerManagement',
        meta: {
          title: '客户管理'
        },
        component: () => import('../views/System/CustomerManagement.vue')
      },
      // 系统管理-用户管理
      {
        path: '/UsersManagement',
        name: 'UsersManagement',
        meta: {
          title: '用户管理'
        },
        component: () => import('../views/System/UsersManagement.vue')
      },
      // 系统管理-菜单管理
      {
        path: '/MenusManagement',
        name: 'MenusManagement',
        meta: {
          title: '菜单管理'
        },
        component: () => import('../views/System/MenusManagement.vue')
      },
      // 系统管理-角色管理
      {
        path: '/RolesManagement',
        name: 'RolesManagement',
        meta: {
          title: '角色管理'
        },
        component: () => import('../views/System/RolesManagement.vue')
      },
      // 系统管理-系统日志
      {
        path: '/SystemLogManagement',
        name: 'SystemLogManagement',
        meta: {
          title: '系统日志'
        },
        component: () => import('../views/System/SystemLogManagement.vue')
      },
      // 系统管理-系统日志-客户管理-配置
      {
        path: '/AllocationCustomer',
        name: 'AllocationCustomer',
        meta: {
          title: '客户管理配置'
        },
        component: () => import('../views/System/AllocationCustomer.vue')
      },
      {
        path: '/ResetPwd',
        name: 'ResetPwd',
        meta: {
          title: '修改密码'
        },
        component: () => import('../views/System/ResetPwd.vue')
      },
      // 系统管理-模板配置
      {
        path: '/TemplateConfig',
        name: 'TemplateConfig',
        meta: {
          title: '模板配置'
        },
        component: () => import('../views/TemplateConfig/TemplateConfig.vue')
      },
      // 系统管理-模板页面配置
      {
        path: '/TemplatePage',
        name: 'TemplatePage',
        meta: {
          title: '模板页面配置'
        },
        component: () => import('../views/TemplateConfig/TemplatePage.vue')
      },
      //系统管理-页面识别代码配置
      {
        path: '/TemplatePageElment',
        name: 'TemplatePageElment',
        meta: {
          title: '页面识别代码配置'
        },
        component: () => import('../views/TemplateConfig/TemplatePageElment.vue')
      },
      //系统管理-模板页面元素配置
      {
        path: '/TemplatePageConfig',
        name: 'TemplatePageConfig',
        meta: {
          title: '模板页面元素配置'
        },
        component: () => import('../views/TemplateConfig/TemplatePageConfig.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
