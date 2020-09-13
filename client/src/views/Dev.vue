<template>
  <div>
    <h1>New Component Testing Ground</h1>
    <ScheduleMaker id="schedule" v-on:editBlock="editBlock" v-bind:event="event" />
  </div>
</template>

<script>
import ScheduleMaker from "../components/ScheduleMaker";

export default {
  name: "ScheduleMakerView",
  components: {
    ScheduleMaker
  },
  data() {
    return {
      event: {
        _id: "5f5a242678519e1928bda957",
        name: "Test Event 2020",
        description: "Test Description for Test Event 2020",
        location: "Tampa, FL",
        startDate: "2020-10-01T04:00:00.000Z",
        endDate: "2020-10-02T04:00:00.000Z",
        channels: [
          {
            blocks: [
              {
                _id: "5f5a242678519e1928bda959",
                name: "MK Pool C",
                startTime: "2020-10-01T12:00:00.000Z",
                endTime: "2020-10-01T14:00:00.000Z",
                game: {
                  _id: "5f56e053ffa5251a4ce3a556",
                  name: "Moron Kombat",
                  description: "d1 + Throw",
                  developer: "Ed Boon + Co.",
                  publisher: "Boon's Brows",
                  __v: 0
                }
              },
              {
                _id: "5f5a242678519e1928bda95a",
                name: "MK Pool D",
                startTime: "2020-10-01T14:30:00.000Z",
                endTime: "2020-10-01T16:30:00.000Z",
                game: {
                  _id: "5f56e053ffa5251a4ce3a556",
                  name: "Moron Kombat",
                  description: "d1 + Throw",
                  developer: "Ed Boon + Co.",
                  publisher: "Boon's Brows",
                  __v: 0
                }
              },
              {
                _id: "5f5a242678519e1928bda95b",
                name: "KI Top 24",
                startTime: "2020-10-01T16:45:00.000Z",
                endTime: "2020-10-01T18:00:00.000Z",
                game: {
                  _id: "5f585504a5b3992b8c150943",
                  name: "Killer Bitchstink",
                  description: "Rock Paper Scissors",
                  developer: "GGPO",
                  publisher: "Microsoft",
                  __v: 0
                }
              },
              {
                _id: "5f5a242678519e1928bda95c",
                name: "KI Top 16",
                startTime: "2020-10-01T18:15:00.000Z",
                endTime: "2020-10-01T19:30:00.000Z",
                game: {
                  _id: "5f585504a5b3992b8c150943",
                  name: "Killer Bitchstink",
                  description: "Rock Paper Scissors",
                  developer: "GGPO",
                  publisher: "Microsoft",
                  __v: 0
                }
              },
              {
                _id: "5f5a242678519e1928bda95d",
                name: "KI Top 8",
                startTime: "2020-10-02T12:00:00.000Z",
                endTime: "2020-10-02T14:00:00.000Z",
                game: {
                  _id: "5f585504a5b3992b8c150943",
                  name: "Killer Bitchstink",
                  description: "Rock Paper Scissors",
                  developer: "GGPO",
                  publisher: "Microsoft",
                  __v: 0
                }
              },
              {
                _id: "5f5a242678519e1928bda95e",
                name: "Tekken Top 8",
                startTime: "2020-10-02T19:30:00.000Z",
                endTime: "2020-10-02T21:30:00.000Z",
                game: {
                  _id: "5f585666a5b3992b8c150945",
                  name: "Tekken",
                  description: "Leroy Smith",
                  developer: "Shit Netcode",
                  publisher: "Namcops",
                  __v: 0
                }
              }
            ],
            _id: "5f5a242678519e1928bda958",
            name: "TeamSp00ky",
            link: "TeamSp00ky",
            website: "Twitch"
          },
          {
            blocks: [
              {
                _id: "5f5a242678519e1928bda960",
                name: "SFV Pool A",
                startTime: "2020-10-01T12:00:00.000Z",
                endTime: "2020-10-01T14:00:00.000Z",
                game: {
                  _id: "5f5855eba5b3992b8c150944",
                  name: "Clay Fighter V",
                  description: "Shit Game",
                  developer: "Shit Netcode",
                  publisher: "Crapcom",
                  __v: 0
                }
              },
              {
                _id: "5f5a242678519e1928bda961",
                name: "SFV Pool B",
                startTime: "2020-10-01T14:00:00.000Z",
                endTime: "2020-10-01T16:00:00.000Z",
                game: {
                  _id: "5f5855eba5b3992b8c150944",
                  name: "Clay Fighter V",
                  description: "Shit Game",
                  developer: "Shit Netcode",
                  publisher: "Crapcom",
                  __v: 0
                }
              },
              {
                _id: "5f5a242678519e1928bda962",
                name: "SFV Top 32",
                startTime: "2020-10-01T16:00:00.000Z",
                endTime: "2020-10-01T18:00:00.000Z",
                game: {
                  _id: "5f5855eba5b3992b8c150944",
                  name: "Clay Fighter V",
                  description: "Shit Game",
                  developer: "Shit Netcode",
                  publisher: "Crapcom",
                  __v: 0
                }
              },
              {
                _id: "5f5a242678519e1928bda963",
                name: "SFV Top 16",
                startTime: "2020-10-01T18:00:00.000Z",
                endTime: "2020-10-01T19:30:00.000Z",
                game: {
                  _id: "5f5855eba5b3992b8c150944",
                  name: "Clay Fighter V",
                  description: "Shit Game",
                  developer: "Shit Netcode",
                  publisher: "Crapcom",
                  __v: 0
                }
              },
              {
                _id: "5f5a242678519e1928bda964",
                name: "SFV Top 8",
                startTime: "2020-10-02T17:00:00.000Z",
                endTime: "2020-10-02T19:00:00.000Z",
                game: {
                  _id: "5f5855eba5b3992b8c150944",
                  name: "Clay Fighter V",
                  description: "Shit Game",
                  developer: "Shit Netcode",
                  publisher: "Crapcom",
                  __v: 0
                }
              }
            ],
            _id: "5f5a242678519e1928bda95f",
            name: "Capcom",
            link: "CapcomFighters",
            website: "Twitch"
          },
          {
            blocks: [
              {
                _id: "5f5a242678519e1928bda966",
                name: "Tekken Pool A",
                startTime: "2020-10-01T12:00:00.000Z",
                endTime: "2020-10-01T14:00:00.000Z",
                game: {
                  _id: "5f585666a5b3992b8c150945",
                  name: "Tekken",
                  description: "Leroy Smith",
                  developer: "Shit Netcode",
                  publisher: "Namcops",
                  __v: 0
                }
              },
              {
                _id: "5f5a242678519e1928bda967",
                name: "Tekken Pool B",
                startTime: "2020-10-01T14:00:00.000Z",
                endTime: "2020-10-01T16:00:00.000Z",
                game: {
                  _id: "5f585666a5b3992b8c150945",
                  name: "Tekken",
                  description: "Leroy Smith",
                  developer: "Shit Netcode",
                  publisher: "Namcops",
                  __v: 0
                }
              },
              {
                _id: "5f5a242678519e1928bda968",
                name: "Tekken Top 24",
                startTime: "2020-10-01T16:00:00.000Z",
                endTime: "2020-10-01T17:30:00.000Z",
                game: {
                  _id: "5f585666a5b3992b8c150945",
                  name: "Tekken",
                  description: "Leroy Smith",
                  developer: "Shit Netcode",
                  publisher: "Namcops",
                  __v: 0
                }
              },
              {
                _id: "5f5a242678519e1928bda969",
                name: "Tekken Top 16",
                startTime: "2020-10-01T17:30:00.000Z",
                endTime: "2020-10-01T19:30:00.000Z",
                game: {
                  _id: "5f585666a5b3992b8c150945",
                  name: "Tekken",
                  description: "Leroy Smith",
                  developer: "Shit Netcode",
                  publisher: "Namcops",
                  __v: 0
                }
              }
            ],
            _id: "5f5a242678519e1928bda965",
            name: "Level Up Live",
            link: "leveluplive",
            website: "Twitch"
          },
          {
            blocks: [
              {
                _id: "5f5a242678519e1928bda96b",
                name: "MK Pool A",
                startTime: "2020-10-01T12:00:00.000Z",
                endTime: "2020-10-01T14:00:00.000Z",
                game: {
                  _id: "5f56e053ffa5251a4ce3a556",
                  name: "Moron Kombat",
                  description: "d1 + Throw",
                  developer: "Ed Boon + Co.",
                  publisher: "Boon's Brows",
                  __v: 0
                }
              },
              {
                _id: "5f5a242678519e1928bda96c",
                name: "MK Pool B",
                startTime: "2020-10-01T14:00:00.000Z",
                endTime: "2020-10-01T16:00:00.000Z",
                game: {
                  _id: "5f56e053ffa5251a4ce3a556",
                  name: "Moron Kombat",
                  description: "d1 + Throw",
                  developer: "Ed Boon + Co.",
                  publisher: "Boon's Brows",
                  __v: 0
                }
              },
              {
                _id: "5f5a242678519e1928bda96d",
                name: "MK Top 32",
                startTime: "2020-10-01T17:00:00.000Z",
                endTime: "2020-10-01T19:00:00.000Z",
                game: {
                  _id: "5f56e053ffa5251a4ce3a556",
                  name: "Moron Kombat",
                  description: "d1 + Throw",
                  developer: "Ed Boon + Co.",
                  publisher: "Boon's Brows",
                  __v: 0
                }
              },
              {
                _id: "5f5a242678519e1928bda96e",
                name: "MK Top 16",
                startTime: "2020-10-01T19:30:00.000Z",
                endTime: "2020-10-01T21:30:00.000Z",
                game: {
                  _id: "5f56e053ffa5251a4ce3a556",
                  name: "Moron Kombat",
                  description: "d1 + Throw",
                  developer: "Ed Boon + Co.",
                  publisher: "Boon's Brows",
                  __v: 0
                }
              },
              {
                _id: "5f5a242678519e1928bda96f",
                name: "MK Top 8",
                startTime: "2020-10-02T14:30:00.000Z",
                endTime: "2020-10-02T16:30:00.000Z",
                game: {
                  _id: "5f56e053ffa5251a4ce3a556",
                  name: "Moron Kombat",
                  description: "d1 + Throw",
                  developer: "Ed Boon + Co.",
                  publisher: "Boon's Brows",
                  __v: 0
                }
              }
            ],
            _id: "5f5a242678519e1928bda96a",
            name: "NetherRealm",
            link: "NetherRealm",
            website: "Twitch"
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
    editBlock(block){
      block.name = "Edited";
    }
  },
};
</script>

<style scoped>
</style>