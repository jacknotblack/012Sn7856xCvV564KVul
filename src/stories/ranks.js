import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Ranks from "../modules/ranks/components";
import MobileWrapper from "./mobileWrapper";

storiesOf("Ranks", module)
  .add("with gastby and daily selected", () => (
    <Ranks
      selectedRankType="gastby"
      selectedRankPeriod="daily"
      onRankTypeClick={t => action(`${t} clicked`)}
      onRankPeriodClick={p => action(`${p} clicked`)}
      visibleRanks={[
        {
          name: "Jack",
          stars: 23084575
        },
        {
          name: "Jack",
          stars: 2308455
        },
        {
          name: "Jack",
          stars: 230455
        },
        {
          name: "Jack",
          stars: 20845
        },
        {
          name: "Jack",
          stars: 2305
        },
        {
          name: "Jack",
          stars: 275
        },
        {
          name: "Jack",
          stars: 25
        },
        {
          name: "Jack",
          stars: 2
        },
        {
          name: "Jack",
          stars: 1
        }
      ]}
      isWebview
    />
  ))
  .add("[M]with gastby and daily selected", () => (
    <MobileWrapper>
      <Ranks
        selectedRankType="gastby"
        selectedRankPeriod="daily"
        onRankTypeClick={t => action(`${t} clicked`)}
        onRankPeriodClick={p => action(`${p} clicked`)}
        visibleRanks={[
          {
            name: "Jack",
            stars: 23084575
          },
          {
            name: "Jack",
            stars: 2308455
          },
          {
            name: "Jack",
            stars: 230455
          },
          {
            name: "Jack",
            stars: 20845
          },
          {
            name: "Jack",
            stars: 2305
          },
          {
            name: "Jack",
            stars: 275
          },
          {
            name: "Jack",
            stars: 25
          },
          {
            name: "Jack",
            stars: 2
          },
          {
            name: "Jack",
            stars: 1
          }
        ]}
        isWebview
      />
    </MobileWrapper>
  ));
