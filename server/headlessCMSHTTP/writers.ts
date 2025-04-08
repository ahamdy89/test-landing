import instance from "./instance";
import type { BlogRecord, WriterAttributes } from "./types";

type GetWriterByIdResult = BlogRecord<
  WriterAttributes & {
    localizations: {
      data: Array<BlogRecord<Pick<WriterAttributes, "locale">>>;
    };
  }
>;
async function getWriterById(
  writerId: number
): Promise<GetWriterByIdResult | null> {
  const {
    data: { data: writers },
  } = await instance.get<{ data: GetWriterByIdResult }>(
    `/writers/${writerId}`,
    {
      params: {
        populate: {
          photo: {
            fields: ["*"],
          },
          localizations: {
            fields: ["locale"],
          },
        },
      },
    }
  );

  return writers;
}

export type { GetWriterByIdResult };
export { getWriterById };
