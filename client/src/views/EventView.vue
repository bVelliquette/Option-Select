<template>
  <div class="eventContainer">
    <div v-if="eventExists">
      <h1>{{event.name}}</h1>
      <p>{{event.description}}</p>
      <h4>{{`${event.startDate.getUTCMonth()+1}/${event.startDate.getUTCDate()}/${event.startDate.getUTCFullYear()} - ${event.endDate.getUTCMonth()+1}/${event.endDate.getUTCDate()}/${event.endDate.getUTCFullYear()}`}}</h4>
    </div>
    <StreamViewer
      id="viewer"
      v-if="streamSelected"
      v-on:clear="clear"
      v-bind:channel="currentStream"
      :class="{sViewWindowIn:!clearing, sViewWindowOut:clearing}"
    />

    <Schedule
      if="schedule"
      class="scheduleWindow"
      v-if="eventExists"
      v-bind:event="event"
      v-on:open="openStream"
      :class="[streamSelected? 'shiftScheduleDown' : 'shiftScheduleUp']"
    />
  </div>
</template>

<script>
import Schedule from "../components/Schedule";
import StreamViewer from "../components/StreamViewer";
import axios from "axios";

export default {
  name: "EventView",
  components: {
    Schedule,
    StreamViewer
  },
  data() {
    return {
      currentStream: "",
      streamSelected: false,
      event: "",
      eventExists: false,
      clearing: false
    };
  },
  async created() {
    var id;
    if(this.$route.params.id) id = this.$route.params.id;
    else id='5f5a242678519e1928bda957';
    await axios.get(`/api/schedule/find/${id}`).then(res => {
      this.event = res.data;
      this.eventExists = true;
      this.event.startDate = new Date(this.event.startDate);
      this.event.endDate = new Date(this.event.endDate);
    });
  },
  methods: {
    async openStream(channel) {
      this.currentStream = channel;
      this.streamSelected = true;
      await new Promise(r => setTimeout(r, 300));
      let elmnt = document.getElementById("viewer");
      elmnt.scrollIntoView({ behavior: "smooth" });
    },
    async clear() {
      this.clearing = true;
      let elmnt = document.getElementById("schedule");
      elmnt.scrollIntoView({ behavior: "smooth" });
      await new Promise(r => setTimeout(r, 300)); //Give the window a chance to animate out before clearing
      this.currentStream = "";
      this.streamSelected = false;
      this.clearing = false;
    }
  }
};
</script>

<style scoped>
.eventContainer {
  position: relative;
}
.sViewWindowIn {
  animation: sViewIn 0.5s ease-in-out 0s forwards;
  position: absolute;
}
.sViewWindowOut {
  animation: sViewOut 0.3s ease-in-out 0s forwards;
  position: absolute;
}
.scheduleWindow {
  position: absolute;
}
.shiftScheduleDown {
  animation: shiftDown 0.5s ease-in-out 0s forwards;
}
.shiftScheduleUp {
  animation: shiftUp 0.3s ease-in-out 0s forwards;
}
@keyframes sViewIn {
  0% {
    opacity: 0;
    left: -100vw;
  }
  100% {
    opacity: 1;
    left: 14vw;
  }
}
@keyframes sViewOut {
  0% {
    opacity: 1;
    left: 14vw;
  }
  100% {
    opacity: 0;
    left: -100vw;
  }
}
@keyframes shiftDown {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(45vw);
  }
}
@keyframes shiftUp {
  0% {
    transform: translateY(45vw);
  }
  100% {
    transform: translateY(0);
  }
}
</style>