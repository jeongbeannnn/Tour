import db from '@antoniosbarotsis/fake-db';

const html = (body: any) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Announcement</title>
    <link rel="stylesheet" href="/css/normalize.css">
    <link rel="stylesheet" href="/css/announcement.css">
    <link rel="stylesheet" as="style" crossorigin
      href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css" />
  </head>
  <body>
    ${body}
  </body>
</html>`;

const BASE_PATH = "./src";
Bun.serve({
  port: 3000,
  async fetch(req) {
    const filePath = BASE_PATH + new URL(req.url).pathname;
    const file = Bun.file(filePath);
    if (filePath.includes("html")) {
      return new Response(html(await file.text()), {
        headers: { "content-type": "text/html" },
      });
    } else {
      return new Response(file);
    }
  },
  error() {
    return new Response(null, { status: 404 });
  },
});
