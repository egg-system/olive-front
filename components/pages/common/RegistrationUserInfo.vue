<template>
  <div class="userinfo">
    <v-layout column wrap>
      <v-flex>
        <v-card dark color="red lighten-2">
          <v-card-text>
            <h3>お客様情報</h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <template v-if="!isLogin">
      <customer-name :is-confirm="isConfirm"/>
      <customer-mail :is-confirm="isConfirm"/>
      <customer-phone-number :is-confirm="isConfirm"/>

      <v-layout row>
        <v-flex xs3>
          初めてのご利用ですか？
          <span class="must">(必須)</span>
        </v-flex>
        <v-flex>
          <v-radio-group
            :disabled="isConfirm"
            v-model="isFirst"
            :mandatory="false"
            class="inputTop"
          >
            <v-radio :value="true" label="初めてです(初診料 ¥1,000)"/>
            <v-radio :value="false" label="いいえ、2回目以降です"/>
          </v-radio-group>
        </v-flex>
      </v-layout>
    </template>

    <v-layout v-if="isLogin" row>
      <v-flex xs3>回数券利用</v-flex>
      <v-flex>
        <v-checkbox :disabled="isConfirm" v-model="coupon" label="利用する" class="inputTop"/>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3>妊娠有無</v-flex>
      <v-flex xs5>
        <v-select :items="pregnancyTerm" :disabled="isConfirm" v-model="pregnancyTermSelected"/>
      </v-flex>
      <v-flex v-if="!isConfirm" xs5>※妊娠中の方は何ヶ月かご選択ください</v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3>お子様連れ</v-flex>
      <v-flex xs5>
        <v-select :items="children" :disabled="isConfirm" v-model="childrenSelected"/>
      </v-flex>
      <v-flex v-if="!isConfirm" xs5>※お子様連れの方は人数をご選択ください</v-flex>
    </v-layout>

    <customer-message v-if="!isLogin" :is-confirm="isConfirm"/>
  </div>
</template>

<script>
import CustomerName from '~/components/pages/common/customer/Name.vue'
import CustomerMail from '~/components/pages/common/customer/Mail.vue'
import CustomerPhoneNumber from '~/components/pages/common/customer/PhoneNumber.vue'
import CustomerMessage from '~/components/pages/common/customer/Message.vue'
import { mapGetters, mapMutations, mapState } from 'vuex'

const pregnancyTerm = [
  '妊娠なし',
  '4ヶ月未満',
  '5ヶ月',
  '6ヶ月',
  '7ヶ月',
  '8ヶ月'
]

const children = ['なし', '1人', '2人', '3人', '4人']

export default {
  components: {
    CustomerName,
    CustomerMail,
    CustomerPhoneNumber,
    CustomerMessage
  },
  props: {
    isConfirm: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { pregnancyTerm, children }
  },
  computed: {
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
        return pregnancyTerm[this.pregnantStateId]
      },
      set(value) {
        const pregnancyTermSelected = pregnancyTerm.indexOf(value)
        this.setPregnantStateId(pregnancyTermSelected)
      }
    },
    childrenSelected: {
      get() {
        return children[this.childrenCount]
      },
      set(value) {
        const childrenSelected = children.indexOf(value)
        this.setChildrenCount(childrenSelected)
      }
    },
    isFirst: {
      get() {
        // ログイン済みの場合は2回目以降とする
        return this.isLogin ? false : this.isFirst
      },
      set(value) {
        this.setIsFirst(value)
      }
    },
    ...mapGetters('login', ['isLogin']),
    ...mapState('registration', ['childrenCount', 'isFirst', 'pregnantStateId'])
  },
  beforeMount() {
    // ローディングを解除
    this.setIsLoading(false)
  },
  methods: {
    ...mapMutations('registration', [
      'setCoupon',
      'setPregnantStateId',
      'setChildrenCount',
      'setIsFirst'
    ]),
    ...mapMutations('login', ['setIsLoading'])
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
