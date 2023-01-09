import { Linking } from 'react-native'

const inSelectDeselect = (value, data, matchKey) => {
  let checkData = data

  if (
    checkData.filter((item) => (matchKey
      ? item[matchKey] === value[matchKey]
      : item === value)).length === 0
  ) {
    checkData.push(value)
  } else {
    checkData = checkData.filter((item) => (matchKey
      ? item[matchKey] !== value[matchKey]
      : item !== value))
  }

  return checkData
}

function inLocalSearch(dataArray, searchText, searchableDataArray) {
  const text = searchText.replace(/[^\w\s]/gi, '')
  const regexp = new RegExp(text, 'gi')
  let tempData = []

  if (
    searchableDataArray
    && searchableDataArray.length !== 0
    && searchableDataArray !== null
    && searchableDataArray !== undefined
  ) {
    searchableDataArray.forEach((searchableValue) => {
      dataArray.forEach((dataValue) => {
        if (String(dataValue[searchableValue]).match(regexp)) {
          const isAvailable = tempData.some(
            (childValue) => dataValue === childValue,
          )
          if (!isAvailable) {
            tempData.push(dataValue)
          }
        }
      })
    })
  } else {
    tempData = dataArray.filter((e) => Object.values(e).join('').toLowerCase().match(regexp))
  }

  return tempData
}
function inArrangeSwipableData(data) {
  if (!data) {
    return []
  }
  data = data.map((item, i) => {
    item.key = String(i)
    return item
  })
  return data
}
function inAddDash(data, addAdditional) {
  let tempData = {}
  let checkArray = ['', 'NaN', NaN, null, undefined, 'undefined', 'null']
  checkArray = addAdditional && addAdditional.length >= 1
    ? [...checkArray, ...addAdditional]
    : checkArray
  Object.keys(data).forEach((item) => {
    const check = checkArray.includes(data[item])
    tempData = {
      ...tempData,
      [item]: check
        ? '-'
        : typeof data[item] === 'string'
          ? data[item].trim()
          : data[item],
    }
  })

  return tempData
}

function inAddBlank(data, addAdditional) {
  let tempData = {}
  let checkArray = ['', '-', 'NaN', NaN, null, undefined, 'undefined', 'null']
  checkArray = addAdditional && addAdditional.length >= 1
    ? [...checkArray, ...addAdditional]
    : checkArray
  Object.keys(data).forEach((item) => {
    const check = checkArray.includes(data[item])
    tempData = {
      ...tempData,
      [item]: check
        ? ''
        : typeof data[item] === 'string'
          ? data[item].trim()
          : data[item],
    }
  })

  return tempData
}

function inOpenWhatsapp(number) {
  Linking.openURL(`https://wa.me/+91${number}`)
}
function inSendSMS(number) {
  Linking.openURL(`sms:${number}`)
}
function inDoCall(number) {
  Linking.openURL(`tel:${number}`)
}
function inSendMail(email) {
  Linking.openURL(`mailto:${email}`)
}

export {
  inSelectDeselect,
  inLocalSearch,
  inAddDash,
  inAddBlank,
  inOpenWhatsapp,
  inSendSMS,
  inDoCall,
  inSendMail,
  inArrangeSwipableData,
}
