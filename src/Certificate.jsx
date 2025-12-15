import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./certificate.css";

function Certificate() {
  const { course } = useParams();
  const navigate = useNavigate();
  const certificateRef = useRef();
  const username = localStorage.getItem("username");

  // CSS stages (theory + practice)
  const cssStages = [
    "css_stage1_completed",
    "css_stage2_completed",
    "css_stage3_completed"
  ];

  // GraphQL stages (5 theory + 1 practice)
  const graphqlStages = [
    "course_module1_completed",
    "course_module2_completed",
    "course_module3_completed",
    "course_module4_completed",
    "course_module5_completed",
    "course_practicegraphql_completed" // corrected spelling
  ];

  // UNLOCK LOGIC
  const isUnlocked =
    course.toLowerCase() === "css"
      ? cssStages.every((key) => localStorage.getItem(key) === "true")
      : graphqlStages.every((key) => localStorage.getItem(key) === "true");

  // PDF Download
  const downloadPDF = async () => {
    if (!isUnlocked) {
      alert("Complete all required stages to download the certificate.");
      return;
    }

    const element = certificateRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${course}_certificate.pdf`);
  };

  // If locked → redirect
  if (!isUnlocked) {
    alert("Certificate is locked. Complete the course to unlock it.");
    navigate("/complete");
    return null;
  }

  // Stage Status (optional)
  const cssStageStatus = cssStages.map((key, i) => ({
    stage: ["Beginner", "Intermediate", "Advanced"][i],
    completed: localStorage.getItem(key) === "true",
  }));

  const graphqlStagesStatus = graphqlStages.map((key, i) => ({
    stage: ["module1", "module2", "module3", "module4", "module5", "practicegraphql"][i],
    completed: localStorage.getItem(key) === "true",
  }));

  return (
    <div className="certificate-page">
      <div className="certificate" ref={certificateRef}>
        <div className="content">
          <div className="title">{course} Completion</div>
          <div className="small-text">This is to certify that</div>

          <div className="body-text" style={{ fontSize: "20px", fontWeight: "bold" }}>
            {username}
          </div>

          <div className="vertical-line"></div>

          <div className="body-text">has successfully completed the</div>

          <div className="body-text" style={{ fontSize: "18px", fontWeight: "bold" }}>
            {course} Course
          </div>

          {course.toLowerCase() === "css" && (
            <div className="body-text" style={{ marginTop: "10px", fontSize: "16px" }}></div>
          )}

          <div className="footer-text">through online learning</div>
        </div>

        <div className="certificate-footer">
          <div className="org-text">Organized By,</div>
          <u>
            <p className="signature-text">Vignesh M</p>
          </u>
        </div>
      </div>

      <button className="download-btn" onClick={downloadPDF}>
        Download Certificate
      </button>
    </div>
  );
}

export default Certificate;
