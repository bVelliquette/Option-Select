<template>
  <div>
    <div class="btn-group" role="group" style="margin-bottom:10px">
      <div
        v-for="n in eventLengthDays"
        v-bind:key="`day${n}`"
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
        id="scheduleContent"
        :style="`grid-row: 1/${event.channels.length+3};grid-template-columns: repeat(${timelineSize}, minmax(20px,auto))`"
      >
        <div
          class="spacerBlock"
          v-for="i in event.channels.length"
          :key="`space${i}`"
          :style="`grid-row:${i+1}/${i+2}; grid-column:1/-1`"
        ></div>
        <template v-for="n in timelineSize">
          <div v-if="n%4==1" :key="`timeLabel${n}`" :style="timeLabelStyle(n)">{{ returnTime(n) }}</div>
        </template>
        <div v-for="n in timelineSize" :key="`timelineGrid${n}`" :style="timelineStyle(n)"></div>
        <div :style="`grid-row:1; grid-column:1/-1; border-bottom: solid thick #666; `" />
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
            v-on:click="$emit('editBlock',block)"
            :ref="'block'"
            class="timeBlock"
          >
            <p>{{block.name}}</p>
            <p>{{block.game.name}}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScheduleMaker",
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
  mounted() {
    if (this.$refs.block) {
      var lowest = this.$refs.block[0].offsetLeft;
      this.$refs.block.forEach(e => {
        lowest = e.offsetLeft < lowest ? e.offsetLeft : lowest;
      });
      var elmnt = document.getElementById("scheduleContent");
      elmnt.scrollTo({ left: lowest - 150, behavior: "smooth" });
    }
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
        "grid-column": `${start}/${end}`
      };
    },
    async changeDay(newDay) {
      this.currentDay = newDay;
      await new Promise(r => setTimeout(r, 100));
      if (this.$refs.block) {
        var lowest = this.$refs.block[0].offsetLeft;
        this.$refs.block.forEach(e => {
          lowest = e.offsetLeft < lowest ? e.offsetLeft : lowest;
        });
        var elmnt = document.getElementById("scheduleContent");
        elmnt.scrollTo({ left: lowest - 150, behavior: "smooth" });
      }
    },
    timeLabelStyle(n) {
      var style = {
        "grid-row": "1",
        "grid-column": `${n}`,
        "white-space": "nowrap",
        "border-left": "4px dashed #383838",
        "padding-left": ".25em"
      };
      return style;
    },
    timelineStyle(n) {
      var style = {
        "grid-row": `2/${this.event.channels.length + 2}`,
        "grid-column": `${n}`,
        "border-left": "1px dotted #282828"
      };
      if (n % 4 == 1) style["border-left"] = "4px dashed #383838";
      else if (n % 4 == 3) {
        style["border-left"] = "2px dashed  #383838";
      }
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
  background-color: #080808;
  grid-template-columns: 1fr 10fr;
  grid-template-rows: 40px;
  grid-auto-rows: auto;
  border: 3px #8458b3 solid;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 16px 13px 9px 0px #000000;
}

.channelLabel {
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
.channelLabel:active {
  box-shadow: inset 3px 3px 3px 0px rgba(0, 0, 0, 0.75);
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
.spacerBlock:nth-child(even) {
  background: #222;
}
.timeBlock {
  background-color: #8458b3;
  border-radius: 10px;
  height: 80px;
  margin: 0px 5px;
  align-self: center;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.75);
  color: black;
  font-size: 100%;
  overflow: hidden;
}
.timeBlock:nth-child(3n + 1) {
  background-color: #a0d2eb;
}
.timeBlock:nth-child(3n + 2) {
  background-color: #e5eaf5;
}
.timeBlock:hover {
  background-color: #8d65b8;
  height: 85px;
  margin: 0px 3px;
  cursor: pointer;
}
.timeBlock:nth-child(3n + 1):hover {
  background-color: #bcdff1;
}
.timeBlock:nth-child(3n + 2):hover {
  background-color: #fff;
}

.timeBlock:active {
  box-shadow: inset 3px 3px 3px 0px rgba(0, 0, 0, 0.75);
}
</style>