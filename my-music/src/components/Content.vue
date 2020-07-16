<template>
    <div class="_content">
        <HomePanel></HomePanel>
    </div>
</template>

<script>
import HomePanel from './HomePanel.vue';

export default {
    name:"Content",
    components:{
        HomePanel
    }
}
</script>
<style scoped>
._content{
    background: #12c2e9;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    height:80vh;
    border-radius: 10px;
    padding: 2em 2em 2em 2em;
    margin-top:0;
}
</style>