import Question from "../modal/Question.js";

export async function uploadQuestion(req, res) {
  const { subject, questions } = req.body;

  //check the validation of the empty fields
  if (!subject || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ msg: "please fill  the the subject either question field" })
  }

  //checking the empty field  of each question 
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    if (
      !q.question || typeof q.question !== "string" || q.question.trim() === "" ||
      !q.answer || typeof q.answer !== "string" || q.answer.trim() === ""
    ) {
      return res.status(400).json({
        msg: `Invalid question format at index ${i}. Both 'question' and 'answer' are required.`,
      });
    }
  }
  try {
    const existing = await Question.findOne({ subject });

    if (existing) {
      existing.questions.push(...questions);
      await existing.save();
    } else {
      await Question.create({ subject, questions })
    }
    res.status(201).json({ success: true, msg: "theory question  uploaded succesfully" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "internal server error" })
  }

}

export async function questionBySubject(req, res) {
  const { subject } = req.params;

  try {
    const data = await Question.findOne({ subject })

    if (!data || data.questions.length === 0) {
      return res.status(404).json({ success: false, msg: "no question found for this subject" })
    }

    res.status(200).json({ success: true, questions: data.questions });
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"error while hanndling the questionBySubject route"})
    
  }
}