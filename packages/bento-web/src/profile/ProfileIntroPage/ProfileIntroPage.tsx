import axios, { AxiosError } from 'axios';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button, MetaHead, Modal, NoSSR } from '@/components/system';
import { useSession } from '@/hooks/useSession';

import { Analytics, toast } from '@/utils';

import { FixedLoginNudge } from '../components/LoginNudge';
import { PageContainer } from '../components/PageContainer';
import {
  ProfileEditor,
  UserInformationDraft,
} from '../components/ProfileEditor';
import { useProfile } from '../hooks/useProfile';
import { TickerCarousel } from '../instance/components/TickerCarousel';
import { WalletListItem } from '../instance/sections/ProfileWalletItem';
import { UserProfile } from '../types/UserProfile';
import { Illusts } from './Illusts';

type ErrorResponse =
  | {
      code: 'USERNAME_UNUSABLE' | 'VALUE_REQUIRED' | string;
      message: string;
    }
  | undefined;

const EMPTY_DRAFT: UserInformationDraft = {
  username: '',
  displayName: '',
  bio: '',
};

const CTA_TITLE = {
  CREATE_YOUR_PROFILE: 'Create Your Profile',
  GOTO_YOUT_PROFILE: 'Go to your profile',
};

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'dashboard'])),
    },
  };
};

