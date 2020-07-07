// 定义一个名为 日期搜索 的新组件
Vue.component('search-date', {
    data: function () {
        return {
            date: [],
            pickerOptions1: {
                disabledDate(time) {

                  //  return false;
                    return time.getTime() > Date.now() || time.getTime()<new Date("2018-8-1");
                },
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            var d = new Date();
                            d.setDate(1)
                            end.setTime(d.getTime());
                            d.setMonth(d.getMonth() - 1);
                            start.setTime(d.getTime());


                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();

                            var d = new Date();

                            d.setDate(1)

                            end.setTime(d.getTime());

                            d.setMonth(d.getMonth() - 3);
                            start.setTime(d.getTime());
                            //start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一年',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            var d = new Date();
                            d.setDate(1)
                            end.setTime(d.getTime());
                            d.setMonth(d.getMonth() - 12);
                            start.setTime(d.getTime());
                            picker.$emit('pick', [start, end]);
                        }
                    }

                ]
            },
        }
    },
    created: function () {
        const end = new Date();
        const start = new Date("2018-8-1");
        var d = new Date();
       // d.setDate(1) //设置一号
        end.setTime(d.getTime());
        end.setDate(end.getDate());
       // d.setMonth(d.getMonth() - 12);
        //start.setTime(d.getTime());
        this.date[0] = start;
        this.date[1] = end;


    },
    methods: {
        getSearch() {
            var dateTime =new Date(JSON.parse(JSON.stringify( this.date[1])));
            dateTime.setDate(dateTime.getDate() + 1);
            var endTime = dateTime.Format("yyyy-MM-dd");
            return { start: this.date[0].Format("yyyy-MM-dd"), end: endTime}
        },
        setlastMonth() {
            const end = new Date();
            const start = new Date();
            var d = new Date();
            // d.setDate(1) //设置一号
            end.setTime(d.getTime());
            d.setMonth(d.getMonth() - 1);
            start.setTime(d.getTime());
            this.date[1] = end;
            Vue.set(this.date, 0, start);
        }
    },
    template: `	<el-date-picker v-model="date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions1">
					</el-date-picker>`
})



// 定义一个名为 医院搜索 的新组件
Vue.component('search-hospital', {
    data: function () {
        return {
            loading:false,
            coptions: [],
            citys: [],
            Levels: [{ name: "三级" }, { name: "二级" }, { name: "一级" }],
            level: "",
            Form: {
                HospitalID: { name: "HospitalID", label: "医院", value: '', values: [], op: "=", data: "select" },

            },

        }
    },
    created: function () {
        var self = this;
        $.getJSON("./json/city.json", function (t) {
            //转换数据
            var f = [];
            for (var z in t) {

                var d = [];
                for (var x = 0; x < t[z].length; x++) {
                    d.push({ label: t[z][x], value: t[z][x] })
                }
                f.push({ label: z, value: z, children: d });
            }
            self.coptions = f
        })

    },
    methods: {
        remoteMethod: function (query) {
            if (query !== '') {
                this.loading = true;
                var self = this;
                var url = 'Hospital';
                //var jg = getSearch();
                //jg.fiters.rulesAdd("HospitalName", "like", query)
                url = "../api/BasicData.ashx?_op=HospitalQuery";
                jQuery.ajax({
                    url: url,
                    type: 'get',
                    data: { provice: this.citys.length > 0 ? this.citys[0] : "", city: this.citys.length > 1 ? this.citys[1] : "", search: query },
                    dataType: "json",
                    success: function (data) {
                        self.loading = false;
                        self.Form.HospitalID.values = data.rows || data.data;
                    },
                    error: function (err) {
                        self.loading = false;
                        mygritter.errorgrit("失败", err.status);
                    }

                });

            } else {
                this.Form.HospitalID.values = [];
            }
        },
        getSearch() {
            if (this.citys[1] == "全部")
            {
                this.citys[1] = "";
            }
            return { province: this.citys[0], city: this.citys[1], hospitalID: this.Form.HospitalID.value, level: this.level }
        }
    },
    template: `<span>
        	<el-cascader clearable filterable   v-bind:options="coptions" change-on-select v-model="citys" placeholder="选择省市"></el-cascader>
					<el-select v-model="Form.HospitalID.value" clearable filterable remote reserve-keyword    v-bind:remote-method="remoteMethod" v-bind:loading="loading" v-bind:placeholder="Form.HospitalID.label">
                        	<el-option v-for="item in Form.HospitalID.values"  v-bind:label="item.HospitalName"   v-bind:value="item.ID">
    {{item.HospitalName}}
						</el-option>
					</el-select>
					<el-select v-model="level" clearable placeholder="医院级别" style="width:110px;">
						<el-option v-for="item in Levels" v-bind:valuelabel="item.name" v-bind:value="item.name">
						</el-option>
					</el-select>
        </span>`
})


