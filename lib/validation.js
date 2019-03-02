export function checkMail(mail) {
  if (!mail) {
    return 'メールアドレスは必須入力です'
  }
  const regex = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  )
  if (!regex.exec(mail)) {
    return '正しいメールアドレスの形式で入力してください'
  }
  return true
}

export function checkPassword(password) {
  if (!password) {
    return 'パスワードは必須入力です'
  }

  const regex = new RegExp(
    /^([a-z\d\.\*\+\^\|\[\]\(\)\?\$\{\}\-\"\'\`_<>~!=#@$%&]){8,100}$/i
  )
  if (!regex.exec(password)) {
    return '英字/数字/記号の8文字以上100文字以内でお願いします'
  }

  return true
}
