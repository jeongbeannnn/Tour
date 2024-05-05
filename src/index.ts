import { db } from "@/db";

const html = (body: any) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Announcement</title>
    <link rel="stylesheet" href="/css/normalize.css">
    <link rel="stylesheet" href="/css/index.css">
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
    const path = (new URL(req.url).pathname).replace(/\%20/g, " ");
    console.log(path)
    let filePath = BASE_PATH + path;
    if (filePath === "./src/") {
      const body = await Promise.all(
        Array.from({ length: 11 }).map(async (_, i) => {
          const file = Bun.file(BASE_PATH + `/pages/${i + 1}/index.html`);
          return file.text();
        })
      );

      return new Response(html(body.join("")), {
        headers: { "content-type": "text/html" },
      });
    }

    const file = Bun.file(BASE_PATH + path);
    return new Response(file);
  },
  error() {
    return new Response(null, { status: 404 });
  },
});
