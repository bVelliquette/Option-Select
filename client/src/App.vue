<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <a class="navbar-brand" href="/">
        <img src="OptionSelectFavicon.png" width="50" height="50" alt loading="lazy" />
        Option Select
      </a>
      <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">
              Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about">About</a>
          </li>
          <li>
            <a href="/events" class="nav-link">Events</a>
          </li>
          <li>
            <a href="/news" class="nav-link">News</a>
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
