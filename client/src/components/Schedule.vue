<template>
  <div>
    <h1>{{event.name}}</h1>
    <p>{{event.description}}</p>
    <p>{{startMonth}}/{{event.startDate.getDate()}}/{{event.startDate.getFullYear()}} - {{endMonth}}/{{event.endDate.getDate()}}/{{event.endDate.getFullYear()}}</p>
    <p>{{event.location}}</p>
    <div class="btn-group" role="group" style="margin-bottom:10px">
        <div v-for="n in eventLengthDays"
            v-bind:key="n"
        >
        <button class="btn btn-dark" v-on:click="changeDay(n)">Day {{n}}</button>
        </div>
    </div>
    <div
      v-for="(channel, index) in event.channels"
      v-bind:item="channel"
      v-bind:index="index"
      v-bind:key="channel._id"
    >
      <div class="row" style="height:80px">
        <div class="col-3">
          {{channel.name}}
          <br />
          {{channel.link}}
        </div>
        <div
          v-for="(block, index2) in channel.blocks.filter(block => {
              var dayCheck = Math.ceil((new Date(block.startTime) - event.startDate)/(36e5 * 24));
              if(dayCheck == currentDay)
                return true;
                else return false;
          })"
          v-bind:item="block"
          v-bind:index="index2"
          v-bind:key="block._id"
        >
          <div class="block" v-bind:class="{'border1':index2%3==1,'border2':index2%3==2 }">
            {{block.name}}
            <br />
            {{`${Math.abs(new Date(block.endTime) - new Date(block.startTime))/36e5} hours`}}
          </div>
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
      event: "",
      currentDay: 1,
      eventLengthDays: 1
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

      this.eventLengthDays = Math.ceil((this.event.endDate - this.event.startDate)/(36e5 * 24)) + 1

    });
  },
  methods: {
    changeDay(newDay) {
      this.currentDay = newDay;
    }
  }
};
</script>

<style scoped>
.block {
  border: 2px solid #a0d2eb;
  background-color: #000000;
  padding: 4px;
  margin-right: 3px;
  border-radius: 5px;
}
.border1 {
  border-color: #8458b3;
}
.border2 {
  border-color: #ffff66;
}
</style>