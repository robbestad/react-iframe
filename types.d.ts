export interface IIframe {
	url: string
	allowFullScreen?: boolean
	target?: string
	position?: string
	display?: string
	height?: string
	width?: string
	overflow?: string
	styles?: object
	name?: string
	onLoad?: () => void
	onMouseOver?: () => void
	onMouseOut?: () => void
	frameBorder?: number
	scrolling?: string
	id?: string
	ariaHidden?: boolean
	ariaLabel?: string
	ariaLabelledby?: string
	sandbox?: string
	allow?: string
	className?: string
	title?: string
}
