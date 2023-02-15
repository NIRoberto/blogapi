import LetterModel from "../model/Letter";

export const getNewsLetter = async (req, res) => {
  try {
    const letters = await LetterModel.find();
    return res.status(200).json({
      status: "success",
      number: letters.length,
      letters,
    });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      error: error.message,
    });
  }
};
export const sendLetter = async (req, res) => {
  try {
    const newLetter = await LetterModel.create({
      email: req.body.email,
    });
    return res.status(201).json({
      status: "success",
      message: "News letter send successfully",
      content: {
        newLetter,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
export const deleteNewsLetter = async (req, res) => {
  const id = req.params.id;
  try {
    const letter = await LetterModel.findByIdAndDelete(id);
    if (!letter) {
      return res.status(400).json({
        status: "failed",
        message: "Id of newsletter email not found",
      });
    }
    return res.status(204).json({
      status: "success",
      message: "Email deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error,
    });
  }
};
