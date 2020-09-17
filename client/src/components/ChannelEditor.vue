<template>
  <div class="form-container">
    <button class="btn btn-dark myButton bg-danger" v-on:click="$emit('clear')">X</button>
    <form action>
      <div class="form-group">
        <label for="channel-name">Name</label>
        <input
          type="text"
          v-model="tempChannel.name"
          class="form-control"
          id="channel-name"
          placeholder="Enter Channel Name"
        />
      </div>
      <div class="form-group">
        <label for="channel-link">Link to stream</label>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text">twitch.tv/</div>
          </div>
          <input
            type="text"
            v-model="tempChannel.link"
            class="form-control"
            id="channel-link"
            placeholder="Link"
          />
        </div>
      </div>
    </form>
    <button class="btn btn-dark" v-on:click="$emit('update', tempChannel)">{{actionLabel()}}</button>
  </div>
</template>

<script>
export default {
  name: "ChannelEditor",
  props: ["action", "channel"],
  data() {
    return {
      tempChannel: {
        name: "",
        link: "",
        website: "Twitch",
        blocks: []
      }
    };
  },
  created() {
    if (this.action == "Edit") this.tempChannel = { ...this.channel };
  },
  methods: {
    actionLabel() {
      if (this.action == "Create") return "Create";
      else return "Apply changes";
    }
  }
};
</script>

<style scoped>
.myButton {
  position: absolute;
  top: .2em;
  right: 1em;
  height: 1.7em;
  width: 1.7em;
  padding: .1em;
  border-radius: 20%;
  opacity: 0.7;
  overflow: hidden;
}
</style>