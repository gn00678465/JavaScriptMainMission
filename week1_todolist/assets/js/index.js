import { getDayFormate } from './api.js'

;(function (){
  const addBtn = document.querySelector('.addBtn')
  const handle = document.querySelector('.handle')
  const addTodo = document.querySelector('.addTodo')
  const clear = document.querySelector('.clear')
  const today = document.querySelector('.today')
  const todoList = document.querySelector('.list')
  const showCount = document.querySelector('.count_todo')
  const data = JSON.parse(window.localStorage.getItem('todo')) || []

  let addStatus = false

  const dataProxy = new Proxy(data, {
    get(target, key) {
      return target[key]
    },
    set(target, key, val) {
      target[key] = val
      return true
    }
  })

  // reader
  const render = function () {
    today.textContent = getDayFormate('dayFormat')
    let str = ''
    data.forEach(item => {
      str += `
      <li class="todo_item" data-timetamp="${item.timetamp}">
        <input type="checkbox" data-btn="done" name="complate" class="${item.done ? 'checked' : ''}" id="todo_${item.timetamp}">
        <span class="todo_text">${item.createDay}</span>
        <label class="todo_text" for="todo_${item.timetamp}">${item.todo}</label>
        <button class="btn todo_remove" data-btn="remove"></button>
      </li>
      `
    })
    todoList.innerHTML =str
    showCount.textContent = `目前有 ${countTodo()} 筆待辦事項`
    window.localStorage.setItem('todo',JSON.stringify(data))
  }


  // addToDo
  const addTodoHandler = function (e) {
    if (e.keyCode === 13 && this.value.trim() !== '') {
      dataProxy.push({
        todo: this.value.trim(),
        done: false,
        createDay: getDayFormate('today'),
        timetamp: Math.floor(Date.now() / 1000)
      })
      this.value= ''
    }
    
    render()
  }

  const operaterTodo = function (action, todo) {
    if (action === 'remove') removeTodo (todo)
    // else if (action === 'edit') editTodo (todo)
    else if (action === 'done') doneTodo (todo)
  }

  function doneTodo (todo) {
    const index = dataProxy.findIndex( item => item === todo)
    dataProxy[index].done = !dataProxy[index].done
    render()
  }

  //delTodo
  function removeTodo (todo) {
    const index = dataProxy.findIndex( item => item === todo)
    dataProxy.splice(index, 1)
    render()
  }

  //clearTodo
  function clearHandler () {
    dataProxy.length = 0
    render()
  }

  // countTodo
  function countTodo() {
    let count = dataProxy.filter(item => item.done === false).length
    return count
  }

  const clickHandler = function (e) {
    let action, thisTodo
    if (e.target.parentNode.nodeName !== 'LI' && !e.target.parentNode.classList.contains('todo_item')) return
      action = e.target.dataset.btn
      let thisTimetamp = parseInt(e.target.parentNode.dataset.timetamp)
      thisTodo = dataProxy.filter( item => item.timetamp === thisTimetamp)
    operaterTodo(action, thisTodo[0])
  }

  // EventListener
  function showAddBtn () {
    addBtn.classList.remove('fa-minus-circle')
    addBtn.classList.add('fa-plus-circle')
    addBtn.style.color = ''
  }
  function closeAddBtn () {
    addBtn.classList.remove('fa-plus-circle')
    addBtn.classList.add('fa-minus-circle')
    addBtn.style.color = '#e74c3c'
  }
  addBtn.addEventListener('click', function () {
    addStatus = !addStatus
    if (!addStatus) showAddBtn()
    else closeAddBtn()
    handle.classList.toggle('add')
  })
  addTodo.addEventListener('keyup', addTodoHandler)
  todoList.addEventListener('click', clickHandler)
  clear.addEventListener('click', clearHandler)
  render()
})()
