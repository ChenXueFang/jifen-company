//不同环境里面的相关配置

// 设置接口地址
let baseUrl = '';
let uploadUrl='';
let imgUrl = '';
switch(process.env.VUE_APP_CURRENTMODE){
    case 'dev':
    case 'test':
        // 开发/测试 环境
        baseUrl = 'https://vip.crmclick.com/crmadmin/';
        uploadUrl = 'https://vip.crmclick.com/crmadmin/api/Upload/Post';
        imgUrl = 'https://vip.crmclick.com/crmadmin/';
        break
    case 'prod':
        // 正式环境
        baseUrl = '';
        uploadUrl = '';
        imgUrl = '';
        break
}

export {
    baseUrl,
    uploadUrl,
    imgUrl
}