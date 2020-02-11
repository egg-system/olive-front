<template>
  <div>
    <v-layout justify-center>
      <v-flex xs12 sm10 md10
              lg8
              xl6
      >
        <v-card dark color="red lighten-2">
          <v-card-text class="white--text text-center mb-4">
            <h3>ご要望・ご相談</h3>
          </v-card-text>
        </v-card>

        <p>
          ※インデプスをご希望の方は、下記欄にご記入ください。ただし、予約が重なっている場合、受けられない場合がございます。
        </p>
        <v-textarea
          v-model="request"
          :disabled="isConfirm"
          outline
          name="input-7-4"
          solo
          label="ご要望・ご相談"
          placeholder="ご要望・ご相談"
          value=""
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    isConfirm: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    password: '',
    passwordRules: [v => !!v || '必須入力です']
  }),
  computed: {
    request: {
      get() {
        return this.$store.state.reservation.request
      },
      set(value) {
        this.setRequest(value)
      }
    }
  },
  methods: {
    ...mapMutations('reservation', ['setRequest'])
  }
}
</script>
