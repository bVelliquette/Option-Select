<template>
  <div class="viewerWindow">
    <div>
      <h1>{{channel.name}}</h1>
    </div>
    <button class="btn btn-dark myButton bg-danger" v-on:click="$emit('clear')">X</button>
    <div class="playerCont">
      <iframe
        width="100%"
        height="100%"
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
.playerCont {
  width: 72vw;
  height: 40.5vw;
}
.viewerWindow {
  border: 3px #8458b3 solid;
  border-radius: 20px;
  overflow: hidden;
  background: #111;
}
.myButton {
  position: absolute;
  top: 3px;
  right: 3px;
  border-radius: 20%;
  opacity: .7;
}
</style>