// 定义一个名为 医院部门 的新组件
Vue.component('search-hospitaldepart', {
    data: function () {
        return {
            Form: {
                HospitalDepartmentID: { name: "HospitalDepartmentID", label: "科室", value: [], values: [], op: "=", data: "select" },

            },

        }
    },
    created: function () {
        var url = 'HospitalDepartment';
        if (url.indexOf(".") == -1) {
            url = 'handler/information.ashx?_op=' + url + "Query&rows=1000";
        }
        var self = this;
        jQuery.ajax({
            url: url,
            type: 'get',
            dataType: "json",
            success: function (data) {
                self.Form.HospitalDepartmentID.values = data.rows || data.data;
             

            },
            error: function (err) {
                mygritter.errorgrit("失败", err.status);

            }

        });


    },
    methods: {
        getSearch() {
            return { HospitalDepartmentID: JSON.stringify( this.Form.HospitalDepartmentID.value) }
        },
        findHospitalDepartmentID(departmentName) {
           return  _.find(this.Form.HospitalDepartmentID.values, function (o) { return o.DepartmentName == departmentName; }).HospitalDepartmentID
        }
    },
    template: `<el-select  v-model="Form.HospitalDepartmentID.value" clearable multiple v-bind:placeholder="Form.HospitalDepartmentID.label" style="width:145px;">
						<el-option v-for="item in Form.HospitalDepartmentID.values" v-bind:label="item.DepartmentName" v-bind:value="item.HospitalDepartmentID">
						</el-option>
					</el-select>`
    })




// 定义一个名为 分类 的新组件
Vue.component('search-class', {
    data: function () {
        return {
            Form: {
                ProductCategoryID: { name: "ProductCategoryID", label: "分类", value: [], values: [], op: "=", data: "select" },

            },
            value:[]

        }
    },
    created: function () {
        this.getProductCategory();


    },
    methods: {
        getProductCategory: function () {
            var url = 'ProductCategory';
            if (url.indexOf(".") == -1) {
                url = "../api/BasicData.ashx?_op=KnowledgeTypeQuery"
            }
            var self = this;
            jQuery.ajax({
                url: url,
                type: 'get',
                dataType: "json",
                success: function (data) {
                  
                    //数据转换；
                    var array = [];
                    var t = data.rows || data.data;
                    self.value = t;
                    for (var i = 0; i < t.KnowledgeType.length; i++) {
                        var v = t.KnowledgeType[i];
                        var obj = {};
                        obj.label = v.Name; obj.value = v.ID;
                        var ch = _.filter(t.SubKnowledgeType, { KnowledgeTypeID: v.ID });
                        var newch = [];
                        for (var j = 0; j < ch.length; j++) {
                            var obj1 = { label: ch[j].Name, value: ch[j].ID }
                            newch.push(obj1);
                        }
                        obj.children = newch;
                        array.push(obj)
                    }
                    self.Form.ProductCategoryID.values = array;
                },
                error: function (err) {
                    mygritter.errorgrit("失败", err.status);

                }

            });

        },

        getMaterial() {
            return this.Form.Material.values;
        },
        getSearch() {
            return { KnowledgeType: this.Form.ProductCategoryID.value[0], SubKnowledgeType: this.Form.ProductCategoryID.value[1], }
        }
    },
        template: `<el-cascader clearable filterable :options=" Form.ProductCategoryID.values" change-on-select v-model="Form.ProductCategoryID.value" :placeholder="Form.ProductCategoryID.label"></el-cascader>`
  
})




