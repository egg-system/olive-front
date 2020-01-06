<template>
  <v-alert :value="true" type="error" outline>
    システムのリニューアルに伴い、電話番号などご予約に必要な登録情報が追加されました。<br>お手数ですが、登録情報の編集をお願いします。<br>
    <nuxt-link to="/mypage/profile/edit">
      登録情報変更へ
    </nuxt-link>
  </v-alert>
</template>
