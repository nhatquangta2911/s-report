import axios from "axios";

export default function Caller(endpoint, method = "GET", body = {}) {
  return axios(`${endpoint}`, {
    method: method,
    data: body,
    headers: {
      Authorization: `key=AAAAGzuKBWI:APA91bHcgUqNorXUEMlrD6Bq00gVQK6gnAEDoNhguNfxQjMVjqNs5uuGIzbj1Se8_gt9f0yueoHFpDG10RK-6kfJu-RtBiBMDVr0DSNcp2NU3GSxplokQ1P5fvH-9sEqlRJi6itGE12K`,
      "Content-Type": "application/json"
    }
  });
}
