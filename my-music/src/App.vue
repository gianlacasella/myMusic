<template>
  <!--Usamos el binding para cambiar el fondo dependiendo del caso-->
    <div id="app" :style="[updated_background === 'white' ? {'background-color':'white'}:{'background-image':'url('+updated_background+')'}]">
      <div class="_container container">
        <div :style="[updated_view === 'hidden' ? {'display':'none'} : {'display':'block'}]">
          <TopBar></TopBar>
          <Content></Content>
        </div>
        <InteractionBar></InteractionBar>
      </div>
    </div>
</template>

<script>
import {store} from './store/store'
import TopBar from './components/TopBar.vue'
import Content from './components/Content.vue'
import InteractionBar from './components/InteractionBar.vue'

export default {
  name: 'App',
  components: {
    TopBar,
    Content,
    InteractionBar
  },
  computed:{
      // Obtenemos el fondo actual de forma computed
      updated_background(){
        // Si obtenemos algo diferente a null, es porque tenemos un cover
          if(store.getters.get_current_background != null){
            return store.getters.get_current_background;
          } else {
        // Si no, tenemos el fondo por defecto
            return "white";
          }
      },
      // Obtenemos el valor del view para saber si el usuario escondio la vista
      updated_view(){
        return store.getters.get_current_view;
      }
  }
}
</script>

<style>

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; 
  margin-top: 60px;
  background-color:#181818;
  background-repeat: no-repeat;
  background-size: cover;
  height:100vh;
  margin:0;
  padding:0;
}

._container{
  box-shadow: black 1px 1px 50px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding:0!important;
}


</style>
