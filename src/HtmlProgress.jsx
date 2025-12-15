import { useNavigate } from "react-router-dom";

const HtmlProgress = () => {
  const navigate = useNavigate();

  const handleViewProgress = () => {
    navigate("/CourseProgress", {
      state: {
        courseName: "HTML Full Stack",
        totalChapters: 12
      }
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome to HTML Course</h2>
      <button onClick={handleViewProgress}>📊 View Progress</button>
    </div>
  );
};

export default HtmlProgress;
