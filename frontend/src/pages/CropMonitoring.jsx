import { useEffect, useState } from "react";
import {
  Droplets,
  Thermometer,
  Activity
} from "lucide-react";

import PageHeader from "../components/PageHeader";

import {
  getCrops,
  getMonitoring
} from "../services/api";

export default function CropMonitoring() {
  const [crops, setCrops] = useState([]);
  const [monitoring, setMonitoring] =
    useState(null);

  useEffect(() => {
    Promise.all([
      getCrops(),
      getMonitoring()
    ])
      .then(([cropRes, monitorRes]) => {
        setCrops(cropRes.data);
        setMonitoring(
          monitorRes.data
        );
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <PageHeader
        title="Crop Monitoring"
        subtitle="Real-time crop and environmental monitoring."
      />

      <div className="stats-grid">
        <div className="metric-panel">
          <Droplets size={23} />
          <span>Soil Moisture</span>
          <strong>
            {monitoring?.moisture ?? 0}%
          </strong>
        </div>

        <div className="metric-panel">
          <Thermometer size={23} />
          <span>Temperature</span>
          <strong>
            {monitoring?.temperature ?? 0}°C
          </strong>
        </div>

        <div className="metric-panel">
          <Activity size={23} />
          <span>Humidity</span>
          <strong>
            {monitoring?.humidity ?? 0}%
          </strong>
        </div>

        <div className="metric-panel">
          <span>Stress Level</span>
          <strong>
            {monitoring?.stress || "Low"}
          </strong>
        </div>
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>Crop Health Monitoring</h3>
            <span>
              Current crop-level conditions
            </span>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Farm</th>
                <th>Crop</th>
                <th>Growth Stage</th>
                <th>Moisture</th>
                <th>Temperature</th>
                <th>Health</th>
              </tr>
            </thead>

            <tbody>
              {crops.map((crop) => (
                <tr key={crop.id}>
                  <td>
                    {crop.farmName}
                  </td>

                  <td>
                    <strong>
                      {crop.crop}
                    </strong>
                  </td>

                  <td>
                    {crop.growthStage}
                  </td>

                  <td>
                    {crop.moisture}%
                  </td>

                  <td>
                    {crop.temperature}°C
                  </td>

                  <td>
                    <span className="status-pill healthy-pill">
                      Healthy
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {crops.length === 0 && (
          <div className="empty-state">
            <div>🌱</div>
            <h3>No crop data available</h3>
            <p>
              Add a farm to start monitoring crops.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}