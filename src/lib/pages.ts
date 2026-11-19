// Page text from src/content/pages/<id>.md, rendered to HTML.
import { getEntry, render, type CollectionEntry } from 'astro:content';

/** Marks paragraphs written entirely in [square brackets] as prompts (shown muted until replaced). */
export const markPrompts = (html: string) => html.replace(/<p>(\[[^<]*\])<\/p>/g, '<p class="prompt">$1</p>');

export async function pageText(id: string): Promise<{ data: CollectionEntry<'pages'>['data']; html: string }> {
  const entry = await getEntry('pages', id);
  if (!entry) throw new Error(`Missing page text: src/content/pages/${id}.md`);
  await render(entry);
  return { data: entry.data, html: markPrompts(entry.rendered?.html ?? '') };
}

/** Any Markdown entry's body as HTML, with bracket prompts marked. */
export async function bodyHtml(entry: Parameters<typeof render>[0]): Promise<string> {
  await render(entry);
  return markPrompts(entry.rendered?.html ?? '');
}
