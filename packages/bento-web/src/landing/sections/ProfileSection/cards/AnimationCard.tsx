import { MotionProps, motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Image from 'next/future/image';
import styled from 'styled-components';

import ferrariImageOne from '@/assets/illusts/animation-ferrari-1.png';
import ferrariImageTwo from '@/assets/illusts/animation-ferrari-2.png';

import { HiddenCardTitle } from '../components/HiddenCardTitle';

const generateAnimation = (startY: number): MotionProps => ({
  variants: {
    hidden: { opacity: 0, y: startY },
    show: { opacity: 1, y: 0 },
  },
  transition: {
    ease: 'circInOut',
    duration: 0.2,
  },
  initial: 'hidden',
  whileInView: 'show',
});

export const AnimationCard: React.FC = () => {
  const { i18n } = useTranslation('common');
  const currentLanguage = i18n.resolvedLanguage || i18n.language || 'en';

  return (
    <Wrapper>
      <Card>
        <Content>
          {currentLanguage === 'en' && (
            <>
              <CardTitleEN />
              <HiddenCardTitle>Animated Like Magic</HiddenCardTitle>
            </>
          )}
          {currentLanguage === 'ko' && (
            <CardTitleKO>
              내 마음대로 <br />
              넣는 애니메이션
            </CardTitleKO>
          )}
          <AnimatedBlockList>
            <AnimatedBlockItem {...generateAnimation(-54)}>
              <BlockItem alt="" src={ferrariImageOne} />
            </AnimatedBlockItem>
            <AnimatedBlockItem {...generateAnimation(54)}>
              <BlockItem alt="" src={ferrariImageTwo} />
            </AnimatedBlockItem>
          </AnimatedBlockList>
          <FramerLogo />
        </Content>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: calc((100% - 84px) / 3);
  height: calc(100% + 175px);
`;
const Card = styled.div`
  width: 100%;
  height: 100%;

  background: linear-gradient(172.69deg, #9a4133 16.94%, #c8453c 94.32%);
  border-radius: 48px;
  position: relative;
  overflow: hidden;
  z-index: 0;

  filter: saturate(120%);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;

    background-image: url('/assets/landing/noise.png');
    mix-blend-mode: overlay;
  }
`;
const Content = styled.div`
  padding: 32px;

  display: flex;
  flex-direction: column;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
`;
const _CardTitleEN: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="261"
    height="102"
    viewBox="0 0 261 102"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M24.096 34.48H12.096L10.272 40H0.384L12.72 6.16H23.568L35.856 40H25.92L24.096 34.48ZM21.744 27.28L18.096 16.336L14.496 27.28H21.744ZM56.5384 12.832C59.6424 12.832 62.1064 13.872 63.9304 15.952C65.7544 18 66.6664 20.784 66.6664 24.304V40H57.2584V25.552C57.2584 24.016 56.8584 22.816 56.0584 21.952C55.2584 21.056 54.1864 20.608 52.8424 20.608C51.4344 20.608 50.3304 21.056 49.5304 21.952C48.7304 22.816 48.3304 24.016 48.3304 25.552V40H38.9224V13.072H48.3304V16.912C49.1624 15.696 50.2824 14.72 51.6904 13.984C53.0984 13.216 54.7144 12.832 56.5384 12.832ZM76.5806 10.576C74.9166 10.576 73.5726 10.128 72.5486 9.232C71.5566 8.304 71.0606 7.152 71.0606 5.776C71.0606 4.368 71.5566 3.2 72.5486 2.272C73.5726 1.344 74.9166 0.879997 76.5806 0.879997C78.2126 0.879997 79.5246 1.344 80.5166 2.272C81.5406 3.2 82.0526 4.368 82.0526 5.776C82.0526 7.152 81.5406 8.304 80.5166 9.232C79.5246 10.128 78.2126 10.576 76.5806 10.576ZM81.2366 13.072V40H71.8286V13.072H81.2366ZM121.778 12.832C125.17 12.832 127.826 13.856 129.746 15.904C131.698 17.952 132.674 20.752 132.674 24.304V40H123.266V25.552C123.266 24.112 122.866 22.992 122.066 22.192C121.266 21.392 120.178 20.992 118.802 20.992C117.426 20.992 116.338 21.392 115.538 22.192C114.738 22.992 114.338 24.112 114.338 25.552V40H104.93V25.552C104.93 24.112 104.53 22.992 103.73 22.192C102.962 21.392 101.89 20.992 100.514 20.992C99.1063 20.992 98.0023 21.392 97.2023 22.192C96.4023 22.992 96.0023 24.112 96.0023 25.552V40H86.5943V13.072H96.0023V16.624C96.8343 15.472 97.9063 14.56 99.2183 13.888C100.562 13.184 102.098 12.832 103.826 12.832C105.81 12.832 107.57 13.264 109.106 14.128C110.674 14.992 111.906 16.208 112.802 17.776C113.762 16.304 115.026 15.12 116.594 14.224C118.162 13.296 119.89 12.832 121.778 12.832ZM136.293 26.512C136.293 23.728 136.789 21.296 137.781 19.216C138.805 17.136 140.181 15.536 141.909 14.416C143.669 13.296 145.621 12.736 147.765 12.736C149.621 12.736 151.221 13.104 152.565 13.84C153.909 14.576 154.949 15.568 155.685 16.816V13.072H165.093V40H155.685V36.256C154.949 37.504 153.893 38.496 152.517 39.232C151.173 39.968 149.589 40.336 147.765 40.336C145.621 40.336 143.669 39.776 141.909 38.656C140.181 37.536 138.805 35.936 137.781 33.856C136.789 31.744 136.293 29.296 136.293 26.512ZM155.685 26.512C155.685 24.784 155.205 23.424 154.245 22.432C153.317 21.44 152.165 20.944 150.789 20.944C149.381 20.944 148.213 21.44 147.285 22.432C146.357 23.392 145.893 24.752 145.893 26.512C145.893 28.24 146.357 29.616 147.285 30.64C148.213 31.632 149.381 32.128 150.789 32.128C152.165 32.128 153.317 31.632 154.245 30.64C155.205 29.648 155.685 28.272 155.685 26.512ZM186.342 31.984V40H182.262C175.382 40 171.942 36.592 171.942 29.776V20.896H168.63V13.072H171.942V6.544H181.398V13.072H186.294V20.896H181.398V29.92C181.398 30.656 181.558 31.184 181.878 31.504C182.23 31.824 182.806 31.984 183.606 31.984H186.342ZM216.385 26.224C216.385 26.96 216.337 27.696 216.241 28.432H198.433C198.529 29.904 198.929 31.008 199.633 31.744C200.369 32.448 201.297 32.8 202.417 32.8C203.985 32.8 205.105 32.096 205.777 30.688H215.809C215.393 32.544 214.577 34.208 213.361 35.68C212.177 37.12 210.673 38.256 208.849 39.088C207.025 39.92 205.009 40.336 202.801 40.336C200.145 40.336 197.777 39.776 195.697 38.656C193.649 37.536 192.033 35.936 190.849 33.856C189.697 31.776 189.121 29.328 189.121 26.512C189.121 23.696 189.697 21.264 190.849 19.216C192.001 17.136 193.601 15.536 195.649 14.416C197.729 13.296 200.113 12.736 202.801 12.736C205.457 12.736 207.809 13.28 209.857 14.368C211.905 15.456 213.505 17.024 214.657 19.072C215.809 21.088 216.385 23.472 216.385 26.224ZM206.785 23.872C206.785 22.72 206.401 21.824 205.633 21.184C204.865 20.512 203.905 20.176 202.753 20.176C201.601 20.176 200.657 20.496 199.921 21.136C199.185 21.744 198.705 22.656 198.481 23.872H206.785ZM218.699 26.512C218.699 23.728 219.195 21.296 220.187 19.216C221.211 17.136 222.603 15.536 224.363 14.416C226.123 13.296 228.075 12.736 230.219 12.736C231.947 12.736 233.483 13.104 234.827 13.84C236.203 14.544 237.275 15.52 238.043 16.768V4.48H247.499V40H238.043V36.256C237.307 37.504 236.267 38.496 234.923 39.232C233.579 39.968 231.995 40.336 230.171 40.336C228.027 40.336 226.075 39.776 224.315 38.656C222.587 37.536 221.211 35.936 220.187 33.856C219.195 31.744 218.699 29.296 218.699 26.512ZM238.091 26.512C238.091 24.784 237.611 23.424 236.651 22.432C235.723 21.44 234.571 20.944 233.195 20.944C231.787 20.944 230.619 21.44 229.691 22.432C228.763 23.392 228.299 24.752 228.299 26.512C228.299 28.24 228.763 29.616 229.691 30.64C230.619 31.632 231.787 32.128 233.195 32.128C234.571 32.128 235.723 31.632 236.651 30.64C237.611 29.648 238.091 28.272 238.091 26.512ZM12.096 80.8H22.608V88H2.688V54.16H12.096V80.8ZM31.0181 58.576C29.3541 58.576 28.0101 58.128 26.9861 57.232C25.9941 56.304 25.4981 55.152 25.4981 53.776C25.4981 52.368 25.9941 51.2 26.9861 50.272C28.0101 49.344 29.3541 48.88 31.0181 48.88C32.6501 48.88 33.9621 49.344 34.9541 50.272C35.9781 51.2 36.4901 52.368 36.4901 53.776C36.4901 55.152 35.9781 56.304 34.9541 57.232C33.9621 58.128 32.6501 58.576 31.0181 58.576ZM35.6741 61.072V88H26.2661V61.072H35.6741ZM57.8798 88L50.4398 76.96V88H41.0318V52.48H50.4398V71.632L57.8798 61.072H69.1598L58.5518 74.608L69.3518 88H57.8798ZM97.8379 74.224C97.8379 74.96 97.7899 75.696 97.6939 76.432H79.8859C79.9819 77.904 80.3819 79.008 81.0859 79.744C81.8219 80.448 82.7499 80.8 83.8699 80.8C85.4379 80.8 86.5579 80.096 87.2299 78.688H97.2619C96.8459 80.544 96.0299 82.208 94.8139 83.68C93.6299 85.12 92.1259 86.256 90.3019 87.088C88.4779 87.92 86.4619 88.336 84.2539 88.336C81.5979 88.336 79.2299 87.776 77.1499 86.656C75.1019 85.536 73.4859 83.936 72.3019 81.856C71.1499 79.776 70.5739 77.328 70.5739 74.512C70.5739 71.696 71.1499 69.264 72.3019 67.216C73.4539 65.136 75.0539 63.536 77.1019 62.416C79.1819 61.296 81.5659 60.736 84.2539 60.736C86.9099 60.736 89.2619 61.28 91.3099 62.368C93.3579 63.456 94.9579 65.024 96.1099 67.072C97.2619 69.088 97.8379 71.472 97.8379 74.224ZM88.2379 71.872C88.2379 70.72 87.8539 69.824 87.0859 69.184C86.3179 68.512 85.3579 68.176 84.2059 68.176C83.0539 68.176 82.1099 68.496 81.3739 69.136C80.6379 69.744 80.1579 70.656 79.9339 71.872H88.2379ZM150.38 54.16V88H140.972V69.328L134.588 88H126.716L120.284 69.184V88H110.876V54.16H122.252L130.748 76.144L139.052 54.16H150.38ZM154.199 74.512C154.199 71.728 154.695 69.296 155.687 67.216C156.711 65.136 158.087 63.536 159.815 62.416C161.575 61.296 163.527 60.736 165.671 60.736C167.527 60.736 169.127 61.104 170.471 61.84C171.815 62.576 172.855 63.568 173.591 64.816V61.072H182.999V88H173.591V84.256C172.855 85.504 171.799 86.496 170.423 87.232C169.079 87.968 167.495 88.336 165.671 88.336C163.527 88.336 161.575 87.776 159.815 86.656C158.087 85.536 156.711 83.936 155.687 81.856C154.695 79.744 154.199 77.296 154.199 74.512ZM173.591 74.512C173.591 72.784 173.111 71.424 172.151 70.432C171.223 69.44 170.071 68.944 168.695 68.944C167.287 68.944 166.119 69.44 165.191 70.432C164.263 71.392 163.799 72.752 163.799 74.512C163.799 76.24 164.263 77.616 165.191 78.64C166.119 79.632 167.287 80.128 168.695 80.128C170.071 80.128 171.223 79.632 172.151 78.64C173.111 77.648 173.591 76.272 173.591 74.512ZM198.296 60.736C200.12 60.736 201.704 61.104 203.048 61.84C204.424 62.576 205.48 63.568 206.216 64.816V61.072H215.624V87.712C215.624 90.24 215.144 92.512 214.184 94.528C213.224 96.576 211.72 98.208 209.672 99.424C207.656 100.64 205.096 101.248 201.992 101.248C197.832 101.248 194.504 100.272 192.008 98.32C189.512 96.368 188.088 93.712 187.736 90.352H197C197.192 91.216 197.672 91.888 198.44 92.368C199.208 92.848 200.2 93.088 201.416 93.088C204.616 93.088 206.216 91.296 206.216 87.712V84.256C205.48 85.504 204.424 86.496 203.048 87.232C201.704 87.968 200.12 88.336 198.296 88.336C196.152 88.336 194.2 87.776 192.44 86.656C190.712 85.536 189.336 83.936 188.312 81.856C187.32 79.744 186.824 77.296 186.824 74.512C186.824 71.728 187.32 69.296 188.312 67.216C189.336 65.136 190.712 63.536 192.44 62.416C194.2 61.296 196.152 60.736 198.296 60.736ZM206.216 74.512C206.216 72.784 205.736 71.424 204.776 70.432C203.848 69.44 202.696 68.944 201.32 68.944C199.912 68.944 198.744 69.44 197.816 70.432C196.888 71.392 196.424 72.752 196.424 74.512C196.424 76.24 196.888 77.616 197.816 78.64C198.744 79.632 199.912 80.128 201.32 80.128C202.696 80.128 203.848 79.632 204.776 78.64C205.736 77.648 206.216 76.272 206.216 74.512ZM225.737 58.576C224.073 58.576 222.729 58.128 221.705 57.232C220.713 56.304 220.217 55.152 220.217 53.776C220.217 52.368 220.713 51.2 221.705 50.272C222.729 49.344 224.073 48.88 225.737 48.88C227.369 48.88 228.681 49.344 229.673 50.272C230.697 51.2 231.209 52.368 231.209 53.776C231.209 55.152 230.697 56.304 229.673 57.232C228.681 58.128 227.369 58.576 225.737 58.576ZM230.393 61.072V88H220.985V61.072H230.393ZM234.215 74.512C234.215 71.728 234.791 69.296 235.943 67.216C237.095 65.136 238.695 63.536 240.743 62.416C242.823 61.296 245.191 60.736 247.847 60.736C251.271 60.736 254.151 61.68 256.487 63.568C258.823 65.424 260.327 68.032 260.999 71.392H251.015C250.439 69.632 249.319 68.752 247.655 68.752C246.471 68.752 245.527 69.248 244.823 70.24C244.151 71.2 243.815 72.624 243.815 74.512C243.815 76.4 244.151 77.84 244.823 78.832C245.527 79.824 246.471 80.32 247.655 80.32C249.351 80.32 250.471 79.44 251.015 77.68H260.999C260.327 81.008 258.823 83.616 256.487 85.504C254.151 87.392 251.271 88.336 247.847 88.336C245.191 88.336 242.823 87.776 240.743 86.656C238.695 85.536 237.095 83.936 235.943 81.856C234.791 79.776 234.215 77.328 234.215 74.512Z"
      fill="white"
    />
    <path
      d="M24.096 34.48H12.096L10.272 40H0.384L12.72 6.16H23.568L35.856 40H25.92L24.096 34.48ZM21.744 27.28L18.096 16.336L14.496 27.28H21.744ZM56.5384 12.832C59.6424 12.832 62.1064 13.872 63.9304 15.952C65.7544 18 66.6664 20.784 66.6664 24.304V40H57.2584V25.552C57.2584 24.016 56.8584 22.816 56.0584 21.952C55.2584 21.056 54.1864 20.608 52.8424 20.608C51.4344 20.608 50.3304 21.056 49.5304 21.952C48.7304 22.816 48.3304 24.016 48.3304 25.552V40H38.9224V13.072H48.3304V16.912C49.1624 15.696 50.2824 14.72 51.6904 13.984C53.0984 13.216 54.7144 12.832 56.5384 12.832ZM76.5806 10.576C74.9166 10.576 73.5726 10.128 72.5486 9.232C71.5566 8.304 71.0606 7.152 71.0606 5.776C71.0606 4.368 71.5566 3.2 72.5486 2.272C73.5726 1.344 74.9166 0.879997 76.5806 0.879997C78.2126 0.879997 79.5246 1.344 80.5166 2.272C81.5406 3.2 82.0526 4.368 82.0526 5.776C82.0526 7.152 81.5406 8.304 80.5166 9.232C79.5246 10.128 78.2126 10.576 76.5806 10.576ZM81.2366 13.072V40H71.8286V13.072H81.2366ZM121.778 12.832C125.17 12.832 127.826 13.856 129.746 15.904C131.698 17.952 132.674 20.752 132.674 24.304V40H123.266V25.552C123.266 24.112 122.866 22.992 122.066 22.192C121.266 21.392 120.178 20.992 118.802 20.992C117.426 20.992 116.338 21.392 115.538 22.192C114.738 22.992 114.338 24.112 114.338 25.552V40H104.93V25.552C104.93 24.112 104.53 22.992 103.73 22.192C102.962 21.392 101.89 20.992 100.514 20.992C99.1063 20.992 98.0023 21.392 97.2023 22.192C96.4023 22.992 96.0023 24.112 96.0023 25.552V40H86.5943V13.072H96.0023V16.624C96.8343 15.472 97.9063 14.56 99.2183 13.888C100.562 13.184 102.098 12.832 103.826 12.832C105.81 12.832 107.57 13.264 109.106 14.128C110.674 14.992 111.906 16.208 112.802 17.776C113.762 16.304 115.026 15.12 116.594 14.224C118.162 13.296 119.89 12.832 121.778 12.832ZM136.293 26.512C136.293 23.728 136.789 21.296 137.781 19.216C138.805 17.136 140.181 15.536 141.909 14.416C143.669 13.296 145.621 12.736 147.765 12.736C149.621 12.736 151.221 13.104 152.565 13.84C153.909 14.576 154.949 15.568 155.685 16.816V13.072H165.093V40H155.685V36.256C154.949 37.504 153.893 38.496 152.517 39.232C151.173 39.968 149.589 40.336 147.765 40.336C145.621 40.336 143.669 39.776 141.909 38.656C140.181 37.536 138.805 35.936 137.781 33.856C136.789 31.744 136.293 29.296 136.293 26.512ZM155.685 26.512C155.685 24.784 155.205 23.424 154.245 22.432C153.317 21.44 152.165 20.944 150.789 20.944C149.381 20.944 148.213 21.44 147.285 22.432C146.357 23.392 145.893 24.752 145.893 26.512C145.893 28.24 146.357 29.616 147.285 30.64C148.213 31.632 149.381 32.128 150.789 32.128C152.165 32.128 153.317 31.632 154.245 30.64C155.205 29.648 155.685 28.272 155.685 26.512ZM186.342 31.984V40H182.262C175.382 40 171.942 36.592 171.942 29.776V20.896H168.63V13.072H171.942V6.544H181.398V13.072H186.294V20.896H181.398V29.92C181.398 30.656 181.558 31.184 181.878 31.504C182.23 31.824 182.806 31.984 183.606 31.984H186.342ZM216.385 26.224C216.385 26.96 216.337 27.696 216.241 28.432H198.433C198.529 29.904 198.929 31.008 199.633 31.744C200.369 32.448 201.297 32.8 202.417 32.8C203.985 32.8 205.105 32.096 205.777 30.688H215.809C215.393 32.544 214.577 34.208 213.361 35.68C212.177 37.12 210.673 38.256 208.849 39.088C207.025 39.92 205.009 40.336 202.801 40.336C200.145 40.336 197.777 39.776 195.697 38.656C193.649 37.536 192.033 35.936 190.849 33.856C189.697 31.776 189.121 29.328 189.121 26.512C189.121 23.696 189.697 21.264 190.849 19.216C192.001 17.136 193.601 15.536 195.649 14.416C197.729 13.296 200.113 12.736 202.801 12.736C205.457 12.736 207.809 13.28 209.857 14.368C211.905 15.456 213.505 17.024 214.657 19.072C215.809 21.088 216.385 23.472 216.385 26.224ZM206.785 23.872C206.785 22.72 206.401 21.824 205.633 21.184C204.865 20.512 203.905 20.176 202.753 20.176C201.601 20.176 200.657 20.496 199.921 21.136C199.185 21.744 198.705 22.656 198.481 23.872H206.785ZM218.699 26.512C218.699 23.728 219.195 21.296 220.187 19.216C221.211 17.136 222.603 15.536 224.363 14.416C226.123 13.296 228.075 12.736 230.219 12.736C231.947 12.736 233.483 13.104 234.827 13.84C236.203 14.544 237.275 15.52 238.043 16.768V4.48H247.499V40H238.043V36.256C237.307 37.504 236.267 38.496 234.923 39.232C233.579 39.968 231.995 40.336 230.171 40.336C228.027 40.336 226.075 39.776 224.315 38.656C222.587 37.536 221.211 35.936 220.187 33.856C219.195 31.744 218.699 29.296 218.699 26.512ZM238.091 26.512C238.091 24.784 237.611 23.424 236.651 22.432C235.723 21.44 234.571 20.944 233.195 20.944C231.787 20.944 230.619 21.44 229.691 22.432C228.763 23.392 228.299 24.752 228.299 26.512C228.299 28.24 228.763 29.616 229.691 30.64C230.619 31.632 231.787 32.128 233.195 32.128C234.571 32.128 235.723 31.632 236.651 30.64C237.611 29.648 238.091 28.272 238.091 26.512ZM12.096 80.8H22.608V88H2.688V54.16H12.096V80.8ZM31.0181 58.576C29.3541 58.576 28.0101 58.128 26.9861 57.232C25.9941 56.304 25.4981 55.152 25.4981 53.776C25.4981 52.368 25.9941 51.2 26.9861 50.272C28.0101 49.344 29.3541 48.88 31.0181 48.88C32.6501 48.88 33.9621 49.344 34.9541 50.272C35.9781 51.2 36.4901 52.368 36.4901 53.776C36.4901 55.152 35.9781 56.304 34.9541 57.232C33.9621 58.128 32.6501 58.576 31.0181 58.576ZM35.6741 61.072V88H26.2661V61.072H35.6741ZM57.8798 88L50.4398 76.96V88H41.0318V52.48H50.4398V71.632L57.8798 61.072H69.1598L58.5518 74.608L69.3518 88H57.8798ZM97.8379 74.224C97.8379 74.96 97.7899 75.696 97.6939 76.432H79.8859C79.9819 77.904 80.3819 79.008 81.0859 79.744C81.8219 80.448 82.7499 80.8 83.8699 80.8C85.4379 80.8 86.5579 80.096 87.2299 78.688H97.2619C96.8459 80.544 96.0299 82.208 94.8139 83.68C93.6299 85.12 92.1259 86.256 90.3019 87.088C88.4779 87.92 86.4619 88.336 84.2539 88.336C81.5979 88.336 79.2299 87.776 77.1499 86.656C75.1019 85.536 73.4859 83.936 72.3019 81.856C71.1499 79.776 70.5739 77.328 70.5739 74.512C70.5739 71.696 71.1499 69.264 72.3019 67.216C73.4539 65.136 75.0539 63.536 77.1019 62.416C79.1819 61.296 81.5659 60.736 84.2539 60.736C86.9099 60.736 89.2619 61.28 91.3099 62.368C93.3579 63.456 94.9579 65.024 96.1099 67.072C97.2619 69.088 97.8379 71.472 97.8379 74.224ZM88.2379 71.872C88.2379 70.72 87.8539 69.824 87.0859 69.184C86.3179 68.512 85.3579 68.176 84.2059 68.176C83.0539 68.176 82.1099 68.496 81.3739 69.136C80.6379 69.744 80.1579 70.656 79.9339 71.872H88.2379ZM150.38 54.16V88H140.972V69.328L134.588 88H126.716L120.284 69.184V88H110.876V54.16H122.252L130.748 76.144L139.052 54.16H150.38ZM154.199 74.512C154.199 71.728 154.695 69.296 155.687 67.216C156.711 65.136 158.087 63.536 159.815 62.416C161.575 61.296 163.527 60.736 165.671 60.736C167.527 60.736 169.127 61.104 170.471 61.84C171.815 62.576 172.855 63.568 173.591 64.816V61.072H182.999V88H173.591V84.256C172.855 85.504 171.799 86.496 170.423 87.232C169.079 87.968 167.495 88.336 165.671 88.336C163.527 88.336 161.575 87.776 159.815 86.656C158.087 85.536 156.711 83.936 155.687 81.856C154.695 79.744 154.199 77.296 154.199 74.512ZM173.591 74.512C173.591 72.784 173.111 71.424 172.151 70.432C171.223 69.44 170.071 68.944 168.695 68.944C167.287 68.944 166.119 69.44 165.191 70.432C164.263 71.392 163.799 72.752 163.799 74.512C163.799 76.24 164.263 77.616 165.191 78.64C166.119 79.632 167.287 80.128 168.695 80.128C170.071 80.128 171.223 79.632 172.151 78.64C173.111 77.648 173.591 76.272 173.591 74.512ZM198.296 60.736C200.12 60.736 201.704 61.104 203.048 61.84C204.424 62.576 205.48 63.568 206.216 64.816V61.072H215.624V87.712C215.624 90.24 215.144 92.512 214.184 94.528C213.224 96.576 211.72 98.208 209.672 99.424C207.656 100.64 205.096 101.248 201.992 101.248C197.832 101.248 194.504 100.272 192.008 98.32C189.512 96.368 188.088 93.712 187.736 90.352H197C197.192 91.216 197.672 91.888 198.44 92.368C199.208 92.848 200.2 93.088 201.416 93.088C204.616 93.088 206.216 91.296 206.216 87.712V84.256C205.48 85.504 204.424 86.496 203.048 87.232C201.704 87.968 200.12 88.336 198.296 88.336C196.152 88.336 194.2 87.776 192.44 86.656C190.712 85.536 189.336 83.936 188.312 81.856C187.32 79.744 186.824 77.296 186.824 74.512C186.824 71.728 187.32 69.296 188.312 67.216C189.336 65.136 190.712 63.536 192.44 62.416C194.2 61.296 196.152 60.736 198.296 60.736ZM206.216 74.512C206.216 72.784 205.736 71.424 204.776 70.432C203.848 69.44 202.696 68.944 201.32 68.944C199.912 68.944 198.744 69.44 197.816 70.432C196.888 71.392 196.424 72.752 196.424 74.512C196.424 76.24 196.888 77.616 197.816 78.64C198.744 79.632 199.912 80.128 201.32 80.128C202.696 80.128 203.848 79.632 204.776 78.64C205.736 77.648 206.216 76.272 206.216 74.512ZM225.737 58.576C224.073 58.576 222.729 58.128 221.705 57.232C220.713 56.304 220.217 55.152 220.217 53.776C220.217 52.368 220.713 51.2 221.705 50.272C222.729 49.344 224.073 48.88 225.737 48.88C227.369 48.88 228.681 49.344 229.673 50.272C230.697 51.2 231.209 52.368 231.209 53.776C231.209 55.152 230.697 56.304 229.673 57.232C228.681 58.128 227.369 58.576 225.737 58.576ZM230.393 61.072V88H220.985V61.072H230.393ZM234.215 74.512C234.215 71.728 234.791 69.296 235.943 67.216C237.095 65.136 238.695 63.536 240.743 62.416C242.823 61.296 245.191 60.736 247.847 60.736C251.271 60.736 254.151 61.68 256.487 63.568C258.823 65.424 260.327 68.032 260.999 71.392H251.015C250.439 69.632 249.319 68.752 247.655 68.752C246.471 68.752 245.527 69.248 244.823 70.24C244.151 71.2 243.815 72.624 243.815 74.512C243.815 76.4 244.151 77.84 244.823 78.832C245.527 79.824 246.471 80.32 247.655 80.32C249.351 80.32 250.471 79.44 251.015 77.68H260.999C260.327 81.008 258.823 83.616 256.487 85.504C254.151 87.392 251.271 88.336 247.847 88.336C245.191 88.336 242.823 87.776 240.743 86.656C238.695 85.536 237.095 83.936 235.943 81.856C234.791 79.776 234.215 77.328 234.215 74.512Z"
      fill="url(#paint0_linear_279_1017)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_279_1017"
        x1="-2.68548e-06"
        y1="12.5"
        x2="199.681"
        y2="161.378"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F8DCCC" />
        <stop offset="0.338542" stopColor="#EFAA73" />
        <stop offset="0.4375" stopColor="#F7CAA3" />
        <stop offset="1" stopColor="#F4DFB5" />
      </linearGradient>
    </defs>
  </svg>
);
const CardTitleEN = styled(_CardTitleEN)`
  margin: 0 -8px;
  filter: drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.18));
`;
const CardTitleKO = styled.h3`
  font-weight: 900;
  font-size: 48px;
  line-height: 100%;
  /* or 48px */

  color: #f7caa3;
  background: linear-gradient(
      105.22deg,
      #f8dccc 3.01%,
      #efaa73 34.44%,
      #f7caa3 43.63%,
      #f4dfb5 95.87%
    ),
    #ffffff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  /* shadow-default */
  text-shadow: 0px 8px 12px rgba(0, 0, 0, 0.18);
`;

const AnimatedBlockList = styled(motion.ul)`
  margin: 38px -8px -48px;
  display: flex;
  gap: 10px;
`;
const AnimatedBlockItem = styled(motion.li)`
  width: 50%;
  height: 310px;

  &:last-of-type {
    margin-top: 48px;
  }
`;
const BlockItem = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 16px;

  /* shadow-default */
  filter: drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.18));
`;

const FramerLogo = styled.img.attrs({
  src: '/assets/landing/framer-logo.svg',
})`
  margin-top: 28px;
  width: 138.92px;
  height: 38px;
`;
