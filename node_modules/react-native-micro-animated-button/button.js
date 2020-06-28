import React, { Component } from 'react';

import {
  ActivityIndicator,
  Animated,
  Platform,
  TouchableOpacity,
  View
} from 'react-native';

import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

const colors =
  Platform.OS === 'ios'
    ? {
        blue: '#007aff',
        gray: '#d8d8d8',
        green: '#4cd964',
        red: '#ff3b30',
        white: '#ffffff'
      }
    : {
        blue: '#4285f4',
        gray: '#d8d8d8',
        green: '#0f9d58',
        red: '#db4437',
        white: '#ffffff'
      };

export default class MicroAnimatedButton extends Component {
  static propTypes = {
    activeOpacity: PropTypes.number,
    backgroundColor: PropTypes.string,
    bounce: PropTypes.bool,
    disabled: PropTypes.bool,
    disabledBackgroundColor: PropTypes.string,
    disabledForegroundColor: PropTypes.string,
    errorBackgroundColor: PropTypes.string,
    errorForegroundColor: PropTypes.string,
    errorIcon: PropTypes.string,
    errorLabel: PropTypes.string,
    expandOnFinish: PropTypes.bool,
    foregroundColor: PropTypes.string,
    icon: PropTypes.string,
    iconSet: PropTypes.any,
    iconSize: PropTypes.number,
    iconStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    ]),
    initialState: PropTypes.oneOf(['success', 'error', 'loading']),
    label: PropTypes.string,
    labelStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    ]),
    material: PropTypes.bool,
    maxWidth: PropTypes.number,
    minWidth: PropTypes.number,
    noBorder: PropTypes.bool,
    noFill: PropTypes.bool,
    noRadius: PropTypes.bool,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    onPress: PropTypes.func,
    onReset: PropTypes.func,
    onSecondaryPress: PropTypes.func,
    onSuccess: PropTypes.func,
    renderErrorIcon: PropTypes.any,
    renderIndicator: PropTypes.any,
    renderLabel: PropTypes.any,
    renderSuccessIcon: PropTypes.any,
    scaleFactor: PropTypes.number,
    scaleOnSuccess: PropTypes.bool,
    shakeOnError: PropTypes.bool,
    static: PropTypes.bool,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    ]),
    successBackgroundColor: PropTypes.string,
    successForegroundColor: PropTypes.string,
    successIcon: PropTypes.string,
    successLabel: PropTypes.string,
    width: PropTypes.number
  };

  static defaultProps = {
    activeOpacity: undefined,
    backgroundColor: undefined,
    bounce: false,
    disabled: false,
    disabledBackgroundColor: undefined,
    disabledForegroundColor: undefined,
    errorBackgroundColor: undefined,
    errorForegroundColor: undefined,
    errorIcon: 'warning',
    errorLabel: undefined,
    expandOnFinish: false,
    foregroundColor: undefined,
    icon: undefined,
    iconSet: undefined,
    iconSize: 17,
    iconStyle: {},
    initialState: undefined,
    label: undefined,
    labelStyle: {},
    material: false,
    maxWidth: 240,
    minWidth: 40,
    noBorder: false,
    noFill: false,
    noRadius: false,
    onError: undefined,
    onLoad: undefined,
    onPress: undefined,
    onReset: undefined,
    onSecondaryPress: undefined,
    onSuccess: undefined,
    renderErrorIcon: undefined,
    renderIndicator: undefined,
    renderLabel: undefined,
    renderSuccessIcon: undefined,
    scaleFactor: 1.1,
    scaleOnSuccess: false,
    shakeOnError: false,
    static: false,
    style: {},
    successBackgroundColor: undefined,
    successForegroundColor: undefined,
    successIcon: 'check',
    successLabel: undefined,
    width: undefined
  };

  initialStep = this.props.disabled
    ? 0
    : ['success', 'error'].includes(this.props.initialState)
      ? 3
      : this.props.initialState === 'loading'
        ? 2
        : 1;

  state = {
    step: this.initialStep,
    error: this.props.initialState === 'error'
  };

  componentWillReceiveProps(nextProps) {
    // auto-animate when disable/enable
    const { disabled } = this.props;
    if (nextProps.disabled !== disabled) this.disable(disabled);
  }

  // animation engines
  animated = new Animated.Value(this.initialStep);
  micro = new Animated.Value(0);

  // animations

  width = this.props.width ||
  this.animated.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [
      this.props.maxWidth,
      this.props.maxWidth,
      this.props.minWidth,
      this.props.expandOnFinish ? this.props.maxWidth : this.props.minWidth
    ]
  });

  // animation colors

  getBackgroundColor = (success = true) => {
    const {
      backgroundColor,
      disabledBackgroundColor,
      errorBackgroundColor,
      foregroundColor,
      noFill,
      successBackgroundColor
    } = this.props;

    const defaultBackgroundColor = colors.white;
    const defaultErrorColor = colors.red;
    const defaultSuccessColor = colors.green;

    return [
      disabledBackgroundColor || defaultBackgroundColor,
      backgroundColor || defaultBackgroundColor,
      backgroundColor || defaultBackgroundColor,
      noFill
        ? backgroundColor || defaultBackgroundColor
        : success
          ? successBackgroundColor || foregroundColor || defaultSuccessColor
          : errorBackgroundColor || foregroundColor || defaultErrorColor
    ];
  };

  getForegroundColor = (success = true) => {
    const {
      backgroundColor,
      disabledForegroundColor,
      errorForegroundColor,
      foregroundColor,
      noFill,
      successForegroundColor
    } = this.props;

    const defaultBackgroundColor = colors.white;
    const defaultDisabledForegroundColor = colors.gray;
    const defaultForegroundColor = colors.blue;

    return [
      disabledForegroundColor || defaultDisabledForegroundColor,
      foregroundColor || defaultForegroundColor,
      foregroundColor || defaultForegroundColor,
      noFill
        ? (success ? successForegroundColor : errorForegroundColor) ||
          foregroundColor ||
          defaultForegroundColor
        : (success ? successForegroundColor : errorForegroundColor) ||
          backgroundColor ||
          defaultBackgroundColor
    ];
  };

  successBackgroundColor = this.animated.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: this.getBackgroundColor()
  });

  errorBackgroundColor = this.animated.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: this.getBackgroundColor(false)
  });

  successForegroundColor = this.animated.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: this.getForegroundColor()
  });

  errorForegroundColor = this.animated.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: this.getForegroundColor(false)
  });

  // micro animations

  scale = this.micro.interpolate({
    inputRange: [0, 1],
    outputRange: [1, this.props.scaleFactor]
  });

  shake = this.micro.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 10, -10]
  });

  // micro animation players

  microScale = () =>
    this.props.scaleOnSuccess &&
    Animated.sequence([
      Animated.timing(this.micro, { toValue: 1, duration: 80 }),
      Animated.timing(this.micro, { toValue: 0, duration: 80 })
    ]).start();

  microShake = () =>
    this.props.shakeOnError &&
    Animated.sequence([
      Animated.timing(this.micro, { toValue: 0, duration: 40 }),
      Animated.timing(this.micro, { toValue: 2, duration: 40 }),
      Animated.timing(this.micro, { toValue: 0, duration: 40 })
    ]).start();

  // events

  onPress = () =>
    this.props.static
      ? this.props.onPress && this.props.onPress()
      : this.animate(2, { cb: this.props.onPress });

  // private methods

  animate = (step, { cb, error = false, timing = false, micro } = {}) => {
    this.setState({ step, error }, () => {
      const type = timing ? Animated.timing : Animated.spring;

      type(this.animated, {
        toValue: step,
        ...(timing ? { duration: 250 } : {})
      }).start(({ finished }) => finished && cb && cb());
    });

    if (micro) micro();
  };

  disable = disabled => this.animate(disabled ? 1 : 0, { timing: true });

  // public methods

  success = () =>
    this.animate(3, { cb: this.props.onSuccess, micro: this.microScale });

  error = () =>
    this.animate(3, {
      cb: this.props.onError,
      error: true,
      micro: this.microShake
    });

  load = () => this.animate(2, { cb: this.props.onLoad });

  reset = () => this.animate(1, { cb: this.props.onReset });

  // render helpers

  renderLabel = (label, style) => (
    <Animated.Text style={style}>{label}</Animated.Text>
  );

  animatedIcon = Animated.createAnimatedComponent(
    this.props.iconSet || (this.props.material ? MaterialIcons : FontAwesome)
  );

  renderIcon = (icon, color) => (
    <this.animatedIcon
      name={icon}
      size={this.props.iconSize}
      style={[{ color }, this.props.iconStyle]}
    />
  );

  renderIndicator = () => (
    <ActivityIndicator color={this.props.foregroundColor || colors.blue} />
  );

  render() {
    const {
      activeOpacity,
      bounce,
      disabled,
      errorIcon,
      errorLabel,
      icon,
      label,
      noBorder,
      noRadius,
      onSecondaryPress,
      renderErrorIcon,
      renderIndicator,
      renderLabel,
      renderSuccessIcon,
      style,
      successIcon,
      successLabel
    } = this.props;

    const { step, error } = this.state;

    const {
      errorBackgroundColor,
      errorForegroundColor,
      onPress,
      scale,
      shake,
      successBackgroundColor,
      successForegroundColor,
      width
    } = this;

    // colors

    const animatedBackgroundColor = error
      ? errorBackgroundColor
      : successBackgroundColor;

    const animatedForegroundColor = error
      ? errorForegroundColor
      : successForegroundColor;

    // styles

    const buttonStyle = [
      {
        backgroundColor: animatedBackgroundColor,
        borderColor: animatedForegroundColor,
        transform: [error ? { translateX: shake } : { scale }],
        width
      },
      styles.button,
      // if noBorder or noRadius
      noBorder && { borderWidth: 0 },
      noRadius && { borderRadius: 0 },
      style
    ];

    const labelStyle = [
      { color: animatedForegroundColor },
      styles.label,
      this.props.labelStyle
    ];

    const button = (
      <Animated.View style={buttonStyle}>
        {(step === 0 || step === 1) && (
          <View>
            {renderLabel || // render renderLabel() (custom) > icon > label
              (icon
                ? this.renderIcon(icon, animatedForegroundColor)
                : this.renderLabel(label, labelStyle))}
          </View>
        )}

        {/* render renderIndicator() (custom) > default indicator */}
        {step === 2 && (renderIndicator || this.renderIndicator())}

        {step === 3 &&
          (error
            ? // if error: render errorLabel > renderErrorIcon() (custom) > errorIcon
              errorLabel
              ? this.renderLabel(errorLabel, labelStyle)
              : renderErrorIcon ||
                this.renderIcon(errorIcon, errorForegroundColor)
            : // if success: render successLabel > renderSuccessIcon() (custom) > successIcon
              successLabel
              ? this.renderLabel(successLabel, labelStyle)
              : renderSuccessIcon ||
                this.renderIcon(successIcon, successForegroundColor))}
      </Animated.View>
    );

    // touchable props
    const props = {
      children: button,

      // disable when:
      // - loading state
      // - success/error state without a secondary onPress
      // - actually disabled (forced)
      disabled: step === 2 || (step === 3 && !onSecondaryPress) || disabled,

      // onPress in all cases but when success/error state with a secondary onPress
      onPress: (step === 3 && onSecondaryPress) || onPress,

      // pass active opacity prop if TouchableOpacity
      ...(!bounce ? { activeOpacity } : {})
    };

    // render touchable
    if (bounce) return <TouchableBounce {...props} />;
    return <TouchableOpacity {...props} />;
  }
}

const styles = {
  button: {
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    marginVertical: 10
  },
  label: {
    backgroundColor: 'transparent',
    padding: 10
  }
};
