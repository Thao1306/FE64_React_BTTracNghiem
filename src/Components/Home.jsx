import React, { Component } from "react";
import MultipleChoice from "./MultipleChoice";
import FillInBlank from "./FillInBlank";
import { Button, Container, Divider, Typography } from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";
import { Fragment } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      score: null,
    };
  }
  handleSubmit = () => {
    let scoreCheck = 0;
    for (let item of this.props.ansList) {
      if (item.ans.exact) {
        scoreCheck += 1;
      }
    }
    this.setState({
      score: scoreCheck,
    });
  };
  render() {
    return (
      <Container>
        <Typography variant="h3" component="h1" align="center">
          Online Test
        </Typography>
        <MultipleChoice />
        <FillInBlank />
        <Container align="center">
          <Button
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
            component="button"
            style={{ margin: 20 }}
            size="large"
          >
            Submit
          </Button>
          {this.state.score ? (
            <Typography variant="h4" gutterBottom>
              Tổng số điểm đạt được là: {this.state.score}
            </Typography>
          ) : (
            <Fragment></Fragment>
          )}
        </Container>
      </Container>
    );
  }
  componentDidMount() {
    axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/questions",
      method: "GET",
    })
      .then((res) => {
        this.props.dispatch({ type: "GET_QUESTIONS", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
const mapStateToProps = (state) => {
  return {
    ansList: state.Questions.answerList,
  };
};

export default connect(mapStateToProps)(Home);
