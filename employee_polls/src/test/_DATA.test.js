import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

describe("saveQuestion function", () => {
  it('should return correct data when provided with valid inputs', async () => {
    const optionOneText = 'optionOne';
    const optionTwoText = 'optionTwo';
    const author = 'author';

    const result = await _saveQuestion({ optionOneText, optionTwoText, author });

    expect(result.author).toBe(author);
    expect(result.optionOne.text).toBe(optionOneText);
    expect(result.optionTwo.text).toBe(optionTwoText);
  });

  it('should throw an error if required fields are missing', async () => {
    const optionOneText = 'optionOne';
    const author = 'author';

    await expect(_saveQuestion({ optionOneText, author }))
      .rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
  });
});

describe("saveQuestionAnswer function", () => {
  it('should resolve to true when given valid data', async () => {
    const qid = "8xf0y6ziyjabvozdd253nd";
    const authedUser = "sarahedo";
    const answer = 'optionOne';

    await expect(_saveQuestionAnswer({ authedUser, qid, answer }))
      .resolves.toBe(true);
  });

  it('should throw an error if required fields are missing', async () => {
    const qid = "8xf0y6ziyjabvozdd253nd";
    const answer = 'optionOne';

    await expect(_saveQuestionAnswer({ qid, answer }))
      .rejects.toEqual("Please provide authedUser, qid, and answer");
  });
});
