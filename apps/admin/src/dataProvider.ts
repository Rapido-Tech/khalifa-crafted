import { DataProvider, DeleteParams, DeleteResult, RaRecord } from "ra-core";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL ?? "https://api.khalifacrafted.store"}/api/v1`;

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { page = 1, perPage = 10 } = params.pagination ?? {};
    const { field = "id", order = "ASC" } = params.sort ?? {};

    const response = await axios.get(`${API_URL}/${resource}`, {
      params: {
        _page: page,
        _limit: perPage,
        _sort: field,
        _order: order,
        ...params.filter,
      },
      withCredentials: true,
    });
    console.log("getList data", response);

    const data = Array.isArray(response.data) ? response.data : [];

    return {
      data: data.map((item) => ({
        ...item,
        id: item._id,
      })),
      total: data.length,
    };
  },

  getOne: async (resource, { id }) => {
    const response = await axios.get(`${API_URL}/${resource}/${id}`, {
      withCredentials: true,
    });
    console.log("getList data", response);

    const record = response.data;

    return {
      data: {
        ...record,
        id: record._id,
      },
    };
  },

  getMany: async (resource, { ids }) => {
    const response = await axios.get(`${API_URL}/${resource}`, {
      params: {
        id: ids,
      },
      withCredentials: true,
    });

    return { data: response.data };
  },

  getManyReference: async (
    resource,
    { target, id, pagination, sort, filter }
  ) => {
    const { page, perPage } = pagination;
    const { field, order } = sort;

    const response = await axios.get(`${API_URL}/${resource}`, {
      params: {
        _page: page,
        _limit: perPage,
        _sort: field,
        _order: order,
        [target]: id,
        ...filter,
      },
      withCredentials: true,
    });

    console.log("getManyReference data", response);

    const data = Array.isArray(response.data) ? response.data : [];

    return {
      data: data.map((item) => ({
        ...item,
        id: item._id,
      })),
      total: data.length,
    };
  },

  create: async (resource, { data }) => {
    console.log("create data", data);
    const response = await axios.post(`${API_URL}/${resource}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    console.log("data on create success", response);

    const record = response.data;

    return {
      data: {
        ...record,
        id: record._id,
      },
    };
  },

  update: async (resource, { id, data }) => {
    const response = await axios.put(`${API_URL}/${resource}/${id}`, data, {
      withCredentials: true,
    });

    return { data: response.data };
  },

  updateMany: async (resource, { ids, data }) => {
    const responses = await Promise.all(
      ids.map((id) =>
        axios.put(`${API_URL}/${resource}/${id}`, data, {
          withCredentials: true,
        })
      )
    );

    return {
      data: responses.map((res) => res.data.id || res.data._id || res.data.id),
    };
  },

  delete: async <RecordType extends RaRecord = any>(
    resource: string,
    { id }: DeleteParams<RecordType>
  ): Promise<DeleteResult<RecordType>> => {
    const response = await axios.delete(`${API_URL}/${resource}/${id}`, {
      withCredentials: true,
    });

    // Option 1: If your API returns the deleted record in the response
    if (response.data) {
      return { data: response.data };
    }

    // Option 2: If your API returns 204 or nothing, construct a minimal valid RecordType
    return { data: { id } as RecordType };
  },

  deleteMany: async (resource, { ids }) => {
    const responses = await Promise.all(
      ids.map((id) =>
        axios.delete(`${API_URL}/${resource}/${id}`, {
          withCredentials: true,
        })
      )
    );

    responses.map((res) => res.data);

    return { data: ids };
  },
};
