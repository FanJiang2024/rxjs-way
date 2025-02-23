import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  console.log("outer.......", components);
  return {
    ...components,
  }
}