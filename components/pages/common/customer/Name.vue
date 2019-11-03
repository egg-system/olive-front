<template>
  <div class="userinfo">

    <v-layout row>
      <v-flex xs3>氏名<span class="must">(必須)</span></v-flex>
      <v-flex>
        <v-text-field
          v-model="lastName"
          :rules="nameRules"
          :disabled="isConfirm"
          :clearable="!isConfirm"
          type="text"
          label="姓"
        />
      </v-flex>
      <v-flex>
        <v-text-field
          v-model="firstName"
          :rules="nameRules"
          :disabled="isConfirm"
          :clearable="!isConfirm"
          type="text"
          label="名"
        />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3>氏名カナ<span class="must">(必須)</span></v-flex>
      <v-flex>
        <v-text-field
          v-model="lastNameKana"
          :rules="nameKanaRules"
          :disabled="isConfirm"
          :clearable="!isConfirm"
          type="text"
          label="セイ"
        />
      </v-flex>
      <v-flex>
        <v-text-field
          v-model="firstNameKana"
          :rules="nameKanaRules"
          :disabled="isConfirm"
          :clearable="!isConfirm"
          type="text"
          label="メイ"
        />
      </v-flex>
    </v-layout>

  </div>

</template>

<script>
import { mapMutations } from 'vuex'
import { checkName, checkNameKana } from '~/lib/validation'

export default {
  props: {
    isConfirm: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    nameRules: [name => checkName(name)],
    nameKanaRules: [nameKana => checkNameKana(nameKana)]
  }),
  computed: {
    firstName: {
      get() {
        return this.$store.state.user.firstName
      },
      set(value) {
        this.setFirstName(value)
      }
    },
    lastName: {
      get() {
        return this.$store.state.user.lastName
      },
      set(value) {
        this.setLastName(value)
      }
    },
    firstNameKana: {
      get() {
        return this.$store.state.user.firstNameKana
      },
      set(value) {
        this.setFirstNameKana(value)
      }
    },
    lastNameKana: {
      get() {
        return this.$store.state.user.lastNameKana
      },
      set(value) {
        this.setLastNameKana(value)
      }
    }
  },
  methods: {
    ...mapMutations('user', [
      'setFirstName',
      'setLastName',
      'setFirstNameKana',
      'setLastNameKana'
    ])
  }
}
</script>

<style>
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
