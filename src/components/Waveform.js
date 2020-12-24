import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import styled from "styled-components";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#00CFFD",
  progressColor: "OrangeRed",
  cursorColor: "OrangeRed",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 40,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
});

export default function Waveform({ url }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(1);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function () {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [url]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  return (
    <Wrapper>
      <div id="waveform" ref={waveformRef} />

      <Play onClick={handlePlayPause}>
        {!playing ? (
          <img
            style={{
              width: "16px",
              height: "16px",
              transform: "translate(2px,2px)",
            }}
            src="./images/play.svg"
          />
        ) : (
          <img
            style={{
              width: "16px",
              height: "16px",
              transform: "translate(0px,2px)",
            }}
            src="./images/stop.svg"
          />
        )}
      </Play>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 10fr 1fr;
  align-items: center;
  gap: 10px;
`;

const Play = styled.button`
  background: #a99f9c54;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  outline: none;
  text-transform: uppercase;
  transition: all 0.2s ease;

  :hover {
    background: #cacaca;
  }
`;
