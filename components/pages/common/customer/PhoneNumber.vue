<template>
  <div>
    <div>
      電話番号
      <span>
        <v-chip label x-small color="error">必須</v-chip>
      </span>
      <v-layout justify-center>
        <v-flex class="mt-2" xs10>
          <v-text-field
            v-model="phoneNumber"
            :rules="phoneNumberRules"
            :disabled="isConfirm"
            :clearable="!isConfirm"
            type="text"
            solo
            label="電話番号"
            placeholder="例）09012345678"
            class="font-weight-bold"
          />
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { checkPhoneNumber } from '~/lib/validation'

export default {
  props: {
    isConfirm: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    phoneNumberRules: [phoneNumber => checkPhoneNumber(phoneNumber)]
  }),
  computed: {
    phoneNumber: {
      get() {
        return this.$store.state.user.phoneNumber
      },
      set(value) {
        this.setPhoneNumber(value)
      }
    }
  },
  methods: {
    ...mapMutations('user', ['setPhoneNumber'])
  }
}
</script>
