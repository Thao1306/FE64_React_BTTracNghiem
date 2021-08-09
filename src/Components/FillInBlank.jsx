import {
  Container,
  TextField,
  Typography,
  Input,
  FormControl,
} from "@material-ui/core";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class FillInBlank extends Component {
  handleChange = (e) => {
    const { value, id } = e.target;
    const question = this.props.questionList.find(
      (item) => item.id.toString() === id
    );

    const existQts = this.props.ansList.find(
      (item) => item.QuestionId.toString() === id
    );

    existQts
      ? (existQts.ans = {
          content: value,
          exact:
            question.answers[0].content.toLowerCase() === value.toLowerCase(),
        })
      : this.props.ansList.push({
          QuestionId: id,
          ans: {
            content: value,
            exact:
              question.answers[0].content.toLowerCase() === value.toLowerCase(),
          },
        });
    this.props.dispatch({type: "SET_ANSWERLIST", payload: this.props.ansList})
  };

  render() {
    const qtType2 = this.props.questionList.filter((item) => {
      return item.questionType === 2;
    });
    return (
      <Container>
        {qtType2.map((item) => {
          return (
            <Fragment key={item.id}>
              <Typography>
                Câu {item.id}: {item.content}
              </Typography>
              <FormControl>
                <TextField
                  margin="normal"
                  variant="outlined"
                  label="câu trả lời"
                  onBlur={this.handleChange}
                  // onChange={this.handleChange}
                  id={item.id}
                ></TextField>
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
export default connect(mapStateToProps)(FillInBlank);
