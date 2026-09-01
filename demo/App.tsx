import { useRef, useState } from "react"
import Iframe, { postToIframe, useIframeMessage } from "react-iframe"

const YOUTUBE_ALLOW =
	"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"

const SRC_DOC = `<!doctype html>
<html>
  <head>
    <style>
      :root { color-scheme: dark; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font: 15px/1.45 "IBM Plex Sans", system-ui, sans-serif;
        background: radial-gradient(circle at 20% 20%, #3a2418, #14110e 55%);
        color: #f3eee4;
      }
      button {
        appearance: none;
        border: 1px solid #e8c39a;
        background: transparent;
        color: #f3eee4;
        padding: 0.55rem 0.9rem;
        border-radius: 999px;
        cursor: pointer;
        font: inherit;
      }
      p { margin: 0 0 1rem; letter-spacing: 0.02em; }
    </style>
  </head>
  <body>
    <div>
      <p>Child document via <code>srcDoc</code></p>
      <button id="ping">Ping parent</button>
      <p id="log"></p>
    </div>
    <script>
      const log = document.getElementById("log")
      document.getElementById("ping").onclick = () => {
        parent.postMessage({ type: "ping", at: Date.now() }, "*")
      }
      window.addEventListener("message", (event) => {
        if (event.data && event.data.type === "pong") {
          log.textContent = "parent replied at " + event.data.at
        }
      })
    </script>
  </body>
</html>`

export function App() {
	const childRef = useRef<HTMLIFrameElement>(null)
	const [messages, setMessages] = useState<string[]>([])

	useIframeMessage((event) => {
		if (event.data?.type === "ping") {
			setMessages((current) => [`ping @ ${event.data.at}`, ...current].slice(0, 4))
			postToIframe(childRef.current, { type: "pong", at: Date.now() })
		}
	})

	return (
		<div className="page">
			<header className="hero">
				<p className="eyebrow">react-iframe 2.0</p>
				<h1>
					A thin, typed iframe
					<br />
					for React 18 and 19.
				</h1>
				<p className="lede">
					Native attributes pass through. <code>url</code>, array <code>sandbox</code>, and{" "}
					<code>allowFullScreen</code> still work — without the 1.x bugs. Refs and{" "}
					<code>postMessage</code> are first-class.
				</p>
				<pre className="install">
					<code>npm install react-iframe</code>
				</pre>
			</header>

			<section className="grid">
				<article className="card" id="youtube">
					<header>
						<h2>YouTube embed</h2>
						<p>
							<code>allowFullScreen</code> merges into Permissions-Policy <code>allow</code> with
							semicolons.
						</p>
					</header>
					<Iframe
						url="https://www.youtube.com/embed/dQw4w9WgXcQ"
						title="YouTube embed"
						width="100%"
						height="320"
						loading="lazy"
						allow={YOUTUBE_ALLOW}
						allowFullScreen
						style={{ border: 0, background: "#000" }}
					/>
				</article>

				<article className="card" id="srcdoc">
					<header>
						<h2>Inline HTML</h2>
						<p>
							<code>srcDoc</code> renders a document without a network request — useful for banners,
							previews, and sandboxed HTML.
						</p>
					</header>
					<Iframe
						srcDoc={SRC_DOC}
						title="Inline HTML document"
						sandbox={["allow-scripts"]}
						width="100%"
						height="220"
						style={{ border: 0 }}
					/>
				</article>

				<article className="card" id="postmessage">
					<header>
						<h2>postMessage</h2>
						<p>
							<code>forwardRef</code> plus <code>useIframeMessage</code> / <code>postToIframe</code>
							. Click ping in the child frame.
						</p>
					</header>
					<Iframe
						ref={childRef}
						srcDoc={SRC_DOC}
						title="postMessage child"
						sandbox={["allow-scripts"]}
						width="100%"
						height="220"
						style={{ border: 0 }}
					/>
					<ol className="log">
						{messages.length === 0 ? (
							<li className="muted">waiting for a ping…</li>
						) : (
							messages.map((line) => <li key={line}>{line}</li>)
						)}
					</ol>
				</article>

				<article className="card" id="lazy">
					<header>
						<h2>Lazy third-party page</h2>
						<p>
							Native <code>loading=&quot;lazy&quot;</code> and <code>referrerPolicy</code> pass
							through unchanged.
						</p>
					</header>
					<Iframe
						url="https://example.com"
						title="example.com"
						width="100%"
						height="320"
						loading="lazy"
						referrerPolicy="no-referrer"
						style={{ border: 0, background: "#fff" }}
					/>
				</article>
			</section>
		</div>
	)
}
