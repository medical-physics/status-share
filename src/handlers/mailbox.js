const Mailbox = require("../models/mailbox");
const User = require("../models/user");

// Fetch mailbox for one user
// Uses pagination with params page and pageSize
exports.getMessages = async (req, res) => {
  const fetchParams = {
    page: req.body.page || 1,
    pageSize: req.body.pageSize || 10,
  };

  try {
    const mailbox = await Mailbox.findOne({ userId: req.params.userId });
    if (!mailbox) {
      return res
        .status(404)
        .json({ message: `User ${req.params.userId}'s mailbox not found.` });
    }

    const sortedMessages = mailbox?.messages.sort(
      (a, b) => b.timestamp - a.timestamp
    ).reverse();

    const offset = (fetchParams.page - 1) * fetchParams.pageSize;
    const paginatedMessages = sortedMessages?.slice(
      offset,
      fetchParams.page * fetchParams.pageSize
    );

    if (paginatedMessages) {
      mailbox.messages = paginatedMessages;
    }

    return res.status(200).json(mailbox);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message });
  }
};

// Send a single message
exports.postOneMessage = async (req, res) => {
  const newMessage = {
    message: req.body.message,
    readStatus: false,
    senderContact: req.body.senderContact,
    senderName: req.body.senderName,
    subject: req.body.subject,
    timestamp: new Date().toString(),
  };

  try {
    const mailbox = await Mailbox.findOne({ userId: req.params.userId });
    await mailbox.messages.push(newMessage);
    const subdoc = mailbox.messages[0];
    await mailbox.save();

    const user = await User.findOne({ _id: req.params.userId });
    user.unreadMessages += 1;
    await user.save();

    return res.status(200).json(subdoc);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message });
  }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
  try {
    const mailbox = await Mailbox.findOne({ userId: req.params.userId });
    await mailbox.messages.id(req.params.messageId).remove();
    await mailbox.save();

    return res.status(200).json({ message: "Message deleted successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message });
  }
};

// Mark a message as read
exports.updateMessageReadStatus = async (req, res) => {
  try {
    const mailbox = await Mailbox.findOne({ userId: req.params.userId });
    const message = await mailbox.messages.id(req.params.messageId);
    message.readStatus = true;
    await mailbox.save();

    const user = await User.findOne({ _id: req.params.userId });
    user.unreadMessages -= 1;
    await user.save();

    return res.status(200).json({ readStatus: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message });
  }
};

// Update a message
exports.updateMessage = async (req, res) => {
  const updatedMessage = {
    message: req.body.message,
    senderContact: req.body.senderContact,
    senderName: req.body.senderName,
    subject: req.body.subject,
  };

  try {
    const mailbox = await Mailbox.findOne({ userId: req.params.userId });
    const message = await mailbox.messages.id(req.params.messageId);
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
