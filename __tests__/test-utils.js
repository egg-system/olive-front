import config from '~/config/constant.local.js'

export function initialize() {
  // 設定ファイルはdevを使う
  process.env = config
}
