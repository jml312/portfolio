const blockContentToPlainText = (blockContent) => {
  return blockContent
    .map((block) => {
      if (block._type === "block") {
        return block.children.map((child) => {
          if (child._type === "span") {
            return child.text;
          }
        });
      } else if (block._type === "codeBlock") {
        return block.code.code;
      } else return "";
    })
    .join(" ");
};

export default blockContentToPlainText;
