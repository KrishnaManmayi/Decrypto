import { useEffect, useReducer } from "react";
import axios from "axios";

const ACTIONS = {
  INITIATE_REQUEST: "initiate_request",
  FETCH_DATA: "fetch_data",
  ERROR: "error",
};

const initialState = {
  data: [],
  error: null,
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INITIATE_REQUEST:
      return { ...state, data: [], loading: true };
    case ACTIONS.FETCH_DATA:
      return { ...state, data: action.payload.data, loading: false };
    case ACTIONS.ERROR:
      return { ...state, data: [], error: action.payload };
    default:
      return state;
  }
};

const useFetch = (url, options) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: ACTIONS.INITIATE_REQUEST });
      try {
        const response = await axios.get(url, options? JSON.parse(options) : null);
        dispatch({ type: ACTIONS.FETCH_DATA, payload: response });
      } catch (error) {
        dispatch({ type: ACTIONS.ERROR, payload: error.error });
      }
    };

    fetchData();
  },[url,options]);
  return state;
};

export default useFetch;
