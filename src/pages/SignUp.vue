<template>
   <form class="signup-form">
        <div class="signup-container">
        <div class="signup-form-group">
            <label for="exampleInputEmail1">Kullanıcı Adı</label>
            <input v-model="form.name" type="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name">
        </div>
        <div class="signup-form-group">
            <label for="exampleInputEmail1">Email adresi</label>
            <input v-model="form.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email">
        </div>
        <div class="signup-form-group">
            <label for="exampleInputEmail1">Şifre</label>
            <input type="password" v-model="form.password" class="form-control" id="exampleInputPassword1" aria-describedby="passwordHelp" placeholder="Şifre">
        </div>
                <div class="signup-form-group">
            <label for="exampleInputEmail2">Şifre Tekrarı</label>
            <input type="password" v-model="form.passwordAgain" class="form-control" id="exampleInputPassword2" aria-describedby="passwordHelp2" placeholder="Şifre Tekrarı">
            <small id="emailHelp" class="form-text text-muted">Bilgileriniz kimseyle paylaşılmayacaktır.</small>
        </div>
        <div class="signup-form-group form-check">

            <input type="checkbox" v-model="form.checked" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Sözleşmeyi okudum ve kabul ediyorum.</label>

        </div>
        
        <button @click.prevent="createNewUser" type="submit" class="signup btn btn-primary uye-ol">Üye Ol</button>
        </div>
    </form>
</template>

<script>

import axios from 'axios'

export default {
  data(){
    return{
      form:{
        name:'',
        email:'',
        password:'',
        passwordAgain:'',
        checked: false
      }
    }
  },
  methods:{
      async createNewUser(){
        try{
             const res = await axios.post('https://alpteknik-backend.herokuapp.com/user/create', this.form)
             alert(res.data)
             this.$router.push({name:'login'})
        }
        catch(e){
            console.log(e)
        }
        
      }
      }
    
}
</script>

<style>

.signup-form{
  display: flex;
  align-items: center;
  justify-content: center;
}

.signup-container{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: .3rem rgb(59, 111, 18, 0.7) solid;
  border-radius: 6px;
  border-style: outset;
  width: 30%;
  padding: 2% 1%;
  
}
.signup-form-group{
  width: 90%;
  margin-bottom: 1.2rem;
}


.signup.btn.btn-primary{
    width: 90%;
    font-size: 1.3rem;
    font-weight: 500 ;
    background-color: rgb(17, 147, 194)
}


.sigup-form-group .form-check{
  display: flex;
  align-items: center;
  justify-content: center;
}

.signup-form-group.form-check{
  display: flex;
  align-items: center;
}

.form-check-label{
  padding-left: 1.8rem;
}


</style>