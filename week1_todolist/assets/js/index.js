import { getDayFormate } from './api.js'

;(function (){
  const addBtn = document.querySelector('.addBtn')
  const handle = document.querySelector('.handle')
  const addTodo = document.querySelector('.addTodo')
  const clear = document.querySelector('.clear')
  const today = document.querySelector('.today')
  const todoList = document.querySelector('.list')
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
        <input type="checkbox" name="complate" class="${item.complate ? 'checked' : ''}">
        <span class="todo_text">${item.createDay}</span>
        <label class="todo_text">${item.todo}</label>
        <button class="btn todo_edit" data-btn="edit"><i class="fas fa-pencil-alt"></i></button>
        <button class="btn todo_remove" data-btn="remove"><i class="fas fa-trash-alt"></i></button>
      </li>
      `
    })
    todoList.innerHTML =str
  }


  // addToDo
  const addTodoHandler = function (e) {
    if (e.keyCode !== 13 || this.value.trim() === '') return
    data.push({
      todo: this.value.trim(),
      done: false,
      createDay: getDayFormate('today'),
      timetamp: Math.floor(Date.now() / 1000)
    })
    this.value= ''
    // window.localStorage.setItem('todo',JSON.stringify(data))
    render()
  }

   //updateTodo
  function editTodo () {
  }

  //delTodo
  function removeTodo (currentIndex) {
    data.splice(currentIndex,1)
    render()
  }

  //clearTodo


  const operaterTodos = function (e) {
    let currentIndex
    const action = e.target.dataset.btn
    this.querySelectorAll('.todo_item').forEach( el => {
      if (el === e.target.parentNode && e.target.parentNode.classList.contains('todo_item')) {
        currentIndex = data.findIndex( item => item.timetamp === parseInt(el.dataset.timetamp))
      }
    })
    console.log(currentIndex, action)
  }

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
  todoList.addEventListener('click', operaterTodos)
  render()
})()
