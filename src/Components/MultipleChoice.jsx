import {
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
} from "@material-ui/core";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class MultipleChoice extends Component {
  handleClick = (e, v) => {
    const idQuestion = e.target.name;
    const existQuestion = this.props.ansList.find(
      (item) => item.QuestionId === idQuestion
    );
    existQuestion
      ? (existQuestion.ans = {
          content: v,
          exact: this.checkExact(idQuestion, v),
        })
      : this.props.ansList.push({
          QuestionId: idQuestion,
          ans: {
            content: v,
            exact: this.checkExact(idQuestion, v),
          },
        });
    this.props.dispatch({
      type: "SET_ANSWERLIST",
      payload: this.props.ansList,
    });
  };

  checkExact = (qtsId, ansId) => {
    const qts = this.props.questionList.find((item) => {
      return item.id.toString() === qtsId;
    });
    const res = qts.answers.find((item) => item.id === ansId);
    return res.exact;
  };

  render() {
    const qtType1 = this.props.questionList.filter((item) => {
      return item.questionType === 1;
    });
    return (
      <Container>
        {qtType1.map((item) => {
          return (
            <Fragment key={item.id}>
              <Typography gutterBottom>
                Câu {item.id}: {item.content}
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  name={item.id.toString()}
                  onChange={this.handleClick}
                  id={item}
                >
                  {item.answers.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      value={item.id}
                      control={<Radio />}
                      label={item.content}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Fragment>
          );
        })}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questionList: state.Questions.questionList,
    ansList: state.Questions.answerList,
  };
};

export default connect(mapStateToProps)(MultipleChoice);
