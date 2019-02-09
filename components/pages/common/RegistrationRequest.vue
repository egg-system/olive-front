<template>
  <div class="request">

    <v-layout column wrap>
      <v-flex>
        <v-card dark color="red lighten-2">
          <v-card-text><h3>ご要望・ご相談</h3></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout column>
      <v-flex xs6>
        <v-textarea
          :disabled="isConfirm"
          v-model="request"
          outline
          name="input-7-4"
          label="ご意見・ご要望"
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
        return this.$store.state.registration.request
      },
      set(value) {
        this.setRequest(value)
      }
    }
  },
  methods: {
    ...mapMutations('registration', ['setRequest'])
  }
}
</script>

<style>
.request {
  text-align: left;
}
</style>
