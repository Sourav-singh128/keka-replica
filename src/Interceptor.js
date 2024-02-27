import fetchIntercept from "fetch-intercept";

export const intercept = () => {
  const token = sessionStorage.getItem("token");
  console.log("token-inter ", token);
  fetchIntercept.register({
    request: function (url, config) {
      console.log("config ", config);
      console.log("url ", url);
      if (!url.includes("api.Cloudinary.com")) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("header-intercept ", config);
      }
      return [url, config];
    },
    requestError: (error) => {
      return Promise.reject(error);
    },

    response: (response) => {
      // modify response here.
      return response;
    },

    responseError: (error) => {
      return Promise.reject(error);
    },
  });
};
