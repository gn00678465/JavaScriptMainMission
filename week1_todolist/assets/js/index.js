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
        <p class="todo_content"><input type="checkbox" name="complate" id="todoItem" class="${item.complate ? 'checked' : ''}">
          <span>${item.createDay}</span>
          <label for="todoItem">${item.todo}</label>
        </p>
        <div class='btn_group'>
          <button class="btn todo_edit"><i class="fas fa-pencil-alt"></i></button>
          <button class="btn todo_remove"><i class="fas fa-trash-alt"></i></button>
        </div>
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
