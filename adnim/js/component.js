Vue.component('v-image', {
    props: ['images', 'width'],
    template: '<div id="divImg"  :width=width  ><img  :src="images"  :width=width style = "margin-left:50%;transform:translate(-50%);"/></div>'
    


})