export default function Home(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">It’s live.</h1>
      <p>If you can see this page, the build worked. Next: try a checkout.</p>
      <form action="/api/checkout" method="post" className="flex gap-3">
        <input type="hidden" name="tier" value="monthly" />
        <button className="px-4 py-2 rounded bg-black text-white">Join Monthly</button>
      </form>
      <form action="/api/checkout" method="post" className="flex gap-3">
        <input type="hidden" name="tier" value="annual" />
        <button className="px-4 py-2 rounded bg-black text-white">Join Annual</button>
      </form>
      <p className="text-sm opacity-70">Health: <a className="underline" href="/api/health">/api/health</a></p>
    </div>
  );
}
