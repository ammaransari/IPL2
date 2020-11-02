function reduce(arr, implementer, initialValue) {
    let accumulator = initialValue;
    for (let i = 0; i < arr.length; i++)
      accumulator = implementer(accumulator, arr[i]);
    return accumulator;
  }
  function filter(result, filterFunc) {
    const filterResult = [];
    for (let i = 0; i < result.length; i++) {
      const check = filterFunc(result[i]);
      if (check) {
        filterResult.push(result[i]);
      }
    }
    return filterResult;
  }
  function map(arr, mapFunction) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      const mapResult = mapFunction(arr[i]);
      result.push(mapResult);
    }
    return result;
  }
  
  
  module.exports= {Reduce : reduce,Filter:filter,Map:map};