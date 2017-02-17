import React, { Component, PropTypes } from 'react';

export class ReactPainter extends Component {

    static propTypes = {
        className: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        style: PropTypes.object,
        blur: PropTypes.bool,
        lineThickness: PropTypes.number,
        lineColor: PropTypes.string,
        lineStyle: PropTypes.string,
        onUpdate: PropTypes.func
    }

    static defaultProps = {
        className: 'react-painter',
        width: 800,
        height: 600,
        style: {
            border: '1px solid #ccc'
        },
        blur: true,
        lineThickness: 10,
        lineColor: '#333333',
        lineStyle: 'round', // acceptable: bevel, round, miter
        onUpdate: () => {}
    }

    constructor (...props) {
        super(...props);

        this.state = {
            isMouseDown: false
        };
    }

    componentDidMount () {
        if (self && (!this.canvas.getContext || !this.canvas.getBoundingClientRect)) {
            throw new Error('HTML5 Canvas is not supported in your browser.');
        }
        this.ctx = this.canvas.getContext('2d') || {};
        this.bcr = this.canvas.getBoundingClientRect() || {};
        this.setDefaultAppearance();
    }

    componentWillUpdate (nextProps) {
        const {
            lineThickness,
            lineColor
        } = this.props;

        if (lineThickness !== nextProps.lineThickness || lineColor !== nextProps.lineColor) {
            this.setDefaultAppearance();
        }
    }

    hashTable = {};
    rawData = [];

    setDefaultAppearance () {
        const {
            lineThickness,
            lineColor,
            lineStyle
        } = this.props;

        this.ctx.lineWidth = lineThickness;
        this.ctx.strokeStyle = lineColor;
        this.ctx.lineJoin = this.ctx.lineCap = lineStyle;

        if (this.props.blur) {
            this.ctx.shadowBlur = 2;
            this.ctx.shadowColor = this.props.lineColor;
        }
    }

    onMouseDown = event => {
        this.setState({
            isMouseDown: true
        });

        this.ctx.moveTo(
            (event.pageX || event.touches[0].pageX) - this.bcr.left,
            (event.pageY || event.touches[0].pageY) - this.bcr.top
        );
    }

    onMouseUp = () => {
        if (this.state.isMouseDown) {
            this.setState({
                isMouseDown: false
            });

            this.hashTable = {};

            // remove duplicates
            this.rawData = this.rawData.filter((element) => {
                const key = JSON.stringify(element);
                const match = Boolean(this.hashTable[key]);

                return (match ? false : (this.hashTable[key] = true));
            });

            this.props.onUpdate({
                raw: this.rawData,
                canvas: this.canvas
            });
        }
    }

    onMouseMove = event => {
        if (this.state.isMouseDown) {
            event.preventDefault();

            const coordinates = [
                event.pageX || event.touches[0].pageX,
                event.pageY || event.touches[0].pageY
            ];

            this.rawData.push(coordinates);
            this.drawOnCanvas(coordinates);
        }
    }

    drawOnCanvas = coordinates => {
        const [
            left,
            top
        ] = coordinates;

        this.ctx.lineTo(
            left - this.bcr.left,
            top - this.bcr.top
        );
        this.ctx.stroke();
    }

    render () {
        const {
            className,
            height,
            width,
            style
        } = this.props;

        return (
          <div>
            <canvas
              ref={canvas => (this.canvas = canvas)}
              className={`${className}`}
              width={width}
              height={height}
              style={style}
              onMouseDown={this.onMouseDown}
              onTouchStart={this.onMouseDown}
              onMouseUp={this.onMouseUp}
              onTouchEnd={this.onMouseUp}
              onMouseMove={this.onMouseMove}
              onMouseOut={this.onMouseUp} />
          </div>
        );
    }
}

export default ReactPainter;
