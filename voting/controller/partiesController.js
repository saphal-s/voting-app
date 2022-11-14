const Parties = require('../models/Parties');

exports.create = async (req, res) => {
    try {
        const { title } = req.body
        const response = await new Parties({
            title
        })
        if (req.file) {
            response.image = req.file.path
        }
        response.save();
        res.status(200).json({ msg: 'Parties Created Successfully', response })
    } catch (err) {
        console.log(err)
        res.status(400).send({ msg: 'Parties create failed' })
    }
}

exports.list = async (req, res) => {
    try {
        const response = await Parties.find().sort({ updatedAt: -1 });
        return res.status(200).json({ response: response });
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message })
    }
};

module.exports.updateVote = async (req, res) => {

    const { vote } = req.body
    // var sum = vote + 1;
    try {
        const response = await Parties.findByIdAndUpdate({ _id: req.params.id }, { vote })
        console.log(vote)
        return res.status(200).json({ msg: 'Your Vote added Successfully!' });
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
};
