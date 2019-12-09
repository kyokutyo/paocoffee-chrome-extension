'use strict'

import '../img/icon-16.png'

const patch = $ => {
  // sort by price asc
  const getPriceFromElement = el => {
    const priceStr = $(el).find('tr td font span').text()
    return Number(priceStr.replace(/(,|（.+）)/g, ''))
  }
  const comparePrice = (a, b) => getPriceFromElement(a) - getPriceFromElement(b)
  const $mainColumnForm = $('td[align=center] form')
  const tables = Array.from($mainColumnForm.find('> table:nth-child(n+17)'))
  const sortedTables = tables.sort(comparePrice)
  $mainColumnForm.find('br').remove()
  sortedTables.forEach(table => {
    $mainColumnForm.append($(table).css('margin-bottom', '2px'))
  })

  // select grind type: 細挽き
  $('select option').filter((_, option) => $(option).text() === '細挽き').attr('selected', 'selected')
}

const script = document.createElement('script')
script.appendChild(document.createTextNode(`(${patch})($)`))
document.body.appendChild(script)
