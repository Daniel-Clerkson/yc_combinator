import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypecard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  // Next.js app router provides searchParams as a plain object
  searchParams?: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const session = await auth();

  const params = {search :query || null};

  const { data: productList } = await sanityFetch({ query: STARTUP_QUERY, params });

  return (
    <>
      <section className="pink_container" aria-label="Hero">
        <h1 className="heading">
          Pitch Your Startup <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading max-w-3xl">
          Submit ideas, vote on pitches, and get noticed in virtual
          competitions.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container" aria-labelledby="startups-heading">
        <p id="startups-heading" className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        {productList.length > 0 ? (
          <ul className="mt-7 card_grid" role="list">
            {productList.map((product: StartupTypecard) => (
              <StartupCard key={product._id} product={product} />
            ))}
          </ul>
        ) : (
          <p>No startups found.</p>
        )}
      </section>
      <SanityLive />
    </>
  );
}
