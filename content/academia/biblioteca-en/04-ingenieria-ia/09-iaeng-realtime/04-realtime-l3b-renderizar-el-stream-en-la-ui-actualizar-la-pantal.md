# Rendering the Stream in the UI: Updating the Screen Token by Token
area: AI Engineering | module: iaeng-realtime — Real Time: Streaming Responses and Notifications | lesson 4
id: realtime-l3b | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-realtime/realtime-l3b

## Content

## The stream works; now you have to display it well

Earlier lessons solved transport — how tokens get from the server to the client without losing or duplicating anything. A different problem remains: **how to update the screen** as they arrive, without the UI feeling choppy or breaking mid-word or mid-markdown block.

## Updating state on every token without wrecking performance

The most common mistake: calling `setState` on every individual token with no thought, triggering a React re-render for every chunk — sometimes dozens per second. React 18 batches updates inside the same tick in most cases, but in a streaming callback outside the normal event cycle it pays to be explicit:

```tsx
function useStreamDeTexto(url: string) {
  const [texto, setTexto] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function leer() {
      const respuesta = await fetch(url, { signal: controller.signal });
      const reader = respuesta.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const fragmento = decoder.decode(value, { stream: true });
        // Functional update: avoids relying on a 'texto' captured
        // in a stale closure if several chunks arrive back-to-back
        setTexto((anterior) => anterior + fragmento);
      }
    }

    leer();
    return () => controller.abort();
  }, [url]);

  return texto;
}
```

The functional form of `setState` — taking the previous value as an argument instead of reading a variable captured by closure — isn't a style preference: with rapid updates, reading the state variable directly can drop chunks if two arrive before React re-renders in between.

## Markdown mid-generation: the unclosed-blocks problem

If incoming text renders as markdown, a code block or list can sit **half open** for much of the stream — three backticks opened a code block, while the closing three haven't arrived yet. Most markdown parsers, left to themselves, don't know what to do with that: they can momentarily break the layout or show raw backticks as plain text until the block closes.

The two standard solutions: use a parser tolerant of incomplete markdown (several explicitly support this use case), or render as plain text while the stream is active and parse as full markdown only when the close event arrives. The second is simpler to implement and enough for most products.

## Auto-scroll without hijacking the user's scroll

A chat that aggressively auto-scrolls down on every token is frustrating if the user scrolled up to reread something — scrolling keeps interrupting them. The standard fix: check whether the user is near the bottom before auto-scrolling, and stop auto-scrolling the moment the user manually scrolls up, until they scroll back down near the bottom on their own.

## Tasks
- Implement the stream-consuming hook with functional state updates
- Trigger a rapid burst of chunks (drop the server's heartbeat down to milliseconds, just for testing) and confirm no chunk is lost
- Implement conditional auto-scroll: make it stop when the user scrolls up

## Tip

If your markdown rendering breaks visually during streaming but looks fine once finished, it's almost always an unclosed block — code or list — and not a real parser bug. Rendering as plain text while the stream is active is usually the simplest fix.
