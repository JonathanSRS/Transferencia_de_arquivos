// Acessar ip da máquina 
const os = require('os');
const networkInfo = os.networkInterfaces();
// console.log(networkInfo);
const ip = networkInfo['Ethernet 2'][4].address;
const express = require('express'),
    app = express(),
    multer = require('multer'),
    path = require('path'),
    fs = require('fs');

    app.post('/uploads', (req,res)=>{

        const storage = multer.diskStorage({
            destination: function(req, res, cb){
                cb(null,'uploads')
            },
            filename: function(req, file, cb){
                //error first callback
                cb(null,` ${file.originalname}-${Date.now()}.${path.extname(file.originalname)}`);
            }
        })
        // cria uma instância do middleware configurada
        const upload = multer({storage: storage, limits:{fileSize: 1 * 1024 * 1024}}).single('arquivo')
        upload(req,res,(err)=>{
            console.log(req.file)
        })
    })

    
    // rota indicado no atributo action do formulário
    //
    app.post('/file/upload',(req, res)=> {
        res.send('<h2>Upload realizado com sucesso</h2>')
    });
    


app.use(express.static('website'));
app.listen(3000, ip, ()=> console.log(`App Endereço http://${ip}:3000`))