import { axios } from '@/utils/axios';

import {
  DeFiStaking,
  KlaytnDeFiProtocolType,
  KlaytnDeFiType,
} from '@/defi/types/staking';

import { getTokenInfo } from '../utils/getTokenInfo';
import { KSD_ADDRESS, KSD_TOKEN_INFO } from './constants';

export const getLPPoolList = async () => {
  const { data } = await axios.get<KokonutSwap.PoolListResponse>(
    'https://prod.kokonut-api.com/pools',
  );
  return data.pools;
};

const LP_TOKEN_DECIMALS = 18;

export const getLPPoolBalance = async (
  _account: string,
  lpTokenRawBalance: string,
  pool: KokonutSwap.Pool,
  pools: KokonutSwap.Pool[],
): Promise<DeFiStaking> => {
  const poolAddress = pool.address.toLowerCase();
  const {
    data: { farmPools },
  } = await axios.get<KokonutSwap.FarmPoolsResponse>(
    `https://prod.kokonut-api.com/farm/pools?address=${poolAddress}`,
  );
  const farm = farmPools.find(
    (v) => v.poolAddress.toLowerCase() === poolAddress,
  );
  const lpStaked = Number(farm?.user.stakedAmount || 0); // formatted with decimals
  const lpValue = Number(farm?.user.stakedValue || 0); // formatted with decimals

  // get price with lpStaked, lpValue
  const lpPrice = Number(pool.lpTokenRealPrice || 0); // formatted with decimals
  const lpBalanceInWallet = Number(lpTokenRawBalance) / 10 ** LP_TOKEN_DECIMALS;
  let lpBalanceInWalletValue = lpBalanceInWallet * lpPrice;
  if (isNaN(lpBalanceInWalletValue)) {
    lpBalanceInWalletValue = 0;
  }
  const claimableRewardsInKSD = Number(farm?.user.claimableReward || 0);

  const tokenInfos = pool.coins.flatMap((coinAddr) => {
    const address = coinAddr.toLowerCase();
    const tokenInfo = getTokenInfo(address);
    if (tokenInfo) {
      return tokenInfo;
    }
    const lpTokenPool = pools.find(
      (v) => v.lpTokenAddress.toLowerCase() === address,
    );
    if (lpTokenPool) {
      return lpTokenPool.coins.map((v) => getTokenInfo(v.toLowerCase()));
    }
    return null;
  });

  return {
    protocol: KlaytnDeFiProtocolType.KOKONUTSWAP,
    type: KlaytnDeFiType.KOKONUTSWAP_LP,
    prefix: pool.symbol,
    address: pool.lpTokenAddress,
    tokens: tokenInfos,
    relatedTokens: [KSD_TOKEN_INFO],
    wallet: {
      value: lpBalanceInWalletValue,
      lpAmount: lpBalanceInWallet,
    },
    staked: {
      value: lpValue,
      lpAmount: lpStaked,
    },
    rewards: {
      tokenAmounts: {
        [KSD_ADDRESS]: claimableRewardsInKSD,
      },
    },
    unstake: null,
  };
};

declare module KokonutSwap {
  export interface Liquidity {
    coin: string;
    amount: string;
  }

  export interface Pool {
    address: string;
    symbol: string;
    poolType: string;
    lpTokenAddress: string;
    stakingPoolAddress?: string;
    managerAddress?: string;
    coins: string[];
    coinsUnderlying: string[];
    adminFee?: string;
    swapFee?: string;
    deprecated: boolean;
    liquidity: Liquidity[];
    tvl: string;
    lpTokenVirtualPrice: string;
    lpTokenRealPrice: string;
    lpTokenTotalSupply: string;
    volume24hr: string;
    volume24hrOnlySwap: string;
    rewardFee24hr: string;
    baseApr: string;
    stakingApr?: string;
    user: User | null;
    swapMidFee?: string;
    swapOutFee?: string;
    priceOracle?: string;
    priceScale?: string;
    extendedContractAddress?: string;
    aklayApr?: string;
  }

  export interface User {
    stakedAmount: string;
    stakedValue: string;
    claimableReward: string;
  }

  export interface FarmPool {
    poolAddress: string;
    stakingPoolAddress: string;
    lpTokenAddress: string;
    type: string;
    lpDisplaySymbol: string;
    getLPLink: string;
    lpCoins: string[];
    totalLiquidity: string;
    stakingRewardCoinAddress: string;
    poolRateWeek: string;
    baseApr: string;
    stakingApr: string;
    fixedKSDAprEndsAt: Date;
    user: User;
    deprecated: boolean;
    aklayApr: string;
  }

  export interface PoolListResponse {
    pools: Pool[];
  }

  export interface UserBalancesResponse {
    balances: Record<string, string>; // formatted
  }

  export interface FarmPoolsResponse {
    farmPools: FarmPool[];
  }
}
