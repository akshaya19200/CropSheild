import { useEffect, useState } from "react";
import {
  Sprout,
  Droplets,
  Thermometer,
  ShieldCheck,
  ArrowUpRight
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

import {
  getCropOverview,
  getMonitoring,
  getWaterStress,
  getWeather,
  getRecommendations
} from "../services/api";

export default function Dashboard() {
  const [overview, setOverview] =
    useState(null);

  const [monitoring, setMonitoring] =
    useState(null);

  const [water, setWater] =
    useState(null);

  const [weather, setWeather] =
    useState(null);

  const [recommendations, setRecommendations] =
    useState([]);

  useEffect(() => {
    Promise.all([
      getCropOverview(),
      getMonitoring(),
      getWaterStress(),
      getWeather("Coimbatore"),
      getRecommendations()
    ])
      .then(
        ([
          overviewRes,
          monitoringRes,
          waterRes,
          weatherRes,
          recommendationRes
        ]) => {
          setOverview(overviewRes.data);
          setMonitoring(
            monitoringRes.data
          );
          setWater(waterRes.data);
          setWeather(weatherRes.data);
          setRecommendations(
            recommendationRes.data
          );
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <PageHeader
        title="Farm Overview"
        subtitle="Monitor your farm health and make better decisions."
      />

      <div className="stats-grid">
        <StatCard
          icon={<Sprout size={21} />}
          title="Active Farms"
          value={overview?.totalCrops ?? 0}
          subtitle="Registered farms"
          trend="+12%"
        />

        <StatCard
          icon={<Droplets size={21} />}
          title="Soil Moisture"
          value={`${monitoring?.moisture ?? 0}%`}
          subtitle="Optimal range"
          trend="Healthy"
        />

        <StatCard
          icon={
            <Thermometer size={21} />
          }
          title="Temperature"
          value={`${monitoring?.temperature ?? 0}°C`}
          subtitle="Current field temperature"
        />

        <StatCard
          icon={
            <ShieldCheck size={21} />
          }
          title="Farm Health"
          value="88%"
          subtitle="Overall crop condition"
          trend="+5.4%"
        />
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <h3>Environmental Overview</h3>
              <span>
                Live farm conditions
              </span>
            </div>
          </div>

          <div className="environment-grid">
            <div className="environment-item">
              <span>Humidity</span>
              <strong>
                {monitoring?.humidity ?? 0}%
              </strong>

              <div className="progress">
                <div
                  style={{
                    width: `${monitoring?.humidity ?? 0}%`
                  }}
                />
              </div>
            </div>

            <div className="environment-item">
              <span>Soil Moisture</span>
              <strong>
                {monitoring?.moisture ?? 0}%
              </strong>

              <div className="progress">
                <div
                  style={{
                    width: `${monitoring?.moisture ?? 0}%`
                  }}
                />
              </div>
            </div>

            <div className="environment-item">
              <span>Water Stress</span>
              <strong>
                {water?.stress || "Low"}
              </strong>

              <div className="progress">
                <div
                  style={{
                    width:
                      water?.stress ===
                      "High"
                        ? "85%"
                        : "35%"
                  }}
                />
              </div>
            </div>

            <div className="environment-item">
              <span>Rain Chance</span>
              <strong>
                {weather?.rainfallChance ?? 0}%
              </strong>

              <div className="progress">
                <div
                  style={{
                    width: `${weather?.rainfallChance ?? 0}%`
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3>
                Smart Recommendations
              </h3>

              <span>
                Action items for today
              </span>
            </div>
          </div>

          <div className="recommendation-list">
            {recommendations
              .slice(0, 4)
              .map((item, index) => (
                <div
                  className="recommendation-item"
                  key={index}
                >
                  <div>
                    <strong>
                      {item.title}
                    </strong>

                    <p>
                      {item.description}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={17}
                  />
                </div>
              ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>Farm Performance</h3>
            <span>
              Current overall performance indicators
            </span>
          </div>
        </div>

        <div className="performance-grid">
          <div className="performance-card">
            <span>Crop Health</span>
            <strong>88%</strong>
            <div className="performance-bar">
              <div style={{ width: "88%" }} />
            </div>
          </div>

          <div className="performance-card">
            <span>Water Efficiency</span>
            <strong>76%</strong>
            <div className="performance-bar">
              <div style={{ width: "76%" }} />
            </div>
          </div>

          <div className="performance-card">
            <span>Productivity</span>
            <strong>82%</strong>
            <div className="performance-bar">
              <div style={{ width: "82%" }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}