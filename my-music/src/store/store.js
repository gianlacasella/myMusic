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
            // Index of the current song. It has to be 0 at the start
            index:0,
            //All the songs loaded
            songs:[
                {
                    title: 'Closer to the edge',
                    artist: '30 seconds to Mars',
                    src: require('../assets/music/closer_to_the_edge.mp3'),
                    cover: require('../assets/music/closer_to_the_edge.jpg')
                }
            ],
            // Song playing. Hardcoded for now. It needs to change with this.songs[this.index], from InteractionBar.vue
            // This should be empty initially, and then change to the chosen song on play click
            song_playing:{
                title: 'Closer to the edge',
                artist: '30 seconds to Mars',
                src: require('../assets/music/closer_to_the_edge.mp3'),
                cover: require('../assets/music/closer_to_the_edge.jpg')
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
            }
        }
    }
)
