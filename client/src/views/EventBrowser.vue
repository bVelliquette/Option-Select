<template>
  <div>
    <h1>Upcoming Events</h1>
    <div class="card-columns">
      <div
        v-for="event in events"
        :key="event._id"
        class="card bg-dark">
        <div class="card-body">
          <h5 class="card-title">{{event.name}}</h5>
          <p class="card-text">{{event.description}}</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
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
</style>