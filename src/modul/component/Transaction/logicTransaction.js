export function searchItem(arr, searchStr) {
  let search = searchStr.toLowerCase();

  var arrr = arr.filter(elem => {
    return elem.beneficiary_name.toLowerCase().includes(search) || 
      elem.beneficiary_bank.toLowerCase().includes(search) || 
      elem.amount.toString().includes(search) ||
      elem.sender_bank.toLowerCase().includes(search)
  })

  return arr

  console.log('-------------------', JSON.stringify(arrr));
}

