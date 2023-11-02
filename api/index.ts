type Env = {
  COUNTER: DurableObjectNamespace;
};

export class Counter implements DurableObject {
  constructor(
    readonly state: DurableObjectState,
    readonly env: Env,
  ) {}

  async fetch(req: Request) {
    const headers = { "Access-Control-Allow-Origin": "*" };
    const { pathname } = new URL(req.url);
    switch (req.method) {
      case "GET":
        const list = await this.state.storage.list<number>();
        const counts = Array.from(list.entries()).map(([pathname, count]) => ({
          pathname,
          count,
        }));
        return Response.json(counts, { headers });
      case "POST":
        const count = (await this.state.storage.get<number>(pathname)) ?? 0;
        await this.state.storage.put(pathname, count + 1);
        return new Response("Ok", { headers });
      case "DELETE":
        await this.state.storage.deleteAll();
        return new Response("Ok", { headers });
      default:
        return new Response("Method not allowed", { status: 405, headers });
    }
  }
}

export default {
  fetch(request: Request, env: Env) {
    const counter = env.COUNTER.get(env.COUNTER.idFromName("default"));
    return counter.fetch(new Request(request));
  },
} satisfies ExportedHandler<Env>;
