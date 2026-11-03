import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import type { EventFormData } from "../types/EventFormData";
import EventForm from "../components/forms/EventForm";

const emptyForm: EventFormData = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
};

export default function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <div className="form-kapsayici">
      <h2>Etkinlik Ekle</h2>
      <EventForm
        initialData={emptyForm}
        submitText="Kaydet"
        onSubmit={(data) => {
          addEvent(data);
          navigate("/admin");
        }}
      />
    </div>
  );
}
