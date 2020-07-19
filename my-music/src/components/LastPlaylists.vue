<template>
    <div class="base_panel d-flex flex-column">
        <div class="panel_title p-0">
            <p class="text-left element_title">Last playlists</p>
        </div>
        <div class="panel_playlists p-0">
            <div class="card-group">
                <div class="card" v-bind:key="playlist.id" v-for="playlist of last_playlists">
                    <img class="card-img-top" :src="playlist.img" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">{{playlist.title}}</h5>
                        <p class="card-text playlist_descr">{{playlist.descr}}</p>
                        <p class="card-text"><small class="text-muted">Created on {{playlist.date}}</small></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {store} from '../store/store';

export default {
    name:"LastPlaylists",
    data(){
        return {
            last_playlists:[]
        }
    },
    created(){
        this.last_playlists = store.getters.get_last_playlists;
    }
}
</script>

<style scoped>
.card{
    margin:1em;
    background-color: #1f1f1f;
    padding:0 0 0.5em 0;
    border-radius: 10px!important;
    transition: all .5s ease-in-out;
}

.card:hover{
    cursor:pointer!important;
    background-color:#181818;
    box-shadow: #181818 10px 10px 30px;
    transform: scaleZ(0.5deg);
}

.card-body{
    color:white;
    padding-top: 0.5em;
}

.element_title{
    color:white;
    font-size: 2em;
    float:left;
    text-shadow: black 2px 2px 7px;
}

.card-img-top{
    height: 50%;
    border-radius: 8px!important;
}

.base_panel{
    background-color: none;
    height:30vh;
    padding: 1em;
}
.playlist_descr{
    font-size:.8em!important;
}

.panel_title{
    height:20%;
}


.panel_playlists{
    height:80%;
}
</style>