<template>
  <div style="position:relative">
    <h1>Upcoming Events</h1>
    <router-link class="btn btn-primary createButton" :to="'/createEvent'">Schedule Maker Tool Demo</router-link>
    <div class="card-columns">
      <div v-for="event in events" :key="event._id" class="card bg-dark">
        <div class="card-body">
          <h3 class="card-title" style="font-weight:bold;">{{event.name}}</h3>
          <p class="card-text">{{event.description}}</p>
          <h5>{{event.location}}</h5>
          <p class="card-text">
            <small
              class="text-muted"
            >{{`${new Date(event.startDate).getMonth()+1}/${new Date(event.startDate).getDate()+1}/${new Date(event.startDate).getFullYear()} - ${new Date(event.endDate).getMonth()+1}/${new Date(event.endDate).getDate()+1}/${new Date(event.endDate).getFullYear()}`}}</small>
          </p>
          <router-link class="btn btn-dark" :to="`/events/${event._id}`">Go to Schedule</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "EventBrowser",
  data() {
    return {
      events: []
    };
  },
  async created() {
    await Axios.get("/api/schedule/all")
      .then(res => {
        this.events = res.data;
        this.events.sort((a,b) => {
          const startA = new Date(a.startDate);
          const startB = new Date(b.startDate);
          return startA - startB;
        })
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
.beegbox {
  height: 200px;
  width: 300px;
  background-color: red;
}
.createButton {
  position: absolute;
  top: .5em;
  right: 2em;
}
</style>