<template>
    <div class="home">
        <input v-model="msg">
        <button @click="showMsg">点击显示</button>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';

    @Component
    export default class Home extends Vue {
        msg: string = 'hello vue ts';

        showMsg() {
            alert(this.msg)
        }
        async getBanners(){
            let res=await this.$http.post(this,'mobile/studyIndex/adList');
            console.log(res)
        }

        @Watch('msg')
        onMsgChange(val: string, oldVal: string) {
            console.log(val, oldVal)
        }

        //生命周期钩子
        async mounted() {
            await this.getBanners();
            console.log('mounted');
        }


    }
</script>
