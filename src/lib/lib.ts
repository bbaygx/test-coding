import { QueryClient } from "@tanstack/react-query";

export const baseUrl = import.meta.env.VITE_BASE_URL;
export const queryClient = new QueryClient();
export const currentDate = new Date().toLocaleString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZoneName: "short",
});
