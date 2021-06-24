import { get, post, destroy } from "./baseApi";

export const createEvent = async (data) => {
  const event = await post("/events", data);
  return event.data ? event.data : event;
};

export const mutateEvent = async (data, id) => {
  const event = await post(`/events/${id}`, data);
  return event.data ? event.data : event;
};

export const getEvent = async (id) => {
  const event = await get(`/events/${id}`);
  return event && event.data ? event.data : event;
};

export const getEvents = async () => {
  const events = await get("/events");
  return events && events.data ? events.data : events;
};

export const deleteEvent = async (id) => {
  const event = await destroy(`/events/${id}`);
  return event && event.data ? event.data : event;
};
