<template>
    <div class="_content">
        <p class="hidden">{{window_selected}}</p>
        <div v-bind:class="{'hidden' : !windows.home}">
            <HomePanel class="change_background_on_hover"></HomePanel>
            <LastPlaylists></LastPlaylists>
        </div>
        <div v-bind:class="{'hidden' : !windows.browse}">
            <p>Browse window</p>
        </div>
        <div v-bind:class="{'hidden' : !windows.music}">
            <p>Gianfranco's music window</p>
        </div>
        <div v-bind:class="{'hidden' : !windows.playlists}">
            <p>Gianfranco's playlists window</p>
        </div>
    </div>
</template>

<script>
import HomePanel from './HomePanel.vue';
import LastPlaylists from './LastPlaylists.vue';
import {store} from '../store/store';

export default {
    name:"Content",
    components:{
        HomePanel,
        LastPlaylists
    },
    data(){
        return {
            windows:{
                home: false,
                browse: true,
                music: false,
                playlists: false
            }
        }
    },
    methods:{
        change_window(window_indx){
            this.windows.home = false;
            this.windows.browse = false;
            this.windows.music = false;
            this.windows.playlists = false;
            if(window_indx === 0){
                this.windows.home = true;
            } else if(window_indx === 1){
                this.windows.browse = true;
            } else if(window_indx === 2){
                this.windows.music = true;
            } else if(window_indx === 3){
                this.windows.playlists = true;
            }
        }
    },
    computed:{
        window_selected(){
            var selected = store.getters.get_selected_window;
            this.change_window(selected);
            return selected;
        }
    }
}
</script>

<style scoped>

.hidden{
    display:none;
}

._content{
    background: #12c2e9;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    height:80vh;
    border-top-right-radius:10px;
    border-top-left-radius:10px;
    padding: 2em 2em 2em 2em;
    margin-top:0;
}

.change_background_on_hover{
    transition: all .5s ease-in-out;
}

.change_background_on_hover:hover{
    /*background: #F64F5A;*/
    cursor:pointer;
    transform: scaleZ(0.5deg);
    box-shadow: #181818 10px 10px 25px;
    animation: bg-animation 15s infinite;
    animation-timing-function: ease-in-out;
    animation-fill-mode: both;
}

@-webkit-keyframes bg-animation {
  0% {
    background-color: #f64f59;
  }
  35% {
    background-color: #c471ed;
  }
  70% {
    background-color: #12c2e9;
  }
  100% {
    background-color: #f64f59;
  }
}

@keyframes bg-animation {
  0% {
    background-color: #f64f59;
  }
  35% {
    background-color: #c471ed;
  }
  70% {
    background-color: #12c2e9;
  }
  100% {
    background-color: #f64f59;
  }
}

</style>