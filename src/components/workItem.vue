<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title v-html="itemKey"></v-list-item-title>
      <v-list-item-subtitle
        v-for="i in item"
        :key="i.time"
        v-html="i.time"
      ></v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "workItem",
  props: ["item", "itemKey"]
};
</script>
