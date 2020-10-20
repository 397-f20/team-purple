import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import { colors } from "../../styles/all_styles";
import Header from "../01_Atoms/Header";
import { BarChart, StackedBarChart } from "react-native-chart-kit";

const ResultGraph = ({ title, data }) => {
  // CHART DATA-------------------------------------------------
  const chartConfig = {
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => colors.primaryColor,
    strokeWidth: 2,
    barPercentage: 0.7,
    fillShadowGradient: colors.primaryColor,
    fillShadowGradientOpacity: 1,
  };

  return (
    <View>
      <Header title={title} />
      <BarChart
        style={{ marginLeft: -25 }}
        data={data}
        width={300}
        height={220}
        chartConfig={chartConfig}
        withInnerLines={false}
        showValuesOnTopOfBars
        withHorizontalLabels={false}
      />
    </View>
  );
};


export default ResultGraph;
