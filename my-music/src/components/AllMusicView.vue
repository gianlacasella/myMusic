<template>
    <div class="component">
        <div class="list">
            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex bd-highlight mb-3" @mouseenter="mouseOverSong(song.id)" @mouseleave="mouseLeftSong(song.id)" v-bind:key="song.id" v-for="song of songs"
                :style="[song.hover ? {'border-bottom-left-radius': '10px', 'border-bottom-right-radius':'10px'}:{'border-bottom-right-radius':'0', 'border-bottom-left-radius': '0'},
                        song.playing ? {'background':'#12c2e9', 'background':'-webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9)', 'background':'linear-gradient(to right, #f64f59, #c471ed, #12c2e9)'}:{'background-color':'#181818'}]">
                    <!--When user wants to play a song, we use playSong(song.id)-->
                    <button class="p-1 bd-highlight" :style="[song.hover ? {'visibility':'visible'} : {'visibility':'hidden'}]" @click="playSong(song.id)">
                        <img :src="require('../assets/icons/'+song.txt+'.png')" alt="" class="iconify play_button">
                    </button>
                    <p class="titulo_cancion pt-2 pl-2 bd-highlight" :style="[song.hover ? {'font-weight':'bold'} : {'font-weight':'normal'}, song.playing ? {'font-weight':'bold'}:{'font-weight':'normal'}]">{{song.title}}</p>
                    <p class="artista_cancion ml-auto pt-2 pr-4 bd-highlight" :style="[song.hover ? {'font-weight':'bold'} : {'font-weight':'normal'}, song.playing ? {'font-weight':'bold'}:{'font-weight':'normal'}]">{{song.artist}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {store} from '../store/store'

export default {
    name:"AllMusicView",
    data(){
        return {
            // This songs comes from the store when the component is created
            songs:[]
        }
    },
    methods:{
        // Changes the hover property of the song to true
        mouseOverSong(id){
            this.songs[id].hover = true;
        },
        // Changes the hover property of the song to false
        mouseLeftSong(id){
            this.songs[id].hover = false;
        },
        // Method executed when user clicks on a song. This says to the store which song user wants to play (check action playSong on store)
        playSong(id){
            store.dispatch('playSong', id);
        }
    },
    computed:{
        // Returns an array of the hover attribute of each song
        hoverSongs(){
            var aux = [];
            this.songs.forEach(element=>aux.push(element.hover));
            return aux;
        },
        // Returns all the data from the store about the available songs
        get_all_songs_data(){
            return store.getters.get_all_songs_data;
        },
        // Returs the current song playing
        get_current_playing_song(){
            return store.getters.get_current_song;
        }
    },
    watch:{
        get_current_playing_song(song){
            this.songs.forEach(element=>element.playing = false);
            this.songs.forEach(element=>element.txt = 'play');
            this.songs[song.id].playing = true;
            this.songs[song.id].txt = 'pause';
        }
    },
    created(){
        // Once created, we get all the existing songs data from the store
        var all_songs = this.get_all_songs_data;
        all_songs.forEach(element=>{
            element.hover = false;
            if(element.id === 0){
                element.playing = true;
                element.txt = 'pause';
            } else {
                element.playing = false;
                element.txt = 'play';
            }
            this.songs.push(element);
        })
    }
}
</script>
<style scoped>

.component{
    height: 75vh;
    border-radius: 10px;
    background-color:#181818;
    padding:0.1em 0.1em 0.1em 0.1em;
}

img{
    height:3.4vh;
}

.list{
    margin:1.2em 1.2em 1.2em 1.2em;
    height: 71vh;
    background-color:#181818;
    overflow: auto;
}

.list-group-item{
    background-color:#181818;
    color:white;
    border-top: none;
    border-bottom:  #3d3d3d solid 0.05em;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    padding: 0em 1em 0em 1em;
    margin-bottom: 0!important;
    height:4vh;
}

.titulo_cancion{
    display:inline;
}


button{
    background-color: transparent!important;
    border: none!important;
    font-size:0!important;
    padding:0!important;
    margin:0!important;
    outline:none;
    display:inline;
    vertical-align:middle;
}

.list-group-item:hover{
    background: #12c2e9; 
    background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9);  
    background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9); 
}

</style>