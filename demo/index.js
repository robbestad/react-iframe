import React, { PureComponent } from "react"
import ReactDOM from "react-dom"
import Iframe from "./iframe.js"

class Demo extends PureComponent {
	render() {
		return (
			<Iframe
				url="https://www.sdrive.app/embed/1ptBQD"
				width="640px"
				sandbox="aasda"
				height="320px"
				id=""
				className=""
			 sandbox={["allow-same-origin", "allow-scripts"]}
				display="block"
				position="relative"
				allowFullScreen
			/>
		)
	}
}

ReactDOM.render(<Demo />, document.body)
