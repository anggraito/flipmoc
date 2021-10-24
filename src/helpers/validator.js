/**
 * @param {x} - usually is number
 * @return 2.345 , 1.000.000 etc
 */
export const priceSeparator = (x) => { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }


const monthArray = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'Nopember', 'Desember']
/**
 * @param {date} - date
 * @return DD MMMM YYYY - 16 05 2021
 */
export function convertDate(date) {
  var d = new Date(date.replace(/\s/, 'T')),
    gd = d.getDate(),
    month = monthArray[d.getMonth()],
    year = d.getFullYear()
  
  return `${gd} ${month} ${year}`
}

/**
 * @param {date} - string text
 * @return Test Aplikasi - Contoh
 */
export const capitalizeFirstLetter = (x) => {
  var splitStr = x.toLowerCase().split(' ')
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ')
}
