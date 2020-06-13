
const Clarifai =require('clarifai');



const app= new Clarifai.App({
    apiKey: '59aeedf1d9424f319d407700df7e4163'
   });
const handleApicall=(req,resp)=>{
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=>{
        resp.json(data);
    })
    .catch(err => resp.status(400).json('unable to work with API'))
}

const handleimage=(req,resp,dbase)=>{
    const { id }=req.body;
    dbase('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        if(entries.length){
            resp.json(entries[0])
        }
        else{
            resp.status(400).json('Unable To Get Entries')
        }
    })
    .catch(err=>resp.status(400).json('Error Getting Data'))
}


module.exports={
    handleimage:handleimage,
    handleApicall:handleApicall
};
