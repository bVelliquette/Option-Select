<template>
  <div class="eventContainer">
    <div v-if="eventExists">
      <h1>{{event.name}}</h1>
      <p>{{event.description}}</p>
      <h4>{{`${event.startDate.getMonth()+1}/${event.startDate.getDate()}/${event.startDate.getFullYear()} - ${event.endDate.getMonth()+1}/${event.endDate.getDate()}/${event.endDate.getFullYear()}`}}</h4>
    </div>
    <StreamViewer
      id="viewer"
      v-if="streamSelected"
      v-on:clear="clear"
      v-bind:channel="currentStream"
      :class="{sViewWindowIn:!clearing, sViewWindowOut:clearing}"
    />

    <Schedule
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
      eventExists: false,
      clearing: false
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
    async openStream(channel) {
      this.currentStream = channel;
      this.streamSelected = true;
      await new Promise(r => setTimeout(r, 300));
      let elmnt = document.getElementById("viewer");
      elmnt.scrollIntoView({ behavior: "smooth" });
    },
    async clear() {
      this.clearing = true;
      let elmnt = document.getElementById("app");
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
    opacity: 0%;
    left: -100vw;
  }
  100% {
    opacity: 100%;
    left: 14vw;
  }
}
@keyframes sViewOut {
  0% {
    opacity: 100%;
    left: 14vw;
  }
  100% {
    opacity: 0%;
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