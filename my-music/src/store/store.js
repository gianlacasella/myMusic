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
            // false => no need to change song. true => user wants to change the song
            change_song:false,
            //All the songs loaded
            songs: [
                {
                    id:0,
                    title: "Closer to the edge",
                    artist: "30 seconds to Mars",
                    src: require('../assets/music/closer_to_the_edge.mp3'),
                    cover: require('../assets/music/30_seconds_to_mars.jpg')
                },{
                    id:1,
                    title: "If it means a lot to you",
                    artist: "A Day to Remember",
                    src: require('../assets/music/if_it_means_a_lot_to_you.mp3'),
                    cover: require('../assets/music/a_day_to_remember.jpg')
                },
                {
                    id:2,
                    title: "Have faith in me",
                    artist: "A Day to Remember",
                    src: require('../assets/music/have_faith_in_me.mp3'),
                    cover: require('../assets/music/a_day_to_remember.jpg')
                },
                {
                    id:3,
                    title: "I miss you",
                    artist: "Blink 182",
                    src: require('../assets/music/i_miss_you.mp3'),
                    cover: require('../assets/music/blink-182.jpg')
                }
            ],
            // Song playing. Hardcoded for now. It needs to change with this.songs[this.index], from InteractionBar.vue
            // This should be empty initially, and then change to the chosen song on play click
            song_playing:{
                
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
                    state.playing = {status:false, text:'play'};
                } else {
                    state.playing = {status:true, text:'pause'};
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
                state.song_playing = state.songs[state.index];
            },
            // Switches the app view
            switch_view(state){
                if(state.view==='normal'){
                    state.view = 'hidden';
                } else{
                    state.view = 'normal';
                }
            },
            // Executed when user wants to play given a song
            play_song(state, id){
                // Change the actual index and song_playing to the wanted song
                state.index = id;
                state.song_playing = state.songs[id];
                // Change the playing status
                state.playing.status = true;
                state.playing.text = 'pause';
                // We change the propertie change_song to true
                // InteractionBar is watching this change, and will play the new song
                state.change_song = true;
            },
            pause_song(state){
                state.playing = {status: false, text: 'play'}
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
            },
            // Gives all the songs data to the AllMusicView componente
            get_all_songs_data(state){
                var aux = [];
                state.songs.forEach(element=>{
                    var aux2 = {};
                    aux2.id = element.id;
                    aux2.title = element.title;
                    aux2.artist = element.artist;
                    aux.push(aux2);
                });
                return aux;
            },

            // Gives the current selected view
            get_current_change_song_status(state){
                return state.change_song;
            }
        },
        actions:{
            // Actions executed from the components

            changeSelectedWindow(context, new_window){
                // Execute the change_selected_window method
                context.commit('change_selected_window', new_window)
            },
            switchPlaying(context){
                // Execute the switch_play_pause method
                context.commit('switch_play_pause')
            },
            changeSong(context, change_element){
                // Execute the change_song method
                context.commit('change_song', change_element)
            },
            switchView(context){
                // Execute the switch_view method
                context.commit('switch_view')
            },
            playSong(context, id){
                // Execute the play_song method
                context.commit('play_song', id)
            },
            pauseSong(context){
                context.commit('pause_song')
            }
        }
    }
)
