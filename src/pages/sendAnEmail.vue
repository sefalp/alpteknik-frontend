<template>
  <div class="contact1">
		<div class="container-contact1">

			<div class="contact1-pic js-tilt" data-tilt>
				<img src="./sendAnEmail/images/img-01.png" alt="IMG">
			</div>

			<form class="contact1-form validate-form">

				<div class="wrap-input1 validate-input" data-validate = "İsim girilmesi gereklidir">
					<input class="input1" type="text" v-model="form.name" name="name" placeholder="İsim">
					<span class="shadow-input1"></span>
				</div>

				<div class="wrap-input1 validate-input" data-validate = "Geçerli bir mail adresi giriniz !">
					<input class="input1" type="text" v-model="form.email" name="email" placeholder="Email">
					<span class="shadow-input1"></span>
				</div>

				<div class="wrap-input1 validate-input" data-validate = "Telefon numarası girilmesi gereklidir">
					<input class="input1" type="text" v-model="form.phoneNumber" name="subject" placeholder="Telefon Numarası">
					<span class="shadow-input1"></span>
				</div>

				<div class="wrap-input1 validate-input" data-validate = "Mesaj boş bırakılamaz">
					<textarea class="input1" v-model="form.message" name="message" placeholder="Mesaj"></textarea>
					<span class="shadow-input1"></span>
				</div>

				<div class="container-contact1-form-btn">
					<button class="contact1-form-btn" @click.prevent="sendMail">
						<span>
							Gönder
							<i class="fa fa-long-arrow-right" aria-hidden="true"></i>
						</span>
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>

import axios from 'axios'

export default {
	
	data(){
		return{
			form:{
				name: '',
				email: '',
				phoneNumber : '',
				message: ''
			}
		}
	},
	methods:{
		async sendMail(){
			try{
				await axios.post('https://alpteknik-backend.herokuapp.com/user/sendEmail', this.form)
				alert('Mesajınız iletildi, en kısa zamanda döneceğiz')
				this.form = {
				name: '',
				email: '',
				phoneNumber : '',
				message: ''
			}
			}catch(e){
				alert('Teknik bir aksaklıktan dolayı mesajınız gönderilemedi')
			}
		}
	}

}
</script>

