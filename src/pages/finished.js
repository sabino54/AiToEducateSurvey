import React from 'react';

const Finished = () => {
  return (
    <div style={styles.articleContainer}>
      <h1>Thank you for answering our survey!</h1>
      <p>Your answers have been submitted. You may close your window now.</p>
    </div>
  );
};

// Styles
const styles = {
  articleContainer: {
      marginRight: 200,
      marginLeft: 200,
      paddingBottom: 10,
      display: 'flex', // Added for flex layout
      flexDirection: 'column', // Stack items vertically
      justifyContent: 'space-between', // Space between items
      lineHeight: 1.2,
  },
};


export default Finished;
