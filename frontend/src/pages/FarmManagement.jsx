import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  MapPin
} from "lucide-react";

import PageHeader from "../components/PageHeader";

import {
  getFarms,
  createFarm,
  deleteFarm
} from "../services/api";

export default function FarmManagement() {
  const [farms, setFarms] = useState([]);

  const [form, setForm] = useState({
    farmName: "",
    location: "",
    crop: "",
    soilType: "",
    area: ""
  });

  const [showForm, setShowForm] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const loadFarms = async () => {
    try {
      const response = await getFarms();
      setFarms(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFarms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.farmName ||
      !form.location ||
      !form.crop ||
      !form.soilType
    ) {
      setMessage(
        "Please fill all required fields."
      );
      return;
    }

    try {
      await createFarm(form);

      setForm({
        farmName: "",
        location: "",
        crop: "",
        soilType: "",
        area: ""
      });

      setShowForm(false);
      setMessage(
        "Farm added successfully."
      );

      loadFarms();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to add farm."
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFarm(id);

      setFarms((prev) =>
        prev.filter(
          (farm) => farm._id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <PageHeader
        title="Farm Management"
        subtitle="Manage your registered farms and cultivation details."
        action={
          <button
            className="primary-button"
            onClick={() =>
              setShowForm(!showForm)
            }
          >
            <Plus size={18} />
            Add Farm
          </button>
        }
      />

      {message && (
        <div className="success-banner">
          {message}
        </div>
      )}

      {showForm && (
        <section className="panel form-panel">
          <div className="panel-header">
            <div>
              <h3>Add New Farm</h3>
              <span>
                Enter your farm information
              </span>
            </div>
          </div>

          <form
            className="form-grid"
            onSubmit={handleSubmit}
          >
            <div>
              <label>Farm Name</label>
              <input
                value={form.farmName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    farmName:
                      e.target.value
                  })
                }
                placeholder="Green Valley Farm"
              />
            </div>

            <div>
              <label>Location</label>
              <input
                value={form.location}
                onChange={(e) =>
                  setForm({
                    ...form,
                    location:
                      e.target.value
                  })
                }
                placeholder="Coimbatore"
              />
            </div>

            <div>
              <label>Crop</label>
              <input
                value={form.crop}
                onChange={(e) =>
                  setForm({
                    ...form,
                    crop:
                      e.target.value
                  })
                }
                placeholder="Tomato"
              />
            </div>

            <div>
              <label>Soil Type</label>
              <input
                value={form.soilType}
                onChange={(e) =>
                  setForm({
                    ...form,
                    soilType:
                      e.target.value
                  })
                }
                placeholder="Red Soil"
              />
            </div>

            <div>
              <label>Area (acres)</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={form.area}
                onChange={(e) =>
                  setForm({
                    ...form,
                    area:
                      e.target.value
                  })
                }
                placeholder="2.5"
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="primary-button"
              >
                Save Farm
              </button>
            </div>
          </form>
        </section>
      )}

      <div className="farm-grid">
        {farms.map((farm) => (
          <div
            className="farm-card"
            key={farm._id}
          >
            <div className="farm-card-top">
              <div className="farm-icon">
                🌱
              </div>

              <button
                className="delete-button"
                onClick={() =>
                  handleDelete(
                    farm._id
                  )
                }
              >
                <Trash2 size={17} />
              </button>
            </div>

            <h3>{farm.farmName}</h3>

            <div className="location-row">
              <MapPin size={15} />
              {farm.location}
            </div>

            <div className="farm-details">
              <div>
                <span>Crop</span>
                <strong>
                  {farm.crop}
                </strong>
              </div>

              <div>
                <span>Soil</span>
                <strong>
                  {farm.soilType}
                </strong>
              </div>

              <div>
                <span>Area</span>
                <strong>
                  {farm.area} acres
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong className="healthy">
                  Healthy
                </strong>
              </div>
            </div>
          </div>
        ))}

        {farms.length === 0 && (
          <div className="empty-state">
            <div>🌾</div>
            <h3>No farms added yet</h3>
            <p>
              Add your first farm to start
              monitoring your crops.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}