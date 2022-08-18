import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import portfolio from "./documents/portfolio";
import blog from "./documents/blog";
import pageViews from "./documents/views";
import submissions from "./documents/submissions";

import projects from "./objects/projects";
import experience from "./objects/experience";
import bio from "./objects/bio";
import imageSection from "./objects/imageSection";
import codeBlock from "./objects/codeBlock";

const PORTFOLIO = [portfolio, bio, projects, experience];
const BLOG = [imageSection, codeBlock, blog];
const PAGE_VIEWS = [pageViews];
const SUBMISSIONS = [submissions];

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    ...PORTFOLIO,
    ...BLOG,
    ...SUBMISSIONS,
    ...PAGE_VIEWS
  ])
});
