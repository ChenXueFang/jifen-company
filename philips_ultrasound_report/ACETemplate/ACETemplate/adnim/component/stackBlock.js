Vue.component('common-stack', {
    template: `<ul class="stackUl">
                    <!-- <div class="progress" :style="'width:' + credit_ratio * 100 + '%'"></div> -->
                    <li :style="'width:' + chardata + 'px'" v-for="(chardata,index) in stackDataArray" :key="index">{{chardata}}</li>
                </ul>`,
    props: ['stackData'],
    data() {
        return {
            // 堆叠图
			stackDataArray: this.stackData,
        };
    },
    computed: {
        
    },
    methods: {

    },
});