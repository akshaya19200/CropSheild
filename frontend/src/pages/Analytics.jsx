import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import { getAnalytics } from "../services/api";

export default function Analytics() {
  const [data, setData] =
    useState(null);

  useEffect(() => {
    getAnalytics()
      .then((response) =>
        setData(response.data)
      )
      .catch(console.error);
  }, []);

  const maxValue = Math.max(
    ...(data?.weeklyMoisture || [100])
  );

  return (
    <div>
      <PageHeader
        title="Farm Analytics"
        subtitle="Turn farm data into measurable insights."
      />

      <div className="analytics-cards">
        <div className="analytics-score">
          <span>Productivity</span>
          <strong>
            {data?.productivity ?? 0}%
          </strong>
        </div>

        <div className="analytics-score">
          <span>Crop Health</span>
          <strong>
            {data?.cropHealth ?? 0}%
          </strong>
        </div>

        <div className="analytics-score">
          <span>Water Efficiency</span>
          <strong>
            {data?.irrigationEfficiency ??
              0}
            %
          </strong>
        </div>

        <div className="analytics-score">
          <span>Disease Risk</span>
          <strong>
            {data?.diseaseRisk ?? 0}%
          </strong>
        </div>
      </div>

      <div className="analytics-layout">
        <section className="panel">
          <div className="panel-header">
            <div>
              <h3>Weekly Soil Moisture</h3>
              <span>
                Last seven observations
              </span>
            </div>
          </div>

          <div className="bar-chart">
            {(data?.weeklyMoisture || []).map(
              (value, index) => (
                <div
                  className="bar-column"
                  key={index}
                >
                  <div className="bar-value">
                    {value}%
                  </div>

                  <div className="bar-track">
                    <div
                      style={{
                        height: `${
                          (value /
                            maxValue) *
                          100
                        }%`
                      }}
                    />
                  </div>

                  <span>
                    D{index + 1}
                  </span>
                </div>
              )
            )}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3>
                Crop Performance
              </h3>
              <span>
                Health score by crop
              </span>
            </div>
          </div>

          <div className="performance-list">
            {data?.cropPerformance?.map(
              (crop) => (
                <div
                  className="crop-performance"
                  key={crop.crop}
                >
                  <div>
                    <strong>
                      {crop.crop}
                    </strong>

                    <span>
                      {crop.score}%
                    </span>
                  </div>

                  <div className="progress">
                    <div
                      style={{
                        width: `${crop.score}%`
                      }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}