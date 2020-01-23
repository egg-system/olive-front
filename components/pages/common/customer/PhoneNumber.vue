<template>
  <div class="userinfo">
    <v-layout row>
      <v-flex xs3>
        電話番号<span class="must">(必須)</span>
      </v-flex>
      <v-layout column>
        <v-flex>
          <v-text-field
            v-model="phoneNumber"
            :rules="phoneNumberRules"
            :disabled="isConfirm"
            :clearable="!isConfirm"
            type="text"
            label="電話番号"
          />
        </v-flex>
      </v-layout>
    </v-layout>
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

<style scoped>
.userinfo {
  padding-top: 20px;
  text-align: left;
}
.must {
  color: red;
}
.inputTop {
  margin-top: 1px;
}
</style>
