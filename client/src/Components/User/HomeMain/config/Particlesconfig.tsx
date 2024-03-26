import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { RecursivePartial } from "@tsparticles/engine";

interface ParticlesComponentProps {
  id: string;
}

const ParticlesComponent: React.FC<ParticlesComponentProps> = ({ id }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Use RecursivePartial<IOptions> directly for options
  const options: RecursivePartial<any> = useMemo(
    () => ({
      background: {
        color: {
          value: "#fffff",
        },
      },
      backgroundMask: {
        composite: "destination-out",
        cover: {
          color: {
            value: "#fff",
          },
          opacity: 1,
        },
        enable: false,
      },
      clear: true,
      defaultThemes: {},
      delay: 0,
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      duration: 0,
      fpsLimit: 120,
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onDiv: {
            selectors: [],
            enable: false,
            mode: "push",
            type: "circle",
          },
          onHover: {
            enable: true,
            mode: "bubble",
          },
          resize: {
            delay: 0.5,
            enable: true,
          },
        },
        modes: {
          bubble: {
            distance: 200,
            duration: 0.4,
            size: 8,
            opacity: 0.8,
            speed: 3,
          },
        },
      },
      particles: {
        color: {
          value: "#061c3a",
        },
        links: {
          color: "#061c3a",
          distance: 150,
          enable: true,
          opacity: 0.8,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 3,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.1,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 10, max: 6 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return init ? (
    <div className="h-2/4">
      <Particles id={id} options={options} />
    </div>
  ) : null;
};

export default ParticlesComponent;
