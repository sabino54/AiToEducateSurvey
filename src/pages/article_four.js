import React, { useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import 'react-tippy/dist/tippy.css';
import { questions } from "../Data/articlequestions";
import RenderHighlight from "../Data/renderhighlight";

const createQuoteReasoningMap = (annotations) => {
  const map = {};
  annotations.forEach(annotation => {
    const normalizedQuote = annotation.quote.trim(); // Normalize the quote
    map[normalizedQuote] = {
      reasoning: annotation.reasoning,
      technique: annotation.technique,
      rating: annotation.rating
    };
  });
  return map;
};
  

const Article_four = ({ answers, setAnswers, navigateTo, articleJSON }) => {

  const quoteReasoningMap = createQuoteReasoningMap(articleJSON.annotations);

  const getTooltipText = (quote) => {
    const annotation = quoteReasoningMap[quote];

    if (!annotation) {
      return { title: "No techniques provided", content: "No reasoning provided" };
    }
    const title = annotation.technique;
    const content = annotation.reasoning;
    return { title, content };
  };
  
  
  const [isComplete, setIsComplete] = useState(false);

  const handleOptionChange = (questionId, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
      text: articleJSON.headline
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Check if all questions have been answered
    const allAnswered = questions.every(question => answers[question.id] !== undefined);
    setIsComplete(allAnswered);
  }, [answers, questions]);


    const renderQuestion = (question) => (
      <div key={question.id} style={{margin: 10}}>
          <div style={{ margin: 12 }}>{question.questionText}</div>
          <form>
              {question.answerOptions.map((option, index) => (
                  <div key={index}>
                      <input
                          type="radio"
                          id={`${question.id}-${option}`}
                          name={`question-${question.id}`}
                          value={option}
                          onChange={(e) => handleOptionChange(question.id, e.target.value)}
                          checked={answers[question.id] === option}
                          style={{ marginTop: 10, margin: 10 }}
                      />
                      <label htmlFor={`${question.id}-${option}`}>{option}</label>
                  </div>
              ))}
          </form>
      </div>
  );

  return (
    <div style={styles.articleContainer}>
        <div style={{ marginBottom: '60px' }}>
        <div style={styles.logoContainer}>
            <img src={articleJSON.logo} alt="Logo" style={styles.logo} />
        </div>
        <p style={styles.sourceTextContainer}>Source: {articleJSON.source}</p>
        <p style={styles.articleTitle}>{articleJSON.headline}</p>
        <Highlighter
          highlightClassName="YourHighlightClass"
          searchWords={Object.keys(quoteReasoningMap)}
          autoEscape={true}
          textToHighlight={articleJSON.text}
          highlightTag={({ children, highlightIndex }) => {
            const quote = children.toString();
            console.log(quote)
            const tooltipData = getTooltipText(quote);
            return (
              <RenderHighlight 
                tooltipTitle={tooltipData.title}
                tooltipText={tooltipData.content}
              >
                {children}
              </RenderHighlight>
            );
          }}          
          style={styles.preformattedStyle}
        />
        </div> 
        {questions.map(renderQuestion)}
        <div style={styles.buttonContainer}>
            <button 
                style={{ ...styles.button, backgroundColor: isComplete ? '#007BFF' : '#CCCCCC', cursor: isComplete ? "pointer" : "not-allowed" }}
                onClick={() => isComplete && navigateTo('exitQuestions')}
                disabled={!isComplete}
            >
                Next
            </button>
        </div>
    </div>
);

};

const styles = {
    preformattedStyle: {
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        lineHeight: 1.4,
    },
    articleContainer: {
        marginRight: "25%",
        marginLeft: "25%",
        paddingBottom: 10,
        display: 'flex', // Added for flex layout
        flexDirection: 'column', // Stack items vertically
        justifyContent: 'space-between', // Space between items

    },
    articleTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Arial',
        marginTop: 25,
    },
    buttonContainer: {

        alignSelf: 'center', // Align button to the right
    },
    button: {
        fontSize: '18px', // Set the font size
        padding: '10px', // Add padding (optional)
        borderRadius: '5px',
        cursor: "pointer",
        backgroundColor: '#007BFF',
        marginBottom: 10,
        //fontWeight: 'bold',
        color: "white",
        width: '70px', // Set the width of the button
        // height: '45px', // Set the height of the button
        border: '1px solid #ccc', // A solid, light grey border; change as needed
        boxShadow: 'none', // Removes any shadow effect
        backgroundImage: 'none', // Removes any gradient background
        marginTop: 18,
    },
    logoContainer: {
      textAlign: 'center', // Centers the content
      padding: '10px', // Adds some space around the logo
  },
  logo: {
      maxWidth: '100%', // Ensures the logo is not wider than its container
      maxHeight: '150px', // Sets a maximum height for the logo
      height: 'auto', // Keeps the aspect ratio of the logo
  },
  sourceTextContainer: {
    textAlign: 'center', // Centers the content
    padding: '10px', // Adds some space around the text
    fontSize: 26, // Sets the font size
    fontWeight: 'bold',
},
};

export default Article_four;
