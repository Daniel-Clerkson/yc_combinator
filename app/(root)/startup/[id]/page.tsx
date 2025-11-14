import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import markdownit from "markdown-it";
import View from "@/components/View";
import StartupCard, { StartupTypecard } from "@/components/StartupCard";

const md = markdownit();

// Async component that fetches the startup data
// This component is wrapped in Suspense, so it won't block the page render
async function StartupContent({ id }: { id: string }) {
  const product = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  const { select: editorPosts } = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
    slug: "editor-s-pick",
  });

  if (!product) {
    return notFound();
  }

  const parsedContent = md.render(product?.pitch || "");

  return (
    <>
        <section className="pink_container !min-h-[230px]">
          <p className="tag">{formatDate(product?._createdAt)}</p>

          <p className="heading">{product.title}</p>
          <p className="sub-heading !max-w-5xl">{product.description}</p>
        </section>

        <section className="section_container">
          <img
            src={product.image}
            alt="Thumbnail"
            className="w-full rounded-xl"
          />

          <div className="space-y-5 mt-10 max-w-4xl mx-auto">
            <div className="flex-between gap-5">
              <Link
                href={`/user/${product.author?.id}`}
                className="flex gap-2 items-center mb-3"
              >
                <Image
                  src={product.author.image}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="rounded-full drop-shadow-lg"
                />
                <div>
                  <p className="text-20-medium">{product.author?.name}</p>
                  <p className="text-16-medium !text-black-300">
                    @{product.author?.username}
                  </p>
                </div>
              </Link>

              <p className="category-tag">{product.category}</p>
            </div>
            <h3 className="text-30-bold">Startup Details</h3>

            {parsedContent ? (
              <article
                className="prose break-all max-w-4xl"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <div className="no-result">No Description</div>
            )}
          </div>

          <hr className="divider" />

          {editorPosts?.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <p className="text-30-semibold">Editor's Picks</p>

              <ul className="mt-7 card_grid-sm">
                {editorPosts.map((post: StartupTypecard, i: number) => (
                  <StartupCard key={i} product={post} />
                ))}
              </ul>
            </div>
          )}

          <View id={id} />
        </section>
      </>
    );
  }

  const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    return (
      <>
        <Suspense fallback={<Skeleton className="view-skeleton" />}>
          <StartupContent id={id} />
        </Suspense>
      </>
    );
  };

  export default page;
