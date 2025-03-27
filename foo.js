const imageCon = document.querySelector('.zib-waterfall-container')

const leftImage = []
const rightImage = []

Array.from(imageCon.children).forEach((item, index) => {
  if (index % 2 === 0) {
    leftImage.push(item)
  } else {
    rightImage.push(item)
  }
})

const leftDiv = document.createElement('div')
const rightDiv = document.createElement('div')

leftDiv.className = 'zib-waterfall-container-left'
rightDiv.className = 'zib-waterfall-container-right'

// 将 leftImage 数组中的所有元素添加到 leftDiv
leftImage.forEach(item => leftDiv.appendChild(item))

// 将 rightImage 数组中的所有元素添加到 rightDiv
rightImage.forEach(item => rightDiv.appendChild(item))

imageCon.appendChild(leftDiv)
imageCon.appendChild(rightDiv)
