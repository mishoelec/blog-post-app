import React from "react";

// components
import SearchBar from "../../components/search/search";

// custom hooks
import { useFetch } from "../../hooks/fetchDataHook";

const BlogPosts = () => {
  const { data, error, status } = useFetch(
    "https://newsapi.org/v2/top-headlines?" +
      "country=us&" +
      "apiKey=4ead05860d20444492effffb16b31310"
  );

  console.log(error);

  if (status === "loading") {
    return (
      <div role="status" className="flex justify-center items-center h-screen">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (status === "error") {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <div className="m-5">
        <h2 className="font-bold text-center text-6xl text-slate-700 font-display">
          Our Top Blog Posts
        </h2>
        <p className="text-center mt-4 font-medium text-slate-500">
          OUR NEWS FEED
        </p>
      </div>
      <div className="my-5">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-3">
        {data.articles &&
          data.articles.map((article, index) => (
            <div
              key={index}
              className="bg-white w-full shadow rounded-lg overflow-hidden"
            >
              <img
                src={article.urlToImage}
                className="object-cover h-52 w-full"
                alt=""
              />
              <div className="p-6">
                <span className="block text-slate-400 font-semibold text-sm">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
                <h3 className="mt-3 font-bold text-lg pb-4 border-b border-slate-300">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title}
                  </a>
                </h3>
                <div className="flex mt-4 gap-4 items-center">
                  <span className="flex gap-1 items-center text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    {article.source.name}
                  </span>
                  {/* You can add more icons and data here */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogPosts;
