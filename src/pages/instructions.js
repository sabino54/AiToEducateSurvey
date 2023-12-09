import React, {useEffect} from 'react';
import toolImage from "../Data/tool_screenshot.png"

const Instructions = ({navigateTo}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={styles.articleContainer}>
      <h1>Instructions</h1>
      <p>Please read these instructions carefully, as understanding them is important for successfully completing the study. After reading the instructions, you will need to complete a comprehension quiz to confirm that you understood the task.</p>
      
      <p>The following survey will involve reading and analyzing news articles from various outlets. After you have read the article, you will be asked a few questions about what you read, and will be asked to measure how reliable of a source you believe the article came from. You may be assisted by a reading tool that looks like this:</p>
      
      <img src={toolImage} style={styles.imageStyle}/>
  
      <p>This tool will point out quotes it believes to be biased or misleading and will explain why. If you are assisted by the tool, you will be asked at the end how useful you found it and if the quotes it highlighted were accurately rated. You will not be able to return to the article after moving on.</p>
  
      <p>In total, you will read 4 articles and answer 28 questions. It is important to read each story carefully and respond to the questions to the best of your ability.</p>
    
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigateTo('preSurvey')}>Previous</button>    
        <button style={{ ...styles.button, backgroundColor: '#007BFF' }} onClick={() => navigateTo('articleOne')}>START</button>   
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
      marginRight: "20%",
      marginLeft: "20%",
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
  imageStyle: {
    marginTop: '20px',  // Adjust the top margin
    marginBottom: '20px', // Adjust the bottom margin
    border: '1px solid black',
    width: "80%"
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


export default Instructions;
