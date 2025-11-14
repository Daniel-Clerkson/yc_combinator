"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify"
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "NOT SIGNED IN",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: "slug",
        current: slug, // if `slug` is a string. Replace as needed.
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

  const created = await writeClient.create({ _type: "startup", ...startup });

    // return a stable id property that client code can use
    return parseServerActionResponse({
      ...created,
      id: created._id,
      error: "",
      status: "SUCCESS",
    })

  } catch (error) {
    // prefer console.error for operational errors (keeps logs visible without debug clutter)
    console.error(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
