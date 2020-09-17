<template>
  <div class="form-container">
    <button class="btn btn-dark myButton bg-danger" v-on:click="$emit('clear')">X</button>
    <form action>
      <div class="form-group">
        <label for="block-title">Block Title</label>
        <input
          type="text"
          v-model="tempBlock.name"
          class="form-control"
          id="block-title"
          placeholder="Enter block title"
        />
      </div>
      <div class="form-group">
        <label for="block-game">Game</label>
        <input
          type="text"
          v-model="tempBlock.game"
          class="form-control"
          id="block-game"
          placeholder="Enter game name"
        />
      </div>
    </form>
    <div class="row">
      <div class="col">
        <label style="display:block" for="block-date">Date</label>
        <vc-date-picker
          :min-date="start"
          :max-date="end"
          mode="single"
          color="purple"
          is-dark
          :input-props="{style:'width:auto'}"
          v-model="startDate"
          id="block-date"
        />
      </div>
      <div class="col">
        <label style="display:block" for="block-date">End Date</label>
        <vc-date-picker
          :min-date="start"
          :max-date="end"
          mode="single"
          color="purple"
          is-dark
          :input-props="{style:'width:auto'}"
          v-model="endDate"
          id="block-date"
        />
      </div>
    </div>
    <div class="row" style="margin-top:.5em">
      <div class="col">
        <label style="display:block" for="block-time-start">Start Time</label>
        <VueTimepicker
          v-model="startTime"
          format="hh:mm A"
          :minute-interval="15"
          id="block-time-start"
        />
      </div>
      <div class="col">
        <label style="display:block" for="block-time-end">End Time</label>
        <VueTimepicker
          v-model="endTime"
          format="hh:mm A"
          id="block-time-end"
          :minute-interval="15"
        />
      </div>
    </div>
    <br />
    <button class="btn btn-dark" style="margin:1em" v-on:click="update">{{actionLabel()}}</button>
    <button
      v-if="action=='Edit'"
      class="btn btn-danger"
      style="margin:1em"
      v-on:click="$emit('delete-block')"
    >{{`Delete Schedule Block`}}</button>
    <div
      v-if="incomplete"
      class="alert alert-danger"
      role="alert"
    >Some fields have been left incomplete</div>
    <div
      v-if="invalid"
      class="alert alert-danger"
      role="alert"
    >The start of the block must be before the end of the block.</div>
  </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
export default {
  name: "BlockEditor",
  props: ["action", "block", "start", "end", "timezoneOffset", "currentDay"],
  components: {
    VueTimepicker
  },
  data() {
    return {
      incomplete: false,
      invalid: false,
      startDate: "",
      endDate: "",
      startTime: {},
      endTime: {},
      tempBlock: {
        name: "",
        startTime: "2020-10-01T12:00:00.000Z",
        endTime: "2020-10-01T14:00:00.000Z",
        game: ""
      }
    };
  },
  created() {
    if (this.action == "Edit") {
      this.tempBlock = { ...this.block };
      this.startDate = new Date(
        this.block.startTime.getFullYear(),
        this.block.startTime.getMonth(),
        this.block.startTime.getDate()
      );
      this.endDate = new Date(
        this.block.endTime.getFullYear(),
        this.block.endTime.getMonth(),
        this.block.endTime.getDate()
      );
      var timezoneAdjustedStart = new Date(
        this.block.startTime.getTime() +
          this.block.startTime.getTimezoneOffset() * 60 * 1000 -
          this.timezoneOffset * 60 * 1000
      );
      var timezoneAdjustedEnd = new Date(
        this.block.endTime.getTime() +
          this.block.endTime.getTimezoneOffset() * 60 * 1000 -
          this.timezoneOffset * 60 * 1000
      );
      this.dateTimeToTimeObj(timezoneAdjustedStart, this.startTime);
      this.dateTimeToTimeObj(timezoneAdjustedEnd, this.endTime);
    }
    if (this.action == "Create") {
      this.endDate = this.addDays(
        new Date(
          this.start.getFullYear(),
          this.start.getMonth(),
          this.start.getDate()
        ),
        this.currentDay - 1
      );
      this.startDate = this.addDays(
        new Date(
          this.start.getFullYear(),
          this.start.getMonth(),
          this.start.getDate()
        ),
        this.currentDay - 1
      );
    }
  },
  methods: {
    actionLabel() {
      if (this.action == "Create") return "Create";
      else return "Apply changes";
    },
    update() {
      if (
        this.startDate &&
        this.endDate &&
        this.startTime &&
        this.endTime &&
        this.tempBlock.name &&
        this.tempBlock.game
      ) {
        var tempStart = new Date(this.startDate);
        var tempEnd = new Date(this.endDate);
        tempStart.setHours(this.getMilHour(this.startTime), this.startTime.mm); //
        tempEnd.setHours(this.getMilHour(this.endTime), this.endTime.mm); //

        tempStart.setTime(
          tempStart.getTime() -
            tempStart.getTimezoneOffset() * 60 * 1000 +
            this.timezoneOffset * 60 * 1000
        );
        tempEnd.setTime(
          tempEnd.getTime() -
            tempEnd.getTimezoneOffset() * 60 * 1000 +
            this.timezoneOffset * 60 * 1000
        );

        if (tempStart >= tempEnd) {
          this.incomplete = false;
          this.invalid = true;
        } else {
          this.tempBlock.startTime = tempStart;
          this.tempBlock.endTime = tempEnd;
          this.$emit("update", this.tempBlock);
        }
      } else {
        this.invalid = false;
        this.incomplete = true;
      }
    },
    addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
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
    dateTimeToTimeObj(date, timeObj) {
      if (date.getHours() > 12) {
        timeObj.hh = (date.getHours() - 12).toString().padStart(2, "0");
        timeObj.A = "PM";
      } else if (date.getHours() == 12) {
        timeObj.hh = "12";
        timeObj.A = "PM";
      } else if (date.getHours() == 0) {
        timeObj.hh = "12";
        timeObj.A = "AM";
      } else if (date.getHours() < 12) {
        timeObj.hh = date
          .getHours()
          .toString()
          .padStart(2, "0");
        timeObj.A = "AM";
      }
      timeObj.mm =
        "" +
        date
          .getMinutes()
          .toString()
          .padStart(2, "0");
    }
  }
};
</script>

<style scoped>
.myButton {
  position: absolute;
  top: .2em;
  right: 1em;
  height: 1.7em;
  width: 1.7em;
  padding: .1em;
  border-radius: 20%;
  opacity: 0.7;
  overflow: hidden;
}
</style>