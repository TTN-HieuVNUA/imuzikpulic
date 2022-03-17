import React, {useState} from 'react';
import {
    Animated,
    Dimensions,
    PanResponder,
    ScrollView,
    StyleSheet,
    View,
    Text,
} from 'react-native';

import * as Arrow from './Arrow';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const MINIMUM_TRIM_DURATION = 1000;
const MAXIMUM_TRIM_DURATION = 60000;
const MAXIMUM_SCALE_VALUE = 50;
const ZOOM_MULTIPLIER = 5;
const INITIAL_ZOOM = 2;
const SCALE_ON_INIT_TYPE = 'trim-duration';
const SHOW_SCROLL_INDICATOR = true;

const TRACK_PADDING_OFFSET = 0;
const HANDLE_WIDTHS = 0;

const MARKER_INCREMENT = 1000;

const TRACK_BACKGROUND_COLOR = '#f2f6f5';
const TRACK_BORDER_COLOR = '#c8dad3';
const MARKER_COLOR = '#c8dad3';
const TINT_COLOR = '#93b5b3';
const SCRUBBER_COLOR = '#63707e';

export default class Trimmer extends React.Component<{}, any> {

    // @ts-ignore
    constructor(props) {
        super(props);

        let trackScale = props.initialZoomValue || INITIAL_ZOOM;
        if (props.scaleInOnInit) {
            const {
                // @ts-ignore
                maxTrimDuration = MAXIMUM_TRIM_DURATION,
                // @ts-ignore
                scaleInOnInitType = SCALE_ON_INIT_TYPE,
                // @ts-ignore
                trimmerRightHandlePosition,
                // @ts-ignore
                trimmerLeftHandlePosition,
            } = this.props;
            const isMaxDuration = scaleInOnInitType === 'max-duration';
            const trimDuration = isMaxDuration
                ? maxTrimDuration
                : trimmerRightHandlePosition - trimmerLeftHandlePosition;
            const smartScaleDivider = isMaxDuration ? 3 : 5; // Based on testing, 3 works better when the goal is to have the entire trimmer fit in the visible area
            const percentTrimmed = trimDuration / props.totalDuration;
            const smartScaleValue = 2 / percentTrimmed / smartScaleDivider;
            trackScale = this.clamp({
                value: smartScaleValue,
                min: 1,
                max: props.maximumZoomLevel || MAXIMUM_SCALE_VALUE,
            });
        }

        this.initiateAnimator();
        this.state = {
            scrubbing: false, // this value means scrubbing is currently happening
            trimming: false, // this value means the handles are being moved
            trackScale, // the scale factor for the track
            trimmingLeftHandleValue: 0,
            trimmingRightHandleValue: 0,
            internalScrubbingPosition: 0,
        };
    }

    // @ts-ignore
    clamp = ({value, min, max}) => Math.min(Math.max(value, min), max);

    initiateAnimator = () => {
        // @ts-ignore
        this.trackPanResponder = this.createTrackPanResponder();
        // @ts-ignore
        this.leftHandlePanResponder = this.createLeftHandlePanResponder();
        // @ts-ignore
        this.rightHandlePanResponder = this.createRightHandlePanResponder();
    };

