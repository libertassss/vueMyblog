<template>
    <div class="box">
        <mu-container class="login_form">
            <mu-text-field class="txt_input" v-model="userName" label="UserName" label-float help-text="用户名为手机号" icon="account_circle"></mu-text-field><br/>
            <mu-text-field class="txt_input" v-model="userPass" label="Password" label-float error-text="请输入密码" icon="locked" type="password"></mu-text-field><br/>
            <mu-flex justify-content="center" align-items="center" class="login_btn">
                <mu-button color="primary"  @click="login" class="btn">登录</mu-button>
            </mu-flex>
        </mu-container>
    </div>
</template>

<script>
export default {
    name:'login',
    data(){
        return{
            userName:'',
            userPass:'',
        }
    },
    mounted(){
        
    },
    methods:{
        login(){
            var data={
                userName:this.userName,
                userPass:this.userPass
            };
            this.getData('/Dologin',data,'post',(res)=>{
                console.log(res);
                this.$toast.message(res.data.msg);
                if(res.data.code==0){
                    localStorage.setItem("userId",res.data.res.userId);
                   
                    this.$router.push({
                        name:'index'
                    });
                }else{

                }
            },(err)=>{
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>
    @import "../../static/css/login.css";
</style>
