<template>
    <div>
        <div class="d-flex justify-content-between">
            <div class="text-left volume_div">
                <img src="../assets/icons/volume_up.png" alt="" class="iconify">
            </div>
            <div class="text-center">
                <button @click="change_song(-1)">
                    <img src="../assets/icons/prev.png" alt="" class="iconify">
                </button>
                    <button  @click="switch_playing_status()">
                        <img class="iconify" :src="require('../assets/icons/'+playing_or_not.text+'.png')" alt="">
                    </button>
                <button @click="change_song(1)">
                    <img src="../assets/icons/next.png" alt="" class="iconify">
                </button>
            </div>
            <div class="text-left volume_div">
                <span class="iconify" data-icon="cib:spotify" data-inline="false" ></span>
            </div>
        </div>
        <div class="song_info">
            <p>{{current_song.title}} - {{current_song.artist}}</p>
        </div>
    </div>
</template>

<script>
// Importamos el store
import {store} from '../store/store'

export default {
    name:"InteractionBar",
    data(){
        return{
            player: new Audio()
        }
    },
    methods:{
        // Metodo para cambiar el playing status en el store, y reproducir dependiendo del caso
        switch_playing_status(){
            store.dispatch('switchPlaying');
            if(!this.playing_or_not.status){
                this.player.pause();
            } else {
                this.player.play();
            }
        },
        // Metodo para cambiar de cancion: 1 para adelantar, -1 para retroceder
        change_song(change_element){
            store.dispatch('changeSong', change_element);
            this.player.src = this.current_song.src;
            this.player.pause()
            this.player.play()
        }
    },
    created(){
        // Creamos el player en el momento de la creacion
        this.player.src = this.current_song.src;
    },
    computed:{
        // Obtenemos en tiempo real el estado del play
        playing_or_not(){
            return store.getters.get_playing_status;
        },
        // Obtenemos la cancion reproduciendose en este instante
        current_song(){
            return store.getters.get_current_song;
        }
    }
}
</script>

<style scoped>

.song_info{
    color:white;
    font-weight: bold;
    font-size: 1.3em!important;
    text-shadow: black 2px 2px 7px;
}



button{
    background-color: transparent!important;
    border: none!important;
    font-size:0!important;
    padding:0!important;
    margin:0!important;
    outline:none;
}
.iconify{
    color:white;
    padding:0.1em!important;
    font-size:5.5vh;
    height:5.5vh;
    transition: all 0.5s ease-in-out;
}

.iconify:hover{
    cursor:pointer;
}


</style>