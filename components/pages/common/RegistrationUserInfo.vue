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

    <template>
      <customer-name :is-confirm="isConfirm || isLogin"/>
      <customer-mail :is-confirm="isConfirm || isLogin"/>
      <customer-phone-number :is-confirm="isConfirm || isLogin"/>

      <v-layout row>
        <v-flex xs3>
          初めてのご利用ですか？
          <span class="must">(必須)</span>
        </v-flex>
        <v-flex>
          <v-radio-group
            :disabled="isConfirm"
            v-model="isFirst"
            :mandatory="true"
            class="inputTop"
          >
            <v-radio :value="true" :label="isFirstLabel"/>
            <v-radio :value="false" label="いいえ、2回目以降です"/>
          </v-radio-group>
        </v-flex>
      </v-layout>
    </template>

    <v-layout row>
      <v-flex xs3>回数券利用</v-flex>
      <v-flex v-for="coupon in coupons" :key="coupon.id">
        <v-checkbox
          :disabled="isConfirm"
          v-model="selectedCoupons"
          :value="coupon"
          :label="coupon.name"
          class="inputTop"
        />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3>お子様連れ</v-flex>
      <v-flex xs5>
        <v-select :items="children" :disabled="isConfirm" v-model="childrenSelected"/>
      </v-flex>
      <v-flex v-if="!isConfirm" xs5>※お子様連れの方は人数をご選択ください</v-flex>
    </v-layout>

    <customer-message v-if="!isLogin" :is-confirm="isConfirm"/>

    <div class="pregnancy">
      ※ただ今当院では妊娠している方への治療は行っておりません。産後の骨盤矯正は行っております。ぜひ産後のケアはお任せください。
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import CustomerName from '~/components/pages/common/customer/Name.vue'
import CustomerMail from '~/components/pages/common/customer/Mail.vue'
import CustomerPhoneNumber from '~/components/pages/common/customer/PhoneNumber.vue'
import CustomerMessage from '~/components/pages/common/customer/Message.vue'
import { mapGetters, mapMutations, mapState } from 'vuex'

const children = ['なし', '1人', '2人', '3人', '4人']

const couponMaster = ['回数券利用あり']

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
    return {
      children: children,
      coupons: null
    }
  },
  computed: {
    selectedCoupons: {
      get() {
        return this.$store.state.user.coupons
      },
      set(value) {
        this.setCoupons(value)
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
        return this.isFirstValue
      },
      set(value) {
        this.setIsFirst(value)
      }
    },
    isFirstLabel() {
      return _.get(this, 'menus[0].menu.department_id') === 1
        ? '初めてです(初診料 ¥1,000)'
        : '初めてです(初回カウンセリング料 ¥1,000)'
    },
    ...mapGetters('user', ['isLogin', 'isFirstValue']),
    ...mapState('user', ['childrenCount']),
    ...mapState('reservation/select', ['menus'])
  },
  beforeMount() {
    // ローディングを解除
    this.setIsLoading(false)
  },
  mounted() {
    this.coupons = couponMaster.map((coupon, index) => {
      return { id: index + 1, name: coupon }
    })
  },
  methods: {
    ...mapMutations('reservation', ['setPregnantStateId']),
    ...mapMutations('user', [
      'setIsLoading',
      'setCoupons',
      'setChildrenCount',
      'setIsFirst'
    ])
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
.pregnancy {
  margin-top: 20px;
  text-align: left;
}
</style>
