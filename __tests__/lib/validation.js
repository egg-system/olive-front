import { checkMail, checkPassword } from '~/lib/validation'

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
      expect(ret).toBe('英字/数字/記号の8文字以上100文字以内でお願いします')
    })
    test('パスワードで使用できない文字を使っている', () => {
      const password = 'あいうえおかきくけこさしすせそ'
      const ret = checkPassword(password)
      expect(ret).toBe('英字/数字/記号の8文字以上100文字以内でお願いします')
    })
    test('正しいパスワード', () => {
      const password = '0)!($UTA$$$$$**FJEROIJF*RG})'
      const ret = checkPassword(password)
      expect(ret).toBe(true)
    })
  })
})
