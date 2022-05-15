const Mailbox = require("../models/mailbox");
const User = require("../models/user");

// Send a single message
exports.postOneMessage = async (req, res) => {
    const newMessage = {
        message: req.body.message,
        readStatus: false,
        senderContact: req.body.senderContact,
        senderName: req.body.senderName,
        subject: req.body.subject,
        timestamp: new Date().getTime(),
        userId: req.params.userId
    };

    try {
        const mailbox = await Mailbox.findOne({ userId: newMessage.userId });
        mailbox.messages.push(newMessage);
        const subdoc = mailbox.messages[0];
        await mailbox.save();

        return res.status(200).json(subdoc);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
    }
};
