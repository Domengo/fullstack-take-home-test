import * as React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

// export interface Props {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window?: () => Window;
//   children: React.ReactElement;
// }

type HideOnScrollProps = {
  children: React.ReactElement;
  threshold?: number;  // Optional prop to define when the element should hide
};

// export default function HideOnScroll(props: Props) {
//   const { children, window } = props;
//   // Note that you normally won't need to set the window ref as useScrollTrigger
//   // will default to window.
//   // This is only being set here because the demo is in an iframe.
//   const trigger = useScrollTrigger({
//     target: window ? window() : undefined,
//   });

const HideOnScroll: React.FC<HideOnScrollProps> = ({ children, threshold = 100 }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: threshold,  // Use scroll threshold from props
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default HideOnScroll;