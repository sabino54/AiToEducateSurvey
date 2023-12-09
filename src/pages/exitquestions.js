import React, {useState, useEffect}from 'react';
import { questions } from "../Data/exitQuestions";
import supabase from '../supabase';

const ExitQuestions = ({ answers, setAnswers, navigateTo, presurveyanswers, articleoneanswers, articletwoanswers, articlethreeanswers, articlefouranswers}) => {
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const submit = async () => {
        const {data, error} = await supabase.from('responses').insert({
          exitquestions: answers,
          preserv: presurveyanswers,
          articleOne: articleoneanswers,
          articleTwo: articletwoanswers,
          articleThree: articlethreeanswers,
          articleFour: articlefouranswers,
          used_tool: true,
        });
        console.log(error)
      }

    const handleSubmit = async () => {
        await submit();
        navigateTo('finished'); 
    };

    const handleOptionChange = (questionId, answer) => {
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [questionId]: answer
      }));
    };
  
    useEffect(() => {
      // Check if all questions have been answered
      const allAnswered = questions.every(question => answers[question.id] !== undefined);
      setIsComplete(allAnswered);
    }, [answers, questions]);

    const renderQuestion = (question) => (
      <div key={question.id} style={{margin: 10}}>
          <div style={{ margin: 12 }}>{question.questionText}</div>
          <form>
              {question.options.map((option, index) => (
                  <div key={index}>
                      <input
                          type="radio"
                          id={`${question.id}-${index}`}
                          name={`question-${question.id}`}
                          value={option}
                          onChange={(e) => handleOptionChange(question.id, e.target.value)}
                          checked={answers[question.id] === option}
                          style={{ marginTop: 10, margin: 10 }}
                      />
                      <label htmlFor={`${question.id}-${index}`}>{option}</label>
                  </div>
              ))}
          </form>
      </div>
    );    

  return (
    <div style={styles.articleContainer}>
      <h1>Exit Questionnaire</h1>
      <p>Please answer the following questions</p>
      {questions.map(renderQuestion)}
      <div style={styles.buttonContainer}>
            <button 
                style={{ ...styles.button, backgroundColor: isComplete ? '#007BFF' : '#CCCCCC', cursor: isComplete ? "pointer" : "not-allowed" }}
                onClick={() => {
                  if (isComplete) {
                      handleSubmit();
                      navigateTo('finished');
                  }
              }}
                disabled={!isComplete}
            >
                SUBMIT
            </button>
        </div>


    </div>
  );
};

// Styles
const styles = {
  preformattedStyle: {
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      lineHeight: 1.4,
  },
  articleContainer: {
      marginRight: 200,
      marginLeft: 200,
      paddingBottom: 10,
      display: 'flex', // Added for flex layout
      flexDirection: 'column', // Stack items vertically
      justifyContent: 'space-between', // Space between items
      lineHeight: 1.2,
  },
  articleTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      fontFamily: 'Arial',
      marginTop: 200,
  },
  buttonContainer: {
      alignSelf: 'center', // Align button to the right
  },
  button: {
    fontSize: '18px', // Set the font size
    padding: '14px', // Add padding (optional)
    borderRadius: '5px',
    cursor: "pointer",
    backgroundColor: 'gray',
    marginBottom: 10,
    color: "white",
    border: '1px solid #ccc', // A solid, light grey border; change as needed
    boxShadow: 'none', // Removes any shadow effect
    backgroundImage: 'none', // Removes any gradient background
    marginTop: 18,
    margin: 10,
},
};


export default ExitQuestions;
