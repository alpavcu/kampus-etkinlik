import { createContext, useContext, useState, type ReactNode } from "react";
import type { CampusEvent, Category } from "../types/campus-event";
import type { EventFormData } from "../types/EventFormData";
import { events as initialEvents } from "../data/events";

export interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

function toEvent(id: string, data: EventFormData): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as Category,
    date: data.date,
    time: data.time,
    location: data.location.trim(),
    capacity: Number(data.capacity),
    description: data.description.trim(),
    image: "/afis.svg",
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(data: EventFormData) {
    setEvents((prev) => [...prev, toEvent(`event-${Date.now()}`, data)]);
  }

  function updateEvent(id: string, data: EventFormData) {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...toEvent(id, data), image: e.image || "/afis.svg" } : e
      )
    );
  }

  function deleteEvent(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents(): EventsContextValue {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
}
