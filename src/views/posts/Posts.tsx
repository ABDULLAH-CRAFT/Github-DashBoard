import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "src/api/posts";

const Posts = () => {
  // Local UI State
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");


  const {
    data,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 1000 * 60,
  });

  // Safe posts array
  const posts = data?.posts ?? [];

  // Unique tags list
  const allTags = [
    "All",
    ...Array.from(new Set(posts.flatMap((p) => p.tags))),
  ];

  // Search + Filter
  const filtered = posts.filter((p) => {
    const matchSearch = p.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchTag =
      selectedTag === "All" ||
      p.tags.includes(selectedTag);

    return matchSearch && matchTag;
  });

  // Loading UI
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Error UI
  if (error instanceof Error) {
    return (
      <div className="p-6 text-center text-red-500 font-medium">
        ⚠️ {error.message}
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark dark:text-white">
          Posts
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Fetched from DummyJSON API — {posts.length} total posts
        </p>

        {isFetching && (
          <p className="text-xs text-blue-500 mt-1">
            Refreshing...
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total Posts",
            value: posts.length,
            color: "bg-blue-50 text-blue-600",
          },
          {
            label: "Total Views",
            value: posts
              .reduce((a, b) => a + b.views, 0)
              .toLocaleString(),
            color: "bg-purple-50 text-purple-600",
          },
          {
            label: "Total Likes",
            value: posts.reduce(
              (a, b) => a + b.reactions.likes,
              0
            ),
            color: "bg-green-50 text-green-600",
          },
          {
            label: "Total Tags",
            value: allTags.length - 1,
            color: "bg-yellow-50 text-yellow-600",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl p-4 ${stat.color}`}
          >
            <p className="text-2xl font-bold">
              {stat.value}
            </p>

            <p className="text-sm mt-1 opacity-80">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-darkgray dark:text-white dark:border-gray-600"
        />

        <select
          value={selectedTag}
          onChange={(e) =>
            setSelectedTag(e.target.value)
          }
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-darkgray dark:text-white dark:border-gray-600"
        >
          {allTags.map((tag) => (
            <option
              key={tag}
              value={tag}
            >
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Posts */}
      {filtered.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No posts found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-darkgray rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-dark dark:text-white text-sm mb-2 line-clamp-2">
                {post.title}
              </h3>

              {/* Body */}
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 mb-4">
                {post.body}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
                <span>
                  👁 {post.views.toLocaleString()}
                </span>

                <span>
                  👍 {post.reactions.likes}
                </span>

                <span>
                  👎 {post.reactions.dislikes}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;