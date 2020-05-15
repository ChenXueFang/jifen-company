//用户相关： 菜单列表 菜单状态 面包屑  用户信息

const state = {
    //菜单
    menuLists:[],
    //菜单状态 防止刷新菜单选中状态丢失
    menuStatus: {
        activeName: "1",//激活菜单的 name 值
        openNames: [""],//展开的 Submenu 的 name 集合
    },
    //面包屑
    breadcrumb: ["首页"],
    //用户信息
    user:{}
};
// getters
const getters = {
    menuLists: state => state.menuLists,
    menuStatus: state => state.menuStatus,
    breadcrumb: state => state.breadcrumb,
    user: state => state.user,
};

// actions
const actions = {
    UpdateMenuLists({ commit }, menuList) {
        commit("UpdateMenuLists", menuList);
    },
    UpdateMenuStatus({ commit }, menuStatus) {
        commit("UpdateMenuStatus", menuStatus);
    },
    UpdateBreadcrumb({ commit }, breadcrumb) {
        commit("UpdateBreadcrumb", breadcrumb);
    },
    UpdateUser({ commit }, user) {
        commit("UpdateUser", user);
    },
};

// mutations
const mutations = {
    UpdateMenuLists(state, menuList){
        state.menuLists = menuList;
    },
    UpdateMenuStatus(state, menuStatus) {
        state.menuStatus = menuStatus;
    },
    UpdateBreadcrumb(state, breadcrumb) {
        state.breadcrumb = breadcrumb;
    },
    UpdateUser(state, user) {
        state.user = user;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
