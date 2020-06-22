import { getDayFormate } from './api.js'

;(function (){
  const addBtn = document.querySelector('.addBtn')
  const handle = document.querySelector('.handle')
  const addTodo = document.querySelector('.addTodo')
  const clear = document.querySelector('.clear')
  const today = document.querySelector('.today')
  const todoList = document.querySelector('.list')
  let addStatus = false
  const data = JSON.parse(window.localStorage.getItem('todo')) || []

  // reader
  const render = function () {
    today.textContent = getDayFormate('dayFormat')
    let str = ''
    data.forEach(item => {
      str += `
      <li class="todo_item">
        <button class="btn todo_edit"><i class="fas fa-pencil-alt"></i></button>
        <p class="todo_content"><input type="checkbox" name="complate" class="${item.complate ? 'checked' : ''}"><span>${item.todo}</span><span>${item.createDay}</span></p>
        <button class="btn todo_remove"><i class="fas fa-trash-alt"></i></button>
      </li>
      `
    })
    todoList.innerHTML =str
  }

  // addToDo
  const addTodoHandler = function (e) {
    if (e.keyCode !== 13 && this.value !=='') return
    data.push({
      todo: this.value.trim(),
      done: false,
      createDay: getDayFormate('today'),
      timetamp: Math.floor(Date.now() / 1000)
    })
    this.value= ''
    render()
  }

  //updateTodo

  //delTodo

  //clearTodo


  // EventListener
  addBtn.addEventListener('click', function () {
    addStatus = !addStatus
    if (!addStatus) {
      addBtn.classList.remove('fa-minus-circle')
      addBtn.classList.add('fa-plus-circle')
      addBtn.style.color = ''
    } else {
      addBtn.classList.remove('fa-plus-circle')
      addBtn.classList.add('fa-minus-circle')
      addBtn.style.color = '#e74c3c'
    }
    handle.classList.toggle('add')
  })
  addTodo.addEventListener('keyup', addTodoHandler)
  render()
})()