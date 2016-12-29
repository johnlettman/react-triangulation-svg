/*
  △ React.js Triangulation SVG
  Author: John Lettman <jlettman@redzone.com>
*/

import React, { PureComponent, PropTypes } from 'react';
import AutoBind from 'react-autobind';
import Interval from 'react-interval';

import { initialize, wave, resolve, getRandom } from './triangulation';

class Triangulation extends PureComponent {
  constructor() {
    super(...arguments);
    AutoBind(this);

    this.state = { firstTick: false };
  }

  bootstrap(props) {
    const {
      width,
      height,
      colors,
      density,
      animated,
      seed
    } = (typeof props === 'object') ? props : this.props;

    const size = (width + height) / density;

    initialize({ width, height, size, seed }).then(triangulation => {
      const { points, triangles } = triangulation;

      const random = getRandom(seed);
      let triangleColors = [];

      for (let triangle in triangles) {
        triangleColors.push(colors[Math.floor(random() * colors.length)]);
      }

      let state = { points, triangles, triangleColors };

      if (animated) {
        state.pointsCurrent  = points;
        state.pointsPrevious = points;
        this.tick(null, state);
      }

      this.setState(state);
    });
  }

  componentWillMount() {
    this.bootstrap();
  }

  componentWillReceiveProps(props) {
    this.bootstrap(props);
  }

  tick(props, state) {
    const {
      width, height, density, uniform, onTick
    } = props ? props : this.props;

    const {
      points, pointsCurrent
    } = state ? state : this.state;

    if (!Array.isArray(points) || points.length === 0) {
      return;
    }

    const size = (width + height) / density;

    wave({ width, height, size, uniform, points }).then(newPoints => {
      this.setState({
        pointsCurrent:   newPoints,
        pointsPrevious:  pointsCurrent,
        firstTick:       true
      });
    });

    if (typeof onTick === 'function') {
      onTick();
    }
  }

  getTriangleRenderables() {
    const {
      firstTick,
      triangles,
      triangleColors,

      points,
      pointsCurrent,
      pointsPrevious
    } = this.state;

    const { animated, animationInterval, colors, seed } = this.props;
    const random = getRandom(seed);

    if (Array.isArray(triangles) && triangles.length > 0) {
      return triangles.map((triangle, triangleIdx) => (
        <polygon key={triangleIdx} fill={triangleColors[triangleIdx]}
          points={animated ? undefined : resolve(triangle, points).map(point => point.join(',')).join(' ')}>

          {/* SVG animate-based animation */}
          { animated && firstTick &&
            <animate
              ref={ref => !!ref && ref.beginElement()}
              calcMode='linear'
              fill='freeze'
              attributeName='points'
              dur={`${animationInterval}ms`}
              to  ={resolve(triangle, pointsCurrent).map(point => point.join(',')).join(' ')}
              from={resolve(triangle, pointsPrevious).map(point => point.join(',')).join(' ')} />
          }
        </polygon>
      ));
    }
  }

  render() {
    const { width, height, animated, animationInterval } = this.props;
    const { ready } = this.state;

    return (
      <svg width={width} height={height}>
        { this.getTriangleRenderables() }
        {animated && <Interval timeout={animationInterval} enabled={animated} callback={() => this.tick()} /> }
      </svg>);
  }
}

Triangulation.propTypes = {
  seed:               PropTypes.number,
  density:            PropTypes.number,
  uniform:            PropTypes.bool,
  colors:             PropTypes.arrayOf(PropTypes.string),

  animated:           PropTypes.bool,
  animationInterval:  PropTypes.number,

  width:              PropTypes.number.isRequired,
  height:             PropTypes.number.isRequired,

  onTick:             PropTypes.func
};

Triangulation.defaultProps = {
  density: 20,
  uniform: false,
  colors: [ '#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0' ],

  animated: false,
  animationInterval: 2500,

  width: 500,
  height: 500
};

export default Triangulation;
