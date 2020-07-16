import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store(
    {
        state:{
            selected_window:0
        },
        mutations:{
            change_selected_window(state, new_window){
                state.selected_window = new_window;
            }
        },
        getters:{
            get_selected_window(state){
                return state.selected_window;
            }
        },
        actions:{
            // Accion que se ejecuta desde los componentes
            changeSelectedWindow(context, new_window){
                // Llamamos al metodo change_selected_window
                context.commit('change_selected_window', new_window)
            }
        }
    }
)
