<template>
  <!--Usamos el binding para cambiar el fondo dependiendo del caso-->
    <div id="app" :style="[updated_background === '#181818' ? {'background-color':'#181818'}:{'background-image':'url('+updated_background+')'}]">
      <div class="container">
        <TopBar></TopBar>
        <Content></Content>
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
            return "#181818";
          }
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

</style>
