<template>
    <div class="component">
        <div class="d-flex justify-content-between"  :style="[updated_view === 'hidden' ? {
            'padding-top':'1vh', 
            'padding-right':'2em', 
            'padding-bottom':'0.3vh', 
            'padding-left':'2em', 
            'background-color':'#181818'} : {}]">
            <div class="text-left volume_div">
                <button @click="mute_unmute()">
                    <img :src="require('../assets/icons/'+volume_icon+'.png')" alt="" class="iconify">
                </button>
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
                <a target="_blank" href="https://open.spotify.com/user/glacasella1601?si=E3fZ-O5pReWwHZgJfOaklw" :style="[updated_view === 'hidden' ? {'height':'6vh'} : {}]">
                    <span class="iconify" data-icon="cib:spotify" data-inline="false" ></span>
                </a>
            </div>
        </div>
        <div class="song_info"  :style="[updated_view === 'hidden' ? {
            'marging-top':'4vh', 
            'padding-bottom':'0.7em!important',
            'background-color':'#181818',
            'border-bottom-right-radius':'10px',
            'border-bottom-left-radius':'10px'} : {}]">
            <p class="song_info">{{current_song.title}} - {{current_song.artist}}</p>
            <p id="hide_panel" @click="change_view()">{{view_text}}</p>
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
            player: new Audio(),
            volume_icon: "volume_up",
            view_text: "Hide panel"
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
        // Metodo para cambiar de cancion con adelanto y retroceso: 1 para adelantar, -1 para retroceder
        change_song(change_element){
            store.dispatch('changeSong', change_element);
            this.player.src = this.current_song.src;
            this.player.pause()
            if(this.playing_or_not.status){
                this.player.play()
            } 
        },

        // Method to play a song the user wants to play. The chosen song is already selected on store
        change_to_unknown_song(){
            this.player.src = this.current_song.src;
            this.player.pause();
            this.player.play();
        },

        // Metodo para mutear la cancion
        mute_unmute(){
            if(!this.player.muted){
                this.player.muted = true;
                this.volume_icon = "volume_off";
            } else{
                this.player.muted = false;
                this.volume_icon = "volume_up";
            }
        },
        // Metodo para cambiar el view de la app (mostrar y esconder el Content y el TopBar)
        change_view(){
            store.dispatch('switchView');
            if(this.view_text === "Hide panel"){
                this.view_text = "Show panel";
            } else {
                this.view_text = "Hide panel";
            }
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
        },
        // Obtenemos el valor del view para saber si el usuario escondio la vista
        updated_view(){
            return store.getters.get_current_view;
        },
        // We get the change_song value, to know if the user wants to play another song
        play_unknown_song(){
            return store.getters.get_current_change_song_status;
        }
    },
    watch:{
        // Watcher that watches if there are changes on change_song in the store
        // If there is a change, and the status (change_song, in this case) is true, it plays the song
        play_unknown_song(status){
            if(status){
                // Play the song
                this.change_to_unknown_song();
                // change_song to false, to wait for another change
                store.state.change_song = false;
            }
        }
    }
}
</script>

<style scoped>

.song_info{
    color:white;
    font-weight: bold;
    font-size: 1.2em!important;
    text-shadow: black 2px 2px 7px;
    padding-bottom:0em!important;
    margin-bottom: 0.2em;
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

#hide_panel{
    padding:0!important;
    margin:0!important;
    font-size: 0.7em!important;
    transition: all .5s ease-in-out;
}

#hide_panel:hover{
    text-decoration: underline;
    cursor: pointer;
}

.component{
    background-color: #181818;
    border-bottom-right-radius:10px;
    border-bottom-left-radius:10px;
    padding-top:1vh; 
    padding-right: 2em; 
    padding-bottom:0.3vh; 
    padding-left:2em; 
}

</style>