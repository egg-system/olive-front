import {
  checkMail,
  checkPassword,
  checkName,
  checkNameKana,
  checkPhoneNumber,
  checkPostalCode
} from '~/lib/validation'

describe('lib/validation', () => {
  describe('checkMail', () => {
    test('メールアドレスが空', () => {
      const mail = ''
      const ret = checkMail(mail)
      expect(ret).toBe('メールアドレスは必須入力です')
    })
    test('メールアドレスの形式が間違っている', () => {
      const mail = 'ei999aef'
      const ret = checkMail(mail)
      expect(ret).toBe('正しいメールアドレスの形式で入力してください')
    })
    test('正しいメールアドレス', () => {
      const mail = 'test1@test'
      const ret = checkMail(mail)
      expect(ret).toBe(true)
    })
  })

  describe('checkPassword', () => {
    test('パスワードが空', () => {
      const password = ''
      const ret = checkPassword(password)
      expect(ret).toBe('パスワードは必須入力です')
    })
    test('パスワードが8文字以下', () => {
      const password = '1234ab'
      const ret = checkPassword(password)
      expect(ret).toBe('英字/数字を含む8文字以上でお願いします')
    })
    test('パスワードで使用できない文字を使っている', () => {
      const password = 'あいうえおかきくけこさしすせそ'
      const ret = checkPassword(password)
      expect(ret).toBe('英字/数字を含む8文字以上でお願いします')
    })
    test('数字だけのパスワード', () => {
      const password = '12345678'
      const ret = checkPassword(password)
      expect(ret).toBe('英字/数字を含む8文字以上でお願いします')
    })
    test('英字だけのパスワード', () => {
      const password = 'abcdefgh'
      const ret = checkPassword(password)
      expect(ret).toBe('英字/数字を含む8文字以上でお願いします')
    })
    test('正しいパスワード', () => {
      const password = '0)!($UTA$$$$$**FJEROIJF*RG})'
      const ret = checkPassword(password)
      expect(ret).toBe(true)
    })
  })

  describe('checkName', () => {
    test('氏名が空', () => {
      const name = ''
      const ret = checkName(name)
      expect(ret).toBe('氏名は必須入力です')
    })
  })

  describe('checkNameKana', () => {
    test('氏名カナが空', () => {
      const nameKana = ''
      const ret = checkNameKana(nameKana)
      expect(ret).toBe('氏名(カナ)は必須入力です')
    })
    test('氏名カナが全角カナ以外', () => {
      const nameKana = 'あいうえお'
      const ret = checkNameKana(nameKana)
      expect(ret).toBe('氏名(カナ)は全角カタカナでお願いします')
    })
    test('正しい氏名カナ', () => {
      const nameKana = 'アイウエオ'
      const ret = checkNameKana(nameKana)
      expect(ret).toBe(true)
    })
  })

  describe('checkPhoneNumber', () => {
    test('電話番号が空', () => {
      const phoneNumber = ''
      const ret = checkPhoneNumber(phoneNumber)
      expect(ret).toBe('電話番号は必須入力です')
    })
    test('電話番号が半角数字以外', () => {
      const phoneNumber = '０１２３４５６７８９'
      const ret = checkPhoneNumber(phoneNumber)
      expect(ret).toBe('電話番号は半角数字のみでお願いします')
    })
    test('正しい電話番号', () => {
      const phoneNumber = '0123456789'
      const ret = checkPhoneNumber(phoneNumber)
      expect(ret).toBe(true)
    })
  })

  describe('checkPostalCode', () => {
    test('郵便番号が空', () => {
      const postalCode = ''
      const ret = checkPostalCode(postalCode)
      expect(ret).toBe(true)
    })
    test('郵便番号が半角数字以外', () => {
      const postalCode = '１２３４５６７'
      const ret = checkPostalCode(postalCode)
      expect(ret).toBe('郵便番号はハイフンなしの半角数字7桁でお願いします')
    })
    test('正しい郵便番号', () => {
      const postalCode = '1234567'
      const ret = checkPostalCode(postalCode)
      expect(ret).toBe(true)
    })
  })
})
