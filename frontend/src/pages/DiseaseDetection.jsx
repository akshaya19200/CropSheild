import { useState } from "react";
import {
  ScanSearch,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import { analyzeDisease } from "../services/api";

export default function DiseaseDetection() {
  const [crop, setCrop] = useState("Tomato");
  const [symptoms, setSymptoms] =
    useState("");

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResult(null);

    try {
      const response =
        await analyzeDisease({
          crop,
          symptoms
        });

      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Disease Detection"
        subtitle="Identify crop risks and receive immediate treatment guidance."
      />

      <div className="disease-layout">
        <section className="panel">
          <div className="disease-icon-box">
            <ScanSearch size={32} />
          </div>

          <h3>Crop Health Analysis</h3>

          <p className="muted">
            Enter crop details and observed
            symptoms for a rapid risk assessment.
          </p>

          <form
            className="disease-form"
            onSubmit={handleAnalyze}
          >
            <label>Crop</label>

            <select
              value={crop}
              onChange={(e) =>
                setCrop(e.target.value)
              }
            >
              <option>Tomato</option>
              <option>Chilli</option>
              <option>Maize</option>
              <option>Rice</option>
              <option>Potato</option>
            </select>

            <label>
              Observed Symptoms
            </label>

            <textarea
              rows="7"
              value={symptoms}
              onChange={(e) =>
                setSymptoms(e.target.value)
              }
              placeholder="Example: Yellow leaves with brown spots..."
            />

            <button
              className="primary-button"
              type="submit"
              disabled={loading}
            >
              <ScanSearch size={18} />
              {loading
                ? "Analyzing..."
                : "Analyze Crop"}
            </button>
          </form>
        </section>

        <section className="panel">
          {!result ? (
            <div className="analysis-placeholder">
              <div>🔬</div>

              <h3>
                Analysis results will appear here
              </h3>

              <p>
                Submit crop information to generate
                the risk assessment.
              </p>
            </div>
          ) : (
            <div>
              <div className="result-header">
                <div>
                  <span className="result-label">
                    Detection Result
                  </span>

                  <h2>
                    {result.disease}
                  </h2>
                </div>

                {result.severity ===
                "High" ? (
                  <AlertTriangle
                    size={32}
                  />
                ) : (
                  <ShieldCheck
                    size={32}
                  />
                )}
              </div>

              <div className="result-stats">
                <div>
                  <span>Confidence</span>
                  <strong>
                    {result.confidence}%
                  </strong>
                </div>

                <div>
                  <span>Severity</span>
                  <strong>
                    {result.severity}
                  </strong>
                </div>
              </div>

              <h3>
                Recommended Actions
              </h3>

              <div className="treatment-list">
                {result.treatment.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="treatment-item"
                    >
                      <span>
                        {index + 1}
                      </span>
                      <p>{item}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}