/**
 * メールアドレスチェック
 */
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

/**
 * パスワードチェック
 */
export function checkPassword(password) {
  if (!password) {
    return 'パスワードは必須入力です'
  }

  const regex = new RegExp(
    /^(?=.*?[a-z])(?=.*?\d)([a-z\d\.\*\+\^\|\[\]\(\)\?\$\{\}\-\"\'\`_<>~!=#@$%&]){8,100}$/i
  )
  if (!regex.exec(password)) {
    return '英字/数字を含む8文字以上でお願いします'
  }

  return true
}

/**
 * 氏名チェック
 */
export function checkName(name) {
  if (!name) {
    return '氏名は必須入力です'
  }

  return true
}

/**
 * 氏名カナチェック
 */
export function checkNameKana(nameKana) {
  if (!nameKana) {
    return '氏名(カナ)は必須入力です'
  }

  const regex = new RegExp(/^[ァ-ヶ]+$/)
  if (!regex.exec(nameKana)) {
    return '氏名(カナ)は全角カタカナでお願いします'
  }

  return true
}

/**
 * 電話番号チェック
 */
export function checkPhoneNumber(phoneNumber) {
  if (!phoneNumber) {
    return '電話番号は必須入力です'
  }

  const regex = new RegExp(/^[0-9]+$/)
  if (!regex.exec(phoneNumber)) {
    return '電話番号は半角数字のみでお願いします'
  }

  return true
}

/**
 * 同一チェック
 */
export function checkSame(value1, value2) {
  // 入力されてない場合はチェックしない
  if (!value1 || !value2) {
    return true
  }

  if (value1 === value2) {
    return true
  }

  return false
}

/**
 * 郵便番号チェック
 */
export function checkPostalCode(postalCode) {
  // 必須入力ではない
  if (!postalCode) {
    return true
  }

  const regex = new RegExp(/^[0-9]{7}$/)
  if (!regex.exec(postalCode)) {
    return '郵便番号はハイフンなしの半角数字7桁でお願いします'
  }

  return true
}
