<template>
  <div class="form-container">
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
    <button class="btn btn-dark" v-on:click="$emit('update', tempChannel)">{{action}}</button>
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
      if(this.action == "Edit")
        this.tempChannel = {...this.channel};
  },
};
</script>

<style scoped>
</style>