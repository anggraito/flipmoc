export function searchItem(arr, searchStr) {
  let search = searchStr.toLowerCase();

  var arrr = arr.filter(elem => {
    // console.log(
    //   elem.beneficiary_name.toLowerCase().includes(search)+"A", 
    //   elem.beneficiary_bank.toLowerCase().includes(search)+"B", 
    //   elem.amount.toString().includes(search)+"C",
    //   elem.sender_bank.toLowerCase().includes(search) + "D"
    // );
    return elem.beneficiary_name.toLowerCase().includes(search) || 
      elem.beneficiary_bank.toLowerCase().includes(search) || 
      elem.amount.toString().includes(search) ||
      elem.sender_bank.toLowerCase().includes(search)
  }
  );

  console.log('-------------------', JSON.stringify(arrr));
}

