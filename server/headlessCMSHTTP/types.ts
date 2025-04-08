interface BlogRecord<T extends Record<string, any>> {
  id: number;
  attributes: T;
}

interface ListMeta {
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  };
}

interface MediaAttributes {
  alternativeText: string | null;
  caption: string | null;
  mime: string;
  previewURL: string | null;
  url: string;
  height: number;
  width: number;
  size: number;
}

interface CategoryAttributes {
  locale: string;
  title: string;
  description: string;
  color: string;
  illustration: {
    data: null | BlogRecord<MediaAttributes>;
  };
}

interface ArticleAttributes {
  locale: string;
  title: string;
  content: string;
  call_to_action_text: string | null;
  call_to_action_url: string | null;
  read_time_json: {
    minutes: number;
    time: number;
    words: number;
  };
  createdAt: string;
  updatedAt: string;
  cover_photo: {
    data: null | BlogRecord<MediaAttributes>;
  };
}

interface WriterAttributes {
  locale: string;
  full_name: string;
  bio: string;
  facebook_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
  tiktok_url?: string;
  instagram_url?: string;
  photo: {
    data: null | BlogRecord<MediaAttributes>;
  };
}

interface FAQAttributes {
  question: string;
  answer: string;
}

export type {
  BlogRecord,
  ListMeta,
  MediaAttributes,
  CategoryAttributes,
  ArticleAttributes,
  WriterAttributes,
  FAQAttributes,
};
