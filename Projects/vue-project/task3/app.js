import Vue from 'vue'
import AV from 'leancloud-storage'

const APP_ID = 'OKiGrX9NucMXY4MCyHVOGKYo-gzGzoHsz'
const APP_KEY = 'ECq0UfGst8lhHTeS6xSK7zKN'
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: [],
        actionType: 'signUp',
        formData: {
            username: '',
            password: ''
        },
        currentUser: null
    },
    methods: {
        addTodo: function() {
            this.todoList.push({
                title: this.newTodo,
                createAt: new Date(),
                done: false
            })
            this.newTodo = ''
            this.saveOrUpdateTodos()
        },
        removeTodo: function(todo) {
            let index = this.todoList.indexOf(todo)
            this.todoList.splice(index, 1)
            this.saveOrUpdateTodos()
        },
        signUp: function() {
            let user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then((loginedUser) => {
                this.currentUser = this.getCurrentUser()
            }, (error) => {
                alert('注册失败')
            });
        },
        login: function() {
            AV.User.logIn(this.formData.username, this.formData.password).then(loginedUser => {
                this.currentUser = this.getCurrentUser()
                this.fetchTodos()
            }, error => {
                alert('登陆失败')
            });
        },
        signOut: function() {
            AV.User.logOut()
            this.currentUser = null
            window.location.reload()
        },
        getCurrentUser: function() {
            let current = AV.User.current()
            if (current) {
                let { id, createAt, attributes: { username } } = current
                return { id, createAt, username }
            } else {
                return null
            }

        },
        saveTodos: function() {
            let dataString = JSON.stringify(this.todoList)

            class Todo extends AV.Object {}
            AV.Object.register(Todo)
            let todofolder = new Todo()
            let acl = new AV.ACL()
            acl.setReadAccess(AV.User.current(), true)
            acl.setWriteAccess(AV.User.current(), true)

            todofolder.set('content', dataString)

            todofolder.setACL(acl)

            todofolder.save().then(todo => {
                this.todoList.id = todo.id
            }).catch(error => {
                console.error('fail')
            })
        },
        updateTodos: function() {
            let dataString = JSON.stringify(this.todoList)
            let avTodos = AV.Object.createWithoutData('Todo', this.todoList.id)
            avTodos.set('content', dataString)
            avTodos.save().then(() => {
                console.log('更新成功')
            })
        },
        saveOrUpdateTodos: function() {
            if (this.todoList.id) {
                this.updateTodos()
            } else {
                this.saveTodos()
            }
        },
        fetchTodos: function() {
            if (this.currentUser) {
                var query = new AV.Query('Todo')
                query.find().then(todos => {
                    let avAllTodos = todos[0]
                    let id = avAllTodos.id
                    this.todoList = JSON.parse(avAllTodos.attributes.content)
                    this.todoList.id = id
                }, function(error) {
                    console.log(error)
                })
            }
        }
    },
    created: function() {
        this.currentUser = this.getCurrentUser()
        console.log(this.currentUser)
        this.fetchTodos()


        //     window.onbeforeunload = () => {
        //         let dataString = JSON.stringify(this.todoList)
        //         let newTodoItem = JSON.stringify(this.newTodo)


        //         debugger

        //         window.localStorage.setItem('myTodos', dataString)
        //         window.localStorage.setItem('newTodo', newTodoItem)
        //     }

        //     let oldDataString = window.localStorage.getItem('myTodos')
        //     let oldData = JSON.parse(oldDataString)
        //     this.todoList = oldData || []

        //     let oldTodoItem = window.localStorage.getItem('newTodo')
        //     let oldTodo = JSON.parse(oldTodoItem)
        //     this.newTodo = oldTodo || ''
    }
})