// 定义一个名为 素材类型 的新组件
Vue.component('search-material', {
    data: function () {
        return {
            Form: {
                Material: { name: "Material", label: "素材类型", value: '', values: [{ MaterialName: "大师讲堂", ID: 1 }, { MaterialName: "视频教学", ID: 3 }, { MaterialName: "专家课件", ID: 5 }, { MaterialName: "习题集", ID: 6 }], op: "=", data: "select" },

            },

        }
    },
    created: function () {


    },
    methods: {
    
        getSearch() {
            return { MaterialType: this.Form.Material.value }
        },
        getMaterial() {
            return this.Form.Material.values;
        }
    },
    template: `    <el-select v-model="Form.Material.value" clearable filterable v-bind:placeholder="Form.Material.label" style="width:150px;">
                        	<el-option v-for="item in Form.Material.values"  v-bind:label="item.MaterialName"   v-bind:value="item.ID">
                             {{item.MaterialName}}
						</el-option>
					</el-select>`

})


Vue.component('search-material1', {
    data: function () {
        return {
            Form: {
                Material: { name: "Material", label: "视频类型", value: '', values: [{ MaterialName: "大师讲堂", ID: 1 }, { MaterialName: "视频教学", ID: 3 }], op: "=", data: "select" },

            },

        }
    },
    created: function () {


    },
    methods: {

        getSearch() {
            return { MaterialType: this.Form.Material.value }
        },
        getMaterial() {
            return this.Form.Material.values;
        }
    },
    template: `    <el-select v-model="Form.Material.value" clearable filterable v-bind:placeholder="Form.Material.label" style="width:150px;">
                        	<el-option v-for="item in Form.Material.values"  v-bind:label="item.MaterialName"   v-bind:value="item.ID">
                             {{item.MaterialName}}
						</el-option>
					</el-select>`

})




Vue.component('search-materialid', {
    data: function () {
        return {
            loading:false,
            Form: {
                Material: { name: "MaterialID", label: "视频主题", value: '', values: [], op: "=", data: "select" },
            
            },

        }
    },
    created: function () {
        this.remoteMethod("");

    },
    methods: {
        remoteMethod: function (query) {
            
            if (query !=null) {
                this.loading = true;
                var self = this;
                var jg = getSearch();
                jg.rows = 15;
                jg.fiters.rulesAdd("Title", "like", query)
                url = "handler/information.ashx?_op=V_Vedio_LiveBroadcastQuery&" + jg.ToParameter();
                jQuery.ajax({
                    url: url,
                    type: 'get',
                    dataType: "json",
                    success: function (data) {
                        self.loading = false;
                        self.Form.Material.values = data.rows || data.data;
                    },
                    error: function (err) {
                        self.loading = false;
                        mygritter.errorgrit("失败", err.status);
                    }

                });

            } else {
                this.Form.Material.values = [];
            }
        },

        getSearch() {
            if (this.Form.Material.value) {
                return {
                    MaterialID: this.Form.Material.value.split(',')[0],
                    MaterialType: this.Form.Material.value.split(',')[1]
                }
            }
            return {};
          
        },
     
    },
    template: `    <el-select v-model="Form.Material.value" clearable filterable remote reserve-keyword    v-bind:remote-method="remoteMethod" v-bind:loading="loading"  v-bind:placeholder="Form.Material.label">
                        	<el-option v-for="item in Form.Material.values"  v-bind:label="item.Title"   v-bind:value="item.ID+','+item.ObjectType">
                             {{item.Title}}
						</el-option>
					</el-select>`

})



// 定义一个名为 access 的新组件
Vue.component('search-access', {
    data: function () {
        return {

            Form: {
                AccessType: { name: "AccessType", label: "活跃度", value: '', values: [{ name: "日活跃度", value: "1" }, { name: "周活跃度", value: "2" }, { name: "月活跃度", value: "3" }], op: "=", data: "select" },

            },
          

        }
    },
    created: function () {


    },
    methods: {

        getSearch() {
            return { AccessType: this.Form.AccessType.value }
        },
        
    },
    template: `<el-select v-model="Form.AccessType.value" clearable  placeholder="请选择" style="width:130px;">
                                <el-option
                                    v-for="item in Form.AccessType.values"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                                </el-option>
                                </el-select>`

})
