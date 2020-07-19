<template>
    <div>
        <div class="title_panel">
            <h2>All Gianfranco's playlists</h2>
        </div>
        <div class="categories_panel">
            <div 
            v-for="categorie of all_categories" 
            v-bind:key="categorie.id" style="display:inline;">
                <span 
                class="categorie" 
                :style="[all_categories.indexOf(categorie) === selected ? {'color':'white'}:{ 'color':'#181818'}]"
                @click="click_categorie(all_categories.indexOf(categorie))">
                    {{categorie}}
                </span>
            </div>
        </div>
        <div class="panel_playlists p-0">
            <div class="card-group" v-for="group of filtered_playlists" v-bind:key="group.id">
                <div class="card" v-bind:key="playlist.id" v-for="playlist of group">
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
import {store} from '../store/store'

export default {
    name:"AllPlaylists",
    data(){
        return {
            all_playlists:[],
            num_groups:0,
            all_categories:["All", "With friends", "At home", "Beach", "Travel", "Cook", "Gaming", "Coding"],
            selected:0,
            filtered_playlists:[]
        }
    },
    created(){
        let i = 0;
        store.getters.get_all_playlists.forEach(e=>{
            if(i%4===0){
                this.all_playlists.push([e]);
            } else {
                this.all_playlists[this.all_playlists.length - 1].push(e);
            }
            i++;
        });
        this.num_groups = i/4;
    },
    methods:{
        click_categorie(indx){
            this.selected = indx;
        }
    },
    computed:{
        change_categorie(){
            return this.selected;
        }
    },
    watch:{
        change_categorie(change){
            console.log(change);
            var aux_array = [];
            this.all_playlists.forEach(group=>{
                group.forEach(playlist=>{
                    if(playlist.categories.includes(this.all_categories[this.selected]) || this.all_categories[this.selected]==="All"){
                        aux_array.push(playlist);
                    }
                })
            })
            console.log(this.filtered_playlists);
            let i = 0;
            this.filtered_playlists = [];
            aux_array.forEach(e=>{
                if(i%4===0){
                    this.filtered_playlists.push([e]);
                } else {
                    this.filtered_playlists[this.filtered_playlists.length - 1].push(e);
                }
                i++;
            });
            this.num_groups = i/4;
        }
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

.card-img-top{
    height: 50%;
    border-radius: 8px!important;
}

.card-title{
    font-size:120%!important;
}

.playlist_descr{
    font-size:100%!important;
}

.panel_playlists{
    height:60vh;
    overflow:auto;
}

.categories_panel{
    height:7vh;
    margin-top:1em;
    margin-bottom:0;
    padding-bottom: 0;
    color:#181818;
    font-weight: bold;
}

.title_panel{
    color:white;
    text-shadow:black 2px 2px 25px;
}

.selected{
    text-decoration: underline;
    font-weight: bold;
}
.categorie{
    display:inline;
    font-size:1.3em;
    margin: 0 .5em 0 .5em;
}

.categorie:hover{
    cursor:pointer;
}

</style>