export default function ProfileIntroPage() {
  const router = useRouter();
  const { session } = useSession();
  const { profile, revaildateProfile } = useProfile({ type: 'MY_PROFILE' });
  const [isLoginRequired, setLoginRequired] = useState<boolean>(false);

  useEffect(() => {
    Analytics.logEvent('view_profile_landing', undefined);
  }, []);

  const hasUsername = !!profile?.username;
  const [isEditing, setEditing] = useState<boolean>(false);
  const [draft, setDraft] = useState<UserInformationDraft>(EMPTY_DRAFT);
  const onProfileEdit = useCallback(async () => {
    if (!isEditing) {
      setDraft({
        username: profile?.username ?? '',
        displayName: profile?.display_name ?? '',
        bio: profile?.bio ?? '',
      });
      setTimeout(() => {
        setEditing(true);
      });
      return;
    }

    // FIXME: Duplicated logic
    try {
      const { data } = await axios.post(`/api/profile`, {
        username: draft.username.toLowerCase(),
        display_name: draft.displayName,
        bio: draft.bio,
      });
      console.log(data);

      const [createdProfile] = data.body as UserProfile[];

      setEditing(false);
      setDraft(EMPTY_DRAFT);
      revaildateProfile?.();

      toast({
        type: 'success',
        title: 'Changes Saved',
      });

      router.push(`/u/${createdProfile.username}`);
    } catch (e) {
      if (e instanceof AxiosError) {
        const errorResponse = e.response?.data as ErrorResponse;
        if (errorResponse?.code === 'USERNAME_UNUSABLE') {
          toast({
            type: 'error',
            title: errorResponse.message,
            description: 'Please choose another username',
          });
          setDraft((prev) => ({ ...prev, username: '' }));
        } else if (errorResponse?.code === 'VALUE_REQUIRED') {
          toast({
            type: 'error',
            title: errorResponse.message,
          });
        } else {
          toast({
            type: 'error',
            title: 'Server Error',
            description: errorResponse?.message || 'Something went wrong',
          });
        }
      }
    }
  }, [profile, isEditing, draft, router]);

  const onClickCreateProfile = useCallback(() => {
    if (!session) {
      Analytics.logEvent('click_profile_landing_login', {
        title: CTA_TITLE.CREATE_YOUR_PROFILE,
      });
      setLoginRequired(true);
      return;
    }
    if (!hasUsername) {
      // new user; setup user information
      Analytics.logEvent('click_profile_landing_create_your_profile', {
        title: CTA_TITLE.CREATE_YOUR_PROFILE,
      });
      setEditing(true);
    } else {
      Analytics.logEvent('click_profile_landing_goto_your_profile', {
        title: CTA_TITLE.GOTO_YOUT_PROFILE,
      });
      router.push(`/u/${profile.username}`);
    }
  }, [session, profile, hasUsername]);

  return (
    <Container>
      <MetaHead
        title="Web3 Profiles like never before"
        image="https://bento.finance/assets/profile/og-image.png"
      />

      <StyledTickerCarousel style={{ marginTop: 64 }} />
      <StyledPageContainer style={{ paddingTop: 0, zIndex: 10 }}>
        <Illusts />

        <Title>
          <span>Web3 Profiles</span>
          {`\n`}
          <span>{` like never before`}</span>
        </Title>

        <ButtonContainer>
          <NoSSR>
            <CTAButton onClick={onClickCreateProfile}>
              {hasUsername
                ? CTA_TITLE.GOTO_YOUT_PROFILE
                : CTA_TITLE.CREATE_YOUR_PROFILE}
            </CTAButton>
            {!hasUsername && <CTABadge>Less than a minute</CTABadge>}
          </NoSSR>
        </ButtonContainer>

        <Paragraph>
          Early profile creators will get the
          <br /> <span className="highlight">2022 EARLY BENTO Badge!</span>
          <br />
          {` We’re making the home of soulbound tokens`}
          {'\n'}
          {` -not bound to your wallet, `}
          <span className="highlight">but to your true identity</span>
        </Paragraph>

        <WalletListItemWrapper>
          <WalletListItem
            {...{
              type: 'evm',
              address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
              networks: [
                'ethereum',
                'polygon',
                'bnb',
                'avalanche',
                'opensea',
                'klaytn',
              ],
            }}
          />
          <div>
            <WalletListItem
              {...{
                type: 'cosmos-sdk',
                address: 'cosmos1ygp4qmczwtyzc6cfqvwechjdvmvpzfyd76e3rm',
                networks: ['cosmos-hub', 'osmosis'],
              }}
            />
          </div>
        </WalletListItemWrapper>

        <ProfileEditModal
          visible={isEditing}
          onDismiss={() => setEditing((prev) => !prev)}
        >
          <ProfileEditContainer>
            <ProfileEditor
              draft={draft}
              setDraft={setDraft}
              onSubmit={onProfileEdit}
            />
          </ProfileEditContainer>
        </ProfileEditModal>

        <FixedLoginNudge visible={isLoginRequired} redirectTo="/profile" />
      </StyledPageContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
`;

const StyledTickerCarousel = styled(TickerCarousel)`
  width: 100vw;
  position: absolute;
  top: 0;
`;
const StyledPageContainer = styled(PageContainer)`
  padding-bottom: 100px;

  & > div {
    align-items: center;
  }
`;

const Title = styled.h1`
  width: fit-content;
  margin: 44px auto 0;

  font-weight: 900;
  font-size: 52px;
  font-variant: small-caps;
  line-height: 83%;

  text-align: center;
  letter-spacing: -0.5px;

  color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;

  & > span {
    width: fit-content;
  }

  @media screen and (max-width: 620px) {
    font-size: 48px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 32px;
  width: 352px;
  max-width: 80vw;

  position: relative;
  z-index: 1;
`;
const CTAButton = styled(Button)`
  width: 100%;

  font-weight: 900;
  font-size: 18px;
  line-height: 120%;
`;
const CTABadge = styled.span`
  position: absolute;
  top: -12px;
  right: -52px;

  width: fit-content;
  padding: 6px 12px;
  background: rgba(51, 9, 17, 0.88);
  border: 1px solid #ff214a;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.44);
  border-radius: 36px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 600;
  font-size: 14px;
  line-height: 83%;
  /* identical to box height, or 12px */

  text-align: center;
  letter-spacing: -0.5px;

  color: #ff214a;
`;

const Paragraph = styled.p`
  margin: 24px 16px 0;
  max-width: 420px;
  white-space: break-spaces;
  font-weight: 600;
  font-size: 16px;
  line-height: 145%;
  z-index: 2;

  text-align: center;
  letter-spacing: 0.01em;

  color: #a8a8a8;

  @media screen and (max-width: 420px) {
    white-space: normal;
  }

  span.highlight {
    /* fallback */
    color: #ff7f75;

    display: inline-block;

    background: linear-gradient(
      90deg,
      #ff7f75 26.58%,
      #ff7b9b 49.22%,
      #ff7b7b 71.38%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;

const WalletListItemWrapper = styled.div`
  margin-top: 64px;
  width: 100%;
  max-width: 500px;
  z-index: 1;

  & > div:last-of-type {
    transform: translateX(20px) translateY(-20px) rotate(-8deg);
    filter: drop-shadow(0px -6px 24px rgba(0, 0, 0, 0.45));
  }
`;

const ProfileEditModal = styled(Modal)`
  .modal-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const ProfileEditContainer = styled.div`
  padding: 32px 16px;

  width: 80vw;
  max-width: ${500 * 0.8}px;

  max-height: calc(100vh - 64px - 84px);
  overflow: scroll;

  border-radius: 8px;
  background-color: rgba(38, 43, 52, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
  user-select: none;
`;