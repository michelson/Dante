export function getUrl(url: any, domain: any) {
  if (!url) return;
  if (url.includes('://')) return url;
  if (!domain) return url
  return `${domain}${url}`;
}

export function exitBlockToParagraph(editor: any) {
  const selection = editor?.state?.selection;

  if (!selection) return false;

  const insertPos = selection.node
    ? selection.to
    : selection.$anchor?.depth > 0
      ? selection.$anchor.after(1)
      : null;

  if (typeof insertPos !== "number") return false;

  const $after = editor.state.doc.resolve(insertPos);
  const nextNode = $after.nodeAfter;

  if (
    nextNode?.type?.name === "paragraph" &&
    nextNode.childCount === 0 &&
    !nextNode.textContent
  ) {
    return editor.chain().focus(insertPos + 1).run();
  }

  return editor
    .chain()
    .insertContentAt(insertPos, { type: "paragraph" })
    .focus(insertPos + 1)
    .run();
}
