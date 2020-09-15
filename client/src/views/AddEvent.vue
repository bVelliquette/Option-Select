<template>
  <div>
    <h1>Add Event</h1>
    <button class="btn btn-success" v-on:click="submitEvent">Submit Event to DB</button>
    <div class="container">
      <div class="row">
        <div class="form-container col-12 col-lg-6">
          <form action>
            <div class="form-group">
              <label for="event-name">Event Name</label>
              <input
                type="text"
                v-model="event.name"
                class="form-control"
                id="event-name"
                placeholder="Enter event name"
              />
            </div>
            <div class="form-group">
              <label for="event-description">Description</label>
              <textarea
                class="form-control"
                v-model="event.description"
                id="event-description"
                rows="3"
              />
            </div>
            <div class="form-group">
              <label for="event-location">Location</label>
              <input
                type="text"
                v-model="event.location"
                class="form-control"
                id="event-location"
                placeholder="Enter location"
              />
            </div>
          </form>
          <div class="row">
            <div class="col">
              <label style="display:block" for="event-date">Dates</label>
              <vc-date-picker
                @input="newDates"
                mode="range"
                color="purple"
                is-dark
                :input-props="{style:'width:auto'}"
                v-model="range"
                id="event-date"
              />
            </div>
            <div class="col" style="padding: 0 0">
              <label style="display:block" for="event-timezone">Timezone</label>
              <div class="dropdown">
                <button
                  class="btn btn-dark dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >{{selectedTimezone.name}}</button>
                <div
                  class="dropdown-menu scrollable-menu bg-dark"
                  aria-labelledby="dropdownMenuButton"
                >
                  <template
                    v-for="tz in timezones"
                    class="btn-group"
                    role="group"
                    style="margin-bottom:10px;"
                  >
                    <button
                      class="dropdown-item"
                      style="color:#EEE"
                      type="button"
                      v-on:click="selectedTimezone = tz;cuttoffUpdate()"
                      v-bind:key="tz.name"
                    >{{tz.name}}</button>
                  </template>
                </div>
              </div>
            </div>
            <div class="col">
              <label style="display:block" for="block-time-end">
                Cutoff Time
                <span
                  class="badge badge-primary"
                  title="Determines at what time one day ends and the next one begins"
                >?</span>
              </label>
              <VueTimepicker
                v-model="cuttoffTime"
                format="hh A"
                id="cuttoff-time"
                :minute-interval="15"
                @input="cuttoffUpdate"
              />
            </div>
          </div>
        </div>
        <div v-if="editingChannel" class="col-12 col-lg-6 editor-container">
          <ChannelEditor
            v-bind:action="action"
            v-bind:channel="event.channels[targetChannelIndex]"
            v-on:update="updateChannel"
          />
          <div style="margin-top:2em; margin-bottom:1em">
            <button
              v-if="targetChannelIndex != null"
              style="margin-right:1em;"
              class="btn btn-success"
              v-on:click="newBlock"
            >New Schedule Block</button>
            <button
              v-if="targetChannelIndex != null && event.channels.length > 1"
              class="btn btn-danger"
              v-on:click="deleteChannel"
            >Delete Channel</button>
            <button
              v-if="targetChannelIndex != null && event.channels.length == 1"
              class="btn btn-danger"
              disabled
            >Cannot Delete Only Channel</button>
          </div>
        </div>
        <div v-if="editingBlock" class="col-12 col-lg-6 editor-container">
          <BlockEditor
            v-bind:action="action"
            v-bind:start="event.startDate"
            v-bind:end="event.endDate"
            v-bind:timezoneOffset="selectedTimezone.offset"
            v-bind:block="event.channels[targetChannelIndex].blocks[targetBlockIndex]"
            v-on:update="updateBlock"
            v-on:delete-block="deleteBlock"
            v-bind:currentDay="currentDay"
          />
        </div>
      </div>
    </div>
    <ScheduleMaker
      style="padding-top: 2em; position:relative"
      id="schedule"
      :key="scheduleKey"
      v-on:edit-block="editBlock"
      v-on:new-channel="newChannel"
      v-on:edit-channel="editChannel"
      v-on:change-day="changeDay"
      v-bind:event="event"
      v-bind:currentDay="currentDay"
    />
  </div>
</template>

<script>
import ScheduleMaker from "../components/ScheduleMaker";
import ChannelEditor from "../components/ChannelEditor";
import BlockEditor from "../components/BlockEditor";
import timezones from "../assets/timezones";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import axios from "axios";

