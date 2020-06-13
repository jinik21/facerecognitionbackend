

const handlesignup=(req,resp,dbase,bcrypt,saltRounds)=>{
    const{ email,name,password }=req.body;
    if(!name||!email||!password){
        return resp.status(400).json('incorreect form submission')
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    dbase.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{
            return trx('users')
                    .returning('*')
                    .insert({
                            email:loginEmail[0],
                            name:name,
                            joined:new Date(),
                        })
                    .then(user=>{
                            resp.json(user[0]);
                        })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=>resp.status(400).json('Unable To Register'))

}


module.exports={
    handlesignup:handlesignup
};
