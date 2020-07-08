Vue.component('common-plus-minus', {
    template: `<div class="plus-minusBox">
                    <div class="plus-minus-data plus-minus-dataLeft">
                        <div v-if="plusMinusData<0" class="plus-minus-dataLeft plus-minus-data">
                            <div class="leftNum">{{plusMinusData}}</div>
                            <button class="leftBlock" v-bind:style="{  width: getPx(plusMinusData) + '%' }"></button>
                        </div>
                    </div>
                    <div class="plus-minus-line"></div>
                    <div class="plus-minus-data">
                        <div class="plus-minus-data" v-if="plusMinusData>0">
                            <button class="rightBlock" v-bind:style="{  width: getPx(plusMinusData) + '%' }"></button>
                            <span class="leftNum">{{plusMinusData}}</span>
                        </div>
                    </div>
                </div>`,
    props: ['plusMinus','max','min'],
    data() {
        return {
            plusMinusData: this.plusMinus,
            maxs:this.max,
            mins:this.min,
            pxMax:100
        };
    },
    computed: {
        lineStyle() {
            const style = {}
            style.width = this.plusMinusData + 'px';
            return style
        },
      
    },
    methods: {
        getPx(p){
            var ps =this.pxMax /(this.maxs-this.mins);
            if(p==0)
             return 0;
            return (Math.abs(p) -this.min ) *ps/2.2 +5 ;//默认给出15px的预留 
             
        }
    },
});