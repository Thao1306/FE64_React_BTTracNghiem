const initialState = {
  questionList: [],
  answerList: [],
};

export const Questions = (state = initialState, action) => {
  switch (action.type) {
    case "GET_QUESTIONS":
      state.questionList = action.payload;
      return { ...state };
      case "SET_ANSWERLIST":
        state.answerList = action.payload
        return { ...state}
    default:
      return state;
  }
};
