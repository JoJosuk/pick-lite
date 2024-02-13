/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
const cheerio = require("cheerio");

export default function ImageFeature({ link }) {
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const body = { link: link };
        const response = await axios.post("/api/imagefetch", body);
        const ogpMetadata = response.data;
        console.log(
          "image feature object is",
          ogpMetadata.image,
          ogpMetadata.favicon
        );
        if (ogpMetadata.image) {
          setMetadata(ogpMetadata.image);
        } else if (ogpMetadata.favicon) {
          setMetadata(ogpMetadata.favicon);
        }
      } catch (error) {
        setError(error);
      }
    }

    fetchMetadata();
  }, [link]);

  return (
    <>
      {metadata && (
        <img
          className="object-cover w-full h-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src={metadata}
          alt="Image from website"
          onError={() => setError("Image not found")}
        />
      )}
      {!metadata && !error && <p>Loading image...</p>}
      {error && <p>Error: {error.message}</p>}
    </>
  );
}
