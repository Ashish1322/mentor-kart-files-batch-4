const Messages = require("../modals/Messages");
// this function will send the message
const sendMessage = async (req, res) => {
  // receiver = objectId ( String)
  // message = String
  try {
    const { message, reciever } = req.body;
    let messageId;
    if (reciever > req.user._id) {
      messageId = reciever + req.user._id;
    } else {
      messageId = req.user._id + reciever;
    }

    // insert the data
    await Messages.create({
      message: message,
      sender: req.user._id,
      reciever: reciever,
      messageId: messageId,
    });

    return res.status(200).json({ success: true, message: "Messege Sent" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// It will read all the messages
const fetchAllMessages = async (req, res) => {
  try {
    const { reciever } = req.params;

    // generate message Id
    let messageId;
    if (reciever > req.user._id) {
      messageId = reciever + req.user._id;
    } else {
      messageId = req.user._id + reciever;
    }

    // fetch all the messages of this messageId
    const messeges = await Messages.find({ messageId: messageId });

    return res.status(200).json({ success: true, messeges });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { sendMessage, fetchAllMessages };
