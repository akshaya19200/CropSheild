import { useEffect, useState } from "react";
import {
  Droplets,
  AlertTriangle
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import { getWaterStress } from "../services/api";

export default function WaterStress() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getWaterStress()
      .then((response) =>
        setData(response.data)
      )
      .catch(console.error);
  }, []);

  return (
    <div>
      <PageHeader
        title="Water Stress"
        subtitle="Monitor irrigation conditions and prioritize water usage."
      />

      <div className="stats-grid">
        <div className="metric-panel">
          <Droplets size={23} />
          <span>Soil Moisture</span>
          <strong>
            {data?.moisture ?? 0}%
          </strong>
        </div>

        <div className="metric-panel">
          <span>Rain Forecast</span>
          <strong>
            {data?.rain ?? 0}%
          </strong>
        </div>

        <div className="metric-panel">
          <AlertTriangle size={23} />
          <span>Current Stress</span>
          <strong>
            {data?.stress || "Low"}
          </strong>
        </div>
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>Irrigation Zones</h3>
            <span>
              Zone-level moisture assessment
            </span>
          </div>
        </div>

        <div className="zone-list">
          {data?.zones?.map(
            (zone, index) => (
              <div
                className="zone-card"
                key={index}
              >
                <div>
                  <strong>
                    {zone.zone}
                  </strong>

                  <span>
                    Soil moisture
                  </span>
                </div>

                <div className="zone-progress">
                  <div>
                    <span>
                      {zone.moisture}%
                    </span>

                    <div className="progress">
                      <div
                        style={{
                          width: `${zone.moisture}%`
                        }}
                      />
                    </div>
                  </div>
                </div>

                <span
                  className={`status-pill ${
                    zone.status ===
                    "Critical"
                      ? "danger-pill"
                      : zone.status ===
                          "Monitor"
                        ? "warning-pill"
                        : "healthy-pill"
                  }`}
                >
                  {zone.status}
                </span>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}