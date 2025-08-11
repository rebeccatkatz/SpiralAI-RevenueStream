export default function Home(){
  return (
    <div className="space-y-8">
      <section className="bg-white p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-2">Growth Vault — E‑com Templates & Tools</h1>
        <p>Get 30+ ready-to-use assets. New drops monthly.</p>
      </section>
      <section id="pricing" className="bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-2">Pricing</h2>
        <div className="flex gap-4">
          <form action="/api/checkout" method="post">
            <input type="hidden" name="tier" value="monthly" />
            <button className="px-4 py-2 rounded bg-black text-white">Join Monthly</button>
          </form>
          <form action="/api/checkout" method="post">
            <input type="hidden" name="tier" value="annual" />
            <button className="px-4 py-2 rounded bg-black text-white">Join Annual</button>
          </form>
        </div>
      </section>
    </div>
  )
}
