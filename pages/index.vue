<template>
  <div class="main">
    <input type="text" name="name" v-model="names"> <br><br>
    <input type="password" name="password" v-model="password"> <br><br>
    <button @click="isEdit ? goEdit() : createUser()">{{ isEdit ? 'Edit User' : 'Create'}}</button>
    <div style="width: 200px; margin-top: 20px;">
      <table border="1" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th>names</th><th>date</th><th>Edit</th><th>Delete</th>
          </tr>
        </thead>
      <tbody>
        <tr v-for="(item, i) in users" :key="i">
          <td>{{ item.names }}</td>
          <td>{{ item.date }}</td> 
          <td><button @click="editUser(item)">Edit</button></td> 
          <td><button @click="deleteUser(item.id)">Delete</button></td> 
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script lang='ts' setup>
definePageMeta({
  layout: false,
  title: "Home",
});

const http = useHttpRequest()
const instance = getCurrentInstance();
var names = ""
var password = ""
var users: never[] = []
var isEdit = false
var idToEdit = ''

function createUser() {
  http.fetch("createUser", {
    method: "post",
    body: {
      names: names,
      password: password
    }
  })
  .then((data: any) => {
    console.log(data);
    names = ""
    password = ""
    getUsers()
    instance?.proxy?.$forceUpdate();
  })
}

function getUsers() {
  http.fetch("getUsers")
  .then((data: any) => {
    users = data
    instance?.proxy?.$forceUpdate();
  })
}
function editUser (item: {id: string; names: globalThis.Ref<string>; password: globalThis.Ref<string>; }) {
  names = item.names
  password = item.password
  isEdit = true
  idToEdit = item.id
  instance?.proxy?.$forceUpdate();
}
function deleteUser (id: any) {
  http.fetch("deleteUser/" + id + '/' + 0)
  .then((data: any) => {
    console.log(data);
    getUsers()
    instance?.proxy?.$forceUpdate();
  })
}

function goEdit() {
  http.fetch("EditUser", {
    method: "post",
    body: {
      names: names,
      password: password,
      id: idToEdit
    }
  })
  .then((data: any) => {
    console.log(data);
    names = ""
    password = ""
    getUsers()
    instance?.proxy?.$forceUpdate();
  })
}


onMounted(() => {
  getUsers()
})

</script>

<style scoped>
.main {
  position: absolute;
  top: 40%;
  left: 40%;
}
</style>