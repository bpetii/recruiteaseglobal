import { apiClient } from "@/app/apiClient";

export const subscribeNewsLetter = async (email: string) => {
  return await apiClient(`/api/newsletter`, {
    method: "POST",
    body: { email },
  });
};

export const submitAppointment = async (info: {
  name: string;
  email: string;
  notes: string;
  phoneNumber: string;
  date: string;
  time: string;
  timezone: string;
}) => {
  return await apiClient(`/api/appointment`, {
    method: "POST",
    body: info,
  });
};

export const sendContact = async (form: { firstName: string; lastName: string; email: string; message: string }) => {
  return await apiClient(`/api/contact`, {
    method: "POST",
    body: form,
  });
};

export const login = async (password: string) => {
  return await apiClient(`/api/admin/login`, {
    method: "POST",
    body: { password },
  });
};

export const logout = async () => {
  return await apiClient(`/api/admin/logout`, {
    method: "POST",
  });
};
