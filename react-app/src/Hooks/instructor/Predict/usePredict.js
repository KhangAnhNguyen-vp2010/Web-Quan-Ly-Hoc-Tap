import { useEffect, useState } from "react";
import axiosML from "../../../api/axiosML";

export const usePredict = ({ assignmentScores, testScores }) => {
  const [showResult, setShowResult] = useState(false);
  const [model_type, setModel_type] = useState(null);

  const [inputData, setInputData] = useState({
    StudyTime: assignmentScores.studyTime + testScores.studyTime || 0,
    AssignmentOnTime: assignmentScores.totalAssignmentsOntime || 0,
    LateAssignment: assignmentScores.totalAssignmentsLate || 0,
    TestOnTime: testScores.totalTestsOntime || 0,
    LateTest: testScores.totalTestsLate || 0,
    AvgAssignmentScore: assignmentScores.AVG || 0,
    AvgTestScore: testScores.AVG || 0,
    ProcessScore: Number(
      ((assignmentScores.AVG + testScores.AVG) / 2).toFixed(1)
    ),
  });

  const [predictedScore, setPredictedScore] = useState(null);

  const fetchResult = async () => {
    try {
      switch (model_type) {
        case "linear":
          const res1 = await axiosML.post(
            `/predict-LinearRegression`,
            inputData
          );
          console.log(res1);
          setPredictedScore(res1.data);
          break;

        case "random-forest":
          const res2 = await axiosML.post(`/predict-RandomForest`, inputData);
          console.log(res2);
          setPredictedScore(res2.data);
          break;

        case "xg-boost":
          const res3 = await axiosML.post(`/predict-XGBoost`, inputData);
          console.log(res3);
          setPredictedScore(res3.data);
          break;

        default:
          break;
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchResult();
  }, [model_type]);

  return {
    showResult,
    model_type,
    setShowResult,
    setModel_type,
    predictedScore,
  };
};
