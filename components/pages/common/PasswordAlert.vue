<template>
  <v-alert :value="true" type="error" outline>
    システムのリニューアルに伴い、以前ユーザー登録をした方はこちらからパスワードの再設定をお願いいたします。<br>
    <nuxt-link to="/password/reset">パスワードの再設定へ</nuxt-link>
    <br><br>
    ※メールが届かない場合は、<br>
    『no-reply@olivebodycare.healthcare』
    <br>からのメールを受信出来るよう設定をお願い致します。
  </v-alert>
</template>
