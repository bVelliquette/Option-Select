<template>
  <div>
    <h1>{{event.name}}</h1>
    <p>{{event.description}}</p>
    <h4>{{`${event.startDate.getMonth()+1}/${event.startDate.getDate()}/${event.startDate.getFullYear()} - ${event.endDate.getMonth()+1}/${event.endDate.getDate()}/${event.endDate.getFullYear()}`}}</h4>

    <StreamViewer v-if="streamSelected" v-on:clear="clear" v-bind:channel="currentStream" />

    <Schedule v-if="eventExists" v-bind:event="event" v-on:open="openStream" />
  </div>
</template>

<script>
import Schedule from "../components/Schedule";
import StreamViewer from "../components/StreamViewer";
import axios from "axios";

export default {
  name: "Dev",
  components: {
    Schedule,
    StreamViewer
  },
  data() {
    return {
      currentStream: "",
      streamSelected: false,
      event: "",
      eventExists: false
    };
  },
  async created() {
    await axios.get("api/schedule/all").then(res => {
      this.event = res.data[0];
      this.eventExists = true;
      this.event.startDate = new Date(this.event.startDate);
      this.event.endDate = new Date(this.event.endDate);
    });
  },
  methods: {
    openStream(channel) {
      this.currentStream = channel;
      this.streamSelected = true;
    },
    clear() {
      this.currentStream = "";
      this.streamSelected = false;
    }
  }
};
</script>

<style scoped>
</style>