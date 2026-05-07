import { useEffect, useState } from "react";
import { Badge } from "flowbite-react";
import { TbPoint } from "react-icons/tb";
import { Icon } from "@iconify/react";
import { Link } from "react-router";

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
}

const coverColors = [
  "linear-gradient(135deg, #f97316, #ea580c)",
  "linear-gradient(135deg, #06b6d4, #0891b2)",
  "linear-gradient(135deg, #ec4899, #db2777)",
];

const categoryColors: Record<string, string> = {
  mystery: "bg-purple-100 text-purple-700",
  history: "bg-yellow-100 text-yellow-700",
  love: "bg-pink-100 text-pink-700",
  fiction: "bg-blue-100 text-blue-700",
  english: "bg-green-100 text-green-700",
  science: "bg-cyan-100 text-cyan-700",
};

const formatDate = (id: number) => {
  const dates = ["Mon, Dec 19", "Sun, Dec 18", "Sat, Dec 17"];
  return dates[id % 3];
};

const BlogCards = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Record<number, User>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch 3 posts
        const postsRes = await fetch("https://dummyjson.com/posts?limit=3");
        const postsData = await postsRes.json();
        setPosts(postsData.posts);

        // ✅ Fixed: added <number> to new Set
        const userIds = [...new Set<number>(postsData.posts.map((p: Post) => p.userId))];
        const userMap: Record<number, User> = {};

        await Promise.all(
          userIds.map(async (id) => {
            const res = await fetch(`https://dummyjson.com/users/${id}`);
            const user = await res.json();
            userMap[id] = user;
          })
        );

        setUsers(userMap);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-12 gap-30">
        {[1, 2, 3].map((i) => (
          <div className="lg:col-span-4 col-span-12" key={i}>
            <div className="rounded-lg shadow-md bg-white dark:bg-darkgray overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200 dark:bg-gray-700" />
              <div className="px-6 pb-6 pt-4 flex flex-col gap-3">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-30">
      {posts.map((post, i) => {
        const user = users[post.userId];
        const category = post.tags[0] || "General";
        const categoryClass =
          categoryColors[category] || "bg-gray-100 text-gray-600";

        return (
          <div className="lg:col-span-4 col-span-12" key={post.id}>
            <Link to="/posts" className="group">
              <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-0 relative w-full break-words overflow-hidden">

                {/* Cover gradient */}
                <div className="relative">
                  <div
                    className="w-full h-48 flex items-end p-4"
                    style={{ background: coverColors[i % coverColors.length] }}
                  >
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Badge
                    color={"muted"}
                    className="absolute bottom-5 end-5 font-semibold"
                  >
                    2 min Read
                  </Badge>
                </div>

                <div className="px-6 pb-6">
                  {/* User avatar */}
                  {user ? (
                    <img
                      src={user.image}
                      className="h-10 w-10 rounded-full -mt-7 relative z-1 border-2 border-white"
                      alt={user.firstName}
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full -mt-7 relative z-1 bg-gray-300" />
                  )}

                  {/* Category */}
                  <span
                    className={`inline-block mt-6 text-xs font-semibold px-3 py-1 rounded-full capitalize ${categoryClass}`}
                  >
                    {category}
                  </span>

                  {/* Title */}
                  <h5 className="text-lg my-4 group-hover:text-primary line-clamp-2 font-semibold">
                    {post.title}
                  </h5>

                  {/* Stats */}
                  <div className="flex items-center">
                    <div className="flex gap-2 me-6 items-center">
                      <Icon
                        icon="solar:eye-outline"
                        height="18"
                        className="text-dark"
                      />
                      <span className="text-sm text-darklink">
                        {post.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Icon
                        icon="solar:like-outline"
                        height="18"
                        className="text-dark"
                      />
                      <span className="text-sm text-darklink">
                        {post.reactions.likes}
                      </span>
                    </div>
                    <div className="flex gap-1 items-center ms-auto">
                      <TbPoint size={15} className="text-dark" />
                      <span className="text-sm text-darklink">
                        {formatDate(post.id)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default BlogCards;