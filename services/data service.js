const jwt=require("jsonwebtoken")

accounts={
  1000:{"account_no":1000,"name":"jaseel",phone:7685423234,balance:1200000,password:"jaseel123",transaction:[]},
  1001:{"account_no":1001,"name":"shani",phone:7685421234,balance:120213,password:"shani123",transaction:[]},
  1002:{"account_no":1002,"name":"fiju",phone:768542212334,balance:12032300,password:"fiju123",transaction:[]},
  1003:{"account_no":1003,"name":"sahal",phone:768542331234,balance:12002300,password:"sahal123",transaction:[]}

}







const register=(acno,uname,phone,pswd)=>{

    if (acno in accounts){
      return {
        status:false,
        message:"Account Already exists!...please login",
        statusCode:404
      }
    } 
    else{
      accounts[acno]={account_no:acno,name:uname,phone:phone,balance:0,password:pswd,transition:[]}
      
      console.log(accounts)
      return {
        status:true,
        message:"Registration Completed",
        statusCode:201
      }
    }
   }


   const login=(acno,pswd)=>{
    if(acno in accounts){
      if(accounts[acno].password==pswd){
        currentUser=accounts[acno].name
        currentAcno=acno
        token=jwt.sign(
          {currentAcno:acno},"secretsuperkey1234"
        )
      
        return {
          status:true,
          message:"Login successful",
          statusCode:200,
          currentAcno,
          token
        }
      }
      else{
        return {
          status:false,
          message:"Invalid Password",
          statusCode:400
        }
      }
    }
    else{
      return {
        status:false,
        message:"Ivalid Account number",
        statusCode:400
      }
    }
   }

   const deposite=(acc,pswd,amount)=>{
    if(acc in accounts){
  
      if(accounts[acc].password==pswd){
        accounts[acc].balance+=parseInt(amount)
        let details={"Type":"CREDIT","Amount":parseInt(amount)}
        accounts[acc].transaction.push(details)
      
      
        return  {
          status:true,
          message:"Amount deposited to your account.balance is:"+accounts[acc].balance,
          statusCode:200
        }
      }
      else{
        
        return {
          status:false,
          message:"Invalid password",
          statusCode:400
      }
    

    }
  
  

  }
  else{
    return {
      status:false,
      message:"Invalid Account Number",
      statusCode:400
    }

  }

}

const withdraw=(acc,pswd,amount)=>{
  if(acc in accounts){
  
    if(accounts[acc].password==pswd){
      
     if(accounts[acc].balance<amount){
      return {
        status:false,
        message:"Insufficient balance",
        statusCode:422
      }
     }
     else{
      accounts[acc].balance-=parseInt(amount)
      let details={"Type":"DEBIT","Amount":parseInt(amount)}
      accounts[acc].transaction.push(details)
    
      return {
        status:true,
        message:"Amount withrawal to your account.balance is:"+accounts[acc].balance,
        statusCode:200
      }
    }

     }
      
    else{
      return {
        status:false,
        message:"Invalid password",
        statusCode:400
      }
    }

  }
  else{
    return {
      status:false,
      message:"Invalid Account Number",
      statusCode:400
    }
  }
 }
 const getTransaction=(acc)=>{
  if(acc in accounts){
    return {
      status:true,
      message:"success",
      data:accounts[acc].transaction,
      statusCode:200
    }
  }
  else{
    return {
      status:false,
      message:"Invalid acc",
      statusCode:422
    }
  }
 }
    
    




   module.exports={
    register,
    login,
    deposite,
    withdraw,
    getTransaction
   }