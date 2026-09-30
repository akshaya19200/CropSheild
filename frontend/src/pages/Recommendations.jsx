import { useEffect, useState } from "react";
import {
  Droplets,
  Bug,
  Sprout,
  CloudRain
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import {
  getRecommendations
} from "../services/api";

const iconMap = {
  Water: Droplets,
  Disease: Bug,
  Soil: Sprout,
  Weather: CloudRain
};

export default function Recommendations() {
  const [items, setItems] =
    useState([]);

  useEffect(() => {
    getRecommendations()
      .then((response) =>
        setItems(response.data)
      )
      .catch(console.error);
  }, []);

  return (
    <div>
      <PageHeader
        title="Smart Recommendations"
        subtitle="Personalized actions derived from current farm conditions."
      />

      <div className="recommendation-page-grid">
        {items.map((item, index) => {
          const Icon =
            iconMap[item.category] ||
            Sprout;

          return (
            <div
              className="recommendation-card"
              key={index}
            >
              <div className="recommendation-icon">
                <Icon size={23} />
              </div>

              <div className="recommendation-content">
                <div className="recommendation-meta">
                  <span>
                    {item.category}
                  </span>

                  <span
                    className={`priority-badge ${item.priority.toLowerCase()}`}
                  >
                    {item.priority}
                  </span>
                </div>

                <h3>{item.title}</h3>

                <p>
                  {item.description}
                </p>

                <button className="text-button">
                  View action →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}