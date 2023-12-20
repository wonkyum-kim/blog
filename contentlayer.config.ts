import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import GithubSlugger from 'github-slugger';

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blog/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'string', required: true },
    description: { type: 'string', required: true },
    toc: {
      type: 'boolean',
      required: false,
      default: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => post._raw.sourceFileName.replace('.mdx', ''),
    },
    headings: {
      type: 'json',
      resolve: async (doc) => {
        const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const slugger = new GithubSlugger();
        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
          ({ groups }) => {
            const flag = groups?.flag;
            const content = groups?.content;
            return {
              level:
                flag?.length == 1 ? 'one' : flag?.length == 2 ? 'two' : 'three',
              text: content,
              slug: content ? slugger.slug(content) : undefined,
            };
          }
        );
        return headings;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Blog],
  mdx: {
    rehypePlugins: [
      rehypeCodeTitles,
      rehypeSlug,
      [
        // @ts-ignore
        rehypePrettyCode,
        {
          theme: 'github-dark',
          defaultLang: 'plaintext',
        },
      ],
      // @ts-ignore
      rehypeHighlight,
    ],
  },
});
