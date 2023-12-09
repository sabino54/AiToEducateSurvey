import React, { useState, useEffect } from 'react';
import ArticleOne from "./pages/article_one";
import ConsentForm from './pages/consentForm';
import ArticleTwo from "./pages/article_two";
import ArticleThree from "./pages/article_three";
import ArticleFour from "./pages/article_four";
import PreSurvey from './pages/presurvey';
import Instructions from './pages/instructions';
import ExitQuestions from './pages/exitquestions';
import Finished from './pages/finished';
import JSONa1 from "./Data/unique_quotes_a1.json"
import JSONa2 from "./Data/unique_quotes_a2.json"
import JSONa3 from "./Data/unique_quotes_a3.json"
import JSONa4 from "./Data/unique_quotes_a4.json"

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const articleOrder = shuffleArray([JSONa1, JSONa2, JSONa3, JSONa4]);


const MultipleArticlesReader = () => {
  const [currentPage, setCurrentPage] = useState('consentForm');
  const [consentChecked, setConsentChecked] = useState(false);

  const [preSurveyAnswers, setPreSurveyAnswers] = useState({});
  const [articleOneAnswers, setArticleOneAnswers] = useState({});
  const [articleTwoAnswers, setArticleTwoAnswers] = useState({});
  const [articleThreeAnswers, setArticleThreeAnswers] = useState({});
  const [articleFourAnswers, setArticleFourAnswers] = useState({});
  const [finalAnswers, setFinalAnswers] = useState({})

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  let content;
  switch (currentPage) {
    case 'consentForm':
      content = <ConsentForm consentChecked={consentChecked} setConsentChecked={setConsentChecked} navigateTo={navigateTo} />;
      break;
    case 'preSurvey':
      content = <PreSurvey answers={preSurveyAnswers} setAnswers={setPreSurveyAnswers} navigateTo={navigateTo} />;
      break;
    case 'instructions':
      content = <Instructions navigateTo={navigateTo} />;
      break;
    case 'articleOne':
      content = <ArticleOne  answers={articleOneAnswers} setAnswers={setArticleOneAnswers} navigateTo={navigateTo} articleJSON={articleOrder[0]}/>;
      break;
    case 'articleTwo':
      content = <ArticleTwo  answers={articleTwoAnswers} setAnswers={setArticleTwoAnswers} navigateTo={navigateTo} articleJSON={articleOrder[1]}/>;
      break;
    case 'articleThree':
      content = <ArticleThree answers={articleThreeAnswers} setAnswers={setArticleThreeAnswers} navigateTo={navigateTo} articleJSON={articleOrder[2]}/>;
      break;
    case 'articleFour':
      content = <ArticleFour  answers={articleFourAnswers} setAnswers={setArticleFourAnswers} navigateTo={navigateTo} articleJSON={articleOrder[3]}/>;
      break;
    case 'exitQuestions':
      content = <ExitQuestions answers={finalAnswers} setAnswers={setFinalAnswers} navigateTo={navigateTo} 
      presurveyanswers = {preSurveyAnswers}
      articleoneanswers = {articleOneAnswers}
      articletwoanswers = {articleTwoAnswers}
      articlethreeanswers = {articleThreeAnswers}
      articlefouranswers = {articleFourAnswers}
      />;
      break;
    case 'finished':
    content = <Finished
    />;
    break;
    }

  return <div>{content}</div>;
};

export default MultipleArticlesReader;
