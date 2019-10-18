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
      const remainIds = this.timeSlots.flatMap(timeSlot => timeSlot.staff_ids)
      return _(remainIds)
        .groupBy()
        .filter(
          (idArray, id) => idArray.length >= Number(this.timeSlotIncrement * 2)
        )
        .value().length
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
      const deadAt = this.dateTimeSlot.clone().subtract(10, 'minutes')
      return deadAt.isBefore(moment())
    },
    nextRoute() {
      return this.isLogin ? 'registration' : 'login'
    },
    slotEndAt() {
      return this.dateTimeSlot.clone().add(this.timeSlotIncrement, 'hours')
    },
    ...mapGetters('login', ['isLogin']),
    ...mapGetters('reservation/date', ['timeSlotIncrement', 'getDateSlot']),
    ...mapGetters('reservation/select', ['selectedMenuParamsQuery'])
  },
  methods: {
    setDataTimeSlot() {
      const dateTime = this.dateTimeSlot.format('YYYY-MM-DD HH:mm:ss')
      const menuQuery = this.selectedMenuParamsQuery
      const query = { ...menuQuery, dateTime }
      this.$router.push({ path: `/${this.nextRoute}`, query })
    }
  }
}
</script>
