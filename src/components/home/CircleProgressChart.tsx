import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Text } from 'react-native-svg';

interface CircleProgressChartProps {
    progress: number;
    strokeWidth?: number;
    size?: number;
}

const CircleProgressChart: React.FC<CircleProgressChartProps> = ({ progress, size = 60, strokeWidth = 10}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
        <View style={styles.container}>
            <Svg width={size} height={size}>
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#EFEFEF"
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={`${circumference} ${circumference}`}
                    fill="none"
                />
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="blue"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={circumference - (progress / 100) * circumference}
                />
                <Text
                    x={size / 2}
                    y={size / 2}
                    textAnchor="middle"
                    fill="black"
                    fontSize="11"
                    dy=".3em"
                >
                    15/22
                </Text>
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    checkmarkContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CircleProgressChart;