import axios from "axios";
import qs from "qs";
import { useEffect, useReducer } from "react";
import type { GetWriterArticlesResult } from "../../server/headlessCMSHTTP";

interface State {
  isLoading: boolean;
  pageSize: number;
  articles: GetWriterArticlesResult["data"];
  articlesCount: number;
  pagesCount: number;
  error: unknown;
}

const initialState: State = {
  isLoading: true,
  pageSize: 12,
  articles: [],
  articlesCount: 0,
  pagesCount: 0,
  error: null,
};

type Action =
  | {
      type: "FETCH_ALL_START";
    }
  | {
      type: "FETCH_ALL_SUCCESS";
      articles: State["articles"];
      articlesCount: State["articlesCount"];
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
  FETCH_ALL_SUCCESS: (state, { articles, articlesCount, pagesCount }) => ({
    ...state,
    isLoading: false,
    articles,
    articlesCount,
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

interface Args {
  locale: string;
  writerId: number;
  page: number;
}
const useWriterArticles = ({ locale, writerId, page }: Args) => {
  const [
    { isLoading, pageSize, articles, articlesCount, pagesCount, error },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    dispatch({ type: "FETCH_ALL_START" });

    axios
      .get<GetWriterArticlesResult>(`/api/blog/writers/${writerId}/articles`, {
        params: {
          locale,
          limit: pageSize,
          offset: (page - 1) * pageSize,
          withCount: true,
        },
        paramsSerializer: {
          serialize: (params) => {
            return qs.stringify(params, {
              encodeValuesOnly: true,
            });
          },
        },
        signal,
      })
      .then(({ data: { data, count } }) => {
        dispatch({
          type: "FETCH_ALL_SUCCESS",
          articles: data,
          articlesCount: count!,
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
  }, [locale, writerId, pageSize, page]);

  return {
    isLoading,
    pageSize,
    articles,
    articlesCount,
    pagesCount,
    error,
  };
};

export default useWriterArticles;
