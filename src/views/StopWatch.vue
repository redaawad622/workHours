<template>
  <v-card
    id="clock"
    class="d-flex flex-column align-center justify-center"
    :class="{ 'pa-5': !$vuetify.breakpoint.xs }"
    flat
  >
    <div
      :class="{
        'display-4': $vuetify.breakpoint.width > 600,
        'display-1': $vuetify.breakpoint.width < 600
      }"
    >
      {{ time }}
    </div>
    <div>
      <v-btn
        text
        @click="start"
        :x-large="!$vuetify.breakpoint.xs"
        color="primary"
        >Start</v-btn
      >
      <v-btn
        text
        @click="stop"
        :x-large="!$vuetify.breakpoint.xs"
        color="primary"
        >Stop</v-btn
      >
      <v-btn
        text
        @click="reset"
        :x-large="!$vuetify.breakpoint.xs"
        color="primary"
        >Reset</v-btn
      >
      <v-btn
        text
        @click="save"
        :x-large="!$vuetify.breakpoint.xs"
        color="primary"
        >Save</v-btn
      >
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      time: "00:00:00.000",
      timeBegan: null,
      timeStopped: null,
      stoppedDuration: 0,
      started: null,
      started2: null,
      running: false
    };
  },
  mounted() {
    if (this.$keyInStorage("oldTime")) {
      this.$getItem("oldTime").then(this.mapData);
    }
  },
  methods: {
    save() {
      let item = { time: this.time, date: new Date().toDateString() };
      this.$getItem("list").then(items => {
        let oldList = items || [];
        oldList.unshift(item);
        this.$setItem("list", oldList);
        this.reset();
      });
    },
    start() {
      if (this.running) return;

      if (this.timeBegan === null) {
        this.reset();
        this.timeBegan = new Date();
      }

      if (this.timeStopped !== null) {
        this.stoppedDuration += new Date() - this.timeStopped;
      }
      this.started = setInterval(this.clockRunning, 10);
      this.started2 = setInterval(this.saveOldTime, 60000);
      this.running = true;
    },
    mapData(vals) {
      this.time = vals.time;
      this.timeBegan = vals.timeBegan;
      this.timeStopped = vals.timeStopped;
      this.stoppedDuration = vals.stoppedDuration;
      this.started = vals.started;
      this.started2 = vals.started2;
      this.running = vals.running;
    },
    saveOldTime() {
      this.$removeItem("oldTime");
      let vals = this.$data;
      vals.running = false;
      vals.timeStopped = new Date();
      vals.started = null;
      vals.started2 = null;
      this.$setItem("oldTime", vals);
    },
    stop() {
      this.running = false;
      this.timeStopped = new Date();
      clearInterval(this.started);
      clearInterval(this.started2);
    },
    reset() {
      this.running = false;
      clearInterval(this.started);
      clearInterval(this.started2);
      this.stoppedDuration = 0;
      this.timeBegan = null;
      this.timeStopped = null;
      this.time = "00:00:00.000";
      this.$removeItem("oldTime");
    },
    clockRunning() {
      let currentTime = new Date(),
        timeElapsed = new Date(
          currentTime - this.timeBegan - this.stoppedDuration
        ),
        hour = timeElapsed.getUTCHours(),
        min = timeElapsed.getUTCMinutes(),
        sec = timeElapsed.getUTCSeconds(),
        ms = timeElapsed.getUTCMilliseconds();
      this.time =
        this.zeroPrefix(hour, 2) +
        ":" +
        this.zeroPrefix(min, 2) +
        ":" +
        this.zeroPrefix(sec, 2) +
        "." +
        this.zeroPrefix(ms, 3);
    },
    zeroPrefix(num, digit) {
      let zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    }
  }
};
</script>
<style lang="scss" scoped>
$color: rgb(200, 200, 200);
$color-light: white;

#clock {
  order: 0;
  flex: 1;
  align-self: center;
  color: $color;
  min-height: calc(100vh - 64px);
}
</style>
