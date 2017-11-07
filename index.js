import React, {PureComponent} from "react"
import PropTypes from "prop-types"
const Iframe = class extends PureComponent {
  render() {
    let props = {
      ref: "iframe",
      frameBorder: "0",
      src: this.props.url,
      target: "_parent",
      allowFullScreen: this.props.allowFullScreen || false,
      style: Object.assign({}, {
        position: this.props.position || "absolute",
        display: this.props.display || "block",
        height: this.props.height || "100%",
        width: this.props.width || "100%"
      }, this.props.styles || {}),
      height: this.props.height || "100%",
      name: this.props.name || "",
      width: this.props.width || "100%"
    };
    return React.createElement(
      "iframe",
      Object.assign(props, this.props.id ? ({id: this.props.id}) : {}, this.props.className ? ({className: this.props.className}) : {})
    )
  }
}
Iframe.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  position: PropTypes.string,
  display: PropTypes.string,
  name: PropTypes.string,
  height: PropTypes.string,
  styles: PropTypes.object,
  allowFullScreen: PropTypes.bool
}
export default Iframe
