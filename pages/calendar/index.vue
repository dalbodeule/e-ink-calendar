<!-- eslint-disable semi -->
<template>
  <Calendar :options="calendarOptions" />
</template>

<script setup lang="ts"></script>

<script lang="ts">
import FullCalendar from "@fullcalendar/vue3"
import dayGridPlugin from "@fullcalendar/daygrid"
import { CalendarOptions } from "@fullcalendar/core"
import allLocales from "@fullcalendar/core/locales-all"

const calendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin],
  initialView: "dayGridMonth",
  height: "auto",
  locales: allLocales,
  locale: "ko",
  headerToolbar: {
    start: "",
    center: "title",
    end: ""
  },
  themeSystem: "bootstrap5"
}

export default {
  components: { Calendar: FullCalendar },
  data: () => {
    return {
      calendarOptions
    }
  }
}
</script>

<style>
.fc-daygrid-day a,
.fc-col-header-cell a {
  color: black;
}

.fc-daygrid-day.fc-day-sat a,
.fc-col-header-cell.fc-day-sat a {
  color: blue;
}

.fc-daygrid-day.fc-day-sun a,
.fc-col-header-cell.fc-day-sun a {
  color: red;
}
</style>
