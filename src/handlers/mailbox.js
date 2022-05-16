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
        const user = await User.findOne({ _id: newMessage.userId });
        mailbox.messages.push(newMessage);
        const subdoc = mailbox.messages[0];
        user.unreadMessages += 1;
        await mailbox.save();
        await user.save();

        return res.status(200).json(subdoc);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
    }
};

// Delete a message
exports.deleteMessage = (req, res) => {
    try {
        const mailbox = Mailbox.findOne({ userId: req.params.userId });
        mailbox.messages.id(req.params.messageId).remove();
        await mailbox.save();

        return res.status(200).json({ message: "Message deleted successfully." });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
    }
};
