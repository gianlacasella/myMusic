<template>
    <div class="base_panel d-flex flex-column">
        <div class="panel_title p-0">
            <p class="text-left element_title">Last playlists</p>
        </div>
        <div class="panel_playlists p-0">
            <div class="card-group">
                <div class="card" v-bind:key="playlist.id" v-for="playlist of last_playlists">
                    <img class="card-img-top" src="../assets/logo.png" alt="Card image cap">
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
export default {
    name:"LastPlaylists",
    data(){
        return {
            last_playlists:[
                {title:"Road trip", descr:"Music to hear on the road", date:"23/4/2020"},
                {title:"Chilling", descr:"Chilling at home alone. Take it easy", date:"25/5/2020"},
                {title:"Low fi", descr:"Low fi to study at home. Just relax", date:"26/6/2020"},
                {title:"80s Rock", descr:"Just rock it!", date:"27/7/2020"}
            ]
        }
    }
}
</script>

<style scoped>
.card{
    margin:1em;
    background-color:#2c2c2c;
    padding:0.5em;
    border-radius: 10px!important;
    transition: all .5s ease-in-out;
}

.card:hover{
    cursor:pointer!important;
    background-color:#363636;
    box-shadow: #181818 10px 10px 30px;
    transform: scaleZ(0.5deg);
}

.card-body{
    color:white;
}

.element_title{
    color:white;
    font-size: 2em;
    float:left;
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