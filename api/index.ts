type Env = {
  COUNTER: DurableObjectNamespace;
};

export class Counter implements DurableObject {
  constructor(
    readonly state: DurableObjectState,
    readonly env: Env,
  ) {}

  async fetch(request: Request) {
    const url = new URL(request.url);
    const pathname = url.searchParams.get("pathname") ?? "";
    const headers = { "Access-Control-Allow-Origin": "*" };

    switch (url.pathname) {
      case "/view": {
        const count = (await this.state.storage.get<number>(pathname)) ?? 0;
        await this.state.storage.put(pathname, count + 1);
        return new Response(String(count + 1), { headers });
      }
      case "/count":
        const count = (await this.state.storage.get<number>(pathname)) ?? 0;
        return new Response(String(count), { headers });
      default:
        return new Response("Not found", { status: 404, headers });
    }
  }
}

export default {
  fetch(request: Request, env: Env) {
    const counter = env.COUNTER.get(env.COUNTER.idFromName("default"));
    return counter.fetch(request);
  },
} satisfies ExportedHandler<Env>;
