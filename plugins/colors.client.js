import { hexToRgbA } from '~/utils'

// hexToRgbA('#' + parent.color, 0.5)
export default function (context, inject) {
  inject('$hexToRgbA', hexToRgbA)
}
