const options = {
  method: "get",
  url: "/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
};
const dataOptions = {
  method: "get",
  url: "/api/posts",
  headers: {
    "Content-Type": "application/json",
  },
};

const validateUser = async () => {
  const response = await fetch("/api/auth", options);
  const data = await response.json();
  console.log(data);
  if (data.status === "fail") {
    return false;
  }
  return true;
};
const fetchData = async () => {
  const response = await fetch("/api/posts", dataOptions);
  const data = await response.json();
  console.log(data);
  return data;
};

const fetchTags = (resultlist) => {
  const tags = [];
  if (!Array.isArray(resultlist)) {
    return resultlist;
  }
  resultlist.forEach((results) => {
    results.tags.forEach((tag) => {
      if (!tags.includes(tag.toLowerCase())) {
        tags.push(tag.toLowerCase());
      }
    });
  });
  return tags;
};
export { validateUser, fetchData, fetchTags };
