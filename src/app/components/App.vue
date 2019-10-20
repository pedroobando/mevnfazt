<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">MEVN Stack</a>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <input type="text" v-model="task.title"
                  placeholder="Inserta una Tarea" class="form-control">
                </div>
                <div class="form-group">
                  <textarea v-model="task.description" id="" cols="30" rows="10"
                  class="form-control" placeholder="Inserte una descripcion">
                  </textarea>
                </div>
                <button class="btn btn-primary btn-block" v-if="this.sendEventNew">Enviar</button>
                <button class="btn btn-success btn-block" v-else>Actualizar</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="table table-hover">
            <thead class="thead-light">
              <tr>
                <th>Tarea</th>
                <th>Descripcion</th>
                <th>Seleccion</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task of tasks">
                <td>{{task.title}}</td>
                <td>{{task.description}}</td>
                <td>
                  <button @click="deleteTask(task._id)"
                    type="button" class="btn btn-danger btn-sm">Delete
                  </button>
                  <button @click="selectUpdateTask(task._id)"
                    type="button" class="btn btn-success btn-sm">Update
                  </button>
                </td>
              </tr>
            </tbody>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
class Task {
  constructor(title = '', description = '') {
    this.title = title;
    this.description = description;
  }
}

export default {
  data() {
    return {
      task: new Task(),
      tasks: [],
      sendEventNew: true,
      taskId: 0,
    }
  },
  created() {
    this.getTask();
  },
  methods: {
    sendTask() {
      if (this.sendEventNew) {
        this.addTask();
      } else {
        this.updateTask(this.taskId);
      }
    },
    addTask() {
      fetch('api/tasks', {
        method: 'POST',
        body: JSON.stringify(this.task),
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        this.getTask();
      });

      this.task = new Task();
    },
    getTask() {
      fetch('api/tasks')
        .then(res => res.json())
        .then(data => {
          this.tasks = data.data;
          console.log(data);          
        });
    },
    getOneTask(id) {
      fetch(`api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
          this.task = new Task(data.data.title,data.data.description);
        });
    },
    deleteTask(id) {
      fetch(`api/tasks/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(this.task),
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        this.getTask();
      });
    },
    selectUpdateTask(id) {
      this.getOneTask(id);
      this.sendEventNew = false;
      this.taskId = id;
    },
    updateTask(id) {
      fetch(`api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(this.task),
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        this.sendEventNew = true;
        this.getTask();
      });

      this.task = new Task();

    }
  }
}
</script>