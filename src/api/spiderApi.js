import { get, post, put, destroy } from "./baseApi";

export const createSpider = async (data) => {
  const spider = await post("/", data);
  return spider.data ? spider.data : spider;
};

export const editSpider = async (data, id) => {
  const spider = await put(`/${id}`, data);
  return spider.data ? spider.data : spider;
};

export const getSpider = async (id) => {
  const spider = await get(`/${id}`);
  return spider && spider.data ? spider.data : spider;
};

export const getSpiders = async () => {
  const spider = await get("/");
  return spider && spider.data ? spider.data : spider;
};

export const deleteSpider = async (id) => {
  const spider = await destroy(`/${id}`);
  return spider.data ? spider.data : spider;
};
