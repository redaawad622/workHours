<template>
  <div class="home">
    <v-list tow-line>
      <template v-for="(item, key) in groupList">
        <work-item :key="'list' + key" :itemKey="key" :item="item"></work-item>
        <v-divider :key="'divi' + key"></v-divider>
      </template>
    </v-list>
    <div>Total:{{ formatDuration(totalTime) }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import workItem from "@/components/workItem.vue";

export default {
  name: "WorkList",
  data() {
    return {
      list: []
    };
  },
  computed: {
    groupList() {
      return this.list.reduce(function(r, a) {
        r[a.date] = r[a.date] || [];
        r[a.date].push(a);
        return r;
      }, Object.create(null));
    },
    totalTime() {
      return this.sumDurations(
        this.list.map(val => {
          return val.time;
        })
      );
    }
  },
  methods: {
    sumDurations(durations) {
      return durations.reduce((sum, string) => {
        let [hours, mins, secs] = string.split(":");
        return (
          parseInt(sum) +
          parseInt(hours) * 60 * 60 +
          parseInt(mins) * 60 +
          parseInt(secs)
        );
      }, 0);
    },

    formatDuration(duration) {
      function pad(number) {
        return `${number}`.slice(-2);
      }

      let hours = (duration / 3600) | 0;
      let minutes = ((duration % 3600) / 60) | 0;
      let seconds = duration % 60;
      let minsSecs = `${pad(minutes)}:${pad(seconds)}`;

      return hours > 0 ? `${hours}:${minsSecs}` : minsSecs;
    }
  },
  created() {
    this.$getItem("list").then(val => {
      this.list = val;
    });
  },
  components: {
    workItem
  }
};
</script>
