import { App } from "antd";
import axios from "axios";

export const useApiClient = <T = any>(url: string) => {
  const { notification } = App.useApp();

  async function getAll(params?: any) {
    const response = await axios.get<Response.IPaginationResult<T>>(url, {
      params,
    });
    if (response.success) {
      return response;
    } else {
      notification.error({ message: response.message });
    }
  }

  async function getById(id: number) {
    const response = await axios.get<T>(`${url}/${id}`);
    if (response.success) {
      return response;
    } else {
      notification.error({ message: response.message });
    }
  }

  async function create(data: T) {
    const response = await axios.post<T>(url, data);
    if (response.success) {
      return response;
    } else {
      notification.error({ message: response.message });
    }
  }

  async function update(id: number, data: T) {
    const response = await axios.put<T>(`${url}/${id}`, data);
    if (response.success) {
      return response;
    } else {
      notification.error({ message: response.message });
    }
  }

  async function deleteById(id: number) {
    const response = await axios.delete<T>(`${url}/${id}`);
    if (response.success) {
      return response;
    } else {
      notification.error({ message: response.message });
      throw new Error();
    }
  }

  return { getAll, getById, create, update, deleteById };
};
