<template>
  <div>
    <div class="streamView">
      <h1>{{channel.name}}</h1>
      <h3>{{channel.link}}</h3>
      <button class="btn btn-light myButton" v-on:click="$emit('clear')">close</button>

      <iframe
        height="720"
        width="1280"
        :src="`https://player.twitch.tv/?channel=`+ `${channel.link}&parent=option-select.herokuapp.com`"
        frameborder="0"
        scrolling="no"
        allowfullscreen="true"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "StreamViewer",
  props: ["channel"]
};
</script>

<style scoped>
.streamView {
  height: minmax(50vh, auto);
  position: relative;
}
.myButton {
  position: absolute;
  top: 0px;
  right: 30%;
}
</style>