    createRightHandlePanResponder = () =>
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: () => {
                this.setState({
                    trimming: true,
                    // @ts-ignore
                    trimmingRightHandleValue: this.props.trimmerRightHandlePosition,
                    // @ts-ignore
                    trimmingLeftHandleValue: this.props.trimmerLeftHandlePosition,
                });
                this.handleRightHandlePressIn();
            },
            onPanResponderMove: (evt, gestureState) => {
                // @ts-ignore
                const {trackScale} = this.state;
                const {
                    // @ts-ignore
                    trimmerRightHandlePosition,
                    // @ts-ignore
                    totalDuration,
                    // @ts-ignore
                    minimumTrimDuration = MINIMUM_TRIM_DURATION,
                    // @ts-ignore
                    maxTrimDuration = MAXIMUM_TRIM_DURATION,
                } = this.props;

                const trackWidth = screenWidth * trackScale;
                const calculatedTrimmerRightHandlePosition =
                    (trimmerRightHandlePosition / totalDuration) * trackWidth;

                const newTrimmerRightHandlePosition =
                    ((calculatedTrimmerRightHandlePosition + gestureState.dx) / trackWidth) * totalDuration;

                const newBoundedTrimmerRightHandlePosition = this.clamp({
                    value: newTrimmerRightHandlePosition,
                    min: minimumTrimDuration,
                    max: totalDuration,
                });

                if (
                    // @ts-ignore
                    newBoundedTrimmerRightHandlePosition - this.state.trimmingLeftHandleValue >=
                    maxTrimDuration
                ) {
                    this.setState({
                        trimmingRightHandleValue: newBoundedTrimmerRightHandlePosition,
                        trimmingLeftHandleValue: newBoundedTrimmerRightHandlePosition - maxTrimDuration,
                    });
                } else if (
                    // @ts-ignore
                    newBoundedTrimmerRightHandlePosition - this.state.trimmingLeftHandleValue <=
                    minimumTrimDuration
                ) {
                    this.setState({
                        trimmingRightHandleValue: newBoundedTrimmerRightHandlePosition,
                        trimmingLeftHandleValue: newBoundedTrimmerRightHandlePosition - minimumTrimDuration,
                    });
                } else {
                    this.setState({
                        trimmingRightHandleValue: newBoundedTrimmerRightHandlePosition,
                    });
                }
            },
            onPanResponderRelease: () => {
                this.handleHandleSizeChange();
                this.setState({trimming: false});
            },
            onPanResponderTerminationRequest: () => true,
            onShouldBlockNativeResponder: () => true,
        });

    createLeftHandlePanResponder = () =>
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: () => {
                this.setState({
                    trimming: true,
                    // @ts-ignore
                    trimmingRightHandleValue: this.props.trimmerRightHandlePosition,
                    // @ts-ignore
                    trimmingLeftHandleValue: this.props.trimmerLeftHandlePosition,
                });
                this.handleLeftHandlePressIn();
            },
            onPanResponderMove: (evt, gestureState) => {
                // @ts-ignore
                const {trackScale} = this.state;
                const {
                    // @ts-ignore
                    trimmerLeftHandlePosition,
                    // @ts-ignore
                    totalDuration,
                    // @ts-ignore
                    minimumTrimDuration = MINIMUM_TRIM_DURATION,
                    // @ts-ignore
                    maxTrimDuration = MAXIMUM_TRIM_DURATION,
                } = this.props;

                const trackWidth = screenWidth * trackScale;
                const calculatedTrimmerLeftHandlePosition =
                    (trimmerLeftHandlePosition / totalDuration) * trackWidth;

                const newTrimmerLeftHandlePosition =
                    ((calculatedTrimmerLeftHandlePosition + gestureState.dx) / trackWidth) * totalDuration;

                const lowerBound = 0;
                const upperBound = totalDuration - minimumTrimDuration;

                const newBoundedTrimmerLeftHandlePosition = this.clamp({
                    value: newTrimmerLeftHandlePosition,
                    min: lowerBound,
                    max: upperBound,
                });
                if (
                    // @ts-ignore
                    this.state.trimmingRightHandleValue - newBoundedTrimmerLeftHandlePosition >=
                    maxTrimDuration
                ) {
                    this.setState({
                        trimmingRightHandleValue: newBoundedTrimmerLeftHandlePosition + maxTrimDuration,
                        trimmingLeftHandleValue: newBoundedTrimmerLeftHandlePosition,
                    });
                } else if (
                    // @ts-ignore
                    this.state.trimmingRightHandleValue - newBoundedTrimmerLeftHandlePosition <=
                    minimumTrimDuration
                ) {
                    this.setState({
                        trimmingRightHandleValue: newBoundedTrimmerLeftHandlePosition + minimumTrimDuration,
                        trimmingLeftHandleValue: newBoundedTrimmerLeftHandlePosition,
                    });
                } else {
                    this.setState({
                        trimmingLeftHandleValue: newBoundedTrimmerLeftHandlePosition,
                    });
                }
            },
            onPanResponderRelease: () => {
                this.handleHandleSizeChange();
                this.setState({trimming: false});
            },
            onPanResponderTerminationRequest: () => true,
            onShouldBlockNativeResponder: () => true,
        });

    // @ts-ignore
    calculatePinchDistance = (x1, y1, x2, y2) => {
        let dx = Math.abs(x1 - x2);
        let dy = Math.abs(y1 - y2);
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    };

    createTrackPanResponder = () =>
        PanResponder.create({
            // Ask to be the responder:
            // @ts-ignore
            onStartShouldSetPanResponder: () => !this.state.scrubbing && !this.state.trimming,
            // @ts-ignore
            onStartShouldSetPanResponderCapture: () => !this.state.scrubbing && !this.state.trimming,
            // @ts-ignore
            onMoveShouldSetPanResponder: () => !this.state.scrubbing && !this.state.trimming,
            // @ts-ignore
            onMoveShouldSetPanResponderCapture: () => !this.state.scrubbing && !this.state.trimming,
            onPanResponderGrant: (evt) => {
                // @ts-ignore
                this.lastScaleDy = 0;
                const touches = evt.nativeEvent.touches || {};

                if (touches.length === 2) {
                    // @ts-ignore
                    this.lastScalePinchDist = this.calculatePinchDistance(
                        touches[0].pageX,
                        touches[0].pageY,
                        touches[1].pageX,
                        touches[1].pageY
                    );
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                const touches = evt.nativeEvent.touches;
                const {
                    // @ts-ignore
                    maximumZoomLevel = MAXIMUM_SCALE_VALUE,
                    // @ts-ignore
                    zoomMultiplier = ZOOM_MULTIPLIER,
                } = this.props;

                if (touches.length === 2) {
                    const pinchDistance = this.calculatePinchDistance(
                        touches[0].pageX,
                        touches[0].pageY,
                        touches[1].pageX,
                        touches[1].pageY
                    );
                    // @ts-ignore
                    if (this.lastScalePinchDist === undefined) {
                        // @ts-ignore
                        this.lastScalePinchDist = pinchDistance;
                    }
                    // @ts-ignore
                    const stepValue = pinchDistance - this.lastScalePinchDist;
                    // @ts-ignore
                    this.lastScalePinchDist = pinchDistance;

                    const scaleStep = (stepValue * zoomMultiplier) / screenHeight;
                    // @ts-ignore
                    const {trackScale} = this.state;

                    const newTrackScaleValue = trackScale + scaleStep;
                    const newBoundedTrackScaleValue = Math.max(
                        Math.min(newTrackScaleValue, maximumZoomLevel),
                        1
                    );

                    this.setState({trackScale: newBoundedTrackScaleValue});
                } else {
                    // @ts-ignore
                    const stepValue = gestureState.dy - this.lastScaleDy;
                    // @ts-ignore
                    this.lastScaleDy = gestureState.dy;

                    const scaleStep = (stepValue * zoomMultiplier) / screenHeight;
                    // @ts-ignore
                    const {trackScale} = this.state;

                    const newTrackScaleValue = trackScale + scaleStep;
                    const newBoundedTrackScaleValue = Math.max(
                        Math.min(newTrackScaleValue, maximumZoomLevel),
                        1
                    );
                    this.setState({trackScale: newBoundedTrackScaleValue});

                }
            },
            onPanResponderTerminationRequest: () => true,
            onShouldBlockNativeResponder: () => true,
        });

    handleHandleSizeChange = () => {
        // @ts-ignore
        const {onHandleChange} = this.props;
        // @ts-ignore
        const {trimmingLeftHandleValue, trimmingRightHandleValue} = this.state;
        onHandleChange &&
        onHandleChange({
            leftPosition: trimmingLeftHandleValue | 0,
            rightPosition: trimmingRightHandleValue | 0,
        });
    };

    handleLeftHandlePressIn = () => {
        // @ts-ignore
        const {onLeftHandlePressIn} = this.props;
        onLeftHandlePressIn && onLeftHandlePressIn();
    };

    handleRightHandlePressIn = () => {
        // @ts-ignore
        const {onRightHandlePressIn} = this.props;
        onRightHandlePressIn && onRightHandlePressIn();
    };

    render() {
        const {
            // @ts-ignore
            minimumTrimDuration,
            // @ts-ignore
            totalDuration,
            // @ts-ignore
            trimmerLeftHandlePosition,
            // @ts-ignore
            trimmerRightHandlePosition,
            // @ts-ignore
            scrubberPosition,
            // @ts-ignore
            trackBackgroundColor = TRACK_BACKGROUND_COLOR,
            // @ts-ignore
            trackBorderColor = TRACK_BORDER_COLOR,
            // @ts-ignore
            markerColor = MARKER_COLOR,
            // @ts-ignore
            tintColor = TINT_COLOR,
            // @ts-ignore
            scrubberColor = SCRUBBER_COLOR,
            // @ts-ignore
            showScrollIndicator = SHOW_SCROLL_INDICATOR,
        } = this.props;

        if (minimumTrimDuration > trimmerRightHandlePosition - trimmerLeftHandlePosition) {
            console.error(
                'minimumTrimDuration is less than trimRightHandlePosition minus trimmerLeftHandlePosition',
                {
                    minimumTrimDuration,
                    trimmerRightHandlePosition,
                    trimmerLeftHandlePosition,
                }
            );
            return null;
        }

        const {
            // @ts-ignore
            trimming,
            // @ts-ignore
            scrubbing,
            // @ts-ignore
            internalScrubbingPosition,
            // @ts-ignore
            trackScale,
            // @ts-ignore
            trimmingLeftHandleValue,
            // @ts-ignore
            trimmingRightHandleValue,
        } = this.state;

        const trackWidth = screenWidth * trackScale;

        if (isNaN(trackWidth)) {
            console.log(
                'ERROR render() trackWidth !== number. screenWidth',
                screenWidth,
                ', trackScale',
                trackScale,
                ', ',
                trackWidth
            );
        }

        const trackBackgroundStyles = [
            styles.trackBackground,
            {
                width: trackWidth,
                backgroundColor: trackBackgroundColor,
                zIndex: -99999,
                // borderColor: TINT_COLOR,
                // // borderWidth: 3,
                // height: 200,
            },
        ];

        const leftPosition = trimming ? trimmingLeftHandleValue : trimmerLeftHandlePosition;
        const rightPosition = trimming ? trimmingRightHandleValue : trimmerRightHandlePosition;
        const scrubPosition = scrubbing ? internalScrubbingPosition : scrubberPosition;

        const boundedLeftPosition = Math.max(leftPosition, 0);
        const boundedScrubPosition = this.clamp({
            value: scrubPosition,
            min: boundedLeftPosition,
            max: rightPosition,
        });
        const boundedTrimTime = Math.max(rightPosition - boundedLeftPosition, 0);

        const actualTrimmerWidth = (boundedTrimTime / totalDuration) * trackWidth + 8;
        const actualTrimmerOffset =
            (boundedLeftPosition / totalDuration) * trackWidth + TRACK_PADDING_OFFSET + HANDLE_WIDTHS;
        const actualScrubPosition =
            (boundedScrubPosition / totalDuration) * trackWidth + TRACK_PADDING_OFFSET + HANDLE_WIDTHS;

        if (isNaN(actualTrimmerWidth)) {
            console.log(
                'ERROR render() actualTrimmerWidth !== number. boundedTrimTime',
                boundedTrimTime,
                ', totalDuration',
                totalDuration,
                ', trackWidth',
                trackWidth
            );
        }

        const markers = new Array((totalDuration / MARKER_INCREMENT) | 0).fill(0) || [];
        let right = (trimmerRightHandlePosition / 1 - 2) | 0;
        let left = (trimmerLeftHandlePosition / 1) | 0;
        let x = totalDuration / markers.length;
        let j = 0;
        let change_trimmer = 0;
        let checkLast = 0;
        return (
            <View style={styles.root}>

                <ScrollView
                    scrollEnabled={!trimming && !scrubbing}
                    style={[
                        styles.horizontalScrollView,
                        {transform: [{scaleX: 1.0}]},
                    ]}
                    horizontal
                    showsHorizontalScrollIndicator={showScrollIndicator}

                    // @ts-ignore
                    {...{...this.trackPanResponder.panHandlers}}>
                    <View style={trackBackgroundStyles}>
                        <View style={styles.markersContainer}>
                            {markers.map(
                                (m, i) => (
                                    (j = i * x),
                                        trackScale >= 1 && trackScale <= 1.6 ? (change_trimmer = 3800) : 0,
                                        trackScale > 1.6 && trackScale < 2.0 ? (change_trimmer = 3000) : 0,
                                        trackScale > 2 && trackScale <= 3 ? (change_trimmer = 1700) : 5000,
                                        trackScale > 3 && trackScale <= 4.5 ? (change_trimmer = 1000) : 5000,
                                        trackScale > 4.5 ? (change_trimmer = 800) : 5000,
                                        trackScale >= 5.5 ? (change_trimmer = 800) : 5000,

                                        (
                                            <View
                                                key={`marker-${i}`}
                                                style={[
                                                    styles.marker,
                                                    i % 5 ? {} : styles.specialMarker3,
                                                    i % 7 ? {} : styles.specialMarker2,
                                                    i % 3 ? {} : styles.specialMarker1,

                                                    j <= right + change_trimmer && j >= left
                                                        ? styles.specialMarker5
                                                        : styles.specialMarker4,
                                                    i % 2 ? {} : styles.specialMarker2,
                                                    j <= right + change_trimmer && j >= left
                                                        ? styles.specialMarker5
                                                        : styles.specialMarker4,
                                                    // i === 0 || i === markers.length - 1 ? styles.hiddenMarker : {},
                                                ]}
                                            />
                                        )
                                )
                            )}
                        </View>
                    </View>
                    {typeof scrubberPosition === 'number' ? (
                        <View
                            style={[styles.scrubberContainer, {left: actualScrubPosition + 3}]}
                            hitSlop={{top: 8, bottom: 8, right: 8, left: 8}}>
                            {/* <View style={[styles.scrubberHead, { backgroundColor: scrubberColor }]} /> */}
                            <View style={[styles.scrubberTail, {backgroundColor: 'white'}]}/>
                        </View>
                    ) : null}

                    <View
                        style={[
                            styles.unTrimmerLeft,
                            {
                                width: 100000,
                                left: actualTrimmerOffset + actualTrimmerWidth,
                            },
                            {borderColor: tintColor},
                        ]}>
                        <View style={[styles.selection, {backgroundColor: tintColor}]}/>
                    </View>

                    <View
                        // @ts-ignore
                        {...this.leftHandlePanResponder.panHandlers}
                        style={[
                            styles.handle,
                            // styles.leftHandle,
                            {backgroundColor: tintColor, left: actualTrimmerOffset},
                        ]}>
                        <Arrow.Left/>
                        <View style={styles.handle1}></View>
                    </View>
                    <View
                        style={[
                            styles.unTrimmerRight,
                            {width: actualTrimmerOffset, left: TRACK_PADDING_OFFSET},
                            {borderColor: '#FCCC26'},
                        ]}>
                        {/* <View style={[styles.selection, { backgroundColor: tintColor }]} /> */}
                    </View>

                    <View
                        // @ts-ignore
                        {...this.rightHandlePanResponder.panHandlers}
                        style={[
                            styles.handle2,
                            // styles.rightHandle,
                            totalDuration - rightPosition < 1000 ? checkLast= 8 : {},

                            {
                                backgroundColor: tintColor,
                                left: actualTrimmerOffset + actualTrimmerWidth - HANDLE_WIDTHS / 3.5 - checkLast,
                            },
                        ]}>
                        <View style={styles.handle4}></View>
                        <View style={styles.handle5}>
                            <Arrow.Left styles={styles.handle5}></Arrow.Left>
                        </View>

                        <View style={styles.handle3}></View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        height: 200,
    },
    horizontalScrollView: {
        height: 200,
        overflow: 'hidden',
        position: 'relative',
    },
    trackBackground: {
        // position: 'absolute',
        overflow: 'hidden',
        backgroundColor: TINT_COLOR,
        // borderRadius: 5,
        // borderWidth: 1,
        borderColor: TRACK_BORDER_COLOR,
        height: 200,
        // opacity: 0.2,
        // marginHorizontal: HANDLE_WIDTHS + TRACK_PADDING_OFFSET,
    },
    trimmer: {
        position: 'absolute',
        left: TRACK_PADDING_OFFSET,
        borderColor: TINT_COLOR,
        // borderWidth: 3,
        // height: 200,
        opacity: 1,
    },
    unTrimmerLeft: {
        position: 'absolute',
        left: TRACK_PADDING_OFFSET,
        borderColor: TINT_COLOR,
        // borderWidth: 3,
        height: 200,
        opacity: 0.1,
        backgroundColor: '#C4C4C4',
    },

    unTrimmerRight: {
        position: 'absolute',
        right: TRACK_PADDING_OFFSET,
        borderColor: TINT_COLOR,
        // borderWidth: 3,
        height: 200,
        opacity: 0.1,
        backgroundColor: '#C4C4C4',
    },
    handle: {
        position: 'absolute',
        width: 33,
        height: 20,
        backgroundColor: '#C4C4C4',
        borderTopRightRadius: 2,
    },
    handle1: {
        height: 200,
        // backgroundColor: 'red',
        width: 3,
        backgroundColor: '#38EF7D',
    },
    handle2: {
        position: 'absolute',
        bottom: 0,
        transform: [{rotate: '360deg'}, {translateX: -33}],
        // transform: [{ rotate: '180deg' }],

        left: -33,
        width: 33, // 33
        height: 20,
        color: 'red',
        borderBottomLeftRadius: 2,
    },
    handle3: {
        position: 'absolute',
        left: 30,
        height: 200,
        width: 3,
        backgroundColor: '#38EF7D',
    },
    handle4: {
        position: 'absolute',
        bottom: 0,
        left: 30,
        width: 3,
        height: 200,
        backgroundColor: '#38EF7D',
    },
    handle5: {
        position: 'absolute',
        right: 0,
        top: 20,
        transform: [{rotate: '180deg'}],
    },
    leftHandle: {
        position: 'relative',

        // borderTopLeftRadius: 10,
        // borderBottomLeftRadius: 10,
    },
    rightHandle: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    selection: {
        opacity: 0.2,
        backgroundColor: TINT_COLOR,
        width: '100%',
        height: '100%',
    },
    markersContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    marker: {
        backgroundColor: TINT_COLOR, // marker color,
        width: 1,
        height: 45,
        borderRadius: 2,
    },
    specialMarker: {
        height: 120,
        backgroundColor: '#C4C4C4',
    },
    specialMarker1: {
        height: 80,
        backgroundColor: '#C4C4C4',
    },
    specialMarker2: {
        height: 10,
        backgroundColor: '#C4C4C4',
    },
    specialMarker3: {
        height: 30,
        backgroundColor: '#C4C4C4',
    },
    specialMarker4: {
        backgroundColor: '#C4C4C4',
    },
    specialMarker5: {
        backgroundColor: '#FCCC26',
    },
    hiddenMarker: {
        opacity: 1,
    },
    scrubberContainer: {
        // zIndex: 1,
        position: 'absolute',
        // width: 14,
        height: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    scrubberHead: {
        position: 'absolute',
        backgroundColor: SCRUBBER_COLOR,
        top: 50,
    },
    scrubberTail: {
        backgroundColor: SCRUBBER_COLOR,
        height: 200,
        width: 3.25,
        justifyContent: 'center',
    },
});
