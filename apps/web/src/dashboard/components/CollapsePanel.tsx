import styled from '@emotion/styled';
import useCollapse from 'react-collapsed';

import { Colors } from '@/styles';

import { InlineBadge } from './InlineBadge';

type CollapsePanelProps = {
  title: string;
  count?: number;
  children?: React.ReactNode;
  valuation: number;
  currentLanguage: string;
};

// FIXME: Show metadata from `protocols API` response
export const CollapsePanel: React.FC<CollapsePanelProps> = ({
  title,
  // metadata,
  count,
  children,
  valuation,
  currentLanguage,
}) => {
  const lang = currentLanguage === 'ko' ? 'ko' : 'en';
  const { getCollapseProps, getToggleProps } = useCollapse({
    defaultExpanded: false,
  });

  return (
    <Container>
      <Header {...getToggleProps()}>
        <HeaderTitleRow>
          <ProtocolInfo>
            {/* <ProtocolLogo alt={title} src={metadata?.logo} /> */}
            <span>{title}</span>
            {typeof count !== 'undefined' && (
              <span className="sys">
                <InlineBadge>{count.toLocaleString()}</InlineBadge>
              </span>
            )}
          </ProtocolInfo>

          <Valuation className="sys">
            {`$${valuation.toLocaleString(undefined, {
              maximumFractionDigits: 6,
            })}`}
          </Valuation>
        </HeaderTitleRow>
        {/* <Paragraph>{metadata?.description[lang]}</Paragraph> */}
      </Header>
      <Content {...getCollapseProps()}>{children}</Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  background: ${Colors.gray800};
  border: 1px solid ${Colors.gray600};
  border-radius: 8px;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 16px 14px;

  display: flex;
  flex-direction: column;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${Colors.gray700};
  }
`;

const HeaderTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 18px;
  font-weight: bold;
  color: ${Colors.gray100};
`;
const ProtocolInfo = styled.span`
  display: flex;
  align-items: center;
`;
const ProtocolLogo = styled.img`
  margin-right: 8px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;
const Paragraph = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: ${Colors.gray400};
  line-height: 1.2;
`;

const Content = styled.div`
  padding: 8px 8px 12px;
  border-top: 1px solid ${Colors.gray600};

  & > ul {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;
const Valuation = styled.span`
  font-weight: bold;
  font-size: 22px;
  line-height: 28px;
  font-weight: bold;
  color: ${Colors.gray050};
`;
