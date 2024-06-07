const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

const sendEmailToConsultant = async (email,mensaje) => {
    let res = true
    try{
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'jmtr2000@gmail.com', // Coloca aquí tu correo de Gmail
            pass: 'kdzdrtcldxhxcupi', // Coloca aquí tu contraseña de Gmail
            },
        });
        let info = await transporter.sendMail({
            from: 'jmtr2000@gmail.com',
            to: 'jmtr2000@gmail.com',
            subject: 'Duda de '+ email,
            text: `El usuario ${email} ha enviado el siguiente mensaje:\n ${mensaje}.`,
        });
        console.log('Mensaje enviado: %s', info.messageId);
    }catch(err){
        res = false
    }
    
    return res
    
    };
const sendEmail = async (email,nombre) => {
    let res = true
    try{
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'jmtr2000@gmail.com', // Coloca aquí tu correo de Gmail
            pass: 'kdzdrtcldxhxcupi', // Coloca aquí tu contraseña de Gmail
            },
        });
        let info = await transporter.sendMail({
            from: 'jmtr2000@gmail.com',
            to: email,
            subject: 'Duda de Beelasy',
            text: `Hola ${nombre},\nEl equipo de Beelasy está consultando tu duda y responderá lo más pronto posible.\nUn saludo ;)`,
        });
        console.log('Mensaje enviado: %s', info.messageId);
    }catch(err){
        res = false
    }
    
    return res
    
    };

    router.post('/', async (req, res) => {
        const { email, name, message } = req.body;
      
        // Verificar si se proporcionan el email, el nombre y el mensaje
        if (!email || !name || !message) {
          return res.status(400).json({ error: 'Por favor, proporcione un email, un nombre y un mensaje.' });
        }
      
        try{
            await sendEmailToConsultant(email,message);
            await sendEmail(email,name);;
            return res.status(200).json({"result":"mensaje enviado satisfactoriamente"})
        }catch{
            return res.status(500).json({error:"El servicio de email ha fallado"})
        }
      });

module.exports = router;