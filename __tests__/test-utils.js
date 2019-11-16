import config from '~/config/constant.dev.js'

export function initialize() {
  // 設定ファイルはdevを使う
  process.env = config
}
