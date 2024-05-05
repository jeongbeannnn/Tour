import { db } from "@/db";
import index from "@/index.html";
import style from "@/css/index.min.css";

const html = async () => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Announcement</title>
    <link rel="stylesheet" as="style" crossorigin
      href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css" />
    <script src="/lib/jquery-3.7.1.min.js"></script>
    <style>${await Bun.file(style).text()}</style>
  </head>
  <body>
    ${await Bun.file(index).text()}
    <script>
      $(()=>{
        $('section *').dblclick(function(){
          console.log(123)
          $(this).attr('contenteditable', true).focus().one('blur', function(){
            $(this).attr('contenteditable', false);
          })
          return false;
        })
      })
    </script>
  </body>
</html>`;

Bun.serve({
  port: 3000,
  async fetch(req) {
    const path = new URL(req.url).pathname.replace(/\%20/g, " ");
    if (path === "/") {
      return new Response(await html(), {
        headers: { "Content-Type": "text/html" },
      });
    }

    const file = Bun.file("src/" + path);
    if (await file.exists()) {
      return new Response(file);
    }

    return new Response(null, { status: 404 });
  },
  error(err) {
    return new Response(null, { status: 405 });
  },
});
