<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">
        <img src="OptionSelectFavicon.png" width="50" height="50" alt loading="lazy" />
        Option Select
      </router-link>
      <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">
              Home
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li>
            <router-link to="/events" class="nav-link">Events</router-link>
          </li>
          <li>
            <router-link to="/news" class="nav-link">News</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
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
  background-color: #1d1d1f;
  min-height: 100vh;
}
</style>
