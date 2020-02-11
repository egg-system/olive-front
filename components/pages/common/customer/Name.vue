<template>
  <div class="mt-4">
    氏名
    <span>
      <v-chip label x-small color="error">必須</v-chip>
    </span>
    <v-layout justify-center class="mt-2">
      <v-flex xs5 class="mr-1">
        <v-text-field
          v-model="lastName"
          :rules="nameRules"
          :disabled="isConfirm"
          :clearable="!isConfirm"
          type="text"
          solo
          label="性"
          placeholder="例）青葉"
        />
      </v-flex>
      <v-flex xs5>
        <v-text-field
          v-model="firstName"
          :rules="nameRules"
          :disabled="isConfirm"
          :clearable="!isConfirm"
          type="text"
          solo
          label="名"
          placeholder="例）花子"
        />
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex>
        氏名カナ
        <span>
          <v-chip label x-small color="error">必須</v-chip>
        </span>
      </v-flex>
    </v-layout>
    <v-layout justify-center class="mt-2">
      <v-flex xs5 class="mr-1">
        <v-text-field
          v-model="lastNameKana"
          :rules="nameKanaRules"
          :disabled="isConfirm"
          :clearable="!isConfirm"
          type="text"
          solo
          label="セイ"
          placeholder="例）アオバ"
        />
      </v-flex>
      <v-flex xs5>
        <v-text-field
          v-model="firstNameKana"
          :rules="nameKanaRules"
          :disabled="isConfirm"
          :clearable="!isConfirm"
          type="text"
          solo
          label="メイ"
          placeholder="例）ハナコ"
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
