import axios from "axios";
import { makeUseAxios } from "axios-hooks";
import dotenv from 'dotenv';

dotenv.config()

const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

const instance = axios.create({
  baseURL: "https://"+host+":"+port,
  timeout: 10000
});

const useAxios = makeUseAxios({
  axios: instance
});

export default useAxios;
