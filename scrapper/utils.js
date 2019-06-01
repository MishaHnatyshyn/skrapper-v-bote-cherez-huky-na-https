'use strict'

const getNearestTableAncestor = (htmlElementNode) => {
  while (htmlElementNode) {
    htmlElementNode = htmlElementNode.parentNode;
    if (htmlElementNode.tagName.toLowerCase() === 'table') {
      return htmlElementNode;
    }
  }
  return undefined;
}

const parseCell = (cell) => {
  const [subject, teacher, room] = [...cell.querySelectorAll('a')].map(a => a.textContent)
  return subject || teacher || room ? { subject, teacher, room } : null
}

const parseTable = (table) => {
  return [...table.querySelectorAll('tr')]
    .slice(1)
    .map((row) => [...row.querySelectorAll('td')]
      .slice(1)
      .map(parseCell)
    )
}

module.exports = {
  getNearestTableAncestor,
  parseCell,
  parseTable
}
