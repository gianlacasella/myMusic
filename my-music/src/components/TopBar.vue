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
      if(text === "Home"){
        this.options[0].selected = true;
      } else if (text === "Browse"){
        this.options[1].selected = true;
      } else if (text === "Gianfranco's Music"){
        this.options[2].selected = true;
      } else if (text === "Gianfranco's Playlists"){
        this.options[3].selected = true;
      } 
    }

  },
  computed:{
    
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
  margin-bottom:1vh;
}

.selected{
  color: #2cd4fa!important;  /* fallback for old browsers */
}
</style>
