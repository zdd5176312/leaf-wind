import React, { useEffect, useRef } from 'react';
import windyData from './assets/mock/wind.json';
const App = ({ data }) => {
  let map = useRef();
  let T = window.T || {};
  // 检测当前浏览器是否支持canvas
  let isSupportCanvas = () => {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  }
  useEffect(() => {
    createMapUrl();
    const timeoutId = setTimeout(() => {
      if (isSupportCanvas()) {
        T = window.T;
        if (!window.T) {
          throw new Error("没有引入天地图js");
        } else {
          map.current = new T.Map('windy-wrap', {
            zoom: 4,
            minZoom: 2,
            maxZoom: 13,
            maxBounds: [[90, -180], [-90, 180]],
          })
          const scaleControl = new T.Control.Zoom({ position: window.T_ANCHOR_TOP_RIGHT });
          map.current?.addControl(scaleControl);
          map.current?.centerAndZoom(new T.LngLat(116.40769, 39.89945), 4);
          map.current?.disableDoubleClickZoom();// 禁止双击放大地图
          // 渲染风场效果
          import("tmap-wind").then(({ WindLayer }) => {
            const windOverlay = new WindLayer(data || windyData);
            map.current.addOverLay(windOverlay)
          });
        }
      } else {
        alert('该浏览器暂不支持canvas');
      }
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    }
  }, [])
  let createMapUrl = () => {
    var script = document.createElement("script");
    script.src = "http://10.1.65.144/api/api?v=4.0";
    document.body.appendChild(script);
  }
  return <div id='windy-wrap'></div>;
};

export default App;