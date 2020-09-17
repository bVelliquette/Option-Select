<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark" style="max-width: 1600px;margin:auto">
      <router-link class="navbar-brand" to="/">
        <img src="OptionSelectFavicon.png" width="50" height="50" alt loading="lazy" />
        Option Select
      </router-link>
      <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li>
            <router-link to="/events" class="nav-link">Events</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view class="main-view" />
  </div>
</template>

<script>
export default {};
</script>
<style>
#app {
  font-family: Didot, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e5eaf5;
  /*background-image: url("/background.jpg");*/
  background-color:#333333;
  min-height: 100vh;
}
.main-view {
  margin: 0 auto;
  background-color: #1d1d1f;
  max-width: 1600px;
  min-height: 100vh;
}
</style>
