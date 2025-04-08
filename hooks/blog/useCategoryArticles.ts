import axios from "axios";
import qs from "qs";
import { useEffect, useReducer } from "react";
import type { GetCategoryArticlesResult } from "../../server/headlessCMSHTTP";

interface State {
  isLoading: boolean;
  pageSize: number;
  articles: GetCategoryArticlesResult["data"];
  pagesCount: number;
  error: unknown;
}

const initialState: State = {
  isLoading: true,
  pageSize: 1,
  articles: [],
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
  FETCH_ALL_SUCCESS: (state, { articles, pagesCount }) => ({
    ...state,
    isLoading: false,
    articles,
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
  categoryId: number;
  page: number;
}
const useCategoryArticles = ({ locale, categoryId, page }: Args) => {
  const [{ isLoading, pageSize, articles, pagesCount, error }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    dispatch({ type: "FETCH_ALL_START" });

    axios
      .get<GetCategoryArticlesResult>(
        `/api/blog/categories/${categoryId}/articles`,
        {
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
        }
      )
      .then(({ data: { data, count } }) => {
        dispatch({
          type: "FETCH_ALL_SUCCESS",
          articles: data,
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
  }, [locale, categoryId, pageSize, page]);

  return {
    isLoading,
    pageSize,
    articles,
    pagesCount,
    error,
  };
};

export default useCategoryArticles;
