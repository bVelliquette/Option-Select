<template>
  <div class="viewerWindow">
    <div>
      <h1>{{channel.name}}</h1>
      <h4 class="text-muted">Stream Embed currently non-functional until SSL implemented</h4>
    </div>
    <button class="btn btn-dark myButton bg-danger" v-on:click="$emit('clear')">X</button>
    <div class="wrapper">
      <div class="widescreen">
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
.wrapper {
  position: relative;
  width: 100%;
}
.playerCont {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.widescreen {
  padding-bottom: 56.25%; /* 9/16 = 0.5625 */
}
.viewerWindow {
  border: 3px #8458b3 solid;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  background: #111;
}
.myButton {
  position: absolute;
  top: 3px;
  right: 3px;
  border-radius: 20%;
  opacity: 0.7;
}
</style>