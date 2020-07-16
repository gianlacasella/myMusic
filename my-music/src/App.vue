<template>
  <div id="app">
    <div class="container">
      <TopBar></TopBar>
      <Content></Content>
    </div>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'
import Content from './components/Content.vue'

export default {
  name: 'App',
  components: {
    TopBar,
    Content
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
  height:100vh;
  margin:0;
  padding:0;
}

</style>
