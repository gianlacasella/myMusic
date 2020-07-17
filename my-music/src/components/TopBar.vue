<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-bind:key="option.id" v-for="option of options">
          <a class="nav-link" href="#" v-bind:class="{'selected':option.selected}" @click="click(option.text)">{{option.text}}</a>
        </li>
        <!--
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>-->
      </ul>
      <hr/>
    </div>
  </nav>
</template>

<script>
// Importamos el store
import {store} from '../store/store'

export default {
  name: 'TopBar',
  props: {
  },
  data(){
    return {
      options:[
        {text:"Home", selected:true},
        {text:"Browse", selected:false},
        {text:"Gianfranco's Music", selected:false},
        {text:"Gianfranco's Playlists", selected:false}
      ]
    }
  },
  methods:{
    click(text){
      this.options.forEach(element => element.selected = false);
      // Dependiendo del click que se ha hecho, cambiamos la ventana seleccionada en el store
      if(text === "Home"){
        this.options[0].selected = true;
        // Llamamos al metodo change_window_on_store con la nueva ventana seleccionada
        this.change_window_on_store(0);
      } else if (text === "Browse"){
        this.options[1].selected = true;
        this.change_window_on_store(1);
      } else if (text === "Gianfranco's Music"){
        this.options[2].selected = true;
        this.change_window_on_store(2);
      } else if (text === "Gianfranco's Playlists"){
        this.options[3].selected = true;
        this.change_window_on_store(3);
      } 
    },
    // Metodo para cambiar el selected_window en el store. Llam al al action changeSelectedWindow
    change_window_on_store(new_window){
      store.dispatch('changeSelectedWindow', new_window)
    }
  },
  computed:{
    // Obtenemos en tiempo real la ventana seleccionada desde el store
    window_selected(){
      return store.getters.get_selected_window
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-link{
  color:white!important;
  transition: all .5s ease-in-out;
  margin-right:2em;
  font-weight: 800;
}

.nav-link:hover{
  font-weight: 900;
}

.navbar{
  background-color:#181818!important;
  padding-bottom:0;
  margin-bottom:0vh;
  height:5vh;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-shadow: black 1px 1px 8px;
}

.selected{
  color: #4bdeff!important;  /* fallback for old browsers */
}
</style>
