import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import Question from './Questions/Question';
import jsPDF from 'jspdf';
const App = () => {
  const questionnaire = useMemo(() => ({
    essential1: [
      {
        question: "Access Control: Is there a centralized system for managing user access rights and permissions to critical systems and data?",
        options: [
          ["Not Implemented: The organization has not implemented any centralized system for managing user access rights and permissions to critical systems and data.", 0], 
          ["Initial Implementation: The organization has started implementing a centralized system for managing user access rights and permissions, but it is not fully operational or covers all critical systems and data.", 1],
          ["Substantial Implementation: The organization has made significant progress in implementing a centralized system for managing user access rights and permissions, covering some critical systems and data, but there are still some areas that need improvement.", 2], 
          ["Fully Implemented: The organization has fully implemented a centralized system for managing user access rights and permissions, covering all critical systems and data.", 2]
        ],
        choosedOption: null,
      },
      {
        question: "Incident Response: Is there a documented incident response plan that outlines the steps to be taken in the event of a cyber incident?",
        options: [
          ["Not Implemented: The organization does not have a documented incident response plan outlining the steps to be taken in the event of a cyber incident", 0], 
          ["Initial Development: The organization has started developing an incident response plan, but it is not yet fully documented or comprehensive.", 1],
          ["Developing: The organization has a work-in-progress incident response plan, which outlines some steps to be taken in the event of a cyber incident, but it may not cover all potential scenarios or have clear procedures.", 1], 
          ["Partially Implemented: The organization has made some progress in documenting an incident response plan, but there are still significant gaps or areas that need improvement", 1],
          ["Fully Implemented: The organization has a fully documented incident response plan that outlines clear and comprehensive steps to be taken in the event of a cyber incident.", 2]
        ],
        choosedOption: null,
      },
      {
        question: "Patch Management: Are there procedures in place for regularly applying security patches to operating systems and software?",
        options: [
          ["Not Implemented: The organization does not have procedures in place for regularly applying security patches to operating systems and software.", 0], 
          ["Initial Implementation: The organization has started implementing patch management procedures, but they are not yet consistently applied or may not cover all systems and software.", 1],
          ["Developing: The organization has some patch management procedures in place, and efforts are underway to ensure regular application of security patches, but there is room for improvement and consistency.", 1], 
          ["Partially Implemented: The organization has made progress in establishing patch management procedures, but there are still significant gaps or systems and software that do not receive regular security patches.", 1],
          ["Fully Implemented: The organization has fully established procedures for regularly applying security patches to operating systems and software, covering all critical systems and software components.", 2]
        ],
        choosedOption: null,
      },
      {
        question: "Data Protection: Is data encryption used to protect sensitive information stored on company devices or transmitted over networks?",
        options: [
          ["Not Implemented: Data encryption is not used to protect sensitive information stored on company devices or transmitted over networks.", 0], 
          ["Initial Implementation: The organization has started to implement data encryption for sensitive information, but it is not yet consistently applied across all devices and network transmissions.", 1],
          ["Developing: The organization has made some progress in implementing data encryption measures, and efforts are underway to ensure its consistent use, but there is room for improvement. ", 1], 
          ["Partially Implemented: Data encryption is partially implemented to protect sensitive information, but there are still significant gaps in coverage or some devices and network channels remain unencrypted.", 1],
          ["Fully Implemented: The organization has fully implemented data encryption to protect sensitive information on company devices and during network transmissions.", 2]
        ],
        choosedOption: null,
      },
    ],
    essential2: [
      {
        question: "Patch Applications: Is there a documented process for assessing software applications for security vulnerabilities and updates?",
        options: [
          ["Not Implemented: The organization does not have a documented process for assessing software applications for security vulnerabilities and updates.", 0], 
          ["Initial Development: The organization has started developing a process for assessing software applications for security vulnerabilities and updates, but it is not yet fully documented or consistently applied.", 1],
          ["Developing: The organization has made some progress in creating a process for assessing software applications, and efforts are underway to improve its documentation and implementation.", 1], 
          ["Partially Implemented: The organization has a partially documented process for assessing software applications for security vulnerabilities and updates, but there are still significant gaps in coverage or consistency.", 1],
          ["Fully Implemented: The organization has a well-documented and established process for assessing software applications for security vulnerabilities and updates, consistently applied across the organization.", 2]
        ],
        choosedOption: null,
      },
      {
        question: "Patch Testing: Are non-critical patches tested for compatibility and stability before deployment?",
        options: [
          ["Not Implemented: The organization does not have a process for testing non-critical patches for compatibility and stability before deployment.", 0], 
          ["Initial Development: The organization has started developing a process for testing non-critical patches, but it is not yet fully established or consistently applied. ", 1],
          ["Developing: The organization has made some progress in creating a process for testing non-critical patches, and efforts are underway to improve its implementation and coverage", 1], 
          ["Partially Implemented: The organization has a partially established process for testing non-critical patches for compatibility and stability, but there are still significant gaps or inconsistencies. ", 1],
          ["Fully Implemented: The organization has a well-established process for testing non-critical patches for compatibility and stability before deployment, consistently applied across the organization.", 2]
        ],
        choosedOption: null,
      },
      {
        question: "Emergency Patching: Is there a process for emergency patching to address critical security vulnerabilities?",
        options: [
          ["Not Implemented: The organization does not have a process for emergency patching to address critical security vulnerabilities.", 0], 
          ["Initial Development: The organization has started developing a process for emergency patching, but it is not yet fully established or consistently followed.", 1],
          ["Developing: The organization has made some progress in creating a process for emergency patching, and efforts are underway to improve its implementation and response time.", 1], 
          ["Partially Implemented: The organization has a partially established process for emergency patching to address critical security vulnerabilities, but there are still significant gaps or inconsistencies in the response.", 1],
          ["Fully Implemented: The organization has a well-established process for emergency patching, enabling a swift and effective response to critical security vulnerabilities as they arise.", 2]
        ],
        choosedOption: null,
      },
      {
        question: "Patch Verification: Are there procedures to monitor and verify the successful application of software patches across the organization",
        options: [
          ["Not Implemented: The organization does not have procedures to monitor and verify the successful application of software patches across the organization.", 0], 
          ["Initial Development: The organization has started developing procedures for patch verification, but they are not yet fully established or consistently followed.", 1],
          ["Developing: The organization has made some progress in creating procedures for patch verification, and efforts are underway to improve their implementation and coverage.", 1], 
          ["Partially Implemented: The organization has partially established procedures to monitor and verify the successful application of software patches, but there are still significant gaps or inconsistencies in the verification process.", 1],
          ["Fully Implemented: The organization has well-established procedures to monitor and verify the successful application of software patches across the organization, ensuring a reliable and comprehensive verification process.", 2]
        ],
        choosedOption: null,
      },
    ],
    essential3: [
      {
        question: "3Are users in your organization educated on basic safe browsing habits and warned against downloading files from untrusted sources?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 0,
      },
      {
        question: "Do you have browser extensions or security settings in place to block known malicious websites and warn users about potentially harmful content?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 1,
      },
      {
        question: "Has your organization implemented web content filtering and sandboxing mechanisms to isolate potentially malicious or untrusted files and URLs?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 2,
      },
      {
        question: "Do you employ advanced techniques such as runtime application self-protection (RASP) or browser isolation to mitigate the risks of web-based attacks?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 3,
      },
    ],
    essential4: [
      {
        question: "4Are users in your organization educated on basic safe browsing habits and warned against downloading files from untrusted sources?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 0,
      },
      {
        question: "Do you have browser extensions or security settings in place to block known malicious websites and warn users about potentially harmful content?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 1,
      },
      {
        question: "Has your organization implemented web content filtering and sandboxing mechanisms to isolate potentially malicious or untrusted files and URLs?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 2,
      },
      {
        question: "Do you employ advanced techniques such as runtime application self-protection (RASP) or browser isolation to mitigate the risks of web-based attacks?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 3,
      },
    ],
    essential5: [
      {
        question: "5Are users in your organization educated on basic safe browsing habits and warned against downloading files from untrusted sources?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 0,
      },
      {
        question: "Do you have browser extensions or security settings in place to block known malicious websites and warn users about potentially harmful content?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 1,
      },
      {
        question: "Has your organization implemented web content filtering and sandboxing mechanisms to isolate potentially malicious or untrusted files and URLs?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 2,
      },
      {
        question: "Do you employ advanced techniques such as runtime application self-protection (RASP) or browser isolation to mitigate the risks of web-based attacks?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 3,
      },
    ],
    essential6: [
      {
        question: "6Are users in your organization educated on basic safe browsing habits and warned against downloading files from untrusted sources?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 0,
      },
      {
        question: "Do you have browser extensions or security settings in place to block known malicious websites and warn users about potentially harmful content?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 1,
      },
      {
        question: "Has your organization implemented web content filtering and sandboxing mechanisms to isolate potentially malicious or untrusted files and URLs?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 2,
      },
      {
        question: "Do you employ advanced techniques such as runtime application self-protection (RASP) or browser isolation to mitigate the risks of web-based attacks?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 3,
      },
    ],
    essential7: [
      {
        question: "7Are users in your organization educated on basic safe browsing habits and warned against downloading files from untrusted sources?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 0,
      },
      {
        question: "Do you have browser extensions or security settings in place to block known malicious websites and warn users about potentially harmful content?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 1,
      },
      {
        question: "Has your organization implemented web content filtering and sandboxing mechanisms to isolate potentially malicious or untrusted files and URLs?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 2,
      },
      {
        question: "Do you employ advanced techniques such as runtime application self-protection (RASP) or browser isolation to mitigate the risks of web-based attacks?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 3,
      },
    ],
    essential8: [
      {
        question: "8Are users in your organization educated on basic safe browsing habits and warned against downloading files from untrusted sources?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 0,
      },
      {
        question: "Do you have browser extensions or security settings in place to block known malicious websites and warn users about potentially harmful content?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 1,
      },
      {
        question: "Has your organization implemented web content filtering and sandboxing mechanisms to isolate potentially malicious or untrusted files and URLs?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 2,
      },
      {
        question: "Do you employ advanced techniques such as runtime application self-protection (RASP) or browser isolation to mitigate the risks of web-based attacks?",
        options: ["Yes", "No"],
        choosedOption: null,
        maturityLevel: 3,
      },
    ],
  }), []);

  const [completedEssentials, setCompletedEssentials] = useState([]);
  const [userResponses, setUserResponses] = useState({});
  const [currentEssential, setcurrentEssential] = useState(1);
  const [currentQuestion,setCurrentQuestion]=useState(0);

  const handleOptionChange = (selectedOption) => {
    // Find the current essential questions based on the current maturity level
    const currentEssentialQuestions = questionnaire[`essential${currentEssential}`];
  
    // Update the user's answer for the current question
    const updatedQuestions = currentEssentialQuestions.map((question, index) =>
      index === currentQuestion
        ? { ...question, choosedOption: selectedOption }
        : question
    );
  
    // Find the question text for the current question
    const currentQuestionKey = updatedQuestions[currentQuestion].question;
  
    // Update the userResponses state with the integer value
    setUserResponses((prevResponses) => ({
      ...prevResponses,
      [currentQuestionKey]: selectedOption,
    }));
  
    // Check if it's the last question of the current essential
    questionnaire[`essential${currentEssential}`][currentQuestion]["choosedOption"] = selectedOption;
    if(currentQuestion === currentEssentialQuestions.length - 1){
      setcurrentEssential((prevEssential) => prevEssential + 1);
      setCurrentQuestion(0);
    }
    else if(currentQuestion < 1){
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      // console.log("----maturity = ",questionnaire[`essential${currentEssential}`][0]["choosedOption"]);
    }
    else if(currentQuestion >= 1){
      // console.log("----maturity = ",questionnaire[`essential${currentEssential}`][1]["choosedOption"]);
      const sumofmaturity = parseInt(questionnaire[`essential${currentEssential}`][0]["choosedOption"]) + parseInt(questionnaire[`essential${currentEssential}`][1]["choosedOption"]);
      // console.log("sum of maturity = ",sumofmaturity);
      if(sumofmaturity >= 3)setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      else{
        setcurrentEssential((prevEssential) => prevEssential + 1);
        setCurrentQuestion(0);
      }
    }
  };
  useEffect(() => {
    // This will be triggered whenever currentQuestion or currentEssential changes.
    console.log("called ",currentEssential,currentQuestion);
    console.log(`essential${currentEssential}`);
    console.log(questionnaire[`essential${currentEssential}`]);
    console.log("User Responses:", userResponses);
  }, [currentEssential, currentQuestion]);
  
  // Dynamically get the current essential questions based on the current maturity level
  const currentEssentialQuestions = useMemo(
    () => questionnaire[`essential${currentEssential}`],
    [currentEssential, questionnaire]
  );
  // console.log(currentEssential);
  // console.log(currentEssentialQuestions);
  // Find the index of the first unanswered question in the current essential level
  // const currentQuestionIndex = currentEssentialQuestions.findIndex(
  //   (question) => question.choosedOption === null
  // );

  // The questionnaire is completed when there are no more unanswered questions
  const isQuestionnaireCompleted = !currentEssentialQuestions;
  const generatePDFReport = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [210, 297], // A4 size (you can adjust the width and height as needed)
      compress: true,
      lineHeight: 1.2,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 10,
    });
  
    const titleFont = 'bold 30px Arial';
    const titleText = 'User Assessment Report';
    const titleTextWidth = doc.getTextWidth(titleText);

    // Calculate the x-coordinate to center the title
    const centerX = (doc.internal.pageSize.width - titleTextWidth) / 2;

    // Draw the title in the center
    doc.setFont(titleFont);
    doc.text(centerX, 20, titleText);
    let y = 40;

    // Set the maximum content width to fit within the page
    const maxWidth = doc.internal.pageSize.width - 25;
  
    Object.entries(userResponses).forEach(([question, response]) => {
      const questionText = `Question: ${question}`;
      const responseText = `Response: ${response}`;
      
      // Apply word wrapping to response text to prevent overflow
      const lines = doc.splitTextToSize(responseText, maxWidth);
      const liness = doc.splitTextToSize(questionText, maxWidth);
  
      // Calculate the height of the wrapped text
      const lineHeight = doc.getTextDimensions('M').h; // Use 'M' as a dummy character
      const wrappedTextHeight = lines.length * lineHeight;
      const wrappedTextHeights = liness.length * lineHeight;
  
      if (y + wrappedTextHeight + 10 > doc.internal.pageSize.height) {
        // Check if the content will exceed the page height
        doc.addPage(); // Add a new page if necessary
        y = 20; // Reset the vertical position for new page
      }
  
      // doc.text(20, y, questionText);
      doc.text(20, y, liness);
      y += wrappedTextHeights;
      doc.text(20, y + 7, lines);
      y += wrappedTextHeight + 20;
    });
  
    return doc.output('blob'); // Return the PDF content as a Blob
  };
  const handleDownloadPDF = () => {
    const pdfBlob = generatePDFReport();
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'user_report.pdf';
    link.click();
  };

  useEffect(() => {
    if (isQuestionnaireCompleted) {
      console.log("heyyyyyyyyy");
      generatePDFReport();
    }
  }, [isQuestionnaireCompleted]);
  return (
    <div className="App">
      {isQuestionnaireCompleted ? (
        <div>
          <h1>Congratulations! You have completed the assessment.</h1>
          {/* Add any submission or completion message here */}
          <div>
            <h2>User Responses:</h2>
            {Object.keys(userResponses).map((question) => (
              <div>
                <strong>Question:</strong>{question}
                <br />
                <strong>Response:</strong>{userResponses[question]} 
                <br />
                <br />
              </div>
            ))}
            <button onClick={handleDownloadPDF}>Download PDF</button>
          </div>
        </div>
      ) : (
        <>
          {currentEssentialQuestions && currentEssentialQuestions.length > 0 && (
            <Question
              question={questionnaire[`essential${currentEssential}`][currentQuestion]}
              onOptionChange={(selectedOption) => handleOptionChange(selectedOption)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
