<template>
  <div>
    <h1>{{event.name}}</h1>
    <p>{{event.description}}</p>
    <p>{{startMonth}}/{{event.startDate.getDate()}}/{{event.startDate.getFullYear()}} - {{endMonth}}/{{event.endDate.getDate()}}/{{event.endDate.getFullYear()}}</p>
    <p>{{event.location}}</p>
    <div
      v-for="(channel, index) in event.channels"
      v-bind:item="channel"
      v-bind:index="index"
      v-bind:key="channel._id"
    >
      <div class="row">
          <div class="col">
              {{channel.name}}
          </div>
          <div class="col">
              {{channel.link}}
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      event: ""
    };
  },
  async created() {
    await axios.get("api/schedule/all/full").then(res => {
      this.event = res.data[0];
      this.event.startDate = new Date(this.event.startDate);
      this.event.endDate = new Date(this.event.endDate);
      this.startMonth = new Intl.DateTimeFormat("en-US", {
        month: "short"
      }).format(this.event.startDate);
      this.endMonth = new Intl.DateTimeFormat("en-US", {
        month: "short"
      }).format(this.event.endDate);
    });
  }
};
</script>

<style scoped>
</style>