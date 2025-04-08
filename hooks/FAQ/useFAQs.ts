import { useEffect, useReducer, useState } from "react";
import { getFAQs } from "../../server/headlessCMSHTTP/FAQ";
import type { FAQAttributes } from "../../server/headlessCMSHTTP/types";

interface State {
  isLoading: boolean;
  pageSize: number;
  FAQs: FAQAttributes[];
  pagesCount: number;
  error: unknown;
}

const initialState: State = {
  isLoading: true,
  pageSize: 8,
  FAQs: [],
  pagesCount: 0,
  error: null,
};

type Action =
  | {
      type: "FETCH_ALL_START";
    }
  | {
      type: "FETCH_ALL_SUCCESS";
      FAQs: State["FAQs"];
      pagesCount: State["pagesCount"];
    }
  | {
      type: "FETCH_ALL_ERROR";
      error: State["error"];
    };

type ActionHandlers = {
  [key in Action["type"]]: (
    state: State,
    action: Extract<Action, { type: key }>
  ) => State;
};

const actionHandlers: ActionHandlers = {
  FETCH_ALL_START: (state, _action) => ({
    ...state,
    isLoading: true,
    error: null,
  }),
  FETCH_ALL_SUCCESS: (state, { FAQs, pagesCount }) => ({
    ...state,
    isLoading: false,
    FAQs,
    pagesCount,
  }),
  FETCH_ALL_ERROR: (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }),
};

function reducer(state: State, action: Action): State {
  return actionHandlers[action.type]?.(state, action as any) || state;
}

const useFAQs = (locale: string, faqType: string, page: number) => {
  const [{ isLoading, pageSize, FAQs, pagesCount, error }, dispatch] =
    useReducer(reducer, initialState);
  const [effectTrigger, setEffectTrigger] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    dispatch({ type: "FETCH_ALL_START" });
    getFAQs(locale, faqType, signal)
      .then(({ data, count }) => {
        let startIndex = (page - 1) * pageSize;
        dispatch({
          type: "FETCH_ALL_SUCCESS",
          FAQs: data.slice(startIndex, startIndex + pageSize),
          pagesCount: Math.ceil((count || 0) / pageSize),
        });
      })
      .catch((error) => {
        if (controller.signal.aborted) {
          return;
        }
        dispatch({ type: "FETCH_ALL_ERROR", error });
      });
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, [locale, pageSize, page, effectTrigger, faqType]);

  const refetch = () => {
    setEffectTrigger({});
  };
  return {
    isLoading,
    pageSize,
    FAQs,
    pagesCount,
    error,
    refetch,
  };
};

export default useFAQs;
