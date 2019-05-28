<template>
  <tr>
    <td v-if="isPast" class="disabled">-</td>
    <td v-else-if="canReserveTime" @click="setDataTimeSlot">
      <a>{{ remainCount | remainFormat }}</a>
    </td>
    <td v-else class="disabled">×</td>
  </tr>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { mapGetters, mapMutations } from 'vuex'

export default {
  filters: {
    remainFormat(value) {
      if (value <= 0) {
        return '×'
      }

      return value < 3 ? value : '○'
    }
  },
  props: {
    dateTimeSlot: {
      type: Object,
      required: true
    }
  },
  computed: {
    canReserveTime() {
      return this.remainCount > 0
    },
    remainCount() {
      const remains = this.timeSlots.map(timeSlot => timeSlot.remain)
      return Math.floor(_.min(remains) / this.timeSlotIncrement)
    },
    timeSlots() {
      if (!this.dateSlot) {
        return []
      }

      return this.dateSlot.filter(timeSlot => {
        const slotAt = moment(timeSlot.start_time, 'YYYYMMDDHHmm')

        const isSameOrAfter = slotAt.isSameOrAfter(this.dateTimeSlot)
        const isBefore = slotAt.isBefore(this.slotEndAt)
        return isSameOrAfter && isBefore
      })
    },
    dateSlot() {
      return this.getDateSlot(this.dateTimeSlot)
    },
    isPast() {
      return this.dateTimeSlot.isBefore(moment())
    },
    nextRoute() {
      return this.isLogin ? 'registration' : 'login'
    },
    slotEndAt() {
      return this.dateTimeSlot.clone().add(this.timeSlotIncrement, 'hours')
    },
    ...mapGetters('login', ['isLogin']),
    ...mapGetters('date', ['timeSlotIncrement', 'getDateSlot'])
  },
  methods: {
    setDataTimeSlot() {
      this.setSelectedDateTime(this.dateTimeSlot)
      this.$router.push({ name: this.nextRoute })
    },
    ...mapMutations('select', ['setSelectedDateTime'])
  }
}
</script>
