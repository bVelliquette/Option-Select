<template>
  <div>
    <h1>New Component Testing Ground</h1>
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
          <label style="display:block" for="event-date">Dates</label>
          <vc-date-picker
            v-on:input="newDates"
            mode="range"
            color="purple"
            is-dark
            :input-props="{style:'width:auto'}"
            v-model="range"
            id="event-date"
          />
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
            v-bind:block="event.channels[targetChannelIndex].blocks[targetBlockIndex]"
            v-on:update="updateBlock"
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
      v-bind:event="event"
    />
  </div>
</template>

<script>
import ScheduleMaker from "../components/ScheduleMaker";
import ChannelEditor from "../components/ChannelEditor";
import BlockEditor from "../components/BlockEditor";

export default {
  name: "ScheduleMakerView",
  components: {
    ScheduleMaker,
    ChannelEditor,
    BlockEditor
  },
  data() {
    return {
      scheduleKey: 0,
      range: null,
      editingChannel: false,
      editingBlock: false,
      targetChannelIndex: null,
      targetBlockIndex: null,
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
            website: ""
          }
        ]
      }
    };
  },
  created() {
    this.event.startDate = new Date(this.event.startDate);
    this.event.endDate = new Date(this.event.endDate);
  },
  methods: {
    newDates() {
      this.event.startDate = this.range.start;
      this.event.endDate = this.range.end;
      this.scheduleKey += 1;
    },
    async editBlock(i, j) {
      this.editingChannel = false;
      this.editingBlock = false;
      this.targetBlockIndex = i;
      this.targetChannelIndex = j;
      await setTimeout(null, 100);
      this.action = "Edit";
      this.editingBlock = true;
    },
    async newBlock() {
      this.editingChannel = false;
      this.editingBlock = false;
      await setTimeout(null, 100);
      this.action = "Create";
      this.editingBlock = true;
    },
    deleteChannel() {
      this.event.channels.splice(this.targetChannelIndex, 1);
      this.editingChannel = false;
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