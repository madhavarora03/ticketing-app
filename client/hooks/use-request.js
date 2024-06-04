import axios from "axios";
import { useState } from "react";

export default function useRequest({ url, method, body, onSuccess }) {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const res = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(res.data);
      }
      return res.data;
    } catch (error) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            {error.response.data.errors.map((err) => {
              return <li key={err.message}>{err.message}</li>;
            })}
          </ul>
        </div>,
      );
    }
  };

  return { doRequest, errors };
}
