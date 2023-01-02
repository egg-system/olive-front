<template>
  <div>
    <v-layout justify-center>
      <v-flex xs12 sm10 md10
              lg8
              xl6
      >
        <v-card color="red lighten-2">
          <v-card-text class="white--text text-center my-4">
            <h3>お客様情報</h3>
          </v-card-text>
        </v-card>

        <customer-name :is-confirm="isConfirm || isLogin" />
        <customer-mail :is-confirm="isConfirm || isLogin" />
        <customer-phone-number :is-confirm="isConfirm || isLogin" />

        <div class="mt-4">
          初めてのご利用ですか？
          <span>
            <v-chip label x-small color="error">必須</v-chip>
          </span>
        </div>
        <div class="first-use">
          <v-radio-group
            v-model="isFirst"
            :disabled="isConfirm"
            :mandatory="true"
          >
            <v-radio :value="true" :label="isFirstLabel" />
            <v-radio :value="false" label="いいえ、2回目以降です" />
          </v-radio-group>
        </div>

        <!-- <v-layout>
          <v-flex class="mt-5">
            回数券利用
          </v-flex>
          <v-flex v-for="coupon in coupons" :key="coupon.id" xs8>
            <v-checkbox
              v-model="selectedCoupons"
              :disabled="isConfirm"
              :value="coupon"
              :label="coupon.name"
            />
          </v-flex>
        </v-layout> -->

        <v-layout>
          <v-flex class="mt-4">
            お子様連れ
            <span v-if="!isConfirm" class="body-2" xs5>
              （お子様連れの方は人数をご選択ください）
            </span>
          </v-flex>
        </v-layout>
        <v-layout justify-center>
          <v-flex class="mt-2" xs10>
            <v-select v-model="childrenSelected" solo :items="children" :disabled="isConfirm" />
          </v-flex>
        </v-layout>

        <customer-message v-if="!isLogin" :is-confirm="isConfirm" />

        <v-alert
          dense
          outlined
          type="warning"
          class="mt-4 body-2"
        >
          当院では現在、妊娠している方への治療は行っておりません。産後の骨盤矯正は行っております。ぜひ産後のケアはお任せください。
        </v-alert>
      </v-flex>
    </v-layout>
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
      var price = 1000
      if (this.isDisplayTax) {
        price = Math.floor(price * this.getRate).toLocaleString()
        return _.get(this, 'menus[0].menu.department_id') === 1
          ? '初めてです(初診料 ¥' + price + '(税込))'
          : '初めてです(初回カウンセリング料 ¥' + price + '(税込))'
      } else {
        price = price.toLocaleString()
        return _.get(this, 'menus[0].menu.department_id') === 1
          ? '初めてです(初診料 ¥' + price + '(税抜))'
          : '初めてです(初回カウンセリング料 ¥' + price + '(税抜))'
      }
    },
    ...mapGetters('user', ['isLogin', 'isFirstValue']),
    ...mapState('user', ['childrenCount']),
    ...mapState('reservation/select', ['menus']),
    ...mapGetters('tax', ['isDisplayTax', 'getRate'])
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

<style lang="scss" scoped>
.first-use {
  display: flex;
  justify-content: center;
}
</style>
