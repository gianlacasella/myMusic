<template>
    <div class="base_panel d-flex flex-column">
        <div class="panel_title my-auto">
            <p class="text-center element_title">{{title_selected}}</p>
        </div>
        <div class="panel_image p-2">
            
        </div>
    </div>
</template>

<script>
export default {
    name:"HomePanel",
    data(){
        return {
            title_selected: "MyMusic, simple music app made with Vue.js",
        }
    },
    methods:{
    }
}
</script>

<style scoped>

p{
    display: inline;
    text-align: center!important;
}

.element_title{
    color:white;
    
    font-size: 2em;
    float:left;
}

.base_panel{
    background-color: #2c2c2c;
    height:35vh;
    padding: 1em;
    border-radius: 10px;
}

.panel_title{
    height:20%;
    margin:0.5em;
    text-align: center!important;
}

.panel_image{
    background-image:url('../assets/img1.jpg');
    background-size:cover;
    background-repeat: no-repeat;
    background-position: 50% 70%;
    border-radius: 10px;
}

.panel_image{
    height:80%;
    margin:0.5em;
}
</style>