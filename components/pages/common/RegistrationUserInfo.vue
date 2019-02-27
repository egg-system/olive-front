<template>
  <div class="userinfo">
    <v-layout column wrap>
      <v-flex>
        <v-card dark color="red lighten-2">
          <v-card-text><h3>お客様情報</h3></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3>氏名<span class="must">(必須)</span></v-flex>
      <v-flex>
        <v-text-field
          v-model="firstName"
          :rules="firstNameRules"
          :disabled="isConfirm"
          :clearable="!isConfirm"
          type="text"
          label="姓"
        />
      </v-flex>
      <v-flex>
        <v-text-field
          v-model="lastName"
          :rules="lastNameRules"
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
          v-model="firstNameKana"
          :rules="firstNameRules"
          :disabled="isConfirm"
          :clearable="!isConfirm"
          type="text"
          label="セイ"
        />
      </v-flex>
      <v-flex>
        <v-text-field
          v-model="lastNameKana"
          :rules="lastNameRules"
          :disabled="isConfirm"
          :clearable="!isConfirm"
          type="text"
          label="メイ"
        />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3>メールアドレス<span class="must">(必須)</span></v-flex>
      <v-layout column>
        <v-flex>
          <v-text-field
            v-model="mail"
            :rules="mailRules"
            :disabled="isConfirm"
            :clearable="!isConfirm"
            type="text"
            label="メールアドレス"
          />
        </v-flex>
        <v-flex v-if="!isConfirm">確認のため、再度メールアドレスを入力してください</v-flex>
        <v-flex v-if="!isConfirm">
          <v-text-field
            v-model="mail2"
            :rules="mailRules"
            clearable
            type="text"
            label="メールアドレス"
          />
        </v-flex>
      </v-layout>
    </v-layout>

    <v-layout row>
      <v-flex xs3>電話番号<span class="must">(必須)</span></v-flex>
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

    <v-layout row>
      <v-flex xs3>初めてのご利用ですか？<span class="must">(必須)</span></v-flex>
      <v-flex>
        <v-radio-group :disabled="isConfirm" v-model="isFirst" :mandatory="false" class="inputTop">
          <v-radio :value="true" label="初めてです(初診料 ¥1,000)"/>
          <v-radio :value="false" label="いいえ、2回目以降です"/>
        </v-radio-group>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3>回数券利用</v-flex>
      <v-flex>
        <v-checkbox :disabled="isConfirm" v-model="coupon" label="利用する" class="inputTop"/>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3>妊娠有無</v-flex>
      <v-flex xs5>
        <v-select
          :items="pregnancyTerm"
          :disabled="isConfirm"
          v-model="pregnancyTermSelected"
        />
      </v-flex>
      <v-flex v-if="!isConfirm" xs5>
        ※妊娠中の方は何ヶ月かご選択ください
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3>お子様連れ</v-flex>
      <v-flex xs5>
        <v-select
          :items="children"
          :disabled="isConfirm"
          v-model="childrenSelected"
        />
      </v-flex>
      <v-flex v-if="!isConfirm" xs5>
        ※お子様連れの方は人数をご選択ください
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3>サロンからのメッセージ受信設定</v-flex>
      <v-flex>
        <v-radio-group :disabled="isConfirm" v-model="message" :mandatory="false" class="inputTop">
          <v-radio label="受け取る" value="yes"/>
          <v-radio label="受け取らない" value="no"/>
        </v-radio-group>
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
    pregnancyTerm: [
      '妊娠なし',
      '4ヶ月未満',
      '5ヶ月',
      '6ヶ月',
      '7ヶ月',
      '8ヶ月',
      '9ヶ月',
      '10ヶ月'
    ],
    children: ['なし', '1人', '2人', '3人', '4人'],
    firstNameRules: [v => !!v || '必須入力です'],
    lastNameRules: [v => !!v || '必須入力です'],
    mailRules: [v => !!v || '必須入力です'],
    phoneNumberRules: [v => !!v || '必須入力です']
  }),
  computed: {
    firstName: {
      get() {
        return this.$store.state.login.firstName
      },
      set(value) {
        this.setFirstName(value)
      }
    },
    lastName: {
      get() {
        return this.$store.state.login.lastName
      },
      set(value) {
        this.setLastName(value)
      }
    },
    firstNameKana: {
      get() {
        return this.$store.state.login.firstNameKana
      },
      set(value) {
        this.setFirstNameKana(value)
      }
    },
    lastNameKana: {
      get() {
        return this.$store.state.login.lastNameKana
      },
      set(value) {
        this.setLastNameKana(value)
      }
    },
    mail: {
      get() {
        return this.$store.state.login.mail
      },
      set(value) {
        this.setMail(value)
      }
    },
    mail2: {
      get() {
        return this.$store.state.login.mail2
      },
      set(value) {
        this.setMail2(value)
      }
    },
    phoneNumber: {
      get() {
        return this.$store.state.login.phoneNumber
      },
      set(value) {
        this.setPhoneNumber(value)
      }
    },
    coupon: {
      get() {
        return this.$store.state.registration.coupon
      },
      set(value) {
        this.setCoupon(value)
      }
    },
    pregnancyTermSelected: {
      get() {
        return this.$store.state.registration.pregnancyTermSelected
      },
      set(value) {
        this.setPregnancyTermSelected(value)
      }
    },
    childrenSelected: {
      get() {
        return this.$store.state.registration.childrenSelected
      },
      set(value) {
        this.setChildrenSelected(value)
      }
    },
    isFirst: {
      get() {
        return this.$store.state.registration.isFirst
      },
      set(value) {
        this.setIsFirst(value)
      }
    },
    message: {
      get() {
        return this.$store.state.registration.message
      },
      set(value) {
        this.setMessage(value)
      }
    }
  },
  beforeMount() {
    // ローディングを解除
    this.setIsLoading(false)
  },
  methods: {
    ...mapMutations('registration', [
      'setCoupon',
      'setPregnancyTermSelected',
      'setChildrenSelected',
      'setIsFirst',
      'setMessage'
    ]),
    ...mapMutations('login', [
      'setFirstName',
      'setLastName',
      'setFirstNameKana',
      'setLastNameKana',
      'setMail',
      'setMail2',
      'setPhoneNumber',
      'setIsLoading'
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
