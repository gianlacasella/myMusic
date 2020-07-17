import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store(
    {
        state:{
            selected_window:0,
            // Initially, we are not playing anything
            playing:{
                status:false,
                text:'play'
            },
            // normal => el Content y el TopBar. hidden=> no se ven
            view:"normal",
            // Index of the current song. It has to be 0 at the start
            index:0,
            //All the songs loaded
            songs:[
                {
                    title: 'Closer to the edge',
                    artist: '30 seconds to Mars',
                    src: require('../assets/music/closer_to_the_edge.mp3'),
                    cover: require('../assets/music/30_seconds_to_mars.jpg')
                },
                {
                    title: "If it means a lot to you",
                    artist: "A Day to Remember",
                    src: require('../assets/music/if_it_means_a_lot_to_you.mp3'),
                    cover: require('../assets/music/a_day_to_remember.jpg')
                },
                {
                    title: "Have faith in me",
                    artist: "A Day to Remember",
                    src: require('../assets/music/have_faith_in_me.mp3'),
                    cover: require('../assets/music/a_day_to_remember.jpg')
                }
            ],
            // Song playing. Hardcoded for now. It needs to change with this.songs[this.index], from InteractionBar.vue
            // This should be empty initially, and then change to the chosen song on play click
            song_playing:{
                title: 'Closer to the edge',
                artist: '30 seconds to Mars',
                src: require('../assets/music/closer_to_the_edge.mp3'),
                cover: require('../assets/music/30_seconds_to_mars.jpg')
            }
        },
        mutations:{
            // Changes the window
            change_selected_window(state, new_window){
                state.selected_window = new_window;
            },
            // Switches play and pause
            switch_play_pause(state){
                if(state.playing.status){
                    state.playing.status = false;
                    state.playing.text = 'play';
                } else {
                    state.playing.status = true;
                    state.playing.text = 'pause';
                }
            },
            // Changes the actual song
            change_song(state, change_element){
                state.index = state.index + change_element;
                if(state.index<0){
                    state.index = state.songs.length-1;
                } else if (state.index>state.songs.length-1){
                    state.index = 0;
                }
                state.song_playing.title = state.songs[state.index].title;
                state.song_playing.artist = state.songs[state.index].artist;
                state.song_playing.src = state.songs[state.index].src;
                state.song_playing.cover = state.songs[state.index].cover;
            },
            // Switches the app view
            switch_view(state){
                if(state.view==='normal'){
                    state.view = 'hidden';
                } else{
                    state.view = 'normal';
                }
            }
        },
        getters:{
            // Gives the selected window
            get_selected_window(state){
                return state.selected_window;
            },
            // Gives the playing status
            get_playing_status(state){
                return state.playing;
            },
            // Gives the current song
            get_current_song(state){
                return state.song_playing;
            },
            // Gives the current background. null is interpreted by App.vue as #181818
            get_current_background(state){
                try{
                    if(!state.playing.status){
                        return null;
                    } else {
                        return state.song_playing.cover;
                    }
                }
                catch(error){
                    return null;
                }
            },
            // Gives the current selected view
            get_current_view(state){
                return state.view;
            }
        },
        actions:{
            // Accion que se ejecuta desde los componentes
            changeSelectedWindow(context, new_window){
                // Llamamos al metodo change_selected_window
                context.commit('change_selected_window', new_window)
            },
            switchPlaying(context){
                context.commit('switch_play_pause')
            },
            changeSong(context, change_element){
                context.commit('change_song', change_element)
            },
            switchView(context){
                context.commit('switch_view')
            }
        }
    }
)