<style>
.contact1 a{
	font-size: 14px;
	line-height: 1.7;
	color: #666666;
	margin: 0px;
	transition: all 0.4s;
	-webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

.contact1 a:focus {
	outline: none !important;
}

.contact1 a:hover {
	text-decoration: none;
	color: #57b846;
}

/*---------------------------------------------*/
.contact1 h1,h2,h3,h4,h5,h6 {
	margin: 0px;
}

.contact1 p {
	font-size: 14px;
	line-height: 1.7;
	color: #666666;
	margin: 0px;
}

.contact1 ul, li {
	margin: 0px;
	list-style-type: none;
}


/*---------------------------------------------*/
.contact1 input {
	outline: none;
	border: none;
}

.contact1 textarea {
  outline: none;
  border: none;
}

.contact1 textarea:focus, input:focus {
  border-color: transparent !important;
}

.contact1 input::-webkit-input-placeholder { color: #999999; }
.contact1 input:-moz-placeholder { color: #999999; }
.contact1 input::-moz-placeholder { color: #999999; }
.contact1 input:-ms-input-placeholder { color: #999999; }

.contact1 textarea::-webkit-input-placeholder { color: #999999; }
.contact1 textarea:-moz-placeholder { color: #999999; }
.contact1 textarea::-moz-placeholder { color: #999999; }
.contact1 textarea:-ms-input-placeholder { color: #999999; }

/*---------------------------------------------*/
.contact1-form-btn {
	outline: none !important;
	border: none;
	background: transparent;
	
}
.contact1-form-btn span{
font-size: 2rem;
}


.contact1-form-btn:hover {
	cursor: pointer;
}


/*//////////////////////////////////////////////////////////////////
[ Contact 1 ]*/

.contact1 {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 70%;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.container-contact1 {
  width: 1163px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  align-items: center;

}

/*------------------------------------------------------------------
[  ]*/
.contact1-pic {
  width: 296px;
}

.contact1-pic img {
  max-width: 100%;
}


/*------------------------------------------------------------------
[  ]*/
.contact1-form {
  width: 390px;
}

.contact1-form-title {
  display: block;
  font-size: 24px;
  color: #333333;
  line-height: 1.2;
  text-align: center;
  padding-bottom: 44px;
}

.contact1 input.input1 {
  height: 40px;
  border-radius: 25px;
  padding: 0 30px;
}
.contact1 input.input1 + .shadow-input1 {
  border-radius: 25px;
}

.contact1 textarea.input1 {
  min-height: 100px;
  border-radius: 25px;
  padding: 12px 30px;
}
.contact1 textarea.input1 + .shadow-input1 {
  border-radius: 25px;
}

/*---------------------------------------------*/
.wrap-input1 {
  position: relative;
  width: 100%;
  z-index: 1;
  margin-bottom: 20px;
}

.contact1 .input1 {
  display: block;
  width: 100%;
  background: #e6e6e6;
  font-size: 15px;
  line-height: 1.5;
  color: #666666;
}

.contact1 .shadow-input1 {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 0px 0px;
  color: rgba(87,184,70, 0.5);
}

.contact1 .input1:focus + .shadow-input1 {
  -webkit-animation: anim-shadow 0.5s ease-in-out forwards;
  animation: anim-shadow 0.5s ease-in-out forwards;
}

@-webkit-keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 80px 30px;
    opacity: 0;
  }
}

@keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 80px 30px;
    opacity: 0;
  }
}

/*---------------------------------------------*/
.container-contact1-form-btn {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.contact1-form-btn {
  min-width: 193px;
  height: 40px;
  border-radius: 25px;
  background: #57b846;
  font-size: 15px;
  line-height: 1.5;
  color: #fff;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.contact1-form-btn i {
  margin-left: 7px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.contact1-form-btn:hover {
  background: #333333;
}

.contact1-form-btn:hover i {
  -webkit-transform: translateX(10px);
  -moz-transform: translateX(10px);
  -ms-transform: translateX(10px);
  -o-transform: translateX(10px);
  transform: translateX(10px);
}




/*------------------------------------------------------------------
[ Responsive ]*/

@media (max-width: 1500px) {
  .contact1-pic {
    width: 33.5%;
  }

  .contact1-form {
    width: 44%;
  }
}

@media (max-width: 1240px) {

  .contact1-pic {
    width: 35%;
  }

  .contact1-form {
    width: 55%;
  }
}

@media (max-width: 960px) {

  .contact1-pic {
    display: none;
  }

  .contact1-form {
    width: 100%;
  }
}



/*------------------------------------------------------------------
[ Alert validate ]*/

.contact1 .validate-input {
  position: relative;
}

.alert-validate::before {
  content: attr(data-validate);
  position: absolute;
  max-width: 70%;
  background-color: white;
  border: 1px solid #c80000;
  border-radius: 13px;
  padding: 4px 25px 4px 10px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 8px;
  pointer-events: none;

  color: #c80000;
  font-size: 13px;
  line-height: 1.4;
  text-align: left;

  visibility: hidden;
  opacity: 0;

  -webkit-transition: opacity 0.4s;
  -o-transition: opacity 0.4s;
  -moz-transition: opacity 0.4s;
  transition: opacity 0.4s;
}

.alert-validate::after {
  content: "\f06a";
  font-family: FontAwesome;
  display: block;
  position: absolute;
  color: #c80000;
  font-size: 15px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 13px;
}

.alert-validate:hover:before {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 1240px) {
  .alert-validate::before {
    visibility: visible;
    opacity: 1;
  }
}
</style>