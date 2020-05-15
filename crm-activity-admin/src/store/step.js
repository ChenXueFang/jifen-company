// 步骤条相关

const state = {
    step: {
      currentStep: '',//步骤条状态
      templateName:"",//模板名称
      baseTemplateId:-1,//基础模板id
      templateId:-1,//创建活动后应的模板id
      templateImg:"",//模板图片
      activityId:-1,//活动id
      activityNo:'',//活动No,ak
    }
};
// getters
const getters = {
    step: state => state.step
};

// actions
const actions = {
    UpdateStep({ commit }, step) {
        commit("UpdateStep", step);
    }
};

// mutations
const mutations = {
    UpdateStep(state, step) {
        state.step = step;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
