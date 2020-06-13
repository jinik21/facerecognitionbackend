
const handlesignin=(req,resp,dbase,bcrypt)=>{
    const{ email,password }=req.body;
    if(!email||!password){
        return resp.status(400).json('incorreect form submission')
    }


    dbase.select('email','hash').from('login')
        .where('email','=',email)
        .then(data=>{
            const isValid= bcrypt.compareSync(password,data[0].hash);
            if(isValid){
                return dbase.select('*').from('users')
                    .where('email','=',email)                
                    .then(user =>{
                        resp.json(user[0])
                    })
            }
            else{
                resp.status(400).json('Wrong Credentials')
            }

        })
    .catch(err=>resp.status(400).json('Wrong Credentials'))

}


module.exports={
    handlesignin:handlesignin
};