export default {
  name: "AddEvent",
  components: {
    ScheduleMaker,
    ChannelEditor,
    BlockEditor,
    VueTimepicker
  },
  data() {
    return {
      timezones,
      selectedTimezone: { name: "UTC", offset: 0 },
      scheduleKey: 0,
      range: { start: "", end: "" },
      editingChannel: false,
      editingBlock: false,
      targetChannelIndex: null,
      targetBlockIndex: null,
      cuttoffTime: {
        hh: "12",
        A: "AM"
      },
      currentDay: 1,
      action: "Create",
      event: {
        name: "",
        description: "",
        location: "",
        startDate: "2020-10-01T04:00:00.000Z",
        endDate: "2020-10-02T04:00:00.000Z",
        channels: [
          {
            blocks: [],
            name: "Channel 1",
            link: "",
            website: "Twitch"
          }
        ]
      }
    };
  },
  created() {
    this.event.startDate = new Date();
    this.event.endDate = new Date();
    this.range.start = new Date();
    this.range.end = new Date();
  },
  methods: {
    submitEvent() {
      var tempEvent = {...this.event};
      tempEvent.channels.forEach(channel => {
        channel.blocks.forEach(block => {
          if (block.endTime instanceof Date)
            block.endTime = block.endTime.toISOString();
          if (block.startTime instanceof Date)
            block.startTime = block.startTime.toISOString();
        });
      });
      if (tempEvent.startDate instanceof Date)
        tempEvent.startDate = tempEvent.startDate.toISOString();
      if (tempEvent.endDate instanceof Date)
        tempEvent.endDate = tempEvent.endDate.toISOString();
        console.log(tempEvent);
      axios
        .post("/api/schedule/add", this.event)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMilHour(timeObj) {
      if (timeObj.A == "AM") {
        if (timeObj.hh == "12") return 0;
        else return parseInt(timeObj.hh);
      } else {
        if (timeObj.hh == "12") return 12;
        else return parseInt(timeObj.hh) + 12;
      }
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
    cuttoffUpdate() {
      this.event.startDate.setHours(this.getMilHour(this.cuttoffTime));
      this.event.endDate.setHours(this.getMilHour(this.cuttoffTime));
      var sDatetime = new Date(
        this.event.startDate.getTime() -
          this.event.startDate.getTimezoneOffset() * 60 * 1000 +
          this.selectedTimezone.offset * 60 * 1000
      );
      var eDatetime = new Date(
        this.event.endDate.getTime() -
          this.event.endDate.getTimezoneOffset() * 60 * 1000 +
          this.selectedTimezone.offset * 60 * 1000
      );
      this.event.startDate = sDatetime;
      this.event.endDate = eDatetime;
    },
    newDates() {
      this.event.startDate = this.range.start;
      this.event.endDate = this.range.end;
      this.scheduleKey += 1;
      this.cuttoffUpdate();
    },
    async editBlock(i, j) {
      this.editingChannel = false;
      this.editingBlock = false;
      this.targetBlockIndex = null;
      this.targetChannelIndex = null;
      await setTimeout(null, 100);
      this.targetBlockIndex = i;
      this.targetChannelIndex = j;
      this.action = "Edit";
      this.editingBlock = true;
    },
    async newBlock() {
      this.editingChannel = false;
      this.editingBlock = false;
      this.targetBlockIndex = null;
      await setTimeout(null, 100);
      this.action = "Create";
      this.editingBlock = true;
    },
    deleteChannel() {
      this.event.channels.splice(this.targetChannelIndex, 1);
      this.editingChannel = false;
    },
    deleteBlock() {
      this.event.channels[this.targetChannelIndex].blocks.splice(
        this.targetBlockIndex,
        1
      );
      this.editingBlock = false;
    },
    updateBlock(block) {
      if (this.targetBlockIndex != null) {
        this.event.channels[this.targetChannelIndex].blocks.splice(
          this.targetBlockIndex,
          1,
          block
        );
      } else {
        this.event.channels[this.targetChannelIndex].blocks.push(block);
      }
      this.editingBlock = false;
    },
    updateChannel(channel) {
      if (this.targetChannelIndex != null) {
        this.event.channels.splice(this.targetChannelIndex, 1, channel);
      } else {
        this.event.channels.push(channel);
      }
      this.editingChannel = false;
    },
    async newChannel() {
      this.editingChannel = false;
      this.editingBlock = false;
      this.targetChannelIndex = null;
      await setTimeout(null, 100);
      this.action = "Create";
      this.editingChannel = true;
    },
    async editChannel(i) {
      this.editingChannel = false;
      this.editingBlock = false;
      this.targetChannelIndex = i;
      await setTimeout(null, 100);
      this.action = "Edit";
      this.editingChannel = true;
    }
  }
};
</script>

<style scoped>
.form-container {
  text-align: left;
}
.editor-container {
  background-color: #111;
  border: 3px #8458b3 solid;
  border-radius: 20px;
  box-shadow: 16px 13px 9px 0px #000000;
}
</style>