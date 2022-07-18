import createImageUrlBuilder from "@sanity/image-url";
import client from "lib/sanity.mjs";

const urlForImage = (source) => {
  const imageBuilder = createImageUrlBuilder(client);
  return imageBuilder.image(source).auto("format").fit("max").url();
};

export default urlForImage;
