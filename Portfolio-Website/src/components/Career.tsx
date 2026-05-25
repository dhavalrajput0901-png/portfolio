import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          <span>Experience</span>
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Internship</h4>
                <h5>Shreeji Construction</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Assisted in site supervision, material management, and execution of construction work for the Pragat Pranghan Residential Building project.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Internship</h4>
                <h5>Shreeji Construction</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Monitored daily site activities, quality control, and project coordination at the Prajapita Brahma Kumaris Ishwariya Vishwa Vidyalaya project.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Training</h4>
                <h5>BVM Engineering College</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Completed training in structural engineering software and field practices, gaining practical knowledge of structural analysis, drafting, RCC and steel structure concepts, load calculations, and interpretation of structural drawings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
