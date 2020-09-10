<template>
  <div>
    <div class="btn-group" role="group" style="margin-bottom:10px">
      <div
        v-for="n in eventLengthDays"
        v-bind:key="n"
        class="btn-group"
        role="group"
        style="margin-bottom:10px"
      >
        <button class="btn btn-dark" v-on:click="changeDay(n)">Day {{n}}</button>
      </div>
    </div>
    <div class="mainGridContainer">
      <div style="grid-row:1;grid-column:1/3;border:none;"></div>
      <div
        class="channelLabel"
        v-for="(channel) in event.channels"
        :key="channel._id"
        v-on:click="$emit('open',channel)"
      >{{ `${channel.name}`}}</div>
      <div
        class="contentWindow"
        :style="`grid-row: 1/${event.channels.length+3};grid-template-columns: repeat(${timelineSize}, 40px)`"
      >
      <div :style="`grid-row:1; grid-column:1/-1; background-color:#000; border-bottom: solid thick white`"/>
        <div
          class="spacerBlock"
          v-for="i in event.channels.length"
          :key="i"
          :style="`grid-row:${i+1}/${i+2}; grid-column:1/-1`"
        ></div>
        <div v-for="n in timelineSize" :key="n" :style="timelineStyle(n)">{{ returnTime(n) }}</div>
        <template v-for="(channel, i) in event.channels">
          <div
            v-for="(block) in channel.blocks.filter(block => {
                let start = new Date(block.startTime);
              if(start > addDays(startDate, currentDay-1) && start < addDays(startDate, currentDay) )
                return true;
                else return false;
          })"
            :key="block._id"
            :style="blockParams(i,block)"
            v-on:click="$emit('open',channel)"
            class="timeBlock"
          >{{block.name}}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Schedule",
  props: ["event"],
  data() {
    return {
      timelineSize: 96,
      currentDay: 1,
      startDate: this.event.startDate,
      eventLengthDays: ""
    };
  },
  created() {
    this.eventLengthDays =
      Math.ceil((this.event.endDate - this.event.startDate) / (36e5 * 24)) + 1;
  },
  methods: {
    blockParams(channelIndex, block) {
      let startTime = new Date(block.startTime);
      let endTime = new Date(block.endTime);
      let start =
        startTime.getUTCHours() * 4 +
        Math.floor(startTime.getUTCMinutes() / 15) +
        1 -
        40; // +1 because CSS Grids start at 1 and -40 to shift left 10 hours;
      let end =
        endTime.getUTCHours() * 4 +
        Math.floor(endTime.getUTCMinutes() / 15) +
        1 -
        40; // +1 because CSS Grids start at 1 and -40 to shift left 10 hours;

      //Shifting left 10 hours allows the window to begin at 6AM EDT

      return {
        "grid-row": `${channelIndex + 2}`,
        "grid-column": `${start}/${end}`,
        margin: "2px"
      };
    },
    changeDay(newDay) {
      this.currentDay = newDay;
    },
    timelineStyle(n) {
      var style = {
        "grid-row": `1/${this.event.channels.length + 2}`,
        "grid-column": `${n}`,
        "border-right": "thin dashed grey",
        "white-space": "nowrap"
      };
      if (n % 4 == 0) style["border-right"] = "thick dashed grey";
      return style;
    },
    returnTime(n) {
      if (n % 4 != 1) return;
      n += 10 * 4; //Shift the time labels so that the Window starts at 6AM EDT
      let time = this.addDays(this.startDate, this.currentDay - 1);
      time.setUTCHours(Math.floor(n / 4));
      let timeString = "";
      if (time.getHours() % 12 == 0) timeString = "12:00";
      else timeString = `${time.getHours() % 12}:00`;

      if (time.getHours() < 12) timeString += " AM";
      else timeString += " PM";

      return timeString;
    },
    addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
  }
};
</script>

<style scoped>
.mainGridContainer {
  margin: 1em;
  display: grid;
  grid-template-columns: 1fr 10fr;
  grid-template-rows: 40px;
  grid-auto-rows: auto;
  border: solid white thin;
  border-radius:5px;
}

.channelLabel {
  border: blueviolet thin solid;
  border-radius: 5px;
  padding: 0.5em;
  grid-column: 1;
  text-align: left;
  height: 100px;
  margin: 2px 0px 2px 2px;
  background-color: #222;
}
.channelLabel:hover {
  background-color: #282828;
  cursor: pointer;
}
.channelLabel:nth-child(odd) {
  background-color: #111;
}
.channelLabel:nth-child(odd):hover {
  background: #181818;
  cursor: pointer;
}
.contentWindow {
  grid-column: 2;
  border-radius: 5px !important;
  overflow-x: auto;
  overflow-y: hidden;
  grid-template-rows: 40px;
  grid-auto-rows: auto;
  display: grid;
}
.spacerBlock {
  height: 104px;
  background-color: #111;
}
.spacerBlock:nth-child(odd){
  background: #222;
}
.timeBlock {
  background-color: #8458b3;
  font-size: 16pt;
  border-radius: 10px;
  height: 100px;
  color: black;
}
.timeBlock:nth-child(3n + 1) {
  background-color: #a0d2eb;
  color: black;
}
.timeBlock:nth-child(3n + 2) {
  background-color: #e5eaf5;
  color: black;
}
.timeBlock:hover {
  background-color: #8d65b8;
  font-size: 16pt;
  border-radius: 10px;
  height: 100px;
  color: black;
  cursor: pointer;
}
.timeBlock:nth-child(3n + 1):hover {
  background-color: #bcdff1;
  color: black;
  cursor: pointer;
}
.timeBlock:nth-child(3n + 2):hover {
  background-color: #ffffff;
  color: black;
  cursor: pointer;
}
</style>