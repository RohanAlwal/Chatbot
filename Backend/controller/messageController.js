const Message = require("../models/message");

const sendMessage = async(req, res) => {
    try{
        const {sender, message} = req.body;
        if(!sender || !message){
            return res.status(400).json({error:"Need At least sender or message."});
        }
        const newMessage = new Message({sender, message});
        await newMessage.save();

        req.io.emit("receiveMessage", {sender, message});
        res.status(201).json({succes:true, message:"Message sent successfully!"});  

    } catch(err){
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getMessage = async(req, res) => {
    try{
        const message = await Message.find().sort({createdat:1});
        res.status(200).json(message);
    } catch(err){
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {sendMessage, getMessage};