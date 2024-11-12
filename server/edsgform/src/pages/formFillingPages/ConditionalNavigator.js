const ConditionalNavigator = {
    getNextSection: (currentSection, responses) => {
      for (const question of currentSection.questions) {
        const answer = responses[question.id];
        if (question.pathOnAnswer && question.pathOnAnswer[answer]) {
          return question.pathOnAnswer[answer];
        }
      }
      return "end";
    },
    getPreviousSection: (currentSection, responses) => {
      // Logic for getting previous section based on form structure
    }
  };
  
  export default ConditionalNavigator;
  