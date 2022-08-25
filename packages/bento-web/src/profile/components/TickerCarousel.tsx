import styled, { keyframes } from 'styled-components';

export const TickerCarousel: React.FC = () => {
  return (
    <TickerContainer>
      <Tickers>
        <TickerItem />
        <TickerItem />
        <TickerItem />
        <TickerItem />
        <TickerItem />
        <TickerItem />
      </Tickers>
    </TickerContainer>
  );
};

const TickerContainer = styled.div`
  width: 100%;
  height: 40px;
  background: #000000;

  display: flex;
  align-items: center;
  overflow: hidden;

  position: relative;
  z-index: 0;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;

    width: 40px;
    height: 40px;

    background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
  }

  &:before {
    left: 0;
    transform: matrix(-1, 0, 0, 1, 0, 0);
  }

  &:after {
    right: 0;
  }
`;

const tickerSlide = keyframes`
  to {
    transform: translate3d(-55%, 0, 0);
  }
`;
const Tickers = styled.div`
  margin-bottom: -4px;

  display: flex;
  gap: 24px;

  white-space: nowrap;
  animation-timing-function: linear;
  animation: ${tickerSlide} 44s infinite;
  animation-direction: alternate;
`;
const TickerItem: React.FC = () => (
  <svg
    width="283"
    height="13"
    viewBox="0 0 283 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.194 12.834H0V0.216H4.194V12.834ZM21.1448 6.534C21.1448 11.412 17.2568 12.834 13.9988 12.834H5.3228V0.234H13.9628C17.6348 0.234 21.1448 1.152 21.1448 6.534ZM9.5168 9.414H13.7108C15.7628 9.414 16.7528 8.136 16.7528 6.552C16.7528 4.986 15.9608 3.708 13.7108 3.708H9.5168V9.414ZM21.8672 12.834V0.216H35.8172V3.708H26.0612V4.824H35.1872V8.19H26.0612V9.342H35.8172V12.834H21.8672ZM52.8625 0.198001V12.834H47.1385L40.9465 5.22V12.834H36.7525V0.198001H42.5845L48.6685 7.686V0.198001H52.8625ZM53.856 4.392V0.198001H70.542V4.392H64.296V12.834H60.102V4.392H53.856ZM75.8776 12.834H71.6836V0.216H75.8776V12.834ZM77.0064 4.392V0.198001H93.6924V4.392H87.4464V12.834H83.2524V4.392H77.0064ZM102.88 4.572L106.138 0.198001H111.088L104.968 9.126V12.834H100.774V9.126L94.69 0.198001H99.64L102.88 4.572ZM116.467 12.888H112.039L116.881 0.288001H121.309L116.467 12.888ZM122.323 12.834V0.198001H135.859V4.05H126.517V5.274H133.825V8.982H126.517V12.834H122.323ZM136.86 12.834V0.198001H146.13C147.336 0.198001 151.584 0.360001 151.584 4.842C151.584 7.182 150.486 8.442 149.262 9.108L151.836 12.834L146.994 12.816L144.852 9.846H141.054V12.834H136.86ZM141.054 6.156H145.734C146.346 6.156 147.3 6.03 147.3 4.986C147.3 3.924 146.22 3.888 145.68 3.888H141.054V6.156ZM152.364 6.21C152.364 1.998 155.082 0 160.752 0C166.224 0 169.518 1.422 169.518 6.444C169.518 11.358 166.728 12.888 160.86 12.888C154.848 12.888 152.364 10.746 152.364 6.21ZM156.972 6.444C156.972 8.28 158.214 9.576 160.914 9.576C163.362 9.576 164.91 8.622 164.91 6.444C164.91 4.356 163.218 3.312 160.86 3.312C158.214 3.312 156.972 4.482 156.972 6.444ZM184.315 7.272L181.057 12.834H177.601L174.505 7.308V12.834H170.311V0.198001H175.297L179.383 7.2L183.487 0.198001H188.491V12.834H184.315V7.272ZM193.881 12.888H189.453L194.295 0.288001H198.723L193.881 12.888ZM212.445 5.832C213.363 6.12 214.515 6.966 214.515 9.306C214.515 11.556 213.651 12.834 210.177 12.834H203.283H199.737V0.216L208.719 0.198001C212.175 0.198001 213.327 1.332 213.327 3.366C213.327 4.644 212.967 5.4 212.445 5.832ZM208.665 3.708H203.949V4.932H208.665C209.007 4.932 209.277 4.644 209.277 4.32C209.277 3.978 209.007 3.708 208.665 3.708ZM203.949 9.36H210.105C210.447 9.36 210.717 9.072 210.717 8.73C210.717 8.388 210.447 8.118 210.105 8.118H203.949V9.36ZM215.648 12.834V0.216H229.598V3.708H219.842V4.824H228.968V8.19H219.842V9.342H229.598V12.834H215.648ZM246.644 0.198001V12.834H240.92L234.728 5.22V12.834H230.534V0.198001H236.366L242.45 7.686V0.198001H246.644ZM247.637 4.392V0.198001H264.323V4.392H258.077V12.834H253.883V4.392H247.637ZM264.917 6.21C264.917 1.998 267.635 0 273.305 0C278.777 0 282.071 1.422 282.071 6.444C282.071 11.358 279.281 12.888 273.413 12.888C267.401 12.888 264.917 10.746 264.917 6.21ZM269.525 6.444C269.525 8.28 270.767 9.576 273.467 9.576C275.915 9.576 277.463 8.622 277.463 6.444C277.463 4.356 275.771 3.312 273.413 3.312C270.767 3.312 269.525 4.482 269.525 6.444Z"
      fill="#EB4C5B"
    />
  </svg>
);
