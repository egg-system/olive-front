<template>
  <div class="userinfo">
    <v-layout column wrap>
      <v-flex>
        <v-card dark color="red lighten-2">
          <v-card-text class="menu"><h3>お客様情報</h3></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3>氏名<span class="must">(必須)</span></v-flex>
      <v-flex>
        <v-text-field
          v-model="firstName"
          :rules="firstNameRules"
          type="text"
          label="姓"
          clearable
        />
      </v-flex>
      <v-flex>
        <v-text-field
          v-model="lastName"
          :rules="lastNameRules"
          type="text"
          label="名"
          clearable
        />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3>氏名カナ<span class="must">(必須)</span></v-flex>
      <v-flex>
        <v-text-field
          v-model="firstName"
          :rules="firstNameRules"
          type="text"
          label="セイ"
          clearable
        />
      </v-flex>
      <v-flex>
        <v-text-field
          v-model="lastName"
          :rules="lastNameRules"
          type="text"
          label="メイ"
          clearable
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
            type="text"
            label="メールアドレス"
            clearable
          />
        </v-flex>
        <v-flex>確認のため、再度メールアドレスを入力してください</v-flex>
        <v-flex>
          <v-text-field
            v-model="mail"
            :rules="mailRules"
            type="text"
            label="メールアドレス"
            clearable
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
            type="text"
            label="電話番号"
            clearable
          />
        </v-flex>
      </v-layout>
    </v-layout>

    <v-layout row>
      <v-flex xs3>初めてのご利用ですか？<span class="must">(必須)</span></v-flex>
      <v-flex>
        <v-radio-group v-model="radios" :mandatory="false">
          <v-radio label="初めてです(初診料 ¥1,000)" value="radio-1"/>
          <v-radio label="いいえ、2回目以降です" value="radio-2"/>
        </v-radio-group>
      </v-flex>
    </v-layout>

  </div>

</template>

<script>
export default {
  data: () => ({
    firstName: '',
    lastName: '',
    mail: '',
    phoneNumber: '',
    firstNameRules: [v => !!v || '必須入力です'],
    lastNameRules: [v => !!v || '必須入力です'],
    mailRules: [v => !!v || '必須入力です'],
    phoneNumberRules: [v => !!v || '必須入力です']
  })
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
</style>
