Vue.component('common-cascader', {
    template: `<div class="block">
                    <span class="demonstration">报表年月</span>
                    <el-cascader 
                        v-model="value"
                        :options="cascaderList"
                        @change="handleChange">
                    </el-cascader>
                </div>`,
    props: [],
    data() {
        return {
            // 堆叠图
            cascaderList: [],
            selectYear: null,
            selectMonth: null,
            value:[]
        };
    },
    created: function () {
        this.getYearMonth()
    },
    watch:{
        // cascaderList(value){
        //   if(value){
        //     this.colorInitial = value;
        //   }
        // }
    },
    methods: {
        handleChange(value) {
            console.log(value)
            this.selectYear=value[0] //选中的年
            this.selectMonth=null
            var valuePop=value[value.length-1] //最后一个值
            if(valuePop=='年报'){
                this.selectMonth='1,2,3,4,5,6,7,8,9,10,11,12'
            }else if(valuePop=='上半年'){
                this.selectMonth='1,2,3,4,5,6'
            }else if(valuePop=='下半年'){
                this.selectMonth='7,8,9,10,11,12'
            }else if(valuePop=='第一季度'){
                this.selectMonth='1,2,3'
            }else if(valuePop=='第二季度'){
                this.selectMonth='4,5,6'
            }else if(valuePop=='第三季度'){
                this.selectMonth='7,8,9'
            }else if(valuePop=='第四季度'){
                this.selectMonth='10,11,12'
            }else{
                this.selectMonth= valuePop
            }
            var year = this.selectYear
            var month = this.selectMonth
            this.$emit("cascader",year,month);            
        },
        getYearMonth(){  
            var that = this
            const loading = this.$loading({
                lock: true,
                text: ''
            });
            $.ajax({
                url: 'handler/GobalHandler.ashx?_op=getyearmonth',
                data: { },
                type: 'POST',
                dataType: "json",
                success: function (data) {
                    loading.close();
                    if (data.success) {
                        var years=_.union(_.map(data.data,'Year')) 
                        var tt=[]
                        _.forEach(years,function(b){
                            var t={};
                            t.label=b //年 一级
                            t.value=b
                            t.children=[], //年报，半年报，季报，月报 二级
                            t.children.push({label:'年报',value:'年报'},{label:'半年报',value:'半年报',children:[]},{label:'季报',value:'季报',children:[]},{label:'月报',value:'月报',children:[]})

                            _.forEach(data.data,function(a){
                                if(b==a.Year){
                                    // 半年报
                                    if(a.Month<=6){
                                        t.children[1].children.push({label:'上半年',value:'上半年'})
                                    }else{
                                        t.children[1].children.push({label:'下半年',value:'下半年'})
                                    }
                                    // 季报
                                    if(a.Month<=3){
                                        t.children[2].children.push({label:'第一季度',value:'第一季度'})
                                    }else if(a.Month<=6){
                                        t.children[2].children.push({label:'第二季度',value:'第二季度'})
                                    }else if(a.Month<=9){
                                        t.children[2].children.push({label:'第三季度',value:'第三季度'})
                                    }else if(a.Month<=12){
                                        t.children[2].children.push({label:'第四季度',value:'第四季度'})
                                    }
                                    // 月报
                                    t.children[3].children.push({label: a.Month,value: a.Month})
                                    tt.push(t)
                                }
                            })
                            that.cascaderList = tt
                        })
                    }
                },
                error: function (err) {
                    loading.close()
                    vue.$message.error(err.msg)
                }
            });
        },
    },
});