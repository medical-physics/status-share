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

        const user = await User.findOne({ _id: newMessage.userId });
        user.unreadMessages += 1;
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

// Mark a message as read
exports.updateMessageReadStatus = (req, res) => {
    try {
        const mailbox = Mailbox.findOne({ userId: req.params.userId });
        const message = mailbox.messages.id(req.params.messageId);
        message.readStatus = true;
        await mailbox.save();

        const user = User.findOne({ _id: req.params.userId });
        user.unreadMessages -= 1;
        await user.save();

        return res.status(200).json({ readStatus: true });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
    }
};

// Update a message
exports.updateMessage = (req, res) => {
    const updatedMessage = {
        message: req.body.message,
        senderContact: req.body.senderContact,
        senderName: req.body.senderName,
        subject: req.body.subject
    };

    try {
        const mailbox = Mailbox.findOne({ userId: req.params.userId });
        const message = mailbox.messages.id(req.params.messageId);
        message.message = updatedMessage.message;
        message.senderContact = updatedMessage.senderContact;
        message.senderName = updatedMessage.senderName;
        message.subject = updatedMessage.subject;
        await message.save();

        return res.status(200).json(updatedMessage);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
    }
};
