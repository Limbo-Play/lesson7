const inputId = document.getElementById('inputId')
const buttonGet = document.getElementById('buttonGet')
let saveBtnListenner

inputId.addEventListener('input', (e) => {
  const value = e.currentTarget.value
  const outputCantainer = document.getElementById(
    'outputContainer'
  )
  console.log(value)
  if (value === '' || value < 1 || value > 10) {
    buttonGet.disabled = true
    buttonGet.style.background = 'none'
    buttonGet.style.color = 'grey'
    buttonGet.style.opacity = '0.5'
    outputCantainer.style.display = 'none'
  } else {
    buttonGet.disabled = false
    buttonGet.style.opacity = '1'
    buttonGet.style.color = 'white'
    buttonGet.style.background = '#8e44ad'
  }
})

buttonGet.addEventListener('click', async () => {
  try {
    buttonGet.innerHTML = 'Loading...'
    let output = document.getElementById('output')
    const inputId = document.getElementById('inputId')
    console.log(output)

    const responce = await fetch(
      `https://jsonplaceholder.typicode.com/users/${inputId.value}`
    )
    const users = await responce.json()
    console.log(users)

    const outputCantainer = document.getElementById(
      'outputContainer'
    )
    outputCantainer.style.display = 'flex'
    document.getElementById(
      'nameMailPhone'
    ).innerHTML = `<div>Name:</div><div>Mail:</div><div>Phone:</div>`
    output.innerHTML = `<div class="userName">${users.name}</div>
      <div class="userMail">${users.email}</div>
       <div class="phone">${users.phone}</div>`
    document.getElementById(
      'buttonSavePosition'
    ).innerHTML = `<button id="buttonSave">Save</button>`

    buttonGet.disabled = false
    buttonGet.innerHTML = 'Get'

    addSaveBtnListenner()
  } catch (e) {
    console.log('error', e)
  }
})

let names = []

const updateSavedName = (nextValue) => {
  localStorage.setItem('names', JSON.stringify(nextValue))
  changeOpacityNameTitle(nextValue.length ? 1 : 0)
  render(nextValue)
  names = nextValue
}

const addSaveBtnListenner = () => {
  const submitBtn = document.querySelector('#buttonSave')
  submitBtn.addEventListener('click', () => {
    const userName =
      document.querySelector('.userName').innerHTML
    updateSavedName([...names, { list: userName }])
  })
}

const render = (names) => {
  const nameContainer = document.getElementById('nameList')
  nameContainer.innerHTML = `${names
    .map(
      (el, index) => `<div id="name">
            <div id="nameRow">
            <div id="nameTitle">
      ${index + 1}.${el.list} </div>
            <img src="clear 1.png" onclick="removeNameList(${index})" />
            </div>
          </div>`
    )
    .join(' ')}`
}

const changeOpacityNameTitle = (value) => {
  const nameTitle = document.getElementById('listTitle')
  nameTitle.style.opacity = value
}

const removeNameList = (currentIndex) => {
  const filtredNames = names.filter(
    (el, index) => index !== currentIndex
  )
  updateSavedName(filtredNames)
}

const getLocalMemory = () => {
  const names = JSON.parse(localStorage.getItem('names'))
  return updateSavedName(names)
}
getLocalMemory()