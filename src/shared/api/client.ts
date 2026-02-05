import createClient from "openapi-fetch";
import type { paths } from "./v1";
import { BACKEND_URL } from "@/shared/config";

const client = createClient<paths>({
  baseUrl: BACKEND_URL,
});

export const { GET, POST, PUT, DELETE } = client;
