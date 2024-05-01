Bun.serve({
  fetch(req: Request): Response | Promise<Response> {
    return new Response(Bun.file("src/announcement/Announcement.html"));
  },

  port: process.env.PORT || 3000,
});
